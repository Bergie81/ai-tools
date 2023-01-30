import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const textRouter = createTRPCRouter({
  //fetch a DaVinci response
  jobDescription: publicProcedure
    .input(
      z.object({
        jobTitle: z.string(),
        industry: z.string().optional(),
        keyWords: z.string().optional(),
        tone: z.string().optional(),
        language: z.string().optional(),
        numWords: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { jobTitle, industry, numWords, tone, keyWords, language } = input;

      try {
        const response = await fetch(
          "https://api.openai.com/v1/engines/text-davinci-003/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              prompt: `Write a job description for a  ${jobTitle} role 
              ${industry ? `in the ${industry} industry` : ""} that is around ${
                numWords || 200
              } words in a ${tone || "neutral"} tone. ${
                keyWords
                  ? `Incorporate the following keywords: ${keyWords}.`
                  : ""
              }. The job position should be described in a way that is SEO friendly, highlighting its unique features and benefits. Write it in ${
                language || "English"
              }.`,
              max_tokens: 1000,
              temperature: 0.4,
            }),
          }
        );
        const data = await response.json();

        return data.choices[0].text;
      } catch (err) {
        console.error(err);
      }
    }),
});
