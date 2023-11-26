// pages/index.tsx

import { Metadata } from "next";
import axios from "axios";

import siteMetadata from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Social Stats",
    description: "Social Statistics of all My SOcial Media Accounts",
  };
}

const getInstagramProfile = async (username: string) => {
  const userAgent =
    "Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)";

  try {
    const response = await axios.get(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        "User-Agent": userAgent,
      },
    });

    const profileData = response.data;
    return profileData.data;
  } catch (error) {
    console.error("Error fetching Instagram profile:", error);
    return null;
  }
};

export default async function Stats() {
  let animeAccount = await getInstagramProfile(siteMetadata.instagramAccounts[0]);
  let motiationalAccount = await getInstagramProfile(siteMetadata.instagramAccounts[2]);
  let personalAccount = await getInstagramProfile(siteMetadata.instagramAccounts[1]);
  let privateAccount = await getInstagramProfile(siteMetadata.instagramAccounts[3]);

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
              Instagram
            </h2>
          </div>
          <p className="!mb-4 block font-sans text-base !font-normal leading-relaxed !text-gray-600 text-inherit antialiased">
            All the Instagram Accounts that I handle.
          </p>
          {animeAccount && (
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
              <a
                className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-gradient-to-tr px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                href="#"
              >
                <span className="my-6 grid h-24 w-24 place-items-center">
                  <h1>Instagram Followers: {animeAccount.user.edge_followed_by.count}</h1>
                </span>
              </a>
            </div>
          )}
          {motiationalAccount && (
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
              <a
                className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-gradient-to-tr px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                href="#"
              >
                <span className="my-6 grid h-24 w-24 place-items-center">
                  <h1>Instagram Followers: {motiationalAccount.user.edge_followed_by.count}</h1>
                </span>
              </a>
            </div>
          )}
          {personalAccount && (
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
              <a
                className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-gradient-to-tr px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                href="#"
              >
                <span className="my-6 grid h-24 w-24 place-items-center">
                  <h1>Instagram Followers: {personalAccount.user.edge_followed_by.count}</h1>
                </span>
              </a>
            </div>
          )}
          {privateAccount && (
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4" id="frameworks-integration">
              <a
                className="border-blue-gray-50 hover:border-blue-gray-100 hover:bg-blue-gray-50 grid w-full min-w-[7rem] transform cursor-pointer place-items-center rounded-xl border bg-gradient-to-tr px-3 py-2 transition-all hover:scale-105 hover:bg-opacity-25"
                href="#"
              >
                <span className="my-6 grid h-24 w-24 place-items-center">
                  <h1>Instagram Followers: {privateAccount.user.edge_followed_by.count}</h1>
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
