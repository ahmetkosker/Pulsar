import axios from "axios";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { app, auth } from "../configs/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AddBlog() {
  const storage = getStorage(app);
  const [image, setImage] = useState(null);
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
    blogPostImageURL: "",
    blogPostTitle: "",
    blogPostContent: "",
    blogPostAuthor: "",
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

    const imagePath = ref(storage, `/blogs/${uuidv4()}`);

    await uploadBytes(imagePath, image).then(async (snapshot) => {
      imageToDB = await getImage(snapshot.metadata.fullPath);
    });

    axios
      .post("https://createblogpost-zkwsxnxtga-ew.a.run.app", {
        blogPostImageURL: imageToDB,
        blogPostTitle: formData.blogPostTitle,
        blogPostContent: formData.blogPostContent,
        blogPostAuthor: formData.blogPostAuthor,
      })
      .then((res) => {
        toast.success("Blog yazısı başarıyla eklendi!");
        setTimeout(() => {
          navigation("/panelHomepage");
        }, 2000);
      })
      .catch((err) => toast.error("Blog yazısı eklenirken bir hata oluştu!"));
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Blog Yazısı Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="blogPostImageURL" className="block font-medium">
            Blog Görsel URL:
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="image/*"
          />
        </div>
        <div>
          <label htmlFor="blogPostTitle" className="block font-medium">
            Başlık:
          </label>
          <input
            type="text"
            id="blogPostTitle"
            name="blogPostTitle"
            value={formData.blogPostTitle}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <div>
          <label htmlFor="blogPostContent" className="block font-medium">
            İçerik:
          </label>
          <textarea
            id="blogPostContent"
            name="blogPostContent"
            value={formData.blogPostContent}
            onChange={handleChange}
            rows="4"
            className="border p-2 w-full rounded-md"
            maxLength={700}
          />
        </div>
        <div>
          <label htmlFor="blogPostAuthor" className="block font-medium">
            Yazar:
          </label>
          <input
            type="text"
            id="blogPostAuthor"
            name="blogPostAuthor"
            value={formData.blogPostAuthor}
            onChange={handleChange}
            className="border p-2 w-full rounded-md"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Yazıyı Paylaş
        </button>
      </form>
    </div>
  );
}

export default AddBlog;
