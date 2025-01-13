import { useState } from 'react';
import Topbar from '@/components/Topbar';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen h-full">
      <Topbar />

    </div>
  );
};

export default Header;