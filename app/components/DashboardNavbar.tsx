"use client";

import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  ButtonGroup,
} from "@heroui/react";
import Link from "next/link";

interface NavLink {
  label: string;
  href?: string;
  subLinks?: { label: string; href: string }[];
}

const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  {
    label: "Settings",
    subLinks: [
      { label: "Profile", href: "/settings/profile" },
      { label: "Account", href: "/settings/account" },
    ],
  },
  { label: "Logout", href: "/logout" },
];

export default function DashboardNavbar() {
  return (
    <Navbar className="text-foreground">
      <NavbarContent className="">
        {navLinks.map((navItem) =>
          navItem.subLinks ? (
            <ButtonGroup key={navItem.label}>
              {navItem.label}
              <Dropdown className="rounded-sm">
                <DropdownTrigger>
                  <Button
                    radius="none"
                    className="capitalize bg-foreground hover:bg-content2"
                  >
                    ICON
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="p-0.5">
                  {navItem.subLinks.map((subLink) => (
                    <DropdownItem
                      key={subLink.label}
                      className="rounded-none bg-background"
                    >
                      <Link href={subLink.href} className="w-full block">
                        {subLink.label}
                      </Link>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </ButtonGroup>
          ) : (
            <NavbarItem
              key={navItem.label}
              className=" group  hover:bg-content2 pointer-events-none"
            >
              <Link
                href={navItem.href!}
                className="group-hover:text-primary pointer-events-auto"
              >
                {navItem.label}
              </Link>
            </NavbarItem>
          )
        )}
      </NavbarContent>
    </Navbar>
  );
}
