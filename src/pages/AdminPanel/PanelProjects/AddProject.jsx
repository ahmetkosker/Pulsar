import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { app, auth } from "../../../configs/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PanelNavbar from "../../../components/PanelNavigation/PanelNavbar";

function AddProject() {
  const [image, setImage] = useState(null);
  const storage = getStorage(app);

  const navigation = useNavigate();

  const chechAuthenticate = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        navigation("/adminpanel");
      }
    });
  };

  useEffect(() => {
    chechAuthenticate();
  }, []);

  const [formData, setFormData] = useState({
    artistName: "",
    artistJobTitle: "",
    projectLink: ""
  });

  const getImage = async (path) => {
    let itemRef = ref(storage, path);
    const url = await getDownloadURL(itemRef)
      .then((res) => res)
      .catch((err) => null);
    return url;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [features, setFeatures] = useState([""]);

  const handleAddSpotifyLink = () => {
    setFeatures([...features, ""]);
  };

  const handleSpotifyLinkChange = (index, value) => {
    const updatedLinks = [...features];
    updatedLinks[index] = value;
    setFeatures(updatedLinks);
  };

  const handleRemoveSpotifyLink = (index) => {
    const updatedLinks = [...features];
    updatedLinks.splice(index, 1);
    setFeatures(updatedLinks);
  };

  console.log(features);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageToDB = "";
    let controllerValue = "";


    const imagePath = ref(storage, `/projects/${uuidv4()}`);

    await uploadBytes(imagePath, image).then(async (snapshot) => {
      imageToDB = await getImage(snapshot.metadata.fullPath);
    }).then(() => {
      if (formData.projectLink === "") {
        controllerValue = imageToDB
      }
    })

    axios
      .post("https://addproject-zkwsxnxtga-ew.a.run.app", {
        artistName: formData.artistName,
        artistJobTitle: formData.artistJobTitle,
        features,
        projectImage: imageToDB,
        projectLink: controllerValue
      })
      .then((res) => {
        toast.success("Proje başarıyla eklendi.");
        setTimeout(() => {
          navigation("/panelHomepage");
        }, 2000);
      })
      .catch((err) => toast.error("Proje eklenirken bir hata oluştu."));
  };

  return (
    <>
      <PanelNavbar
        pageTitle={"Add Project"}
        goBackTitle={"Go Back"}
        goBackFunction={"/manage-projects"}
      />
      <div className="container mx-auto p-4 mt-4">
        <ToastContainer />
        <h2 className="text-2xl font-bold mb-4">Sanatçı Bilgi Formu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="artistName" className="block font-medium">
              Proje resmi:
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              type="file"
              accept="image/*"
            />
          </div>
          <div>
            <label htmlFor="artistName" className="block font-medium">
              Proje Adı:
            </label>
            <input
              type="text"
              id="artistName"
              name="artistName"
              value={formData.artistName}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label htmlFor="artistJobTitle" className="block font-medium">
              Proje Türü:
            </label>
            <input
              type="text"
              id="artistJobTitle"
              name="artistJobTitle"
              value={formData.artistJobTitle}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div>
            <label htmlFor="artistJobTitle" className="block font-medium">
              Proje Linki (Spotify):
            </label>
            <input
              type="text"
              id="artistJobTitle"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
            />
          </div>
          <div className="relative z-0 w-full mb-6 group mt-[38px]">
            {features.map((link, index) => (
              <div key={index} className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  required
                  value={link}
                  onChange={(e) => handleSpotifyLinkChange(index, e.target.value)}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Örn = Gitarist: Ahmet Köşker
                </label>
                <button
                  type="button"
                  className="absolute top-4 right-4 text-red-500 cursor-pointer"
                  onClick={() => handleRemoveSpotifyLink(index)}
                >
                  Kaldır
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSpotifyLink}
              className="text-blue-600 mt-2 mb-4 font-medium text-sm"
            >
              Yeni özellik ekle
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Formu Gönder
          </button>
        </form>
      </div>
    </>
  );
}

export default AddProject;
