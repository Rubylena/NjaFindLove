import React, { useEffect, useState } from "react";
import "../../index.css";
import right from '../../asset/icon/rightArrow.svg'
import left from '../../asset/icon/leftArrow.svg'
import love from '../../asset/icon/love.svg'
import smile from '../../asset/icon/smiley.svg'
import close from '../../asset/icon/close.svg'
import blackClose from '../../asset/icon/blackClose.svg'
import locate from '../../asset/icon/location.svg'

interface PriceCarouselProps {
    images: string[];
}

const PriceCarousel: React.FC<PriceCarouselProps> = ({ images }) => {
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
        <div className="flex flex-col md:flex-row items-center gap-20">
            <div className="flex flex-col bg-tint-pink p-5 rounded-2xl">
                <div className="relative">
                    <button
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 rounded-r-3xl px-5 py-4 bg-blur backdrop-blur-[20px] hover:backdrop-blur-3xl transition ease-in-out duration-300"
                        onClick={handlePreviousClick}
                    >
                        <img src={right} alt="right arrow" />
                    </button>
                    <img
                        className="w-80 h-[400px] object-cover object-center transition ease-in-out duration-500"
                        src={images[currentImageIndex]}
                        alt={`Image ${currentImageIndex + 1}`}
                    />
                    <button
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 rounded-l-3xl px-5 py-4 bg-blur backdrop-blur-[20px] hover:backdrop-blur-3xl transition ease-in-out duration-300"
                        onClick={handleNextClick}
                    >
                        <img src={left} alt="right arrow" />
                    </button>
                </div>
                <div className="pt-4 flex justify-center items-center">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full mx-1 transition ease-in-out duration-300 ${index === currentImageIndex ? "bg-black" : "bg-grey"
                                }`}
                        ></div>
                    ))}
                </div>
            </div>
            <p className="bg-purple py-2 px-5 rounded-3xl text-white cursor-pointer">Pay <span className="font-bold">N8,000</span></p>
        </div>
    );
};

export default PriceCarousel;
