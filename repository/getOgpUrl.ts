import firebase from "firebase";

export const getOgpUrl = async (uuid: string) => {
  const strage = firebase.storage();
  const pathReference = strage.ref(uuid);
  return pathReference
    .getDownloadURL()
    .then(async (url: string) => {
      console.log("4. Downloaded");
      return url;
    })
    .catch((e) => {
      console.log("Error " + e);
    });
};
