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
  return <div>Todo</div>;
};

export default Home;
