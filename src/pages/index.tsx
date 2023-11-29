import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { HiBookmark, HiEye, HiMenu, HiRefresh } from "react-icons/hi";

import { Content } from "~/components/Content";
import { RssTable } from "~/components/ui/table";
import { api } from "~/utils/api";
import { todo } from "~/utils/todo";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { Sidebar } from "../components/Sidebar";
export function HoverBgColor({
  children,
  isSelected,
}: {
  isSelected: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      className={
        "flex w-full  rounded-sm px-2 py-1 text-gray-400 hover:bg-gray-800 hover:text-gray-100" +
        (isSelected ? " text-gray-100" : "")
      }
    >
      {children}
    </button>
  );
}
const Home: NextPage = () => {
  // const [url, setUrl] = useState("");
  const { data } = api.mdParser.getRSSFeed.useQuery(
    { url: "http://www.aaronsw.com/2002/feeds/pgessays.rss" },
    { enabled: true, cacheTime: 10000000 }
  );

  type Article = {
    title: string;
    link: string;
  };

  type RSSFeed = {
    items: Article[];
  };
  const columns: ColumnDef<Article>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "link", header: "Link" },
  ];
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = e.currentTarget.elements;
          console.log(`submitted ${e.currentTarget.value}`);
          // api.mdParser.submitWebsite.mutation({
          //   text: e.currentTarget.elements["url"].value,
          // });
        }}
      >
        <label htmlFor="url">Enter a url</label>
        <input type="text" id="url" />

        <label htmlFor="md_to_mp3">Enter url for markdown</label>
        <input type="text" id="md_to_mp3" />
        <button type="submit">Submit</button>
      </form>
      {/* <pre className="overflow-auto whitespace-pre-wrap">
        {JSON.stringify(data)}
      </pre> */}
      <RssTable data={(data?.items as Article[]) ?? []} columns={columns} />

      {/* {hello.data && <p>{hello.data.greeting}</p>} */}
      {/* <Content /> */}
    </div>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const m = api.mdParser.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  const { data } = m;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {data && <span> - {data}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
