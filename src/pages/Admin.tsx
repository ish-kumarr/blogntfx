import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LogOut, Plus, Edit, Trash2, FileText, Eye, Loader2 } from 'lucide-react';
import { type BlogPost } from '@/data/blogPosts';
import BlogEditor from '@/components/BlogEditor';
import logoIcon from '@/assets/logo-icon.png';
import SEO from '@/components/SEO';
import { useToast } from '@/hooks/use-toast';

type ViewMode = 'list' | 'create' | 'edit';

// API Functions
const fetchPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!response.ok) throw new Error('Failed to fetch posts');
  const data = await response.json();
  return data.posts;
};

const deletePost = async (id: string): Promise<void> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/posts/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete post');
};

const createPost = async (postData: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
};

const updatePost = async ({ id, postData }: { id: string, postData: Omit<BlogPost, 'id'> }): Promise<BlogPost> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
};


const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['adminBlogPosts'],
    queryFn: fetchPosts,
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      toast({ title: 'Post Created', description: 'Your new blog post has been created.' });
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      setViewMode('list');
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create post.', variant: 'destructive' });
    }
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      toast({ title: 'Post Updated', description: 'The blog post has been updated.' });
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      setViewMode('list');
      setEditingPost(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update post.', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast({
        title: 'Post Deleted',
        description: 'The blog post has been successfully removed.',
      });
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to delete the post. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setViewMode('create');
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setViewMode('edit');
  };

  const handleSavePost = (data: Omit<BlogPost, 'id'>) => {
    if (viewMode === 'edit' && editingPost) {
      updateMutation.mutate({ id: editingPost.id, postData: data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleCancel = () => {
    setViewMode('list');
    setEditingPost(null);
  };
  
  const isMutating = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <SEO 
        title="Admin Dashboard" 
        description="Manage blog content for New TradeFx"
        noIndex={true}
      />
      <div className="min-h-screen bg-muted/30">
        <header className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoIcon} alt="New TradeFx" className="h-8 w-8" />
              <div>
                <h1 className="font-serif font-semibold text-lg">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Manage blog content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open('/blogs', '_blank')}
                className="gap-2"
              >
                <Eye size={14} />
                <span className="hidden sm:inline">View Site</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-6 md:py-8">
          {viewMode === 'list' ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Total Posts</CardDescription>
                    <CardTitle className="text-3xl">{isLoading ? <Loader2 className="animate-spin" /> : posts.length}</CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Featured Posts</CardDescription>
                    <CardTitle className="text-3xl">
                      {isLoading ? <Loader2 className="animate-spin" /> : posts.filter(p => p.featured).length}
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Categories</CardDescription>
                    <CardTitle className="text-3xl">
                      {isLoading ? <Loader2 className="animate-spin" /> : new Set(posts.map(p => p.category)).size}
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText size={20} />
                      Blog Posts
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Manage and edit your blog content
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button onClick={handleCreatePost} className="gap-2">
                      <Plus size={16} />
                      <span className="hidden sm:inline">New Post</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto -mx-6">
                    {isLoading ? (
                      <div className="text-center py-24 flex flex-col items-center justify-center">
                        <Loader2 className="h-12 w-12 text-muted-foreground animate-spin"/>
                        <p className="mt-4 text-muted-foreground">Loading posts...</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="pl-6">Title</TableHead>
                            <TableHead className="hidden md:table-cell">Category</TableHead>
                            <TableHead className="hidden sm:table-cell">Date</TableHead>
                            <TableHead className="hidden lg:table-cell">Status</TableHead>
                            <TableHead className="text-right pr-6">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {posts.map((post) => (
                            <TableRow key={post.id}>
                              <TableCell className="pl-6">
                                <div className="max-w-[200px] sm:max-w-[300px]">
                                  <p className="font-medium truncate">{post.title}</p>
                                  <p className="text-xs text-muted-foreground truncate md:hidden">
                                    {post.categoryLabel}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                <Badge variant="secondary">{post.categoryLabel}</Badge>
                              </TableCell>
                              <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                                {new Date(post.publishDate).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="hidden lg:table-cell">
                                {post.featured ? (
                                  <Badge>Featured</Badge>
                                ) : (
                                  <Badge variant="outline">Published</Badge>
                                )}
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditPost(post)}
                                    className="h-8 w-8"
                                  >
                                    <Edit size={14} />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeletePost(post.id)}
                                    disabled={deleteMutation.isPending}
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 size={14} />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </div>
                  
                  {posts.length === 0 && !isLoading && (
                    <div className="text-center py-12">
                      <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-semibold">No posts yet</h3>
                      <p className="text-muted-foreground">Get started by creating your first blog post.</p>
                      <Button onClick={handleCreatePost} className="mt-4 gap-2">
                        <Plus size={16} />
                        Create Post
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <BlogEditor
              initialData={editingPost || undefined}
              onSave={handleSavePost}
              onCancel={handleCancel}
              isSaving={isMutating}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default Admin;
