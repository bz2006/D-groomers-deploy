import React from 'react';


type Props={
    isOpen: boolean;
    onClose: () => void;
    videoSrc: string;
}

const FullScreenVideoOverlay = ({ isOpen, onClose, videoSrc }:Props) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Close Button */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-4 right-4 w-8 h-8 text-white cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    onClick={onClose}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>


                {/* Video Player */}
                <video
                    src={videoSrc}
                    controls
                    autoPlay
                    controlsList="nodownload"
                    className="max-w-full max-h-full object-cover rounded-lg"
                />
            </div>
        </div>
    );
};

export default FullScreenVideoOverlay;
