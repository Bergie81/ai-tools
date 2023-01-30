import { type NextPage } from "next";
import Head from "next/head";
import PostDashboard from "../components/PostDashboard";

import { api } from "../utils/api";

const PostGenerator: NextPage = () => {
  const jobs = api.textGenerator?.jobDescription.useQuery({
    jobTitle: "Software Engineer",
  });
  return (
    <>
      <Head>
        <title>AI Social Media Post Generator</title>
        <meta name="description" content="AI Job Description Generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-dark">
        <div className="flex flex-col items-center justify-center px-4 py-2">
          <h1 className="mt-6 text-center text-3xl font-bold text-primary md:text-4xl">
            AI Social Media Post Generator
          </h1>
        </div>
        <PostDashboard />
        <div>{jobs.data}</div>
      </main>
    </>
  );
};

export default PostGenerator;
