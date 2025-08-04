import {
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
} from "lucide-react";

export const sidebarData = {
  appInfo :{
    name: "Generico"
  },
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Generico",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    }
  ],
 navMain: [
    {
      title: "Inicio",
      url: "/home",
      icon: SquareTerminal,
      key: 'home'
    },
  ],
  projects: [
    { name: "Design Engineering", url: "#", icon: Frame },
    { name: "Sales & Marketing", url: "#", icon: PieChart },
    { name: "Travel", url: "#", icon: Map },
  ],
};
