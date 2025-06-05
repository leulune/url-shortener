import { useEffect, useState } from 'react';
import LinkForm from './components/LinkForm'
import LinkList from './components/LinkList'
import type { ShortUrl } from './types';
import { useFetchLinks } from './hooks/useFetchLinks';

export default function App() {
  const [links, setLinks] = useState<ShortUrl[]>([]);
  const fetchLinks = useFetchLinks(setLinks);

  useEffect(() => {
    fetchLinks();

    const handleFocus = () => {
      fetchLinks();
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    }
  }, [fetchLinks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white px-6 py-10">
      <div className="max-w-4xl mx-auto space-y-12 bg-white p-8 rounded-2xl shadow-md">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">URL Shortener</h1>
        </header>
        <LinkForm onLinkCreated={fetchLinks} />
        <LinkList links={links} onDelete={fetchLinks} />
      </div>
    </div>
  )
}
