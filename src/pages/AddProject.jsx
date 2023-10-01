import axios from "axios";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { app, auth } from "../configs/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";


function AddProject() {
  const [image, setImage] = useState(null);
  const storage = getStorage(app);

  const navigation = useNavigate()

  const chechAuthenticate = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(uid)
      } else {
        navigation('/panellogin')
      }
    });
  }


  useEffect(() => {
    chechAuthenticate()
  }, [])

  const [formData, setFormData] = useState({
    artistName: "",
    artistJobTitle: "",
    jobType: "",
    producerName: "",
    lyrics: "",
    guitaristName: "",
    bassistName: "",
    drummerName: "",
    keyboardistName: "",
    mixerName: "",
    masteringName: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageToDB = "";

    const imagePath = ref(storage, `/projects/${uuidv4()}`);

    await uploadBytes(imagePath, image).then(async (snapshot) => {
      imageToDB = await getImage(snapshot.metadata.fullPath);
    });

    console.log(formData.guitaristName);

    axios
      .post("https://addproject-zkwsxnxtga-ew.a.run.app", {
        artistName: formData.artistName,
        artistJobTitle: formData.artistJobTitle,
        jobType: formData.jobType,
        producerName: formData.producerName,
        lyrics: formData.lyrics,
        guitaristName: formData.guitaristName,
        bassistName: formData.bassistName,
        drummerName: formData.drummerName,
        keyboardistName: formData.keyboardistName,
        mixerName: formData.mixerName,
        masteringName: formData.masteringName,
        projectImage: imageToDB,
      })
      .then((res) => alert("Proje başarıyla eklendi."))
      .catch((err) => alert("Proje eklenirken bir hata oluştu."));
  };

  return (
    <div className="container mx-auto p-4">
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
            Sanatçı Adı:
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
            Sanatçı İş Unvanı:
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
          <label htmlFor="jobType" className="block font-medium">
            İş Türü:
          </label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="producerName" className="block font-medium">
            Prodüktör Adı:
          </label>
          <input
            type="text"
            id="producerName"
            name="producerName"
            value={formData.producerName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="lyricsName" className="block font-medium">
            Söz Yazarı Adı:
          </label>
          <input
            type="text"
            id="lyrics"
            name="lyrics"
            value={formData.lyrics}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="guitaristName" className="block font-medium">
            Gitarist Adı:
          </label>
          <input
            type="text"
            id="guitaristName"
            name="guitaristName"
            value={formData.guitaristName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="bassistName" className="block font-medium">
            Basçı Adı:
          </label>
          <input
            type="text"
            id="bassistName"
            name="bassistName"
            value={formData.bassistName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="drummerName" className="block font-medium">
            Davulcu Adı:
          </label>
          <input
            type="text"
            id="drummerName"
            name="drummerName"
            value={formData.drummerName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="keyboardistName" className="block font-medium">
            Klavyeci Adı:
          </label>
          <input
            type="text"
            id="keyboardistName"
            name="keyboardistName"
            value={formData.keyboardistName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="mixerName" className="block font-medium">
            Mikser Adı:
          </label>
          <input
            type="text"
            id="mixerName"
            name="mixerName"
            value={formData.mixerName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="masteringName" className="block font-medium">
            Mastering Adı:
          </label>
          <input
            type="text"
            id="masteringName"
            name="masteringName"
            value={formData.masteringName}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Formu Gönder
        </button>
      </form>
    </div>
  );
}

export default AddProject;
