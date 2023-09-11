import React from 'react'

const Card = ({image,title,description,price,category}) => {
    return (
        <div className="p-4 w-[100%] md:w-1/3">
            <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img className="lg:h-64 md:h-36 w-full object-fit object-center p-4" src={image} alt="blog" />
                    <div className="p-6">
                        <h2 className="tracking-widest text-base font-bold title-font  text-black  mb-1">${price}</h2>
                        <h1 className="title-font text-lg font-extrabold text-gray-900 mb-3">{title}</h1>
                        <p className="leading-relaxed mb-3">{description}</p>
                        
                    </div>
            </div>
        </div>
    )
}

export default Card