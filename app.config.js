import "dotenv/config";
import appJson from "./app.json";

export default {
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      airlabsApiKey: process.env.AIRLABS_API_KEY,
      apiUrl: process.env.API_URL,
    },
  },
};
