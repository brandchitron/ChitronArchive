import AnalyticsDashboard from '../components/AnalyticsDashboard';
import { Link } from 'react-router-dom';

export default function AnalyticsPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 font-serif">
        <header className="mb-12 pb-6 border-b-4 border-gray-900 flex justify-between items-end">
            <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter">Analytics</h1>
                <p className="text-gray-500 mt-2 italic">Performance overview.</p>
            </div>
            <Link to="/secretary-admin/dashboard" className="px-4 py-2 border border-gray-900 font-bold uppercase tracking-widest text-sm hover:bg-gray-900 hover:text-white transition-colors">Back to Posts</Link>
        </header>
        <AnalyticsDashboard />
    </div>
  );
}
