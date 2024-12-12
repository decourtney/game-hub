import {
  NavbarContent,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
  Button,
  DropdownSection,
} from "@nextui-org/react";
import React from "react";
import ThemeSwitcherSkeleton from "./ThemeSwitcherSkeleton";
import { IoIosArrowDown } from "react-icons/io";
import { TiUpload } from "react-icons/ti";
import { FaHouseUser, FaGamepad } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import dynamic from "next/dynamic";


const ThemeSwitcher = dynamic(() => import("./ThemeSwitcher"), {
  ssr: false,
  loading: () => <ThemeSwitcherSkeleton />,
});

const UserPanelWidget = () => {
  const dropdownItemClasses = "";
  return (
    <NavbarContent justify="end">
      <div className="flex gap-5 group">
        <Avatar
          isBordered
          radius="full"
          as="button"
          color="success" // TODO: change color relative to loggedin/out
          name="Jason Hughes" // TODO: replace with user info
          className="h-auto"
          size="sm"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
        <div className="group-hover:underline">Username</div>
      </div>

      <Dropdown
        placement="bottom-end"
        className="py-2 px-2 rounded-lg bg-primary"
      >
        <DropdownTrigger>
          <Button isIconOnly color="default" variant="light">
            <div className="text-3xl">
              <IoIosArrowDown />
            </div>
          </Button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="color_mode" variant="light">
            <div className="absolute top-0 right-0 h-full z-10">
              <ThemeSwitcher />
            </div>
          </DropdownItem>
          <DropdownSection title="Explore" showDivider>
            <DropdownItem key="my_library" endContent={<FaGamepad />}>
              My Library
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Create" showDivider>
            <DropdownItem key="upload_game" endContent={<TiUpload />}>
              Upload Game
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Account" showDivider>
            <DropdownItem key="view_profile" endContent={<FaHouseUser />}>
              View Profile
            </DropdownItem>
            <DropdownItem key="logout" endContent={<BiLogOut />}>
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};

export default UserPanelWidget;
