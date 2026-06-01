import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Printer, Share2 } from 'lucide-react';

export default function ArticleView() {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch the article here
  const article = {
    title: 'Welcome to the Archive',
    date: 'June 1, 2026',
    content: 'The database is currently empty, awaiting new entries. Stay tuned for upcoming chronicle launches.',
  };

  const handlePrint = () => window.print();
  
  const handleShare = async () => {
    try {
      await navigator.share({
        title: article.title,
        url: window.location.href,
      });
    } catch (err) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 font-serif">
      <div className="no-print flex justify-between items-center mb-8 border-b-2 border-gray-900 pb-4">
        <Link to="/" className="font-bold uppercase tracking-widest text-sm hover:underline">← Back to Archive</Link>
        <div className="flex gap-4">
          <button onClick={handlePrint} className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm underline">
            <Printer size={16} /> Save as PDF
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm underline">
            <Share2 size={16} /> Share
          </button>
        </div>
      </div>
      
      <article className="max-w-3xl mx-auto article-content">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">{article.title}</h1>
        <p className="text-gray-500 italic mb-8">{article.date}</p>
        <div className="text-lg leading-relaxed text-gray-800">
          {article.content}
        </div>
      </article>
    </div>
  );
}
