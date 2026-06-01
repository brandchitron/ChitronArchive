import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import AllPosts from './pages/AllPosts';
import NewPost from './pages/NewPost';
import AnalyticsPage from './pages/Analytics';
import EditorialPage from './pages/Editorial';
import ReportsPage from './pages/Reports';
import ArchivesPage from './pages/Archives';
import ArticleView from './pages/ArticleView';
import EditorsDeskEditor from './pages/EditorsDeskEditor';
import BlogHomepage from './pages/BlogHomepage';
import Layout from './components/Layout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlogHomepage />} />
        </Route>
        <Route path="/secretary-admin" element={<Login />} />
        <Route path="/secretary-admin/dashboard" element={<AllPosts />} />
        <Route path="/secretary-admin/dashboard/new" element={<NewPost />} />
        <Route path="/secretary-admin/dashboard/analytics" element={<AnalyticsPage />} />
        <Route path="/editorial" element={<EditorialPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/archives" element={<ArchivesPage />} />
        <Route path="/article/:id" element={<ArticleView />} />
        <Route path="/secretary-admin/dashboard/editors-desk" element={<EditorsDeskEditor />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
