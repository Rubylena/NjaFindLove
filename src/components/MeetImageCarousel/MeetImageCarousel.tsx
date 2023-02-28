import React, { useEffect, useState } from "react";
import "../../index.css";
import right from '../../asset/icon/rightArrow.svg'
import left from '../../asset/icon/leftArrow.svg'
import love from '../../asset/icon/love.svg'
import smile from '../../asset/icon/smiley.svg'
import close from '../../asset/icon/close.svg'
import blackClose from '../../asset/icon/blackClose.svg'
import locate from '../../asset/icon/location.svg'

interface ImageCarouselProps {
    images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isClose, setIsClose] = useState(false);

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [images]);

    const handlePreviousClick = () => {
        setCurrentImageIndex(
            currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex(
            currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
        );
    };

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="relative md:w-2/6">
                <div className="absolute top-2 left-0 w-full h-4 flex justify-center items-center">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-10 h-2 rounded-full mx-1 transition ease-in-out duration-300 ${index === currentImageIndex ? "bg-white" : "bg-blur"
                                }`}
                        ></div>
                    ))}
                </div>
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 rounded-r-3xl px-8 py-5 bg-blur backdrop-blur-[20px] hover:backdrop-blur-3xl transition ease-in-out duration-300"
                    onClick={handlePreviousClick}
                >
                    <img src={right} alt="right arrow" />
                </button>
                <img
                    className="w-full h-[550px] rounded-t-3xl object-cover object-center transition ease-in-out duration-500"
                    src={images[currentImageIndex]}
                    alt={`Image ${currentImageIndex + 1}`}
                />
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-l-3xl px-8 py-5 bg-blur backdrop-blur-[20px] hover:backdrop-blur-3xl transition ease-in-out duration-300"
                    onClick={handleNextClick}
                >
                    <img src={left} alt="right arrow" />
                </button>
                <div className="bg-tint-green flex justify-around items-center py-3 rounded-b-3xl cursor-pointer">
                    <div className="w-8">
                        <img src={love} alt='love' />
                    </div>
                    <div className="w-8">
                        <img src={smile} alt='smiley' />
                    </div>
                    <div className="w-7">
                        <img src={close} alt='close' />
                    </div>
                </div>
            </div>

            <div className="md:w-4/6 flex flex-col gap-10">
                <div>
                    <h4 className="font-semibold text-2xl">Joyce, 24</h4>
                    <div className="flex flex-wrap gap-10 text-p-text">
                        <div className="flex gap-1 items-center">
                            <img src={locate} alt='locate' />
                            <p>Lagos</p>
                        </div>
                        <p>2 kilometers away</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-2xl">About</h4>
                    <p className="text-justify text-p-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem fugiat amet voluptate? Eveniet molestias exercitationem ipsam recusandae provident, eius voluptatem.</p>
                </div>
                <div>
                    <h4 className="text-2xl">Interest</h4>
                    <p className="text-justify text-p-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptate soluta vitae ut tempore commodi vero nobis excepturi, libero dolore, fugit quam, eius atque saepe ipsa officiis necessitatibus recusandae neque.</p>
                </div>
            </div>

            <div className={`shadow-ads absolute rounded-lg bottom-6 md:top-20 right-10 p-2 w-72 h-[480px] bg-white text-center ${isClose ? 'hidden' : ''}`}>
                <div className="flex justify-end cursor-pointer" onClick={()=>setIsClose(!isClose)}>
                    <img src={blackClose} alt='close' />
                </div>
                <div className="flex justify-center items-center h-full text-[#866060] text-2xl">
                    Google Ads
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
