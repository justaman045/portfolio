import axios, { AxiosError, AxiosResponse } from "axios";

import siteMetadata from "@/lib/metadata";

// -----------Dev----------------------------
export async function getDevProfile(): Promise<any> {
  try {
    const followersResponse: AxiosResponse<any> = await axios.get("https://dev.to/api/followers/users?per_page=1000", {
      headers: {
        api_key: "qiCs3EGp8npWFRB2wVeVMZmH",
      },
    });

    const articlesResponse: AxiosResponse<any> = await axios.get(
      `https://dev.to/api/articles?username=${siteMetadata.username}`
    );

    const devtoFollowers = JSON.stringify(followersResponse.data.length);
    const devtoArticles = JSON.stringify(articlesResponse.data.length);

    return { devtoArticles, devtoFollowers };
  } catch (error: any) {
    console.error("Error fetching Dev.to data:", error.response?.data || error.message || error);
    return { devtoArticles: "0", devtoFollowers: "0" };
  }
}
// -----------Dev----------------------------

// ----------------------------------------------------------Hashnode-------------------------------------------------
interface GraphQLRequestProps {
  username?: string;
  token?: string;
}

const graphqlEndpoint = "https://gql.hashnode.com/";
const token = "c590f68e-c846-465d-ba67-feced6c10c8f"; // Replace with your actual Hashnode API token
export const usernameToFetch = "justaman045";

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
    return response.data;
  } catch (error) {
    return error as AxiosError;
  }
};
// ----------------------------------------------------------Hashnode-------------------------------------------------

// ----------------------------------------------------------Github-------------------------------------------------

export const fetchGithubData = async (username: string) => {
  try {
    // Fetch user details (including followers count)
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const { public_repos, followers } = userResponse.data;
    return { public_repos, followers };
  } catch (error: any) {
    console.error("Error fetching GitHub data:", error.response?.data || error.message || error);
  }
};

// ----------------------------------------------------------Github-------------------------------------------------

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

interface FetchSubscribersOptions {
  apiSecret: string;
}

export const fetchSubscribers = async (options: FetchSubscribersOptions = { apiSecret }): Promise<any | AxiosError> => {
  const apiUrl = "https://api.convertkit.com/v3/subscribers";

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      api_secret: options.apiSecret,
    },
  };

  try {
    const response = await axios.get<ConvertKitResponse>(apiUrl, config);
    return response.data;
  } catch (error) {
    return error as AxiosError;
  }
};

// Example usage
const apiSecret = "k9dV4Qu0uEQZ2ooc7Ux_px0RbxqhSqgxyl5mG3wF0XM";
// ----------------------------------------------------------ConvertKit-------------------------------------------------

// ----------------------------------------------------------GitLab-------------------------------------------------
interface GitLabUser {
  username: string;
  name: string;
  followers: number;
}

interface GitLabRepository {
  id: number;
  name: string;
  description: string;
}

interface GitLabResponse<T> {
  data: T;
}

// Replace 'your_access_token' with your actual GitLab access token
const accessToken = "glpat-1HBR94sWVKsXpQ8nUmsN";
const apiUrl = "https://gitlab.com/api/v4";

export const getGitLabData = async (): Promise<any | AxiosError> => {
  try {
    // Fetch user information
    const userApiUrl = `${apiUrl}/users/coderaman07/projects`;
    const userResponse = await axios.get<GitLabResponse<GitLabUser>>(userApiUrl, {
      headers: {
        "PRIVATE-TOKEN": accessToken,
      },
    });
    const user = userResponse.data;

    return { user };
  } catch (error) {
    return error as AxiosError;
  }
};
