import { FiBell, FiChevronDown } from 'react-icons/fi';

const navItems = [
  { label: 'Dashboard', active: false },
  { label: 'Transactions', active: false },
  { label: 'Reports', active: false },
  { label: 'Tax Harvesting', active: true },
];

function Header() {
  return (
    <header className="sticky top-0 z-30 bg-ink">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
            K
          </div>
          <span className="font-bold text-lg tracking-tight text-white">KoinX</span>
        </div>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? 'page' : undefined}
              className={`px-3 py-2 rounded-lg transition-colors ${
                item.active
                  ? 'text-white bg-white/10'
                  : 'text-[#9DA3B5] hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#9DA3B5] hover:text-white hover:bg-white/5 transition-colors"
          >
            <FiBell size={18} />
            <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-brand-400" />
          </button>
          <div className="w-px h-6 bg-white/10" />
          <button
            type="button"
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/5 transition-colors"
            aria-label="Account menu"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-white flex items-center justify-center text-xs font-semibold">
              AS
            </div>
            <FiChevronDown size={14} className="text-[#9DA3B5]" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
