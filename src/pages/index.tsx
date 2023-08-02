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
  const hello = api.mdParser.submitWebsite.useQuery({ text: "from tRPC" });
  const [open, setOpen] = useState(false);
  // const [url, setUrl] = useState("");
  // const { data: sessionData } = useSession();
  const { data } = api.mdParser.getRSSFeed.useQuery(
    { url: "http://www.aaronsw.com/2002/feeds/pgessays.rss" },
    { enabled: true }
  );
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
              {data?.title ?? "Smart Cast"}
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = e.currentTarget.elements;
              // console.log(`submitted ${e.currentTarget.value}`);
              api.mdParser.submitWebsite.mutation({
                text: e.currentTarget.elements["url"].value,
              });
            }}
          >
            <label htmlFor="url">Enter a url</label>
            <input type="text" id="url" />

            <label htmlFor="md_to_mp3">Enter url for markdown</label>
            <input type="text" id="md_to_mp3" />
            <button type="submit">Submit</button>
          </form>
          <p>
            <pre className="overflow-auto whitespace-pre-wrap">
              {JSON.stringify(data)}
            </pre>
          </p>
          {open && <Sidebar />}
          {hello.data && <p>{hello.data.greeting}</p>}
          <Content />
        </main>
      </body>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.mdParser.getSecretMessage.useQuery(
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
const data = {
  items: [
    {
      title: "How to Do Great Work",
      link: "http://www.paulgraham.com/greatwork.html",
    },
    {
      title: "How to Get New Ideas",
      link: "http://www.paulgraham.com/getideas.html",
    },
    { title: "The Need to Read", link: "http://www.paulgraham.com/read.html" },
    {
      title: "What You (Want to)* Want",
      link: "http://www.paulgraham.com/want.html",
    },
    { title: "Alien Truth", link: "http://www.paulgraham.com/alien.html" },
    {
      title: "What I've Learned from Users",
      link: "http://www.paulgraham.com/users.html",
    },
    { title: "Heresy", link: "http://www.paulgraham.com/heresy.html" },
    {
      title: "Putting Ideas into Words",
      link: "http://www.paulgraham.com/words.html",
    },
    {
      title: "Is There Such a Thing as Good Taste?",
      link: "http://www.paulgraham.com/goodtaste.html",
    },
    { title: "Beyond Smart", link: "http://www.paulgraham.com/smart.html" },
    { title: "Weird Languages", link: "http://www.paulgraham.com/weird.html" },
    { title: "How to Work Hard", link: "http://www.paulgraham.com/hwh.html" },
    {
      title: "A Project of One's Own",
      link: "http://www.paulgraham.com/own.html",
    },
    { title: "Fierce Nerds", link: "http://www.paulgraham.com/fn.html" },
    {
      title: "Crazy New Ideas",
      link: "http://www.paulgraham.com/newideas.html",
    },
    {
      title: "An NFT That Saves Lives",
      link: "http://www.paulgraham.com/nft.html",
    },
    {
      title: "The Real Reason to End the Death Penalty",
      link: "http://www.paulgraham.com/real.html",
    },
    {
      title: "How People Get Rich Now",
      link: "http://www.paulgraham.com/richnow.html",
    },
    { title: "Write Simply", link: "http://www.paulgraham.com/simply.html" },
    {
      title: "Donate Unrestricted",
      link: "http://www.paulgraham.com/donate.html",
    },
    {
      title: "What I Worked On",
      link: "http://www.paulgraham.com/worked.html",
    },
    { title: "Earnestness", link: "http://www.paulgraham.com/earnest.html" },
    { title: "Billionaires Build", link: "http://www.paulgraham.com/ace.html" },
    { title: "The Airbnbs", link: "http://www.paulgraham.com/airbnbs.html" },
    {
      title: "How to Think for Yourself",
      link: "http://www.paulgraham.com/think.html",
    },
    { title: "Early Work", link: "http://www.paulgraham.com/early.html" },
    {
      title: "Modeling a Wealth Tax",
      link: "http://www.paulgraham.com/wtax.html",
    },
    {
      title: "The Four Quadrants of Conformism",
      link: "http://www.paulgraham.com/conformism.html",
    },
    {
      title: "Orthodox Privilege",
      link: "http://www.paulgraham.com/orth.html",
    },
    {
      title: "Coronavirus and Credibility",
      link: "http://www.paulgraham.com/cred.html",
    },
    {
      title: "How to Write Usefully",
      link: "http://www.paulgraham.com/useful.html",
    },
    { title: "Being a Noob", link: "http://www.paulgraham.com/noob.html" },
    { title: "Haters", link: "http://www.paulgraham.com/fh.html" },
    {
      title: "The Two Kinds of Moderate",
      link: "http://www.paulgraham.com/mod.html",
    },
    {
      title: "Fashionable Problems",
      link: "http://www.paulgraham.com/fp.html",
    },
    { title: "Having Kids", link: "http://www.paulgraham.com/kids.html" },
    {
      title: "The Lesson to Unlearn",
      link: "http://www.paulgraham.com/lesson.html",
    },
    { title: "Novelty and Heresy", link: "http://www.paulgraham.com/nov.html" },
    {
      title: "The Bus Ticket Theory of Genius",
      link: "http://www.paulgraham.com/genius.html",
    },
    {
      title: "General and Surprising",
      link: "http://www.paulgraham.com/sun.html",
    },
    { title: "Charisma / Power", link: "http://www.paulgraham.com/pow.html" },
    {
      title: "The Risk of Discovery",
      link: "http://www.paulgraham.com/disc.html",
    },
    {
      title: "How to Make Pittsburgh a Startup Hub",
      link: "http://www.paulgraham.com/pgh.html",
    },
    { title: "Life is Short", link: "http://www.paulgraham.com/vb.html" },
    {
      title: "Economic Inequality",
      link: "http://www.paulgraham.com/ineq.html",
    },
    { title: "The Refragmentation", link: "http://www.paulgraham.com/re.html" },
    {
      title: "Jessica Livingston",
      link: "http://www.paulgraham.com/jessica.html",
    },
    {
      title: "A Way to Detect Bias",
      link: "http://www.paulgraham.com/bias.html",
    },
    {
      title: "Write Like You Talk",
      link: "http://www.paulgraham.com/talk.html",
    },
    {
      title: "Default Alive or Default Dead?",
      link: "http://www.paulgraham.com/aord.html",
    },
    {
      title: "Why It's Safe for Founders to Be Nice",
      link: "http://www.paulgraham.com/safe.html",
    },
    { title: "Change Your Name", link: "http://www.paulgraham.com/name.html" },
    {
      title: "What Microsoft Is this the Altair Basic of?",
      link: "http://www.paulgraham.com/altair.html",
    },
    {
      title: "The Ronco Principle",
      link: "http://www.paulgraham.com/ronco.html",
    },
    {
      title: "What Doesn't Seem Like Work?",
      link: "http://www.paulgraham.com/work.html",
    },
    {
      title: "Don't Talk to Corp Dev",
      link: "http://www.paulgraham.com/corpdev.html",
    },
    {
      title: "Let the Other 95% of Great Programmers In",
      link: "http://www.paulgraham.com/95.html",
    },
    {
      title: "How to Be an Expert in a Changing World",
      link: "http://www.paulgraham.com/ecw.html",
    },
    { title: "How You Know", link: "http://www.paulgraham.com/know.html" },
    { title: "The Fatal Pinch", link: "http://www.paulgraham.com/pinch.html" },
    { title: "Mean People Fail", link: "http://www.paulgraham.com/mean.html" },
    {
      title: "Before the Startup",
      link: "http://www.paulgraham.com/before.html",
    },
    { title: "How to Raise Money", link: "http://www.paulgraham.com/fr.html" },
    {
      title: "Investor Herd Dynamics",
      link: "http://www.paulgraham.com/herd.html",
    },
    {
      title: "How to Convince Investors",
      link: "http://www.paulgraham.com/convince.html",
    },
    {
      title: "Do Things that Don't Scale",
      link: "http://www.paulgraham.com/ds.html",
    },
    {
      title: "Startup Investing Trends",
      link: "http://www.paulgraham.com/invtrend.html",
    },
    {
      title: "How to Get Startup Ideas",
      link: "http://www.paulgraham.com/startupideas.html",
    },
    {
      title: "The Hardware Renaissance",
      link: "http://www.paulgraham.com/hw.html",
    },
    {
      title: "Startup = Growth",
      link: "http://www.paulgraham.com/growth.html",
    },
    {
      title: "Black Swan Farming",
      link: "http://www.paulgraham.com/swan.html",
    },
    {
      title: "The Top of My Todo List",
      link: "http://www.paulgraham.com/todo.html",
    },
    {
      title: "Writing and Speaking",
      link: "http://www.paulgraham.com/speak.html",
    },
    {
      title: "How Y Combinator Started",
      link: "http://www.paulgraham.com/ycstart.html",
    },
    {
      title: "Defining Property",
      link: "http://www.paulgraham.com/property.html",
    },
    {
      title: "Frighteningly Ambitious Startup Ideas",
      link: "http://www.paulgraham.com/ambitious.html",
    },
    {
      title: "A Word to the Resourceful",
      link: "http://www.paulgraham.com/word.html",
    },
    {
      title: "Schlep Blindness",
      link: "http://www.paulgraham.com/schlep.html",
    },
    {
      title: "Snapshot: Viaweb, June 1998",
      link: "http://www.paulgraham.com/vw.html",
    },
    {
      title: "Why Startup Hubs Work",
      link: "http://www.paulgraham.com/hubs.html",
    },
    {
      title: "The Patent Pledge",
      link: "http://www.paulgraham.com/patentpledge.html",
    },
    { title: "Subject: Airbnb", link: "http://www.paulgraham.com/airbnb.html" },
    {
      title: "Founder Control",
      link: "http://www.paulgraham.com/control.html",
    },
    { title: "Tablets", link: "http://www.paulgraham.com/tablets.html" },
    {
      title: "What We Look for in Founders",
      link: "http://www.paulgraham.com/founders.html",
    },
    {
      title: "The New Funding Landscape",
      link: "http://www.paulgraham.com/superangels.html",
    },
    {
      title: "Where to See Silicon Valley",
      link: "http://www.paulgraham.com/seesv.html",
    },
    {
      title: "High Resolution Fundraising ",
      link: "http://www.paulgraham.com/hiresfund.html",
    },
    {
      title: "What Happened to Yahoo ",
      link: "http://www.paulgraham.com/yahoo.html",
    },
    {
      title: "The Future of Startup Funding ",
      link: "http://www.paulgraham.com/future.html",
    },
    {
      title: "The Acceleration of Addictiveness",
      link: "http://www.paulgraham.com/addiction.html",
    },
    {
      title: "The Top Idea in Your Mind ",
      link: "http://www.paulgraham.com/top.html",
    },
    {
      title: "How to Lose Time and Money ",
      link: "http://www.paulgraham.com/selfindulgence.html",
    },
    {
      title: "Organic Startup Ideas",
      link: "http://www.paulgraham.com/organic.html",
    },
    { title: "Apple's Mistake", link: "http://www.paulgraham.com/apple.html" },
    {
      title: "What Startups Are Really Like",
      link: "http://www.paulgraham.com/really.html",
    },
    {
      title: "Persuade xor Discover ",
      link: "http://www.paulgraham.com/discover.html",
    },
    {
      title: "Post-Medium Publishing",
      link: "http://www.paulgraham.com/publishing.html",
    },
    {
      title: "The List of N Things",
      link: "http://www.paulgraham.com/nthings.html",
    },
    {
      title: "The Anatomy of Determination ",
      link: "http://www.paulgraham.com/determination.html",
    },
    {
      title: "What Kate Saw in Silicon Valley  ",
      link: "http://www.paulgraham.com/kate.html",
    },
    {
      title: "The Trouble with the Segway",
      link: "http://www.paulgraham.com/segway.html",
    },
    {
      title: "Ramen Profitable",
      link: "http://www.paulgraham.com/ramenprofitable.html",
    },
    {
      title: "Maker's Schedule, Manager's Schedule ",
      link: "http://www.paulgraham.com/makersschedule.html",
    },
    {
      title: "A Local Revolution?",
      link: "http://www.paulgraham.com/revolution.html",
    },
    {
      title: "Why Twitter is a Big Deal",
      link: "http://www.paulgraham.com/twitter.html",
    },
    {
      title: "The Founder Visa",
      link: "http://www.paulgraham.com/foundervisa.html",
    },
    {
      title: "Five Founders",
      link: "http://www.paulgraham.com/5founders.html",
    },
    {
      title: "Relentlessly Resourceful",
      link: "http://www.paulgraham.com/relres.html",
    },
    {
      title: "How to Be an Angel Investor",
      link: "http://www.paulgraham.com/angelinvesting.html",
    },
    {
      title: "Why TV Lost",
      link: "http://www.paulgraham.com/convergence.html",
    },
    {
      title: "Can You Buy a Silicon Valley?  Maybe.",
      link: "http://www.paulgraham.com/maybe.html",
    },
    {
      title: "What I've Learned from Hacker News",
      link: "http://www.paulgraham.com/hackernews.html",
    },
    {
      title: "Startups in 13 Sentences",
      link: "http://www.paulgraham.com/13sentences.html",
    },
    {
      title: "Keep Your Identity Small  ",
      link: "http://www.paulgraham.com/identity.html",
    },
    {
      title: "After Credentials",
      link: "http://www.paulgraham.com/credentials.html",
    },
    {
      title: "Could VC be a Casualty of the Recession?",
      link: "http://www.paulgraham.com/divergence.html",
    },
    {
      title: "The High-Res Society",
      link: "http://www.paulgraham.com/highres.html",
    },
    {
      title: 'The Other Half of "Artists Ship"  ',
      link: "http://www.paulgraham.com/artistsship.html",
    },
    {
      title: "Why to Start a Startup in a Bad Economy",
      link: "http://www.paulgraham.com/badeconomy.html",
    },
    {
      title: "A Fundraising Survival Guide",
      link: "http://www.paulgraham.com/fundraising.html",
    },
    {
      title: "The Pooled-Risk Company Management Company",
      link: "http://www.paulgraham.com/prcmc.html",
    },
    {
      title: "Cities and Ambition",
      link: "http://www.paulgraham.com/cities.html",
    },
    {
      title: "Disconnecting Distraction",
      link: "http://www.paulgraham.com/distraction.html",
    },
    { title: "Lies We Tell Kids", link: "http://www.paulgraham.com/lies.html" },
    { title: "Be Good", link: "http://www.paulgraham.com/good.html" },
    {
      title: "Why There Aren't More Googles",
      link: "http://www.paulgraham.com/googles.html",
    },
    { title: "Some Heroes", link: "http://www.paulgraham.com/heroes.html" },
    {
      title: "How to Disagree",
      link: "http://www.paulgraham.com/disagree.html",
    },
    {
      title: "You Weren't Meant to Have a Boss",
      link: "http://www.paulgraham.com/boss.html",
    },
    {
      title: "A New Venture Animal",
      link: "http://www.paulgraham.com/ycombinator.html",
    },
    { title: "Trolls", link: "http://www.paulgraham.com/trolls.html" },
    {
      title: "Six Principles for Making New Things",
      link: "http://www.paulgraham.com/newthings.html",
    },
    {
      title: "Why to Move to a Startup Hub",
      link: "http://www.paulgraham.com/startuphubs.html",
    },
    {
      title: "The Future of Web Startups",
      link: "http://www.paulgraham.com/webstartups.html",
    },
    {
      title: "How to Do Philosophy",
      link: "http://www.paulgraham.com/philosophy.html",
    },
    {
      title: "News from the Front",
      link: "http://www.paulgraham.com/colleges.html",
    },
    { title: "How Not to Die", link: "http://www.paulgraham.com/die.html" },
    {
      title: "Holding a Program in One's Head",
      link: "http://www.paulgraham.com/head.html",
    },
    { title: "Stuff", link: "http://www.paulgraham.com/stuff.html" },
    {
      title: "The Equity Equation",
      link: "http://www.paulgraham.com/equity.html",
    },
    {
      title: "An Alternative Theory of Unions",
      link: "http://www.paulgraham.com/unions.html",
    },
    {
      title: "The Hacker's Guide to Investors",
      link: "http://www.paulgraham.com/guidetoinvestors.html",
    },
    {
      title: "Two Kinds of Judgement",
      link: "http://www.paulgraham.com/judgement.html",
    },
    {
      title: "Microsoft is Dead",
      link: "http://www.paulgraham.com/microsoft.html",
    },
    {
      title: "Why to Not Not Start a Startup",
      link: "http://www.paulgraham.com/notnot.html",
    },
    {
      title: "Is It Worth Being Wise?",
      link: "http://www.paulgraham.com/wisdom.html",
    },
    {
      title: "Learning from Founders",
      link: "http://www.paulgraham.com/foundersatwork.html",
    },
    {
      title: "How Art Can Be Good",
      link: "http://www.paulgraham.com/goodart.html",
    },
    {
      title: "The 18 Mistakes That Kill Startups",
      link: "http://www.paulgraham.com/startupmistakes.html",
    },
    {
      title: "A Student's Guide to Startups",
      link: "http://www.paulgraham.com/mit.html",
    },
    {
      title: "How to Present to Investors",
      link: "http://www.paulgraham.com/investors.html",
    },
    {
      title: "Copy What You Like",
      link: "http://www.paulgraham.com/copy.html",
    },
    { title: "The Island Test", link: "http://www.paulgraham.com/island.html" },
    {
      title: "The Power of the Marginal",
      link: "http://www.paulgraham.com/marginal.html",
    },
    {
      title: "Why Startups Condense in America",
      link: "http://www.paulgraham.com/america.html",
    },
    {
      title: "How to Be Silicon Valley",
      link: "http://www.paulgraham.com/siliconvalley.html",
    },
    {
      title: "The Hardest Lessons for Startups to Learn",
      link: "http://www.paulgraham.com/startuplessons.html",
    },
    {
      title: "See Randomness",
      link: "http://www.paulgraham.com/randomness.html",
    },
    {
      title: "Are Software Patents Evil?",
      link: "http://www.paulgraham.com/softwarepatents.html",
    },
    { title: "6,631,372", link: "http://www.paulgraham.com/6631327.html" },
    { title: "Why YC", link: "http://www.paulgraham.com/whyyc.html" },
    {
      title: "How to Do What You Love",
      link: "http://www.paulgraham.com/love.html",
    },
    {
      title: "Good and Bad Procrastination",
      link: "http://www.paulgraham.com/procrastination.html",
    },
    { title: "Web 2.0", link: "http://www.paulgraham.com/web20.html" },
    {
      title: "How to Fund a Startup",
      link: "http://www.paulgraham.com/startupfunding.html",
    },
    {
      title: "The Venture Capital Squeeze",
      link: "http://www.paulgraham.com/vcsqueeze.html",
    },
    {
      title: "Ideas for Startups",
      link: "http://www.paulgraham.com/ideas.html",
    },
    {
      title: "What I Did this Summer",
      link: "http://www.paulgraham.com/sfp.html",
    },
    {
      title: "Inequality and Risk",
      link: "http://www.paulgraham.com/inequality.html",
    },
    {
      title: "After the Ladder",
      link: "http://www.paulgraham.com/ladder.html",
    },
    {
      title: "What Business Can Learn from Open Source",
      link: "http://www.paulgraham.com/opensource.html",
    },
    {
      title: "Hiring is Obsolete",
      link: "http://www.paulgraham.com/hiring.html",
    },
    {
      title: "The Submarine",
      link: "http://www.paulgraham.com/submarine.html",
    },
    {
      title: "Why Smart People Have Bad Ideas",
      link: "http://www.paulgraham.com/bronze.html",
    },
    { title: "Return of the Mac", link: "http://www.paulgraham.com/mac.html" },
    {
      title: "Writing,  Briefly",
      link: "http://www.paulgraham.com/writing44.html",
    },
    {
      title: "Undergraduation",
      link: "http://www.paulgraham.com/college.html",
    },
    {
      title: "A Unified Theory of VC Suckage",
      link: "http://www.paulgraham.com/venturecapital.html",
    },
    {
      title: "How to Start a Startup",
      link: "http://www.paulgraham.com/start.html",
    },
    {
      title: "What You'll Wish You'd Known",
      link: "http://www.paulgraham.com/hs.html",
    },
    { title: "Made in USA", link: "http://www.paulgraham.com/usa.html" },
    {
      title: "It's Charisma, Stupid",
      link: "http://www.paulgraham.com/charisma.html",
    },
    { title: "Bradley's Ghost", link: "http://www.paulgraham.com/polls.html" },
    { title: "A Version 1.0", link: "http://www.paulgraham.com/laundry.html" },
    {
      title: "What the Bubble Got Right",
      link: "http://www.paulgraham.com/bubble.html",
    },
    {
      title: "The Age of the Essay",
      link: "http://www.paulgraham.com/essay.html",
    },
    {
      title: "The Python Paradox",
      link: "http://www.paulgraham.com/pypar.html",
    },
    { title: "Great Hackers", link: "http://www.paulgraham.com/gh.html" },
    { title: "Mind the Gap", link: "http://www.paulgraham.com/gap.html" },
    {
      title: "How to Make Wealth",
      link: "http://www.paulgraham.com/wealth.html",
    },
    { title: 'The Word "Hacker"', link: "http://www.paulgraham.com/gba.html" },
    { title: "What You Can't Say", link: "http://www.paulgraham.com/say.html" },
    {
      title: "Filters that Fight Back",
      link: "http://www.paulgraham.com/ffb.html",
    },
    {
      title: "Hackers and Painters",
      link: "http://www.paulgraham.com/hp.html",
    },
    {
      title: "If Lisp is So Great",
      link: "http://www.paulgraham.com/iflisp.html",
    },
    {
      title: "The Hundred-Year Language",
      link: "http://www.paulgraham.com/hundred.html",
    },
    {
      title: "Why Nerds are Unpopular",
      link: "http://www.paulgraham.com/nerds.html",
    },
    {
      title: "Better Bayesian Filtering",
      link: "http://www.paulgraham.com/better.html",
    },
    {
      title: "Design and Research",
      link: "http://www.paulgraham.com/desres.html",
    },
    { title: "A Plan for Spam", link: "http://www.paulgraham.com/spam.html" },
    {
      title: "Revenge of the Nerds",
      link: "http://www.paulgraham.com/icad.html",
    },
    {
      title: "Succinctness is Power",
      link: "http://www.paulgraham.com/power.html",
    },
    { title: "What Languages Fix", link: "http://www.paulgraham.com/fix.html" },
    { title: "Taste for Makers", link: "http://www.paulgraham.com/taste.html" },
    {
      title: "Why Arc Isn't Especially Object-Oriented",
      link: "http://www.paulgraham.com/noop.html",
    },
    {
      title: "What Made Lisp Different",
      link: "http://www.paulgraham.com/diff.html",
    },
    {
      title: "The Other Road Ahead",
      link: "http://www.paulgraham.com/road.html",
    },
    {
      title: "The Roots of Lisp",
      link: "http://www.paulgraham.com/rootsoflisp.html",
    },
    {
      title: "Five Questions about Language Design",
      link: "http://www.paulgraham.com/langdes.html",
    },
    { title: "Being Popular", link: "http://www.paulgraham.com/popular.html" },
    { title: "Java's Cover", link: "http://www.paulgraham.com/javacover.html" },
    {
      title: "Beating the Averages",
      link: "http://www.paulgraham.com/avg.html",
    },
    {
      title: "Lisp for Web-Based Applications",
      link: "http://www.paulgraham.com/lwba.html",
    },
    {
      title: "Chapter 1 of Ansi Common Lisp",
      link: "http://www.paulgraham.com/https://sep.turbifycdn.com/ty/cdn/paulgraham/acl1.txt?t=1689517705&",
    },
    {
      title: "Chapter 2 of Ansi Common Lisp",
      link: "http://www.paulgraham.com/https://sep.turbifycdn.com/ty/cdn/paulgraham/acl2.txt?t=1689517705&",
    },
    {
      title: "Programming Bottom-Up",
      link: "http://www.paulgraham.com/progbot.html",
    },
    {
      title: "This Year We Can End the Death Penalty in California",
      link: "http://www.paulgraham.com/prop62.html",
    },
  ],
  title: "Paul Graham: Essays",
  description: "Scraped feed provided by aaronsw.com",
  link: "http://www.paulgraham.com/",
};
