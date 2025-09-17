import React from 'react'
import { TbPointFilled } from "react-icons/tb";
import { BsFillTriangleFill } from "react-icons/bs";

const ItemList = ({ itemInfo }) => {
  console.log(itemInfo);

  const {
    name,
    description,
    price,
    defaultPrice,   // sometimes used for discount
    isVeg,
    ratings: { aggregatedRating: { rating, ratingCountV2 } = {} } = {},
    imageId
  } = itemInfo;

  // Price conversion
  const originalPrice = price ? price / 100 : null;
  const finalPrice = defaultPrice ? defaultPrice / 100 : originalPrice;

  return (
<>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full py-4 border-b">
    
    {/* Left Section */}
    <div className="flex-1 pr-4">
      {/* Veg/Non-Veg icon */}
      <div className="flex items-center space-x-2">
        {isVeg ? (
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-md border border-green-200 shadow-sm">
  <TbPointFilled size={20} />
</span>

        ) : (
          <span className="inline-flex items-center justify-center w-6 h-6 bg-red-200 text-red-600 rounded-md shadow-sm">
  <BsFillTriangleFill size={14} />
</span>

        )}
        <h3 className="text-base font-semibold">{name}</h3>
      </div>

      {/* Price */}
      <p className="mt-1 text-green-700 font-medium">
        ₹ {finalPrice / 100 || price / 100}
        {price && finalPrice && price !== finalPrice && (
          <span className="ml-2 line-through text-gray-500 text-sm">₹{price / 100}</span>
        )}
      </p>

      {/* Rating */}
      {rating && (
        <p className="mt-1 text-sm text-gray-600 flex items-center">
          ⭐ {rating}{" "}
          {ratingCountV2 && (
            <span className="ml-1 text-gray-500">({ratingCountV2})</span>
          )}
        </p>
      )}

      {/* Description */}
      {description && (
        <p className="mt-2 text-sm text-gray-500 leading-snug">{description}</p>
      )}
    </div>

    {/* Right Section (Image + Button) */}
    <div className="relative w-32 sm:w-40 flex-shrink-0 mt-3 sm:mt-0">
      <img
        src={`https://media-assets.swiggy.com/${imageId}`}
        alt={name}
        className="w-full h-28 object-cover rounded-lg shadow"
      />
      <button className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white border border-gray-300 text-green-600 px-4 py-1 text-sm font-semibold rounded-md shadow hover:bg-gray-50">
        ADD
      </button>
    </div>
  </div>
</>

  );
};


export default ItemList


  // card.card.categories[0].itemCards[0].card.info.ratings.aggregatedRating.rating
 //  ratingCountV2: "11"     card.card.categories[0].itemCards[0].card.info.ratings.aggregatedRating.ratingCountV2

  // card.card.categories[0].itemCards[0].card.info.isVeg

  
// finalPrice: 26900   card.card.categories[0].itemCards[0].card.info.finalPrice

// price: 31900   card.card.categories[0].itemCards[0].card.info.price

// card.card.categories[0].itemCards[0].card.info.description


// card.card.categories[0].itemCards[0].card.info.imageId