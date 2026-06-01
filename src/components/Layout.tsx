import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import ReadingProgressBar from './ReadingProgressBar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ReadingProgressBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
