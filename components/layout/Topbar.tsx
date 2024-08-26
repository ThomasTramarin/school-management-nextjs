
import { LinkType } from "@/utils/constants/sidebarLinks";
import MenuBtn from "./MenuBtn";
import MobileMenu from "./MobileMenu";
import UserProfile from "./UserProfile";

export default function Topbar({links}: {links: LinkType[]}) {
  return (
    <section className="h-16 bg-secondary-bg flex relative border-b-2 border-[#191c22]">
      <div className="font-bold text-lg mb-5 md:w-60 h-full md:flex md:items-center md:justify-center w-0 hidden">
        SchoolMagangement
      </div>
      <div className="w-full md:w-[calc(100%-240px)] flex items-center justify-between px-4">
        <MenuBtn />
        <UserProfile />
      </div>


      <MobileMenu links={links}/>
    </section>
  );
}
