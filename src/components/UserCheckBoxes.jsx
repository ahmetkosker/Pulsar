import React, { useState } from "react";

const RoundCheckbox = ({ isChecked, onToggle }) => {
  return (
    <div
      className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center cursor-pointer ${
        isChecked ? "bg-black" : ""
      }`}
      onClick={onToggle}
    >
      {isChecked && <div className="w-3.5 h-3.5 rounded-full bg-white"></div>}
    </div>
  );
};

export const CheckboxImage = ({ imageUrl, onToggle, id, artist }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    onToggle(imageUrl, !isChecked, id, artist);
  };

  return (
    <div className="flex items-center relative">
      <img
        src={imageUrl}
        alt="Resim"
        className={
          isChecked
            ? "w-40 min-w-40 h-52 max-sm:w-24 max-sm:min-w-24 max-sm:h-32 object-cover mr-4 cursor-pointer opacity-75 transition-all bg-[#A59719]"
            : "w-40 min-w-40 h-52 max-sm:w-24 max-sm:min-w-24 max-sm:h-32 object-cover mr-4 cursor-pointer transition-all bg-[#A59719]"
        }
        onClick={toggleCheckbox}
      />
      <label className="cursor-pointer absolute bottom-1 left-2">
        <RoundCheckbox isChecked={isChecked} onToggle={toggleCheckbox} />
      </label>
    </div>
  );
};
