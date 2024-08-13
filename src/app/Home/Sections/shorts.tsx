"use client";
import React, { useState } from 'react';
import FullScreenVideoOverlay from './videoOverlay';
import './Hidescroll.css'; // Ensure you have necessary styles here

type Props = {};

interface Short {
    video: string;
    thumbnail: string;
}

const Shorts = (props: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [videoSrc, setVideoSrc] = useState<string | null>(null);

    const showModal = (src: string) => {
        setVideoSrc(src);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const shorts: Short[] = [
        {
            video: "/shorts/1.mp4",
            thumbnail: "/shorts/thumbnail/1.JPG"
        },
        {
            video: "/shorts/2.mp4",
            thumbnail: "/shorts/thumbnail/2.JPG"
        },
        {
            video: "/shorts/3.mp4",
            thumbnail: "/shorts/thumbnail/3.JPG"
        },
        {
            video: "/shorts/4.mp4",
            thumbnail: "/shorts/thumbnail/4.JPG"
        },
        {
            video: "/shorts/1.mp4",
            thumbnail: "/shorts/thumbnail/1.JPG"
        },
        {
            video: "/shorts/2.mp4",
            thumbnail: "/shorts/thumbnail/2.JPG"
        },
        {
            video: "/shorts/3.mp4",
            thumbnail: "/shorts/thumbnail/3.JPG"
        },
        {
            video: "/shorts/4.mp4",
            thumbnail: "/shorts/thumbnail/4.JPG"
        }
    ];

    return (
        <>
            <div className='flex overflow-x-auto justify-evenly CBhide-scrollbar space-x-4 py-4 sm:space-x-6 px-5 mt-5'>
                {shorts.map((short, index) => (
                    <div key={index} onClick={() => showModal(short.video)} className='relative w-28 h-28 rounded-full flex-shrink-0 hover:cursor-pointer'>
                        <div className='bg-gradient-to-r from-yellow-500 to-violet-600 p-1 rounded-full'>
                            <div className='bg-white rounded-full p-1 flex items-center justify-center'>
                                <img
                                    src={short.thumbnail}
                                    alt="shorts"
                                    className='w-28 h-24 object-cover rounded-full'
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {videoSrc && (
                <FullScreenVideoOverlay
                    isOpen={isModalOpen}
                    videoSrc={videoSrc}
                    onClose={handleClose}
                />
            )}
        </>
    );
};

export default Shorts;
