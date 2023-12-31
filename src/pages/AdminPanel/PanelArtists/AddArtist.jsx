import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";
import { app, auth } from "../../../configs/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "lottie-react";
import PanelNavbar from "../../../components/PanelNavigation/PanelNavbar";

const AddArtist = () => {
  const storage = getStorage(app);
  const navigate = useNavigate();

  const [nameAndSurname, setNameAndSurname] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [detail, setDetail] = useState("");
  const [artistTitle, setArtistTitle] = useState("");

  const chechAuthenticate = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        navigate("/adminpanel");
      }
    });
  };

  useEffect(() => {
    chechAuthenticate();
  }, []);

  const getImage = async (path) => {
    let itemRef = ref(storage, path);
    const url = await getDownloadURL(itemRef)
      .then((res) => res)
      .catch((err) => null);
    return url;
  };

  const [loading, setLoading] = useState(false)

  const handleSave = async (e) => {
    setLoading(true)
    e.preventDefault();

    let imageToDB = "";
    let VAImageToDB = "";

    if (image) {
      const imagePath = ref(storage, `PP/${uuidv4()}`);

      await uploadBytes(imagePath, image).then(async (snapshot) => {
        imageToDB = await getImage(snapshot.metadata.fullPath);
      });
    }

    if (role === "VA" && VAImages.length) {
      const responseImages = await Promise.all(
        VAImages.map(async (image) => {
          const imagePath = ref(storage, `VAImage/${uuidv4()}`);

          await uploadBytes(imagePath, image).then(async (snapshot) => {
            VAImageToDB = await getImage(snapshot.metadata.fullPath);
          });
          return VAImageToDB;
        })
      );

      axios
        .post("https://addartist-zkwsxnxtga-ew.a.run.app", {
          projects: responseImages,
          nameAndSurname,
          image: imageToDB,
          role: "Visual Artist",
          detail,
          artistTitle: artistTitle,
        })
        .then((res) => {
          toast.success("Artist başarıyla eklendi.");
          setTimeout(() => {
            navigate("/manage-artists");
            setLoading(false)
          }, 2000);
        })
        .catch((err) => toast.error("Artist eklenirken bir hata oluştu."));
    } else if (role === "SE" && spotifyLinks.length) {
      console.log(spotifyLinks);
      axios
        .post("https://addartist-zkwsxnxtga-ew.a.run.app", {
          projects: spotifyLinks,
          nameAndSurname,
          image: imageToDB,
          role: "Sound Engineer",
          detail,
          artistTitle: artistTitle,
        })
        .then((res) => {
          toast.success("Artist başarıyla eklendi.");
          setTimeout(() => {
            navigate("/manage-artists");
          }, 2000);
        })
        .catch((err) => toast.error("Artist eklenirken bir hata oluştu."));
    }
  };
  const [spotifyLinks, setSpotifyLinks] = useState([""]);

  const handleAddSpotifyLink = () => {
    setSpotifyLinks([...spotifyLinks, ""]);
  };

  const handleSpotifyLinkChange = (index, value) => {
    const updatedLinks = [...spotifyLinks];
    updatedLinks[index] = value;
    setSpotifyLinks(updatedLinks);
  };

  const handleRemoveSpotifyLink = (index) => {
    const updatedLinks = [...spotifyLinks];
    updatedLinks.splice(index, 1);
    setSpotifyLinks(updatedLinks);
  };

  const [VAImages, setVAImages] = useState([]);
  console.log(VAImages);
  const handleVAImageChange = (index, file) => {
    const updatedImages = [...VAImages];
    updatedImages[index] = file;
    setVAImages(updatedImages);
  };

  const handleAddVAImage = () => {
    setVAImages([...VAImages, null]);
  };

  const handleRemoveVAImage = (index) => {
    const updatedImages = [...VAImages];
    updatedImages.splice(index, 1);
    setVAImages(updatedImages);
  };

  return (
    <>
      <PanelNavbar
        pageTitle={"Add Artist"}
        goBackTitle={"Go Back"}
        goBackFunction={"/manage-artists"}
      />
      <form
        className="max-w-6xl mx-auto mt-32"
        autocomplete="off"
        onSubmit={handleSave}
      >
        <ToastContainer />
        <div className="relative z-0 w-full mb-6 group">
          <input
            value={nameAndSurname}
            onChange={(e) => setNameAndSurname(e.target.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            İsim ve soyisim
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Artist hakkında bilgi
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Artist Profil Fotoğrafı
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">Artist tipi</InputLabel>
            <Select
              onChange={(e) => setRole(e.target.value)}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Artist tipi"
            >
              <MenuItem value={"SE"}>Sound Engineer</MenuItem>
              <MenuItem value={"VA"}>Visual Artist</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="mt-6">
          <p className="block font-medium">
            Artist Ünvanı:
          </p>
          <input
            type="text"
            placeholder="Artist Ünvanı"
            value={artistTitle}
            onChange={(e) => setArtistTitle(e.target.value)}
            className="border p-2 w-full rounded-md"
          />
        </div>
        {role === "SE" ? (
          <div className="relative z-0 w-full mb-6 group mt-[38px]">
            {spotifyLinks.map((link, index) => (
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
                  Spotify Link {index + 1}
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
              Spotify Linki Ekle
            </button>
          </div>
        ) : role === "VA" ? (
          <div className="relative z-0 w-full mb-6 group mt-6">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Artist Eserleri
            </label>
            {VAImages.map((image, index) => (
              <div key={index} className="relative z-0 w-full mb-6 group">
                <input
                  type="file"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 peer"
                  placeholder=" "
                  required
                  onChange={(e) => handleVAImageChange(index, e.target.files[0])}
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Artist Eserleri {index + 1}
                </label>
                <button
                  type="button"
                  className="absolute top-4 right-4 text-red-500 cursor-pointer"
                  onClick={() => handleRemoveVAImage(index)}
                >
                  Kaldır
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddVAImage}
              className="text-blue-600 mt-2 mb-4 font-medium text-sm"
            >
              Artist Eser Ekle
            </button>
          </div>
        ) : (
          ""
        )}
        {loading
          ?
          <div className="mt-10 w-24 h-10 rounded-lg flex justify-center items-center bg-blue-700">
            <Lottie
              className="w-32 h-32 object-contain"
              animationData={require("../../../components/loadingAnimation.json")} />
          </div>
          :
          <div className="flex flex-row justify-start mt-10 items-center">
            <button
              type="submit"
              className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Submit</button>
            <button
              type="back"
              onClick={() => navigate("/manage-artists")}
              className="text-white mt-10 ml-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Back
            </button>
          </div>
        }
      </form >
    </>
  );
};

export default AddArtist;
