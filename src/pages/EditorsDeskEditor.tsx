import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function EditorsDeskEditor() {
    const [notice, setNotice] = useState('');
    const [showBanner, setShowBanner] = useState(false);
    const [bannerType, setBannerType] = useState('scrolling');
    const [bannerContentType, setBannerContentType] = useState('text');
    const [bannerContent, setBannerContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedNotice = localStorage.getItem('editorsDeskNotice');
        const savedBanner = localStorage.getItem('editorsDeskBanner');
        if (savedNotice) {
            setNotice(savedNotice);
        }
        if (savedBanner) {
            const parsedBanner = JSON.parse(savedBanner);
            setShowBanner(parsedBanner.enabled);
            setBannerType(parsedBanner.type);
            setBannerContentType(parsedBanner.contentType);
            setBannerContent(parsedBanner.content);
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem('editorsDeskNotice', notice);
        localStorage.setItem('editorsDeskBanner', JSON.stringify({
            enabled: showBanner,
            type: bannerType,
            contentType: bannerContentType,
            content: bannerContent
        }));
        alert('Updates saved!');
        navigate('/secretary-admin/dashboard');
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen text-gray-900 font-serif">
            <header className="mb-12 pb-6 border-b-4 border-gray-900 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter">Editor's Desk</h1>
                    <p className="text-gray-500 mt-2 italic">Update the homepage sidebar notice and banner.</p>
                </div>
                <Link to="/secretary-admin/dashboard" className="px-4 py-2 border border-gray-900 font-bold uppercase tracking-widest text-sm hover:bg-gray-900 hover:text-white transition-colors">Back to Dashboard</Link>
            </header>
            <div className="bg-white p-8 border border-gray-300 shadow-sm max-w-2xl space-y-8">
                <div>
                    <label className="block text-sm font-bold uppercase mb-2">Homepage Sidebar Notice</label>
                    <textarea
                        value={notice}
                        onChange={(e) => setNotice(e.target.value)}
                        className="w-full p-4 border border-gray-300 min-h-[150px]"
                        placeholder="Enter editor's notice..."
                    />
                </div>

                <div className="border-t pt-8">
                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                        <input type="checkbox" checked={showBanner} onChange={(e) => setShowBanner(e.target.checked)} />
                        <span className="font-bold uppercase tracking-widest">Enable Homepage Banner</span>
                    </label>

                    {showBanner && (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold uppercase mb-1">Banner Type</label>
                                <select value={bannerType} onChange={(e) => setBannerType(e.target.value)} className="w-full p-2 border border-gray-300">
                                    <option value="scrolling">Side Scrolling</option>
                                    <option value="fixed">Fixed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-1">Content Type</label>
                                <select value={bannerContentType} onChange={(e) => setBannerContentType(e.target.value)} className="w-full p-2 border border-gray-300">
                                    <option value="text">Text</option>
                                    <option value="image">Image (20:1 ratio required)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold uppercase mb-1">Banner Content ({bannerContentType})</label>
                                <textarea
                                    value={bannerContent}
                                    onChange={(e) => setBannerContent(e.target.value)}
                                    className="w-full p-2 border border-gray-300"
                                    placeholder={bannerContentType === 'text' ? 'Enter banner text...' : 'Enter image URL...'}
                                />
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleSave}
                    className="w-full px-6 py-3 bg-gray-900 text-white font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
