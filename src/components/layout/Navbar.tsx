
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-200 bg-gradient-to-r from-web3-primary/5 to-web3-secondary/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="MetaHire Logo" 
            className="h-8 w-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              console.log("Failed to load logo");
            }}
          />
          <span className="font-bold text-xl bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
            MetaHire
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm ${
              isActive("/")
                ? "font-medium text-web3-primary"
                : "text-gray-600 hover:text-web3-primary transition-colors"
            }`}
          >
            Home
          </Link>
          <Link
            to="/jobs"
            className={`text-sm ${
              isActive("/jobs")
                ? "font-medium text-web3-primary"
                : "text-gray-600 hover:text-web3-primary transition-colors"
            }`}
          >
            Find Jobs
          </Link>
          {user && (
            <Link
              to="/post-job"
              className={`text-sm ${
                isActive("/post-job")
                  ? "font-medium text-web3-primary"
                  : "text-gray-600 hover:text-web3-primary transition-colors"
              }`}
            >
              Post a Job
            </Link>
          )}
          {user && (
            <Link
              to="/dashboard"
              className={`text-sm ${
                isActive("/dashboard")
                  ? "font-medium text-web3-primary"
                  : "text-gray-600 hover:text-web3-primary transition-colors"
              }`}
            >
              Dashboard
            </Link>
          )}
          <div className="ml-4">
            {user ? (
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 border-web3-primary/20 hover:bg-web3-primary/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <Button 
                size="sm" 
                asChild
                className="bg-web3-primary hover:bg-web3-dark shadow-md hover:shadow-lg transition-all"
              >
                <Link to="/auth" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center py-4 border-b">
                  <Link 
                    to="/"
                    className="flex items-center gap-2"
                    onClick={closeMenu}
                  >
                    <img 
                      src="/logo.png" 
                      alt="MetaHire Logo" 
                      className="h-6 w-auto"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        console.log("Failed to load logo");
                      }}
                    />
                    <span className="font-bold text-xl bg-gradient-to-r from-web3-primary to-web3-secondary bg-clip-text text-transparent">
                      MetaHire
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={closeMenu}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <div className="py-4 flex-1">
                  <nav className="flex flex-col gap-4">
                    <Link
                      to="/"
                      className={`px-2 py-2 rounded-md ${
                        isActive("/")
                          ? "font-medium text-web3-primary bg-web3-primary/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                    <Link
                      to="/jobs"
                      className={`px-2 py-2 rounded-md ${
                        isActive("/jobs")
                          ? "font-medium text-web3-primary bg-web3-primary/5"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={closeMenu}
                    >
                      Find Jobs
                    </Link>
                    {user && (
                      <>
                        <Link
                          to="/post-job"
                          className={`px-2 py-2 rounded-md ${
                            isActive("/post-job")
                              ? "font-medium text-web3-primary bg-web3-primary/5"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                          onClick={closeMenu}
                        >
                          Post a Job
                        </Link>
                        <Link
                          to="/dashboard"
                          className={`px-2 py-2 rounded-md ${
                            isActive("/dashboard")
                              ? "font-medium text-web3-primary bg-web3-primary/5"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                          }`}
                          onClick={closeMenu}
                        >
                          Dashboard
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
                <div className="py-4 border-t">
                  {user ? (
                    <div className="space-y-3">
                      <div className="px-2 flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-2" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <Button 
                        className="w-full bg-web3-primary hover:bg-web3-dark"
                        onClick={() => { handleSignOut(); closeMenu(); }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-web3-primary hover:bg-web3-dark"
                        asChild
                      >
                        <Link to="/auth" onClick={closeMenu}>
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
