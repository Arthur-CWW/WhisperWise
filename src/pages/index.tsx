import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import { HiBookmark, HiEye, HiMenu, HiRefresh } from "react-icons/hi";

import { Content } from "~/components/Content";
import { api } from "~/utils/api";
import { todo } from "~/utils/todo";
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
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
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
      <body>
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
              The celtics genocide
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

        <main
          className={`${
            open ? "grid-cols-[auto_1fr]" : "grid-cols-1"
          } grid h-screen w-screen`}
        >
          {open && <Sidebar />}
          <Content />
        </main>
      </body>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
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
