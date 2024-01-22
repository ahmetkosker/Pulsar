import React, { useEffect, useState } from "react";
import { BsInstagram } from "react-icons/bs";
import { aboutTitle, footerTitle, getAboutTitle, instagramLink } from "../../configs/simpleFunctions";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/firebaseConfig";

const Footer = () => {
  const [footerTitle, setFooterTitle] = useState("");


  const getAboutTitle = async () => {
    const docRef = doc(db, "StaticFields", "fields");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setFooterTitle(docSnap.data().footerTitle);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getAboutTitle();
  }, [])


  return (
    <footer className="flex w-full justify-center items-center flex-row lg:w-[92%] xl:w-[95%] 2xl:w-[98%] py-1 fixed bottom-0">
      <BsInstagram
        onClick={() => window.open(instagramLink, "_blank")}
        className="text-3xl my-4 cursor-pointer absolute -left-4"
      />
      <p className="font-extrabold sm:text-lg text-xs">
        {footerTitle}
      </p>
    </footer>
  );
};

export default Footer;
