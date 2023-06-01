import React, { useEffect, useState } from "react";
import "../../index.css";
import right from '../../asset/icon/rightArrow.svg'
import left from '../../asset/icon/leftArrow.svg'
import love from '../../asset/icon/love.svg'
import smile from '../../asset/icon/smiley.svg'
import close from '../../asset/icon/close.svg'
import locate from '../../asset/icon/location.svg'

interface ImageCarouselProps {
    images: string[];
    details: {
        name: string;
        age: number;
        allowedChat: boolean;
        distance: number;
        info: string;
        like: boolean;
    };
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, details }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        <div className="flex flex-col lg:flex-row gap-4 mt-5">
            <div className="relative lg:w-2/6">
                <div className="absolute top-3 left-0 w-[95%] ml-1.5 h-4 flex justify-center items-center bg-grey rounded-full ">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`flex flex-wrap min-w-[1rem] h-2 rounded-full mx-1 transition ease-in-out duration-300 cursor-pointer ${index === currentImageIndex ? "bg-purple" : "bg-white"
                                }`}
                            onClick={() => setCurrentImageIndex(index)}
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
                    className="w-full h-[550px] rounded-3xl object-cover object-center transition ease-in-out duration-500 border"
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

            <div className="lg:w-4/6 flex flex-col gap-10">
                <div>
                    <h4 className="font-semibold text-2xl">{details.name}, {details.age}</h4>
                    <div className="flex flex-wrap gap-10 text-p-text">
                        <div className="flex gap-1 items-center">
                            <img src={locate} alt='locate' />
                            <p>Lagos</p>
                        </div>
                        <p>{details.distance} kilometers away</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-2xl">About</h4>
                    <p className="text-justify text-p-text">{details.info}</p>
                </div>
                <div>
                    <h4 className="text-2xl">Interest</h4>
                    <p className="text-justify text-p-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptate soluta vitae ut tempore commodi vero nobis excepturi, libero dolore, fugit quam, eius atque saepe ipsa officiis necessitatibus recusandae neque.</p>
                </div>
            </div>
        </div>
    );
};

export default ImageCarousel;
