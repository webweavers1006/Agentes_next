import { AppSidebar } from "@/components/layout/menu/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import HeaderSidebar from "@/components/layout/menu/header-sidebar";


export default function AppLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <SidebarInset>
        <HeaderSidebar />
        <div className="p-4">
          <div className="flex flex-col gap-4">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
