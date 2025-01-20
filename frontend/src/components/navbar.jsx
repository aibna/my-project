import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogIn, User, LogOut, MenuIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { signOut } from "@/utils/auth";
import { MdDocumentScanner } from "react-icons/md";

export function NavbarComponent() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-background shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 font-bold text-3xl">
              <Link to="/" className="text-foreground">
                Medi<span className="text-primary">AI</span>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex items-center sm:space-x-8">
            {user?.user_metadata?.role === "doctor" && (
              <>
                <NavLink to="/patient-data">View Patient Data</NavLink>
                <NavLink to="/manage-appointments">Manage Appointments</NavLink>
              </>
            )}
            {user?.user_metadata?.role === "patient" && (
              <>
                <NavLink to="/appointments">Your Appointments</NavLink>
                <NavLink to="/health-insights">Health Insights</NavLink>
              </>
            )}
          </div>
          <div className="flex items-center min-w-[99.47px] justify-end">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.user_metadata.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem
                    className="flex items-center cursor-pointer"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  {user?.user_metadata?.role === "patient" && (
                    <DropdownMenuItem
                      className="flex items-center cursor-pointer"
                      onClick={() => navigate("/reports")}
                    >
                      <MdDocumentScanner className="mr-2 h-4 w-4" />
                      Saved Reports
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex items-center cursor-pointer text-red-600"
                    onSelect={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                className="flex items-center"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            )}
            <div className="block md:hidden ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <MenuIcon></MenuIcon>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuSeparator />
                  {user?.user_metadata?.role === "doctor" && (
                    <>
                      <DropdownMenuItem className="flex items-center">
                        <NavLink to="/patient-data" className="w-full">
                          View Patient Data
                        </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center">
                        <NavLink to="/manage-appointments" className="w-full">
                          Manage Appointments
                        </NavLink>
                      </DropdownMenuItem>
                    </>
                  )}
                  {user?.user_metadata?.role === "patient" && (
                    <>
                      <DropdownMenuItem className="flex items-center">
                        <NavLink to="/appointments" className="w-full">
                          Appointments
                        </NavLink>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="flex items-center">
                        <NavLink to="/health-insights" className="w-full">
                          Health Insights
                        </NavLink>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-1 pt-1 text-sm font-medium text-foreground hover:text-primary border-b-2 border-transparent hover:border-primary"
    >
      {children}
    </Link>
  );
}
