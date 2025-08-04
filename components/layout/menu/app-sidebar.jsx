"use client"
import * as React from "react"

import { NavMain } from "@/components/layout/menu/nav-main"
import { NavUser } from "@/components/layout/menu/nav-user"
import { TeamSwitcher } from "@/components/layout/menu/team-switcher"
import { sidebarData } from "@/lib/data/sidebar-data";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({
  data,
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} name={sidebarData.appInfo.name} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
