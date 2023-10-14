import React from 'react';

const DeleteModal = ({ children, show, onClose }) => {
    const modalClasses = show ? "fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-50" : "hidden";

    return (
        <div className={modalClasses}>
            <div className="fixed top-0 left-0 h-screen w-screen bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white p-4 rounded-lg z-10">
                {children}
            </div>
        </div>
    );
};

export default DeleteModal;