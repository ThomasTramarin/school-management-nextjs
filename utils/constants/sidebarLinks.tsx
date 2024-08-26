import { FaSchool } from "react-icons/fa6";

export type LinkType = {label: string, href: string, icon: JSX.Element}

export const adminLinks = [
    {label: "Schools", href: "/admin/schools", icon: <FaSchool size={24}/>}
]