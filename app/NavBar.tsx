"use client";

import {
  Button,
  Form,
  Input,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useState, SVGProps } from "react";
import AuthStatus from "./components/AuthStatus";
import ActiveLink from "./components/ActiveLink";

export const BrandLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

interface SearchIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeWidth?: number;
  width?: number;
  height?: number;
}

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}: SearchIconProps) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      width={width || size}
      viewBox="0 0 24 24"
      role="presentation"
      strokeWidth={strokeWidth}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Browse", href: "/games" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Another Link", href: "/" },
  ];

  const handleClose = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      height={"3rem"}
      isBlurred={false}
      className="bg-content2 border-b-1 border-content3 shadow-md"
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />

        <NavbarBrand>
          <BrandLogo />
          <p className="font-bold">Jurble</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex px-5" justify="center">
        {navLinks.map((navItem) => (
          <NavbarItem key={`navbar-${navItem.label}`} className="h-full">
            <ActiveLink href={navItem.href!}>
              {({ isActive }) => (
                <div
                  className={`h-full px-1 content-center hover:shadow-[inset_0_-4px_0_hsl(var(--nextui-primary))] pointer-events-auto ${
                    isActive
                      ? "shadow-[inset_0_-4px_0_hsl(var(--nextui-primary))]"
                      : ""
                  }`}
                >
                  {navItem.label}
                </div>
              )}
            </ActiveLink>
          </NavbarItem>
        ))}

        <Form className="hidden lg:flex">
          <Input
            classNames={{
              base: "max-w-[10rem] md:max-w-full",
              mainWrapper: "h-full",
              input: "text-md",
              inputWrapper: "h-full font-normal bg-content4 text-content1/50",
            }}
            placeholder="Type to search..."
            size="md"
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </Form>
      </NavbarContent>

      <AuthStatus />

      <NavbarMenu>
        {navLinks.map((navItem) => (
          <NavbarMenuItem key={`navbarmenu-${navItem.label}`}>
            <Link href={navItem.href} onPress={handleClose}>
              {navItem.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavBar;
