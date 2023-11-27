// pages/index.tsx

import { Metadata } from "next";
import axios, { AxiosError, AxiosResponse } from "axios";

import siteMetadata from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Uses",
    description: "Stuff I use",
  };
}

// -----------Dev----------------------------
let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "https://dev.to/api/followers/users?per_page=1000",
  headers: {
    api_key: "qiCs3EGp8npWFRB2wVeVMZmH",
  },
};

let devtoFollowers: string;
let devtoArticles: string;
axios
  .request(config)
  .then((response) => {
    devtoFollowers = JSON.stringify(response.data.length);
  })
  .catch((error) => {
    console.log(error);
  });
axios
  .get(`https://dev.to/api/articles?username=${siteMetadata.username}`)
  .then((response) => {
    devtoArticles = JSON.stringify(response.data.length);
  })
  .catch((error) => {
    console.log(error);
  });
// -----------Dev----------------------------

interface GraphQLRequestProps {
  username?: string;
  token?: string;
}

const graphqlEndpoint = "https://gql.hashnode.com/";
const token = "c590f68e-c846-465d-ba67-feced6c10c8f"; // Replace with your actual Hashnode API token
const usernameToFetch = "justaman045";

const getUserData = async ({ username, token }: GraphQLRequestProps): Promise<any | AxiosError> => {
  const query = `
    query User {
    user(username: "justaman045") {
        followersCount
        publications(first: 50) {
            edges {
                node {
                    url
                    posts(first: 20) {
                        totalDocuments
                    }
                }
            }
        }
    }
}

  `;

  const variables = {
    username: username,
  };

  const headers = {
    Authorization: token,
  };

  try {
    const response = await axios.post<any>(graphqlEndpoint, { query, variables }, { headers });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    return error as AxiosError;
  }
};

const fetchGithubData = async (username: string) => {
  try {
    // Fetch user details (including followers count)
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const { public_repos, followers } = userResponse.data;
    return { public_repos, followers };
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error.response?.data || error.message || error);
  }
};

export default async function Stats() {
  const hashnodeData = await getUserData({ username: usernameToFetch, token: token });
  const githubData = await fetchGithubData(siteMetadata.username);

  return (
    <>
      <div className="flex min-h-screen items-center justify-center px-24">
        <div className="w-full">
          <div className="group relative -ml-4 flex scroll-mt-40 items-center pl-4">
            <a
              href="#"
              className="border-blue-gray-50 bg-blue-gray-50/50 absolute z-50 -ml-10 mb-2.5 rounded-md border p-1 opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className="pointer-events-none h-3.5 w-3.5 rounded-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                ></path>
              </svg>
            </a>
            <h2 className="!mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-primary antialiased">
              Writing Platforms
            </h2>
          </div>
          <p className="!mb-4 block font-sans text-base !font-normal leading-relaxed !text-gray-600 text-inherit antialiased">
            All the Writing Platforms that I write to
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
            <a
              className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-slate-600 px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
              href="https://dev.to/justaman045"
              target="_blank"
            >
              <span className="my-6 grid h-24 w-3/4 place-items-center">
                <h1>Dev.to</h1>
                <h3>Dev.to Followers: {devtoFollowers}</h3>
                <h3>Dev.to Articles: {devtoArticles}</h3>
              </span>
            </a>
            {hashnodeData && (
              <a
                className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-slate-600 px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                href={hashnodeData.data.user.publications.edges[0].node.url}
                target="_blank"
              >
                <span className="my-6 grid h-24 w-3/4 place-items-center">
                  <h1>Hashnode</h1>
                  <h3>Hashnode Followers: {hashnodeData.data.user.followersCount}</h3>
                  <h3>Hashnode Articles: {hashnodeData.data.user.publications.edges[0].node.posts.totalDocuments}</h3>
                </span>
              </a>
            )}
          </div>
          <div className="group relative -ml-4 flex scroll-mt-40 items-center pl-4 pt-8">
            <a
              href="#"
              className="border-blue-gray-50 bg-blue-gray-50/50 absolute z-50 -ml-10 mb-2.5 rounded-md border p-1 opacity-0 hover:opacity-100 group-hover:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className="pointer-events-none h-3.5 w-3.5 rounded-lg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                ></path>
              </svg>
            </a>
            <h2 className="!mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-primary antialiased">
              Development Source Codes and Profiles
            </h2>
          </div>
          <p className="!mb-4 block font-sans text-base !font-normal leading-relaxed !text-gray-600 text-inherit antialiased">
            All the Development Source codes and my Profiles
          </p>
          <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
            {githubData && (
              <a
                className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-slate-600 px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                href={`https://github.com/${siteMetadata.username}`}
                target="_blank"
              >
                <span className="my-6 grid h-24 w-3/4 place-items-center">
                  <h1>GitHub</h1>
                  <h3>GitHub Followers: {githubData.followers}</h3>
                  <h3>GitHub Repositories: {githubData.public_repos}</h3>
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
