import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { adminLinks } from "@/utils/constants/sidebarLinks";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <Topbar links={adminLinks}/>
      <main className="flex">
        <Sidebar links={adminLinks}/>

        <section className="main-container">
          {children}
        </section>
      </main>
    </div>
  );
}
