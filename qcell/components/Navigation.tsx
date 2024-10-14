import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Page {
  id: string;
  title: string;
  slug: string;
}

const Navigation: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('/api/pages');
        setPages(response.data);
      } catch (error) {
        console.error('Failed to fetch pages', error);
      }
    };

    fetchPages();
  }, []);

  return (
    <nav>
      <ul>
        <li><Link href="/">Home</Link></li>
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
