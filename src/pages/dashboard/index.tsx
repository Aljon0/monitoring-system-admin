import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate, Outlet } from "react-router";
import useAuth from "@/context/use-auth";
import { useEffect } from "react";
import { useFetchUser } from "@/hooks/users";
import { User } from "firebase/auth";

function DashboardLayout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const userStorage = localStorage.getItem("user");
  const userObj: User = userStorage ? JSON.parse(userStorage) : null;

  const { data: userData } = useFetchUser(userObj.uid);

  useEffect(() => {
    if (!userData) {
      navigate("/client");
    }
  }, [navigate, userData]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
export default DashboardLayout;
