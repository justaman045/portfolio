// utils/instagramApi.ts

import axios from "axios";

const instagramUserAgent =
  "Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)";

export const getInstagramProfile = async (username: string): Promise<number | null> => {
  try {
    const response = await axios.get(`https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`, {
      headers: {
        "User-Agent": instagramUserAgent,
      },
    });

    const profileData = response.data.user.edge_followed_by.count;
    return profileData;
  } catch (error) {
    console.error("Error fetching Instagram profile:", error);
    return null;
  }
};
