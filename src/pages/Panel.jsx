import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyAqTYo9uZKBeaXgz9cRqn1Ov_KGvyrwKCI",
  authDomain: "pulsar-cloud-services.firebaseapp.com",
  projectId: "pulsar-cloud-services",
  storageBucket: "pulsar-cloud-services.appspot.com",
  messagingSenderId: "391284565114",
  appId: "1:391284565114:web:f584bc2aa153e4f7f847c3",
  measurementId: "G-DCECZRZ1J4",
};

const Panel = () => {
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const [project, setProject] = useState("");
  const [nameAndSurname, setNameAndSurname] = useState("");
  const [image, setImage] = useState("");
  const [VAImage, setVAImage] = useState("");
  const [SASP, setSASP] = useState("");
  const [role, setRole] = useState("");
  const [detail, setDetail] = useState("");

  const getImage = async (path) => {
    let itemRef = ref(storage, path);
    const url = await getDownloadURL(itemRef)
      .then((res) => res)
      .catch((err) => null);
    return url;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    let imageToDB = "";
    let VAImageToDB = "";

    if (image) {
      const imagePath = ref(storage, `PP/${uuidv4()}`);

      await uploadBytes(imagePath, image).then(async (snapshot) => {
        imageToDB = await getImage(snapshot.metadata.fullPath);
      });
    }

    if (role === "VA" && VAImage) {
      const imagePath = ref(storage, `VAImage/${uuidv4()}`);

      await uploadBytes(imagePath, VAImage).then(async (snapshot) => {
        VAImageToDB = await getImage(snapshot.metadata.fullPath);
      });
      axios
        .post("https://addartist-zkwsxnxtga-ew.a.run.app", {
          project: VAImageToDB,
          nameAndSurname,
          image: imageToDB,
          role: "Visual Artist",
          detail,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else if (role === "SE" && SASP) {
      console.log(SASP, nameAndSurname, imageToDB, role, detail);
      axios
        .post("https://addartist-zkwsxnxtga-ew.a.run.app", {
          project: SASP,
          nameAndSurname,
          image: imageToDB,
          role: "Sound Engineer",
          detail,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <form
      className="max-w-6xl mx-auto mt-32"
      autocomplete="off"
      onSubmit={handleSave}
    >
      <div className="relative z-0 w-full mb-6 group">
        <input
          value={nameAndSurname}
          onChange={(e) => setNameAndSurname(e.target.value)}
          type="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          İsim ve soyisim
        </label>
      </div>
      <div className="relative z-0 w-full mb-6 group">
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          type="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
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
      {role === "SE" ? (
        <div className="relative z-0 w-full mb-6 group mt-[38px]">
          <input
            type="text"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => setSASP(e.target.value)}
            value={SASP}
          />
          <label
            for="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Artist Spotify Linki
          </label>
        </div>
      ) : role === "VA" ? (
        <div className="relative z-0 w-full mb-6 group mt-6">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            Artist Profil Fotoğrafı
          </label>
          <input
            class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={(e) => setVAImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
      ) : (
        ""
      )}

      <button
        type="submit"
        className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default Panel;
