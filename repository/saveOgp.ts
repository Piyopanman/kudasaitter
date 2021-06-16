import firebase from "firebase";

export const saveOgp = async (dataURL: string, uuid: string) => {
  const strageRef = firebase.storage().ref();
  const ogpRef = strageRef.child(`${uuid}`);
  return ogpRef
    .putString(dataURL, "data_url")
    .then(() => {
      console.log("2. Uploaded");
    })
    .catch((e) => {
      console.log("Error" + e);
    });
};
