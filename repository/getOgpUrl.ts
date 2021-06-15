import firebase from "firebase";

export const getOgpUrl = (uuid: string): Promise<string | void> => {
  const strage = firebase.storage();
  const pathReference = strage.ref(uuid);
  return pathReference
    .getDownloadURL()
    .then((url: string) => {
      console.log("get ogp url");
      return url;
    })
    .catch((e) => {
      console.log("Error " + e);
    });
};
