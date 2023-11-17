import { AuthorType, SiteMetaData } from "@/types";

import { socialProfiles } from "./social-data";

export const BASE_URL =
  `https://${process.env.VERCEL_URL}` ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  `http://localhost:${process.env.PORT || 3000}`;

export const defaultAuthor: AuthorType = {
  name: "{ Aman }",
  handle: "@justaman045",
  socialProfiles,
  email: "editingamer@gmail.com",
  website: "https://athenabyaman.vercel.app",
  jobTitle: "Sr. Systems Associate",
  company: "Infosys Ltd.",
  availableForWork: true,
  location: {
    city: "Noida",
    media: "/noida.avif",
  },
};

const defaultTitle = `${defaultAuthor.name}'s Blog`;
const defaultDescription = `I'm ${defaultAuthor.name}. Building hackin’ cool digital products around the world 🌴.`;

const siteMetadata: SiteMetaData = {
  title: {
    template: `%s | ${defaultTitle}`,
    default: defaultTitle,
  },
  description: defaultDescription,
  email: defaultAuthor.email,
  siteRepo: "https://gitlab.com/coderaman07/digital-garden",
  newsletterProvider: "convertkit",
  newsletterUrl: "https://athenabyaman.ck.page/newsletter",
  analyticsProvider: "umami",
  defaultTheme: "system",
  activeAnnouncement: false,
  announcement: {
    buttonText: "announcement Headline",
    link: "https://projektnotify.vercel.app",
  },
  postsPerPage: 4,
  postsOnHomePage: 4,
  projectsOnHomePage: 3,
};

export default siteMetadata;
