import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { todo } from "~/utils/todo";

import Head from "next/head";
import { useState } from "react";
import { HiBookmark, HiEye, HiMenu, HiRefresh } from "react-icons/hi";

import { Content } from "~/components/Content";
import { RssTable } from "~/components/ui/table";
import { Sidebar } from "~/components/Sidebar";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const [open, setOpen] = useState(false);

  const { data } = api.mdParser.getRSSFeed.useQuery(
    { url: "http://www.aaronsw.com/2002/feeds/pgessays.rss" },
    { enabled: true, cacheTime: 10000000 }
  );
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Smart Cast</title>
        <meta
          name="description"
          content="Convert text articles to audiobooks or podcast"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
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
            <h1 className="text-bold h-auto truncate text-2xl">
              {data?.title}
            </h1>
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

        {/* I think this is where you change the layout */}
        <main
          className={`${
            open ? "grid-cols-[auto_1fr]" : "grid-cols-1"
          } grid h-screen w-full`}
        >
          {open && <Sidebar />}
          <Component {...pageProps} />
        </main>
      </>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
