import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="p-4 flex justify-center items-center bg-background text-muted">
      <Link to="/secretary-admin" className="opacity-50 hover:opacity-100 transition-opacity">
        <Lock size={16} />
      </Link>
    </footer>
  );
}
