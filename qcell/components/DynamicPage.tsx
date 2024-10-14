import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PageContent {
  title: string;
  content: string;
}

interface DynamicPageProps {
  slug: string;
}

const DynamicPage: React.FC<DynamicPageProps> = ({ slug }) => {
  const [pageContent, setPageContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(`/api/pages/${slug}`);
        setPageContent(response.data);
      } catch (err) {
        setError('Failed to load page content');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPageContent();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!pageContent) return <div>Page not found</div>;

  return (
    <div>
      <h1>{pageContent.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: pageContent.content }} />
    </div>
  );
};

export default DynamicPage;
