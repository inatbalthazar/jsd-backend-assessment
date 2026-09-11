import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-3 bg-white border-b border-[#dadce0]">
      <Link
        to="/"
        className="text-xl font-semibold tracking-tight text-[#202124] hover:opacity-80 transition-opacity"
      >
        BACKEND <span className="text-[#5f6368] font-normal">ASSESSMENT</span>
      </Link>

      <div className="flex gap-1">
        <Link
          to="/"
          className="px-4 py-2 text-sm font-medium text-[#5f6368] rounded-full hover:bg-[#f1f3f4] transition-colors"
        >
          Home
        </Link>
        <Link
          to="/owner"
          className="px-4 py-2 text-sm font-medium text-[#5f6368] rounded-full hover:bg-[#f1f3f4] transition-colors"
        >
          Owner
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
