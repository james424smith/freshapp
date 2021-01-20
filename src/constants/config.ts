export declare const __DEV__: boolean;
import Config from "react-native-ultimate-config";

/* So babel needs to know that there is a change to the file where the react-native-dotenv is being imported.
 * That's why import the env variables here and export them to whenever we use them for. As soon as change the .env file,
 * we need to come here and make any small -not-breaking- change (such as adding a space to the console.log string) in order to get the updated values
 */

export default () => {
  return {
    ENV: Config.ENV || "DUMMY",
    API_BASE_URL: Config.API_BASE_URL,
    IMAGES_PREFIX_URL: Config.IMAGES_PREFIX_URL,
    WEBSOCKET_BASE_URL: Config.WEBSOCKET_BASE_URL,
    GOOGLE_MAPS_API_KEY: Config.GOOGLE_MAPS_API_KEY,
    SSL_EXPIRATION_WARNING: Config.SSL_EXPIRATION_WARNING,
  };
};
