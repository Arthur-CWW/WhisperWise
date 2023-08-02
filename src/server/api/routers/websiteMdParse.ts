import { z } from "zod";

// import NodeCache from "node-cache";
import Parser from "rss-parser";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const parser = new Parser();
// const cache = new NodeCache({ stdTTL: 600 }); // cache for 600 seconds

export const exampleRouter = createTRPCRouter({
  submitWebsite: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getRSSFeed: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      // const cachedFeed = cache.get<Output>(input.url);
      // if (cachedFeed) {
      //   return cachedFeed;
      // }

      const feed = await parser.parseURL(input.url);
      return feed;
      // cache.set(input.url, feed);
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
