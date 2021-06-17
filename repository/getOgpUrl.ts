import firebase from "firebase/app";
import "firebase/storage";

export const getOgpUrl = async (uuid: string) => {
  const strage = firebase.storage();
  const pathReference = strage.ref(uuid);
  return pathReference
    .getDownloadURL()
    .then(async (url: string) => {
      return url;
    })
    .catch((e) => {
      console.log("Error " + e);
    });
};
