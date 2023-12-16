import axios, { AxiosError, AxiosResponse } from "axios";

import siteMetadata from "@/lib/metadata";

// -----------Dev----------------------------
export async function getDevProfile(): Promise<any> {
  try {
    const followersResponse: AxiosResponse<any> = await axios.get("https://dev.to/api/followers/users?per_page=1000", {
      headers: {
        api_key: process.env.devto_api_key,
      },
    });

    const articlesResponse: AxiosResponse<any> = await axios.get(
      `https://dev.to/api/articles?username=${siteMetadata.username}`
    );

    const devtoFollowers = JSON.stringify(followersResponse.data.length);
    const devtoArticles = JSON.stringify(articlesResponse.data.length);

    return {
      url: `https://dev.to/${siteMetadata.username}`,
      numberOfArticles: devtoArticles,
      followers: devtoFollowers,
      platformName: "Dev.to",
    };
  } catch (error: any) {
    console.error("Error fetching Dev.to data:", error.response?.data || error.message || error);
  }
}
// -----------Dev----------------------------

// ----------------------------------------------------------Hashnode-------------------------------------------------
interface GraphQLRequestProps {
  username?: string;
  token?: string;
}

const graphqlEndpoint = "https://gql.hashnode.com/";
const token = process.env.hashnode_api_key; // Replace with your actual Hashnode API token

export const getUserData = async ({ username, token }: GraphQLRequestProps): Promise<any | AxiosError> => {
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
    return {
      url: response.data.data.user.publications.edges[0].node.url,
      followers: response.data.data.user.followersCount,
      numberOfArticles: response.data.data.user.publications.edges[0].node.posts.totalDocuments,
      platformName: "Hashnode",
    };
  } catch (error) {
    return error as AxiosError;
  }
};
// ----------------------------------------------------------Hashnode-------------------------------------------------

// ----------------------------------------------------------ConvertKit-------------------------------------------------
interface Subscriber {
  id: string;
  created_at: string;
  email_address: string;
  name: string;
  fields: Record<string, any>;
}

interface ConvertKitResponse {
  total_subscribers: number;
  subscribers: Subscriber[];
}

const apiSecret = process.env.convertKit_api_key;
export const fetchSubscribers = async (): Promise<any | AxiosError> => {
  const apiUrl = "https://api.convertkit.com/v3/subscribers";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      api_secret: apiSecret,
    },
  };

  try {
    const response = await axios.get<ConvertKitResponse>(apiUrl, config);
    return {
      url: "https://justaman045.hashnode.dev/newsletter",
      followers: response.data.total_subscribers,
      platformName: "ConvertKit",
    };
  } catch (error) {
    return error as AxiosError;
  }
};

// Example usage
// ----------------------------------------------------------ConvertKit-------------------------------------------------

// -----------------------------------------------------------Writing Platforms-----------------------------------------

export async function blogginDetails() {
  const hashnodeData = await getUserData({ username: siteMetadata.username });
  const devProfile = await getDevProfile();
  const subscribersData = await fetchSubscribers();
  return [hashnodeData, devProfile, subscribersData];
}

// -----------------------------------------------------------Writing Platforms-----------------------------------------

// ----------------------------------------------------------GitLab-------------------------------------------------

const accessToken = process.env.gitlab_api_key;
const apiUrl = "https://gitlab.com/api/v4";

export const getGitLabData = async (): Promise<any | AxiosError> => {
  try {
    // Fetch user information
    const userApiUrl = `${apiUrl}/users/coderaman07/projects`;
    const userResponse = await axios.get<any>(userApiUrl, {
      headers: {
        "PRIVATE-TOKEN": accessToken,
      },
    });
    const user = userResponse.data;

    return { username: "gitlab.com/coderaman07", public_repo: user.length, platform: "GitLab" };
  } catch (error) {
    return error as AxiosError;
  }
};

// ----------------------------------------------------------GitLab-------------------------------------------------

// ----------------------------------------------------------Github-------------------------------------------------

export const fetchGithubData = async (username: string) => {
  try {
    // Fetch user details (including followers count)
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const { public_repos, followers } = userResponse.data;
    return {
      username: `github.com/${siteMetadata.username}`,
      public_repo: public_repos,
      followers: followers,
      platform: "GitHub",
    };
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error.response?.data || error.message || error);
  }
};

// ----------------------------------------------------------Github-------------------------------------------------

// ----------------------------------------------------------Coding-------------------------------------------------

export async function codingData() {
  const githubData = await fetchGithubData(siteMetadata.username);
  const gitlabData = await getGitLabData();
  return [githubData, gitlabData];
}

// ----------------------------------------------------------Coding-------------------------------------------------

// ----------------------------------------------------------Instagram-------------------------------------------------
export async function getInstaData(): Promise<any> {
  try {
    const lethal_astra: AxiosResponse<any> = await axios.get(
      "https://graph.instagram.com/7150081325048019?fields=media_count,username&access_token=IGQWRPOE5odDBSeXk4MC1Fa3RLVXpIcFNtd1JrVkI5X1ZAmekFEbWZALaHpyZAFRCbFE5b2RaMDlvQWlzb1c4WVZAIQjFpeFZAhQk42Q0h4R2FRanI2WDl5TXBhcFlPZAnZAKXzNfT2RRUGIwbjhjM3BIbF9TQnpHMVNaYncZD"
    );

    const OneStayConsistent: AxiosResponse<any> = await axios.get(
      "https://graph.instagram.com/24932505826394447?fields=media_count,username&access_token=IGQWRQMGpsbmlpS2RfaDVGdHl1NmtFRUVkREZA1RkVyUkNhLS1zRGNCcW55RFMtVnJacllicW80N0hXMFV6T1I0ejFKY0lkLWNVR3ZAuYnFqandaTGFGRnhfMkwyYm1Ebi1lSm9uS3lrQXhwQUxKQlBSQ0tCYVl2NWMZD"
    );

    const lethal_astra_data = lethal_astra.data;
    const OneStayConsistent_data = OneStayConsistent.data;
    if (lethal_astra.status == 200 && OneStayConsistent.status == 200) {
      return [lethal_astra_data, OneStayConsistent_data];
    }
  } catch (error: any) {
    console.error("Error fetching Dev.to data:", error.response?.data || error.message || error);
  }
}
// ----------------------------------------------------------Instagram-------------------------------------------------
