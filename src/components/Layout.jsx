import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';

const Layout = () => {
    return (
        <div className="min-h-screen bg-surface-default transition-colors duration-300">
            <Sidebar />

            {/* Main Content Area */}
            <main className="pt-[72px] md:pt-[80px] lg:pt-0 lg:pl-[103px]">
                <div className="w-full max-w-[730px] mx-auto px-3 sm:px-6 lg:px-0 py-8 md:py-14 lg:py-18">
                    {/* Page content will be rendered here */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default Layout;
