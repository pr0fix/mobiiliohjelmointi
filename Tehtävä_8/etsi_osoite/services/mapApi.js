import axios from "axios";
import { API_KEY } from "@env";

export const fetchCoordinates = async ({ address }) => {
  try {
    const res = await axios.get(
      `https://geocode.maps.co/search?q=${address}&api_key=${API_KEY}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching coordinates: ", error);
  }
};
