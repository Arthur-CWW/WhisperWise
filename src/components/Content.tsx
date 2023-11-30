const POD_DATA = [
  {
    title: "Hardcore History",
    numberOfEpisodes: 150,
    rssUrl: "https://example.com/rss/hardcorehistory",
    thumbnailUrl:
      "https://unsplash.com/photos/a-woman-in-a-white-dress-is-decorating-cookies-with-purple-flowers-gr0ocS0o9Ag",
    viewCount: 500000,
    author: "Dan Carlin",
  },
  {
    title: "The Tim Ferriss Show",
    numberOfEpisodes: 500,
    rssUrl: "https://example.com/rss/timferriss",
    thumbnailUrl: "https://example.com/thumbnails/timferriss.jpg",
    viewCount: 800000,
    author: "Tim Ferriss",
  },
  {
    title: "Freakonomics Radio",
    numberOfEpisodes: 400,
    rssUrl: "https://example.com/rss/freakonomics",
    thumbnailUrl: "https://example.com/thumbnails/freakonomics.jpg",
    viewCount: 600000,
    author: "Stephen J. Dubner",
  },
  {
    title: "Darknet Diaries",
    numberOfEpisodes: 200,
    rssUrl: "https://example.com/rss/darknetdiaries",
    thumbnailUrl: "https://example.com/thumbnails/darknetdiaries.jpg",
    viewCount: 400000,
    author: "Jack Rhysider",
  },
  {
    title: "The Lex Fridman Podcast",
    numberOfEpisodes: 300,
    rssUrl: "https://example.com/rss/lexfridman",
    thumbnailUrl: "https://example.com/thumbnails/lexfridman.jpg",
    viewCount: 550000,
    author: "Lex Fridman",
  },
  {
    title: "The Huberman Lab Podcast",
    numberOfEpisodes: 100,
    rssUrl: "https://example.com/rss/huberman",
    thumbnailUrl: "https://example.com/thumbnails/huberman.jpg",
    viewCount: 250000,
    author: "Andrew Huberman",
  },
  {
    title: "Sean Carroll's Mindscape",
    numberOfEpisodes: 250,
    rssUrl: "https://example.com/rss/mindscape",
    thumbnailUrl: "https://example.com/thumbnails/mindscape.jpg",
    viewCount: 350000,
    author: "Sean Carroll",
  },

  {
    title: "Sean Carroll's Mindscape",
    numberOfEpisodes: 250,
    rssUrl: "https://example.com/rss/mindscape",
    thumbnailUrl: "https://example.com/thumbnails/mindscape.jpg",
    viewCount: 350000,
    author: "Sean Carroll",
  },

  {
    title: "Sean Carroll's Mindscape",
    numberOfEpisodes: 250,
    rssUrl: "https://example.com/rss/mindscape",
    thumbnailUrl: "https://example.com/thumbnails/mindscape.jpg",
    viewCount: 350000,
    author: "Sean Carroll",
  },

  {
    title: "Sean Carroll's Mindscape",
    numberOfEpisodes: 250,
    rssUrl: "https://example.com/rss/mindscape",
    thumbnailUrl: "https://example.com/thumbnails/mindscape.jpg",
    viewCount: 350000,
    author: "Sean Carroll",
  },

  {
    title: "Sean Carroll's Mindscape",
    numberOfEpisodes: 250,
    rssUrl: "https://example.com/rss/mindscape",
    thumbnailUrl: "https://example.com/thumbnails/mindscape.jpg",
    viewCount: 350000,
    author: "Sean Carroll",
  },
] as const;
export function Content() {
  return (
    <div className="m-4 grid max-w-full grid-cols-[repeat(auto-fill,minmax(200px,1fr))] content-start gap-4">
      {POD_DATA.map((podcast, index) => (
        <div
          className=" h-auto flex-col overflow-hidden rounded-lg bg-gray-100 shadow-md sm:max-w-xs"
          //                                                                        ^and change this (b)
          key={index}
        >
          <img
            className="aspect-square  w-full  object-cover"
            //         ^ when changing this, change the other things too
            src={"/hq720.jpg"} // todo
            alt={podcast.title}
          />
          <div className="flex flex-col justify-between p-2">
            <div>
              <h1 className="text-sm font-bold md:text-base lg:text-lg">
                {podcast.title}
              </h1>
              <p className="text-xs text-gray-500 md:text-sm lg:text-base">
                {podcast.author}
              </p>
            </div>
            <p className="text-xs md:text-sm lg:text-base">
              {podcast.numberOfEpisodes} episodes
            </p>
            <p className="text-xs md:text-sm lg:text-base">
              {podcast.viewCount} views
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
