import { FC } from 'react';
import Topbar from '@/components/Topbar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
const supabase = createClientComponentClient();

const Footer: FC = () => {
  return (
    <footer className="bg-gray-100 p-4 text-center">
      <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} Your Company Name</p>
    </footer>
  );
};
export default Footer;