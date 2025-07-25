import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
