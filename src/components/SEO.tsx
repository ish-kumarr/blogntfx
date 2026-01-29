import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

const SITE_NAME = 'New TradeFx Blog';
const DEFAULT_DESCRIPTION = 'Expert forex trading insights, market analysis, and educational content from professional traders. In-depth research on technical analysis, risk management, and trading psychology.';
const BASE_URL = 'https://blogs.tradefxservices.com';
const DEFAULT_IMAGE = 'https://blogs.tradefxservices.com/og-image.jpg';

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = 'forex trading, trading blog, market analysis, forex education, technical analysis, risk management, trading psychology, currency trading, forex strategies',
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  author = 'New TradeFx Research Team',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noIndex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article-specific tags */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Additional SEO */}
      <meta name="theme-color" content="#1258ca" />
      <meta name="msapplication-TileColor" content="#1258ca" />
    </Helmet>
  );
};

export default SEO;
