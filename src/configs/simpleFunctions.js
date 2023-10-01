import { doc, getDoc } from "firebase/firestore";
import { app, auth, db } from "./firebaseConfig";

export let aboutTitle = "";
export let contactPhoneNumber = "";
export let footerTitle = "";
export let instagramLink = "";
export let shopifyLink = "";


export const getAboutTitle = async () => {
    const docRef = doc(db, "StaticFields", "fields");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        aboutTitle = docSnap.data().aboutTitle;
        contactPhoneNumber = docSnap.data().contactPhoneNumber;
        footerTitle = docSnap.data().footerTitle;
        instagramLink = docSnap.data().instagramLink;
        shopifyLink = docSnap.data().shopifyLink;
    } else {
        console.log("No such document!");
    }
}