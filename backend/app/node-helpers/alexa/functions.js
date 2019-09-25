import User from "../../models/User";

export const LaunchResponseGetter = userId => {
  return new Promise((resolve, reject) => {
    User.findOne({ userId: userId })
      .then(user => {
        if (user != null) {
          resolve({
            speechText: "Welcome to InterPlatformChat.",
            cardContent: "Welcome to InterPlatformChat."
          });
        } else {
          resolve({
            speechText:
              "Welcome to InterPlatformChat. You haven't registered with InterPlatformChat. Open Alexa app to register.",
            cardContent:
              "Welcome to InterPlatformChat. You haven't registered with InterPlatformChat. Open Alexa app to register."
          });
        }
      })
      .catch(err => {
        console.log("Alexa function error : " + err);
      });
  });
};

export default { LaunchResponseGetter };
