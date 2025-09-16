import React from 'react'
import { TbPointFilled } from "react-icons/tb";
import { BsFillTriangleFill } from "react-icons/bs";

const ItemList = ({itemInfo}) => {
  console.log(itemInfo);
  
  const {name,description,price,finalPrice,isVeg , ratings:{aggregatedRating:{rating,ratingCountV2}} ,imageId} =itemInfo;
  return (
    <>
    <div className='flex w-fit'>
      <div className='bg-blue-500'>
        <p>{isVeg ? <span><TbPointFilled/></span> : <span><BsFillTriangleFill/></span>}</p>
          <h3>{name}</h3>
        <p><span>{price}</span> <span>{finalPrice}</span></p>
  
        <p>
          {
            rating&&<span>{rating}</span>
          }
          {
            ratingCountV2&&<span>({ratingCountV2})</span>
          }
        </p>
    
        <p>{description}</p>
      </div>

      <div className='w-40'>
        <img src={"https://media-assets.swiggy.com/"+imageId} alt="" />
        <button className='border px-3'>ADD</button>
      </div>
    </div>
    <hr />
    </>
  )
}

export default ItemList


  // card.card.categories[0].itemCards[0].card.info.ratings.aggregatedRating.rating
 //  ratingCountV2: "11"     card.card.categories[0].itemCards[0].card.info.ratings.aggregatedRating.ratingCountV2

  // card.card.categories[0].itemCards[0].card.info.isVeg

  
// finalPrice: 26900   card.card.categories[0].itemCards[0].card.info.finalPrice

// price: 31900   card.card.categories[0].itemCards[0].card.info.price

// card.card.categories[0].itemCards[0].card.info.description


// card.card.categories[0].itemCards[0].card.info.imageId