import React, { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

import Loader from "../components/Loader";
import { api } from "../utils/api";

const PostGenerator: NextPage = () => {
  // STATES
  const [jobDescription, setJobDescription] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [keyWords, setKeyWords] = useState("");
  const [tone, setTone] = useState("");
  const [language, setLanguage] = useState("");
  const [numWords, setNumWords] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { data, isLoading } = api.textGenerator?.jobDescription.useQuery(
    {
      jobTitle,
      industry,
      keyWords,
      tone,
      language,
      numWords,
    },
    {
      enabled: isGenerating,
      onSuccess(data) {
        console.log("SUCCESS");
        setIsGenerating(false);
        setJobDescription(data);
      },
    }
  );

  // EVENT HANDLERS
  const handleSubmit = (e: React.FormEvent) => {
    console.log("Clicked");
    setIsGenerating(true);
    e.preventDefault();

    //setIsGenerating(true);
    // try {
    //   const { data, isLoading } = api.textGenerator?.jobDescription.useQuery({
    //     jobTitle,
    //     industry,
    //     keyWords,
    //     tone,
    //     language,
    //     numWords,
    //   });
    //   setIsGenerating(false);
    //   setJobDescription(data);
    // } catch (error) {
    //   console.log(error);
    //   // alert(
    //   //   "Something went wrong. Most likely servers are overloaded. Lower Word Count and try again."
    //   // );
    // }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jobDescription);
    setIsCopied(true);
  };

  // DATA FE
  // const jobs = api.textGenerator?.jobDescription.useQuery({
  //   jobTitle,
  // });
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
        <div className="mx-auto w-full max-w-2xl px-4 py-4 text-dark sm:px-6 lg:px-8">
          <div className="mb-12">
            <form onSubmit={() => handleSubmit}>
              <div className="flex flex-col">
                <label className="sr-only" htmlFor="jobTitle">
                  Job Title
                </label>
                <input
                  type="text"
                  className="my-2 block h-16 w-full border-b-[1px] border-gray-500 bg-white px-4 text-4xl font-bold text-dark placeholder-gray-500 placeholder:font-thin placeholder:text-gray-500 focus-visible:border-none"
                  name="jobTitle"
                  placeholder="Job Title"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
              <p className="mt-4 mb-2 text-xl">Fine Tuning:</p>
              <div className="flex flex-col">
                <label htmlFor="industry" className="sr-only">
                  Industry
                </label>
                <input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="my-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-lg placeholder-gray-500 shadow-sm"
                  placeholder="Industry (Optional)"
                  type="text"
                  name="industry"
                  id="industry"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="keywords" className="sr-only">
                  Keywords for AI (Optional)
                </label>
                <textarea
                  rows={3}
                  value={keyWords}
                  onChange={(e) => setKeyWords(e.target.value)}
                  name="keyWords"
                  id="keyWords"
                  placeholder="Keywords for AI (Optional)"
                  className="my-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-lg placeholder-gray-500 shadow-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="sr-only" htmlFor="tone">
                  Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="my-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-lg placeholder-gray-500 shadow-sm"
                  name="tone"
                  id="tone"
                >
                  <option value="default">Select Tone (Optional)</option>
                  <option value="casual">Casual</option>
                  <option value="friendly">Friendly</option>
                  <option value="professional">Professional</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="words" className="sr-only">
                  Words (Optional)
                </label>
                <input
                  value={numWords}
                  onChange={(e) => setNumWords(e.target.value)}
                  type="number"
                  className="my-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-lg placeholder-gray-500 shadow-sm"
                  placeholder="Word Count - Default: 200 words"
                  name="words"
                  id="words"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="language" className="sr-only">
                  Language (Optional)
                </label>
                <input
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  type="text"
                  className="my-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-lg placeholder-gray-500 shadow-sm"
                  placeholder="Language - Default: English"
                  name="language"
                  id="language"
                />
              </div>

              <button
                className={`mt-2.5 h-16 w-full rounded border-2 border-primary bg-primary px-4 text-lg font-bold text-white transition-all duration-200 hover:bg-white hover:text-primary
                ${
                  isGenerating || jobTitle === ""
                    ? "cursor-not-allowed opacity-50 hover:bg-primary hover:text-white"
                    : ""
                }`}
                type="submit"
                disabled={isGenerating || jobTitle === ""}
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-4">
                    <Loader />
                    <span>Generating. Please wait...</span>
                  </div>
                ) : (
                  "Generate Job Description"
                )}
              </button>
            </form>
          </div>
          <div className="">
            <p className="mt-4 mb-2 text-xl">Result:</p>
            <div className="flex flex-col">
              <label htmlFor="output" className="sr-only">
                Output
              </label>
              <textarea
                rows={21}
                name="output"
                onChange={(e) => setJobDescription(e.target.value)}
                value={jobDescription}
                disabled={jobDescription === ""}
                id="output"
                placeholder="AI Generated Job Description"
                className="my-2 block w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-lg placeholder-gray-500 shadow-sm"
              />
              <button
                onClick={handleCopy}
                className="cursor-pointer rounded border-2 border-primary bg-primary py-3 px-4 text-xl font-bold text-white transition-all duration-200 hover:bg-white hover:text-primary disabled:cursor-default disabled:opacity-50 disabled:hover:bg-primary disabled:hover:text-white"
                type="submit"
                disabled={jobDescription === ""}
              >
                {isCopied ? "Copied" : "Copy to Clipboard"}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default PostGenerator;
