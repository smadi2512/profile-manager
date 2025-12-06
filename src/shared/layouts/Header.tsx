import { NavLink } from "react-router-dom";
import {
  UserPlusIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/features/theme";
import { memo } from "react";
import logo from "@/assets/logo.png";

function Header() {
  return (
    <header className="bg-pm-primary text-pm-primary-foreground shadow-lg sticky top-0 z-50 border-b border-pm-border/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="text-xl font-bold tracking-tight">
            <NavLink
              to="/"
              className="hover:opacity-80 transition-opacity duration-200 flex items-center gap-2"
            >
              <img src={logo} alt="Profile Manager Logo" className="w-8 h-8" />
              <span className="hidden sm:inline">Profile Manager</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <ul className="desktop-nav hidden md:flex space-x-4 lg:space-x-6 items-center text-sm font-medium">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-pm-primary-foreground/20 text-pm-primary-foreground font-semibold shadow-inner"
                      : "text-pm-primary-foreground/90 hover:text-pm-primary-foreground hover:bg-pm-primary-foreground/10"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profiles"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-pm-primary-foreground/20 text-pm-primary-foreground font-semibold shadow-inner"
                      : "text-pm-primary-foreground/90 hover:text-pm-primary-foreground hover:bg-pm-primary-foreground/10"
                  }`
                }
              >
                Profiles
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profiles/addProfile"
                className="bg-pm-accent text-pm-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-pm-accent/90 hover:scale-105 transition-all duration-200 shadow-md font-medium"
              >
                <UserPlusIcon className="h-4 w-4" />
                Add Profile
              </NavLink>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <input type="checkbox" id="mobile-menu" className="hidden peer" />

            {/* Hamburger Button */}
            <label
              htmlFor="mobile-menu"
              className="mobile-menu-btn p-2 rounded-lg bg-pm-primary-foreground/10 hover:bg-pm-primary-foreground/20 transition-all duration-200 cursor-pointer"
            >
              <Bars3Icon className="h-6 w-6 text-pm-primary-foreground" />
            </label>

            {/* Overlay */}
            <label
              htmlFor="mobile-menu"
              className="mobile-overlay fixed inset-0 bg-black/40 backdrop-blur-sm z-40 hidden peer-checked:block md:hidden cursor-pointer animate-pm-fade-in"
            ></label>

            {/* Mobile Menu Content */}
            <ul className="mobile-nav-content fixed top-0 right-0 h-full w-80 bg-pm-card text-pm-foreground shadow-2xl z-50 transform translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-out md:hidden flex flex-col">
              {/* Header with Close Button */}
              <li className="border-b border-pm-border/50 bg-pm-primary text-pm-primary-foreground p-4 flex justify-between items-center">
                <span className="font-semibold text-lg">Menu</span>
                <label
                  htmlFor="mobile-menu"
                  className="p-2 rounded-lg hover:bg-pm-primary-foreground/20 cursor-pointer transition-colors"
                >
                  <XMarkIcon className="h-5 w-5" />
                </label>
              </li>

              {/* Navigation Items */}
              <li className="border-b border-pm-border/30">
                <NavLink
                  to="/"
                  end
                  onClick={() =>
                    document.getElementById("mobile-menu")?.click()
                  }
                  className={({ isActive }) =>
                    `block px-6 py-4 text-base font-medium transition-all duration-200 border-l-4 ${
                      isActive
                        ? "bg-pm-primary/10 text-pm-primary border-pm-primary font-semibold"
                        : "border-transparent hover:bg-pm-background hover:border-pm-muted/50"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li className="border-b border-pm-border/30">
                <NavLink
                  to="/profiles"
                  onClick={() =>
                    document.getElementById("mobile-menu")?.click()
                  }
                  className={({ isActive }) =>
                    `block px-6 py-4 text-base font-medium transition-all duration-200 border-l-4 ${
                      isActive
                        ? "bg-pm-primary/10 text-pm-primary border-pm-primary font-semibold"
                        : "border-transparent hover:bg-pm-background hover:border-pm-muted/50"
                    }`
                  }
                >
                  Profiles
                </NavLink>
              </li>

              <li className="border-b border-pm-border/30">
                <NavLink
                  to="/profiles/addProfile"
                  onClick={() =>
                    document.getElementById("mobile-menu")?.click()
                  }
                  className="block px-6 py-4 text-base font-medium bg-pm-primary text-pm-primary-foreground hover:bg-pm-primary/90 transition-all duration-200 border-l-4 border-pm-primary"
                >
                  <span className="flex items-center gap-3">
                    <UserPlusIcon className="h-5 w-5" />
                    Add New Profile
                  </span>
                </NavLink>
              </li>

              {/* Theme Toggle Section */}
              <li className="border-b border-pm-border/30">
                <div className="px-6 py-4 flex items-center justify-between">
                  <span className="text-base font-medium">Theme</span>
                  <ThemeToggle />
                </div>
              </li>

              {/* Spacer to push content up */}
              <li className="grow"></li>

              {/* Footer */}
              <li className="border-t border-pm-border/50 p-4 bg-pm-background/50">
                <div className="text-center text-pm-muted text-sm">
                  Profile Manager v1.0
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default memo(Header);
