import React, { useEffect, useRef, useState } from "react";
import Aside from "../components/Home/Aside";
import { useNavigate } from "react-router-dom";
import { CheckboxImage } from "../components/UserCheckBoxes";
import axios from "axios";
import LoadingComponent from "../components/LoadingComponent";
import { contactPhoneNumber } from "../configs/simpleFunctions";

const Artist = () => {
  const navigate = useNavigate();

  const [selectedImages, setSelectedImages] = useState([]);
  const [customerRequestedArtists, setCustomerRequestedArtists] = useState([]);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerContent, setCustomerContent] = useState("");

  console.log(customerRequestedArtists);
  const handleImageToggle = (imageUrl, isChecked, id, artist) => {
    if (isChecked) {
      setCustomerRequestedArtists([
        ...customerRequestedArtists,
        { id, artist },
      ]);
      setSelectedImages([...selectedImages, imageUrl]);
    } else {
      setCustomerRequestedArtists(
        customerRequestedArtists.filter((artistID) => artistID.id !== id)
      );
      setSelectedImages(selectedImages.filter((image) => image !== imageUrl));
    }
  };

  const [artists, setArtists] = useState(null);

  const scrollRef = useRef(null);

  const handleWheel = (event, way) => {
    if (event.deltaY !== 0) {
      if (way === "left") {
        scrollRef.current.scrollLeft -= 500;
      } else {
        scrollRef.current.scrollLeft += 500;
      }
    }
  };

  const sendMail = () => {
    axios
      .post("https://sendmailtopulsar-zkwsxnxtga-ew.a.run.app", {
        customerEmail,
        customerContent,
        customerAttachment: "",
        customerRequestedArtists,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("https://getartists-zkwsxnxtga-ew.a.run.app")
      .then((res) => setArtists(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (artists === null) return <LoadingComponent />;

  return (
    <main className="w-full h-auto px-5">
      <section className="max-w-full sm:mt-20 mt-12 flex justify-between">
        <Aside />
        <div className="mx-8 max-sm:w-32 max-sm:mx-4">
          <form>
            <div className="flex flex-col text-[20px] text-black font-normal gap-y-3 max-sm:text-sm ">
              <label>MAIL:</label>
              <input
                type="text"
                className="w-[684px] bg-[#D9D9D9] h-[57.966px] outline-none rounded-xl py-2 px-2 max-sm:w-32 max-sm:h-10 max-lg:w-96 max-xl:w-[420px]"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <div className="mt-3 flex flex-col text-[20px] text-black font-normal gap-y-3 max-sm:text-sm">
              <label>KONU:</label>
              <textarea
                value={customerContent}
                onChange={(e) => setCustomerContent(e.target.value)}
                type="text"
                className="w-[684px] bg-[#D9D9D9] h-[100px] outline-none rounded-xl py-2 px-2 max-sm:w-32 max-sm:h-10 max-lg:w-96 max-xl:w-[420px]"
              />
            </div>
            <div className="mt-3 flex flex-col text-[20px] text-black font-normal gap-y-3 max-sm:text-sm max-xl:w-[420px] max-sm:w-32">
              <label>PROJEMDE BULUNMASINI İSTEDİĞİM SANATÇILAR:</label>
              <div
                className="flex justify-start gap-x-3 w-[688px] overflow-auto scroll-smooth max-sm:w-32 max-lg:w-96 max-xl:w-[420px]"
                ref={scrollRef}
              >
                {artists.map((artist) => (
                  <div className="min-w-[174px] max-sm:min-w-[100px]">
                    <CheckboxImage
                      key={artist.docID}
                      imageUrl={artist.docData.image}
                      onToggle={handleImageToggle}
                      id={artist.docID}
                      artist={artist.docData}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mx-9 mt-2 max-lg:w-72 max-xl:w-80 max-sm:w-16">
                <img
                  onClick={(e) => {
                    handleWheel(e, "left");
                  }}
                  src="/images/leftArrow.png"
                  alt="Left"
                  className="w-16 h-16 object-contain cursor-pointer relative right-6 max-sm:w-8"
                />
                <img
                  onClick={(e) => {
                    handleWheel(e);
                  }}
                  src="/images/rightArrow.png"
                  alt="right"
                  className="w-16 h-16 object-contain cursor-pointer relative left-6 max-sm:w-8"
                />
              </div>
              <div
                className="flex justify-end items-center mt-4 float-right cursor-pointer"
                onClick={sendMail}
              >
                <div className="font-semibold cursor-pointer hover:opacity-50 transition-all">
                  GÖNDER
                </div>
                <img src="/images/send.png" alt="Send" className="w-7 h-7" />
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col gap-y-5 mt-20 ">
          <img
            onClick={() => navigate("/")}
            src="/pulsarMainLogo.png"
            alt="banner"
            className="3xl:w-96 cursor-pointer w-60 max-sm:w-24"
          />

          <div className="3xl:w-96 3xl:text-3xl w-60 text-xl font-bold max-sm:text-sm max-sm:w-32">
            {contactPhoneNumber}
            {/* +90 <span className="text-pulsar">545</span> 312 60 30 */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Artist;
