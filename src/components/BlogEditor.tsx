import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Eye, ArrowLeft, Loader2 } from 'lucide-react';
import { categories } from '@/data/blogPosts';
import type { BlogPost } from '@/data/blogPosts';
import RichTextEditor from './RichTextEditor';

interface BlogEditorProps {
  initialData?: BlogPost;
  onSave: (data: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
  isSaving?: boolean;
}

const BlogEditor = ({ initialData, onSave, onCancel, isSaving = false }: BlogEditorProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || 'forex',
    categoryLabel: initialData?.categoryLabel || 'Forex Markets',
    featuredImage: initialData?.featuredImage || '',
    author: initialData?.author || 'New TradeFx Research Team',
    publishDate: initialData?.publishDate || new Date().toISOString().split('T')[0],
    readingTime: initialData?.readingTime || 5,
    featured: initialData?.featured || false,
  });
  
  const [showPreview, setShowPreview] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const handleCategoryChange = (category: string) => {
    const categoryObj = categories.find(c => c.id === category);
    setFormData(prev => ({
      ...prev,
      category: category as BlogPost['category'],
      categoryLabel: categoryObj?.label || category,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    onSave(formData);
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({
      ...prev,
      content,
      readingTime: estimateReadingTime(content),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onCancel} className="gap-2" disabled={isSaving}>
          <ArrowLeft size={16} />
          Back to Posts
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
            disabled={isSaving}
          >
            <Eye size={16} />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
        </div>
      </div>

      {showPreview ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-serif">{formData.title || 'Untitled Post'}</CardTitle>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formData.author}</span>
              <span>•</span>
              <span>{formData.publishDate}</span>
              <span>•</span>
              <span>{formData.readingTime} min read</span>
            </div>
          </CardHeader>
          <CardContent>
            {formData.featuredImage && (
              <img 
                src={formData.featuredImage} 
                alt={formData.title} 
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}
            <p className="text-lg text-muted-foreground mb-6">{formData.excerpt}</p>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formData.content.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title"
                    required
                    disabled={isSaving}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="post-url-slug"
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange} disabled={isSaving}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(c => c.id !== 'all').map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="publishDate">Publish Date *</Label>
                  <Input
                    id="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishDate: e.target.value }))}
                    required
                    disabled={isSaving}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="featuredImage">Featured Image URL</Label>
                <Input
                  id="featuredImage"
                  value={formData.featuredImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, featuredImage: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  disabled={isSaving}
                />
                {formData.featuredImage && (
                  <img 
                    src={formData.featuredImage} 
                    alt="Preview" 
                    className="mt-2 h-32 w-auto object-cover rounded-lg"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief description of the post (shown in previews)"
                  rows={3}
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label>Content *</Label>
                <RichTextEditor
                  content={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your blog post content here..."
                  disabled={isSaving}
                />
                <p className="text-xs text-muted-foreground">
                  Estimated reading time: {formData.readingTime} min • Content is saved as Markdown
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded border-input"
                  disabled={isSaving}
                />
                <Label htmlFor="featured" className="cursor-pointer">
                  Mark as featured post
                </Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" className="gap-2" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Post
                </>
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BlogEditor;
