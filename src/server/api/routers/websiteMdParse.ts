import { z } from "zod";

// import NodeCache from "node-cache";
import Parser from "rss-parser";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const parser = new Parser();

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
      const feed = await parser.parseURL(input.url);
      return feed;
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
