import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AllPosts() {
  const [articles, setArticles] = useState<{ id: string; title: string; status: string; date: string }[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setArticles(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleEdit = (id: string) => {
     navigate(`/secretary-admin/dashboard/new?id=${id}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 font-serif">
      <header className="mb-12 pb-6 border-b-4 border-gray-900 flex justify-between items-end flex-wrap gap-4">
        <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter">All Posts</h1>
            <p className="text-gray-500 mt-2 italic">Manage your articles.</p>
        </div>
        <div className="flex gap-4 flex-wrap">
            <Link to="/secretary-admin/dashboard/editors-desk" className="px-4 py-2 border border-gray-900 font-bold uppercase tracking-widest text-sm hover:bg-gray-900 hover:text-white transition-colors">Edit Editor's Desk</Link>
            <Link to="/secretary-admin/dashboard/analytics" className="px-4 py-2 border border-gray-900 font-bold uppercase tracking-widest text-sm hover:bg-gray-900 hover:text-white transition-colors">Analytics</Link>
            <Link to="/secretary-admin/dashboard/new" className="px-4 py-2 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">Add New Post</Link>
        </div>
      </header>
      
      <section className="bg-white p-8 border border-gray-300 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-gray-300 pb-4 flex-wrap gap-4">
            <h2 className="text-xl font-bold uppercase tracking-widest">Manage Posts</h2>
            <button 
                disabled={selectedArticles.length === 0}
                className="px-4 py-2 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest disabled:opacity-50"
                onClick={() => console.log('Publishing selected:', selectedArticles)}
            >
                Publish Selected ({selectedArticles.length})
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b-2 border-gray-900 text-gray-600 text-sm uppercase">
                        <th className="p-3"><input type="checkbox" onChange={(e) => setSelectedArticles(e.target.checked ? articles.map(a => a.id) : [])} /></th>
                        <th className="p-3">Title</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id} className="border-b border-gray-200">
                            <td className="p-3"><input type="checkbox" checked={selectedArticles.includes(article.id)} onChange={(e) => setSelectedArticles(e.target.checked ? [...selectedArticles, article.id] : selectedArticles.filter(id => id !== article.id))} /></td>
                            <td className="p-3 font-semibold">{article.title}</td>
                            <td className="p-3 text-sm italic">{article.status}</td>
                            <td className="p-3 text-sm text-gray-500">{article.date}</td>
                            <td className="p-3 flex gap-4">
                                <button onClick={() => handleEdit(article.id)} className="text-gray-900 underline font-bold uppercase text-xs">Edit</button>
                                <button onClick={() => handleDelete(article.id)} className="text-red-700 underline font-bold uppercase text-xs">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </section>
    </div>
  );
}
