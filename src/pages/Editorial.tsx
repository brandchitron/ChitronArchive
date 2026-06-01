import { Link } from 'react-router-dom';

export default function EditorialPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 font-serif">
        <header className="mb-12 pb-6 border-b-4 border-gray-900 flex justify-between items-end">
            <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter">Editorial</h1>
                <p className="text-gray-500 mt-2 italic">From the editor's desk.</p>
            </div>
            <Link to="/" className="px-4 py-2 border border-gray-900 font-bold uppercase tracking-widest text-sm hover:bg-gray-900 hover:text-white transition-colors">Back to Home</Link>
        </header>
        <div className="p-8 bg-white border border-gray-300 shadow-sm">
            <p className="text-lg text-gray-700">Editorial content coming soon.</p>
        </div>
    </div>
  );
}
