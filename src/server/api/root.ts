import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { textRouter } from "./routers/textgenerator";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  textGenerator: textRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
