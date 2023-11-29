import Link from "next/link";
import { MdSurroundSound } from "react-icons/md";
import { useState } from "react";
import {
  HiBookmark,
  HiCog,
  HiHome,
  HiOutlineCollection,
  HiOutlineHeart,
  HiOutlineKey,
  HiOutlinePlus,
  HiSearch,
} from "react-icons/hi";
import { PiQueue } from "react-icons/pi";

import { HoverBgColor } from "../pages";
export function Sidebar() {
  const Pages = [
    { name: "Home", link: "/", icon: <HiHome /> },
    { name: "Discover", link: "/search", icon: <HiSearch /> },
    {
      name: "Your Library",
      link: "/library",
      icon: <HiOutlineCollection />,
    },
    { name: "Liked Songs", link: "/liked", icon: <HiOutlineHeart /> },
    {
      name: "Create Playlist",
      link: "/playlists",
      icon: <HiOutlinePlus />,
    },
    {
      name: "Queue",
      link: "/playing",
      icon: <PiQueue />,
    },
    // {
    //   id: 6,
    //   name: "Saved Playlists",
    //   link: "/saved",
    //   icon: <HiBookmark />,
    // },
  ];
  const BottomPages = [
    { name: "Settings", link: "/profile", icon: <HiCog /> },
    {
      name: "Sign in", //TODO
      link: "/api/auth/signin",
      icon: <HiOutlineKey />,
    },
  ];

  const [selected, setSelected] = useState("Home");
  return (
    <nav className="flex h-full w-48 flex-col justify-between gap-2   border-r-[1px] border-gray-600 bg-gray-900 p-3">
      <ul className="flex flex-col  items-start justify-start ">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl  capitalize text-gray-100"
        >
          <MdSurroundSound className="text-4xl " />
          Smart Cast
        </Link>
        {Pages.map((page) => (
          <Link
            key={page.name}
            href={page.link}
            className={"flex items-center gap-1 text-xs capitalize "}
            onClick={() => setSelected(page.name)}
          >
            <HoverBgColor isSelected={selected === page.name}>
              {page.icon}
              {page.name}
            </HoverBgColor>
          </Link>
        ))}
      </ul>
      <ul className="flex justify-between ">
        {BottomPages.map((page) => (
          <Link
            key={page.name}
            href={page.link}
            className={
              "flex items-center justify-center gap-1 text-xs capitalize"
            }
            onClick={() => setSelected(page.name)}
          >
            <HoverBgColor isSelected={selected === page.name}>
              {page.icon}
              {page.name}
            </HoverBgColor>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
