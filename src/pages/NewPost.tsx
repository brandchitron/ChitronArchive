import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Save, Send, Eye, Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function NewPost() {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('id');

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [isSlugEdited, setIsSlugEdited] = useState(false);
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [availableCategories] = useState(['News', 'Editorial', 'Archives', 'Reports']);
  const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [publishDate, setPublishDate] = useState('');
  const [tags, setTags] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [showSEO, setShowSEO] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const navigate = useNavigate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [toolbar, setToolbar] = useState({ visible: false, x: 0, y: 0 });

  const formatText = (marker: string, wrap: string = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = content;
    const selected = text.substring(start, end);
    const formatted = `${text.substring(0, start)}${marker}${wrap}${selected}${wrap}${marker}${text.substring(end)}`;
    setContent(formatted);
    textarea.focus();
    setToolbar({ ...toolbar, visible: false });
  };

  const handleSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    if (textarea.selectionStart !== textarea.selectionEnd) {
      setToolbar({ visible: true, x: 50, y: 100 }); // Simplified positioning for now
    } else {
      setToolbar({ ...toolbar, visible: false });
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setIsDirty(true);
    if (!isSlugEdited) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsDirty(true);
    setIsSlugEdited(true);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsDirty(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!title) newErrors.title = 'Title is required';
    if (!slug) newErrors.slug = 'Slug is required';
    if (!content) newErrors.content = 'Content is required';
    if (!category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = () => {
    if (validate()) {
      setIsConfirmDialogVisible(true);
    }
  };

  const confirmPublish = () => {
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    console.log('Publishing:', { title, subtitle, slug, content, category, publishDate, tags: tagArray });
    setErrors({});
    setIsConfirmDialogVisible(false);
    setIsPublished(true);
    setIsDirty(false); // Reset dirty state
    setTimeout(() => setIsPublished(false), 3000);
  };

  const handleSaveDraft = () => {
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const draft = { title, subtitle, slug, content, category, publishDate, tags: tagArray, metaTitle, metaDescription };
    localStorage.setItem('articleDraft', JSON.stringify(draft));
    setShowSavedToast(true);
    setIsDirty(false);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSaveDraft();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handlePublish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveDraft, tags, title, subtitle, slug, content, category, publishDate, metaTitle, metaDescription, validate]);

  const inputClass = (field: string) => `w-full p-3 bg-gray-100 border rounded-none text-gray-900 ${errors[field] ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-gray-900 font-serif">
      <header className="mb-12 pb-6 border-b-4 border-gray-900">
        <h1 className="text-5xl font-black uppercase tracking-tighter text-gray-900">New Post</h1>
        <p className="text-gray-500 mt-2 italic">Create a new article.</p>
      </header>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 border border-gray-300 shadow-sm max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Title</label>
                <input type="text" value={title} onChange={handleTitleChange} className={inputClass('title')} placeholder="Enter article headline..." />
                {errors.title && <p className="text-red-700 text-xs mt-1 italic">{errors.title}</p>}
            </div>
            
            <div className="md:col-span-2">
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Article URL Slug</label>
                <input type="text" value={slug} onChange={handleSlugChange} className={inputClass('slug')} placeholder="e.g. project-alpha-launch" />
                {errors.slug && <p className="text-red-700 text-xs mt-1 italic">{errors.slug}</p>}
            </div>
            
            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
                {!isCreatingNewCategory ? (
                    <select
                        value={category}
                        onChange={(e) => {
                            if (e.target.value === 'NEW') {
                                setIsCreatingNewCategory(true);
                                setCategory('');
                            } else {
                                setCategory(e.target.value);
                            }
                        }}
                        className={inputClass('category')}
                    >
                        <option value="">Select Category...</option>
                        {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        <option value="NEW">+ Create New Category...</option>
                    </select>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => {
                                setNewCategoryName(e.target.value);
                                setCategory(e.target.value);
                            }}
                            className={inputClass('category')}
                            placeholder="Enter new category..."
                        />
                        <button type="button" onClick={() => { setIsCreatingNewCategory(false); setCategory(''); setNewCategoryName(''); }} className="text-sm underline text-gray-500">Cancel</button>
                    </div>
                )}
                {errors.category && <p className="text-red-700 text-xs mt-1 italic">{errors.category}</p>}
            </div>

            <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Publish Date</label>
                <input type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} className={inputClass('publishDate')} />
            </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold uppercase tracking-widest text-gray-500">Content</label>
            <button type="button" onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 text-xs text-gray-900 hover:text-gray-700 font-bold uppercase underline">
               <Eye size={14} /> {showPreview ? 'Switch to Editor' : 'Switch to Preview'}
            </button>
          </div>
          {showPreview ? (
            <div className="w-full p-6 bg-gray-100 border border-gray-300 text-gray-900 min-h-[200px] prose overflow-y-auto">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <div className="relative">
              {toolbar.visible && (
                <div className="absolute bg-gray-900 text-white p-2 rounded shadow-lg flex gap-2 z-10" style={{ left: `${toolbar.x}px`, top: `${toolbar.y}px` }}>
                  <button onClick={() => formatText('**', '**')}><Bold size={16} /></button>
                  <button onClick={() => formatText('*', '*')}><Italic size={16} /></button>
                  <button onClick={() => formatText('<u>', '</u>')}><Underline size={16} /></button>
                  <button onClick={() => formatText('==', '==')}><span className="text-xs">Mark</span></button>
                  <button onClick={() => formatText('- ', '')}><List size={16} /></button>
                  <button onClick={() => formatText('1. ', '')}><ListOrdered size={16} /></button>
                  <button onClick={() => console.log('Align Left')}><AlignLeft size={16} /></button>
                  <button onClick={() => console.log('Align Center')}><AlignCenter size={16} /></button>
                  <button onClick={() => console.log('Align Right')}><AlignRight size={16} /></button>
                  <button onClick={() => console.log('Align Justify')}><AlignJustify size={16} /></button>
                </div>
              )}
              <textarea 
                ref={textareaRef}
                value={content} 
                onChange={handleContentChange} 
                onSelect={handleSelect}
                rows={8} 
                className={inputClass('content')} 
                placeholder="Write your masterpiece..." 
              />
            </div>
          )}
          <p className="text-right text-xs text-gray-500 mt-1 italic">
            {content.trim().split(/\s+/).filter(Boolean).length} words | {content.length} characters
          </p>
          {errors.content && <p className="text-red-700 text-xs mt-1 italic">{errors.content}</p>}
        </div>
        
        <div className="mb-6">
          <button type="button" onClick={() => setShowSEO(!showSEO)} className="text-sm font-bold text-gray-900 flex items-center gap-2 underline uppercase tracking-widest">
            {showSEO ? 'Hide' : 'Show'} SEO Settings
          </button>
          {showSEO && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="mt-4 space-y-4 p-4 bg-gray-100 border border-gray-300">
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Meta Title</label>
                <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className={inputClass('metaTitle')} maxLength={60} />
                <p className="text-right text-xs text-gray-500 mt-1 italic">{metaTitle.length}/60</p>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Meta Description</label>
                <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className={inputClass('metaDescription')} maxLength={160} rows={3} />
                <p className="text-right text-xs text-gray-500 mt-1 italic">{metaDescription.length}/160</p>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="mb-8">
          <label className="block text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">Cover Image</label>
          <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gray-100 border-gray-300 border-dashed border-2 cursor-pointer hover:border-gray-900 transition-colors">
            <Upload className="text-gray-500" />
            <span className="text-gray-500 text-sm font-bold uppercase underline">Click to upload cover image</span>
          </div>
        </div>

        <div className="flex gap-4">
            <button type="button" onClick={handleSaveDraft} className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-100 hover:bg-gray-200 transition-all font-bold uppercase tracking-widest text-sm border border-gray-300">
            <Save size={16} /> Save Draft
            </button>
            <button type="button" onClick={handlePublish} className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-900 text-white hover:bg-gray-800 transition-all font-bold uppercase tracking-widest text-sm">
            <Send size={16} /> Publish Article
            </button>
        </div>
        {showSavedToast && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="fixed bottom-8 right-8 bg-gray-900 text-white p-4 shadow-lg z-50">
            Draft auto-saved!
          </motion.div>
        )}
        {isConfirmDialogVisible && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 border border-gray-300 max-w-sm w-full">
              <h3 className="text-xl font-black mb-4 uppercase">Are you sure?</h3>
              <p className="text-gray-600 mb-6 italic">This will publish the article "<strong>{title}</strong>".</p>
              <div className="flex gap-4">
                <button onClick={() => setIsConfirmDialogVisible(false)} className="flex-1 p-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 font-bold uppercase text-sm">Cancel</button>
                <button onClick={confirmPublish} className="flex-1 p-3 bg-gray-900 text-white hover:bg-gray-800 font-bold uppercase text-sm">Publish!</button>
              </div>
            </motion.div>
          </div>
        )}
        {isPublished && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="fixed inset-0 bg-gray-900 flex items-center justify-center z-50 p-4">
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Article Published!</h2>
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}
