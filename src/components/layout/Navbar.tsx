
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, LogIn, LogOut, User, ChevronDown, Zap, Briefcase } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const navbarClasses = isScrolled
    ? "fixed top-0 left-0 right-0 bg-black/50 backdrop-blur-xl border-b border-white/10 shadow-lg z-50 transition-all duration-300"
    : "absolute top-0 left-0 right-0 bg-transparent z-50 transition-all duration-300";

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 8px rgba(124, 58, 237, 0.5)",
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98
    }
  };

  const navItemVariants = {
    hover: {
      y: -2,
      transition: { duration: 0.2 }
    }
  };

  return (
    <header className={navbarClasses}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg p-1.5 relative z-10 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.7)]">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
            </div>
            <span className="font-display text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              MetaHire
            </span>
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link
              to="/"
              className={`text-sm relative ${
                isActive("/")
                  ? "font-medium text-white"
                  : "text-white/70 hover:text-white transition-colors"
              }`}
            >
              {isActive("/") && (
                <motion.span 
                  layoutId="navIndicator" 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-web3-primary to-web3-secondary"
                />
              )}
              Home
            </Link>
          </motion.div>
          
          <motion.div variants={navItemVariants} whileHover="hover">
            <Link
              to="/jobs"
              className={`text-sm relative ${
                isActive("/jobs")
                  ? "font-medium text-white"
                  : "text-white/70 hover:text-white transition-colors"
              }`}
            >
              {isActive("/jobs") && (
                <motion.span 
                  layoutId="navIndicator" 
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-web3-primary to-web3-secondary"
                />
              )}
              Find Jobs
            </Link>
          </motion.div>
          
          {user && (
            <motion.div variants={navItemVariants} whileHover="hover">
              <Link
                to="/post-job"
                className={`text-sm relative ${
                  isActive("/post-job")
                    ? "font-medium text-white"
                    : "text-white/70 hover:text-white transition-colors"
                }`}
              >
                {isActive("/post-job") && (
                  <motion.span 
                    layoutId="navIndicator" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-web3-primary to-web3-secondary"
                  />
                )}
                Post a Job
              </Link>
            </motion.div>
          )}
          
          {user && (
            <motion.div variants={navItemVariants} whileHover="hover">
              <Link
                to="/dashboard"
                className={`text-sm relative ${
                  isActive("/dashboard")
                    ? "font-medium text-white"
                    : "text-white/70 hover:text-white transition-colors"
                }`}
              >
                {isActive("/dashboard") && (
                  <motion.span 
                    layoutId="navIndicator" 
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-web3-primary to-web3-secondary"
                  />
                )}
                Dashboard
              </Link>
            </motion.div>
          )}
          
          <div className="ml-4 flex items-center">
            {user ? (
              <div className="flex items-center gap-4">
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-2 border-white/20 bg-white/5 text-white hover:bg-white/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </Button>
                </motion.div>
              </div>
            ) : (
              <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                <Button 
                  size="sm" 
                  asChild
                  className="bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90 text-white shadow-[0_2px_10px_rgba(124,58,237,0.3)]"
                >
                  <Link to="/auth" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
              </motion.div>
            )}
          </div>
        </motion.nav>

        {/* Mobile navigation */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:hidden"
        >
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px] border-l border-white/10 bg-black/95 backdrop-blur-xl text-white p-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                  <Link 
                    to="/"
                    className="flex items-center gap-2"
                    onClick={closeMenu}
                  >
                    <div className="bg-gradient-to-r from-web3-primary to-web3-secondary rounded-lg p-1.5">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-display text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                      MetaHire
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={closeMenu} className="text-white/70 hover:text-white">
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <div className="py-8 px-4 flex-1">
                  <nav className="flex flex-col gap-6">
                    <Link
                      to="/"
                      className={`px-2 py-2 rounded-md flex items-center ${
                        isActive("/")
                          ? "font-medium text-white bg-white/10"
                          : "text-white/70 hover:text-white"
                      }`}
                      onClick={closeMenu}
                    >
                      <span className="mr-3 h-8 w-8 rounded-md inline-flex items-center justify-center bg-gradient-to-r from-web3-primary/20 to-web3-secondary/20">
                        <Zap className="h-4 w-4 text-white" />
                      </span>
                      Home
                    </Link>
                    <Link
                      to="/jobs"
                      className={`px-2 py-2 rounded-md flex items-center ${
                        isActive("/jobs")
                          ? "font-medium text-white bg-white/10"
                          : "text-white/70 hover:text-white"
                      }`}
                      onClick={closeMenu}
                    >
                      <span className="mr-3 h-8 w-8 rounded-md inline-flex items-center justify-center bg-gradient-to-r from-web3-primary/20 to-web3-secondary/20">
                        <Briefcase className="h-4 w-4 text-white" />
                      </span>
                      Find Jobs
                    </Link>
                    {user && (
                      <>
                        <Link
                          to="/post-job"
                          className={`px-2 py-2 rounded-md flex items-center ${
                            isActive("/post-job")
                              ? "font-medium text-white bg-white/10"
                              : "text-white/70 hover:text-white"
                          }`}
                          onClick={closeMenu}
                        >
                          <span className="mr-3 h-8 w-8 rounded-md inline-flex items-center justify-center bg-gradient-to-r from-web3-primary/20 to-web3-secondary/20">
                            <ChevronDown className="h-4 w-4 text-white" />
                          </span>
                          Post a Job
                        </Link>
                        <Link
                          to="/dashboard"
                          className={`px-2 py-2 rounded-md flex items-center ${
                            isActive("/dashboard")
                              ? "font-medium text-white bg-white/10"
                              : "text-white/70 hover:text-white"
                          }`}
                          onClick={closeMenu}
                        >
                          <span className="mr-3 h-8 w-8 rounded-md inline-flex items-center justify-center bg-gradient-to-r from-web3-primary/20 to-web3-secondary/20">
                            <User className="h-4 w-4 text-white" />
                          </span>
                          Dashboard
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
                <div className="p-4 border-t border-white/10">
                  {user ? (
                    <div className="space-y-3">
                      <div className="px-2 flex items-center text-sm text-white/50">
                        <User className="h-4 w-4 mr-2" />
                        <span className="truncate">{user.email}</span>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90"
                        onClick={() => { handleSignOut(); closeMenu(); }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-web3-primary to-web3-secondary hover:from-web3-primary/90 hover:to-web3-secondary/90"
                        asChild
                      >
                        <Link to="/auth" onClick={closeMenu}>
                          <LogIn className="h-4 w-4 mr-2" />
                          Sign In
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-white/20 text-white hover:bg-white/10"
                        asChild
                      >
                        <Link to="/auth?tab=signup" onClick={closeMenu}>
                          <User className="h-4 w-4 mr-2" />
                          Create Account
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </motion.div>
      </div>
    </header>
  );
};

export default Navbar;
