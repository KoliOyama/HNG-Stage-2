import { useTheme } from '@/context/ThemeContext';
import logo from '@/assets/illustrations/logo.svg';
import moon from '@/assets/illustrations/dark_mode.svg';
import sun from '@/assets/illustrations/light_mode.svg';
import pfp from '@/assets/images/koli_profile_pfp.jpg';

const Sidebar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="fixed top-0 left-0 z-50 flex items-center justify-between bg-surface-sidebar w-full h-[72px] md:h-[80px] lg:w-[103px] lg:h-screen lg:flex-col lg:rounded-r-[20px] transition-all duration-300">
            {/* Logo Section */}
            <div className="relative flex items-center justify-center bg-interactive-primary w-[72px] h-[72px] md:w-[80px] md:h-[80px] lg:w-full lg:h-[103px] rounded-r-[20px] overflow-hidden group cursor-pointer">
                {/* The "Lip" at the bottom of the logo */}
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-interactive-primary-light rounded-tl-[20px] transition-all duration-300 group-hover:h-full group-hover:rounded-none" />
                <img src={logo} alt="Invoice App Logo" className="relative z-10 w- h-7 md:w-8 md:h-8" />
            </div>

            {/* Actions Section (Theme Toggle + Profile) */}
            <div className="flex items-center lg:flex-col lg:w-full">
                {/* Theme Toggle */}
                <button 
                    onClick={toggleTheme}
                    className="flex items-center justify-center p-3 md:p-8 lg:p-0 lg:py-8 lg:w-full transition-all duration-300 hover:opacity-80"
                    aria-label="Toggle Theme"
                >
                    <img 
                        src={theme === 'dark' ? sun : moon} 
                        alt={theme === 'dark' ? "Light Mode" : "Dark Mode"} 
                        className="w-[20px] h-[20px]"
                    />
                </button>

                {/* Separator */}
                <div className="w-[1px] h-[72px] md:h-[80px] bg-[#494E6E] lg:w-full lg:h-[1px]" />

                {/* Profile Section */}
                <div className="flex items-center justify-center p-3 md:p-8 lg:p-0 lg:py-6 lg:w-full">
                    <img 
                        src={pfp} 
                        alt="User Profile" 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-transparent transition-all hover:border-interactive-primary cursor-pointer"
                    />
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
