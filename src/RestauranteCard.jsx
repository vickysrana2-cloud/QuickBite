import React from 'react'

const RestauranteCard = (prop) => {
  // console.log(prop)
  const { name, areaName, cuisines, avgRating, sla:{slaString}, cloudinaryImageId } = prop.restData.info;
  // console.log(name)
  return (
    
     <>
        <img className='rounded-xl w-full h-48 object-cover ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId} alt="..." />

        <div className='px-4'>
          <p className='my-1 truncate'><strong className='text-xl'>{name}</strong></p>
          <p className='my-1'>
            <span>{"\u2B50"}{avgRating}</span>
            <span className='ml-4'>{"\uD83C\uDFCD"}{slaString}</span>
          </p>
          <p className='my-1 truncate'>{cuisines.join(",")}</p>
          <p className='my-1 truncate'>{areaName}</p>
        </div>
     </>
  )
}
 
export default RestauranteCard;