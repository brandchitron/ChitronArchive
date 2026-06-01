import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, User, BookOpen, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

export default function BlogHomepage() {
  const [zoom, setZoom] = useState(1);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editorsDesk, setEditorsDesk] = useState('No active announcements at this moment.');
  const [banner, setBanner] = useState<{ enabled: boolean; type: string; contentType: string; content: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedNotice = localStorage.getItem('editorsDeskNotice');
    const savedBanner = localStorage.getItem('editorsDeskBanner');
    if (savedNotice) {
      setEditorsDesk(savedNotice);
    }
    if (savedBanner) {
        setBanner(JSON.parse(savedBanner));
    }
  }, []);

  const handleMenuClick = () => setIsMenuOpen(!isMenuOpen);
  const handleSearchClick = () => setIsSearchOpen(!isSearchOpen);
  const handleReloadClick = () => window.location.reload();
  const handleProfileClick = () => navigate('/secretary-admin');

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 font-serif ${isReadingMode ? 'p-0' : 'p-4 md:p-8'}`}>
      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center p-8">
            <div className="w-full max-w-2xl">
              <input type="text" placeholder="Search the archive..." className="w-full p-4 border-b-2 border-gray-900 bg-transparent text-4xl outline-none" autoFocus />
              <button onClick={() => setIsSearchOpen(false)} className="mt-4 text-sm underline text-gray-500">Close</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Swipe to open handle */}
      <motion.div
        className="fixed inset-y-16 left-0 w-8 z-40 cursor-pointer"
        drag="x"
        dragConstraints={{ left: 0, right: 100 }}
        dragElastic={0.1}
        onDragEnd={(_, info) => {
          if (info.offset.x > 50) {
            setIsMenuOpen(true);
          }
        }}
      />

      {/* Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="fixed inset-y-0 left-0 w-64 bg-white z-50 border-r border-gray-300 p-8 shadow-2xl">
            <h3 className="font-bold border-b border-gray-900 mb-6 pb-2 text-sm uppercase">Sections</h3>
            <ul className="space-y-4">
              <li><Link to="/editorial" onClick={() => setIsMenuOpen(false)} className="hover:underline">Editorial</Link></li>
              <li><Link to="/reports" onClick={() => setIsMenuOpen(false)} className="hover:underline">Reports</Link></li>
              <li><Link to="/archives" onClick={() => setIsMenuOpen(false)} className="hover:underline">Archives</Link></li>
            </ul>
            <button onClick={() => setIsMenuOpen(false)} className="mt-8 text-sm underline text-gray-500">Close</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Utility Bar */}
      <nav className="flex items-center justify-between py-2 border-b border-gray-300 text-sm text-gray-600 mb-4">
        <div className="flex gap-4">
            <button onClick={handleMenuClick}><Menu size={18} /></button>
            <button onClick={handleSearchClick}><Search size={18} /></button>
        </div>
        <div className="flex gap-4 items-center">
            <button onClick={() => setZoom(z => Math.max(0.75, z - 0.1))}><ZoomOut size={18} /></button>
            <button onClick={() => setZoom(z => Math.min(1.5, z + 0.1))}><ZoomIn size={18} /></button>
            <button onClick={() => setIsReadingMode(!isReadingMode)}><BookOpen size={18} /></button>
            <button onClick={handleReloadClick}><RefreshCcw size={18} /></button>
            <button onClick={handleProfileClick}><User size={18} /></button>
        </div>
      </nav>

      {/* Masthead */}
      <header className="text-center py-6 border-b-4 border-gray-900 mb-6">
        <p className="text-sm font-sans tracking-widest text-gray-500 uppercase">Sunday, June 1, 2026 | Edition 142 | Vol 4</p>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter my-4 uppercase">Chitron Archive</h1>
        <p className="text-lg italic text-gray-600">The digital chronicle of our times.</p>
      </header>
      
      {banner?.enabled && (
        <div className="mb-6 w-full overflow-hidden border-b-2 border-gray-900">
            {banner.contentType === 'text' ? (
                <div className={`p-4 bg-gray-900 text-white ${banner.type === 'scrolling' ? 'animate-marquee whitespace-nowrap' : 'text-center'}`}>
                    {banner.content}
                </div>
            ) : (
                <div className="aspect-[20/1] w-full">
                    <img src={banner.content} alt="Banner" className="w-full h-full object-cover" />
                </div>
            )}
        </div>
      )}

      {/* Main Newspaper Layout */}
      <main className="max-w-7xl mx-auto" style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Main Column */}
            <div className="md:col-span-3 border-r border-gray-200 pr-8">
                <article className="mb-12">
                    <h2 className="text-5xl font-bold mb-4 leading-tight">Welcome to the Archive</h2>
                    <p className="text-xl text-gray-700">The database is currently empty, awaiting new entries. Stay tuned for upcoming chronicle launches.</p>
                </article>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                    <p className="text-gray-500 italic">More sections coming soon...</p>
                </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-12">
                <div className="border p-4 bg-white shadow-sm">
                    <h3 className="font-bold border-b-2 border-gray-900 mb-4 pb-2 text-sm uppercase">Editor's Desk</h3>
                    <p className="text-sm leading-relaxed">{editorsDesk}</p>
                </div>
                <div className="border p-4 bg-white shadow-sm">
                    <h3 className="font-bold border-b-2 border-gray-900 mb-4 pb-2 text-sm uppercase">Trending</h3>
                    <p className="text-sm text-gray-400">Waiting for data...</p>
                </div>
            </aside>
        </div>
      </main>

      {/* Mini-pagination */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white p-2 rounded-full flex gap-4">
        <button><ChevronLeft size={20} /></button>
        <span className="text-sm">Page 1 of 1</span>
        <button><ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

