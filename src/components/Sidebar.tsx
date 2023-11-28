import Link from "next/link";
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
import { HoverBgColor } from "../pages";
export function Sidebar() {
  const Pages = [
    { id: 1, name: "Home", link: "/", icon: <HiHome /> },
    { id: 2, name: "Search", link: "/search", icon: <HiSearch /> },
    {
      id: 3,
      name: "Your Library",
      link: "/library",
      icon: <HiOutlineCollection />,
    },
    { id: 4, name: "Liked Songs", link: "/liked", icon: <HiOutlineHeart /> },
    {
      id: 5,
      name: "Create Playlist",
      link: "/create",
      icon: <HiOutlinePlus />,
    },
    //saved albums
    {
      id: 6,
      name: "Saved Albums",
      link: "/saved",
      icon: <HiBookmark />,
    },
  ];
  const BottomPages = [
    { id: 7, name: "Settings", link: "/profile", icon: <HiCog /> },
    {
      id: 8,
      name: "Sign in",
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
          <HoverBgColor key={page.id} isSelected={selected === page.name}>
            <Link
              href={page.link}
              className={"flex items-center gap-1 text-xs capitalize "}
              onClick={() => setSelected(page.name)}
            >
              {page.icon}
              {page.name}
            </Link>
          </HoverBgColor>
        ))}
      </ul>
      <ul className="flex justify-between ">
        {BottomPages.map((page) => (
          <HoverBgColor key={page.id} isSelected={selected === page.name}>
            <Link
              key={page.id}
              href={page.link}
              className={
                "flex items-center justify-center gap-1 text-xs capitalize"
              }
              onClick={() => setSelected(page.name)}
            >
              {page.icon}
              {page.name}
            </Link>
          </HoverBgColor>
        ))}
      </ul>
    </nav>
  );
}
