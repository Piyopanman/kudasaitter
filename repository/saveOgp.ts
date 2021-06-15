import firebase from "firebase";

export const saveOgp = (dataURL: string, uuid: string) => {
  const strageRef = firebase.storage().ref();
  const ogpRef = strageRef.child(`${uuid}`);
  ogpRef
    .putString(dataURL, "data_url")
    .then(() => {
      console.log("uploaded a data_url string");
    })
    .catch((e) => {
      console.log("Error" + e);
    });
};
