import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { HiBookmark, HiEye, HiMenu, HiRefresh } from "react-icons/hi";
import { Content } from "~/components/Content";
import { Sidebar } from "~/components/Sidebar";
import { api } from "~/utils/api";
import { todo } from "~/utils/todo";

const Home: NextPage = () => {
  const hello = api.mdParser.submitWebsite.useQuery({ text: "from tRPC" });
  const [open, setOpen] = useState(false);
  return (
    <>
      <Head>
        <title>Smart Cast</title>
        <meta
          name="description"
          content="Convert text articles to audiobooks or podcast"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header
        className=" font-baseline flex h-12 w-full
          justify-center bg-cyan-900  px-1 text-white"
      >
        <button className="px-2" onClick={() => setOpen(!open)}>
          <HiMenu className="text-2xl text-gray-400" />
        </button>
        <div
          className="grid w-full grid-cols-[65%_1fr]
                        items-center justify-between px-1"
        >
          <h1 className="text-bold h-auto truncate text-2xl">Likes</h1>
          <div className="flex justify-end gap-3">
            <button onClick={todo()}>
              <HiEye className="text-2xl " />
            </button>
            <button onClick={todo()}>
              <HiRefresh className="text-2xl text-gray-400" />
            </button>
            <button onClick={todo()}>
              <HiBookmark className="text-2xl text-gray-400" />
            </button>
          </div>
        </div>
      </header>

      <main
        className={`${
          open ? "grid-cols-[auto_1fr]" : "grid-cols-1"
        } grid h-screen w-screen`}
      >
        {open && <Sidebar />}
        <Content />
      </main>
    </>
  );
};

export default Home;
