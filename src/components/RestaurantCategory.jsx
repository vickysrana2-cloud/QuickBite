import React from 'react'
import ItemList from "./itemList"

const RestaurantCategory = ({ menuCard }) => {
  // console.log(menuCard);
  const { title } = menuCard.card.card
  return (
    <div className='w-300'>
      <h1 className='bg-red-500 text-xl font-bold'>{title} ({menuCard?.card?.card?.itemCards?.length || menuCard?.card?.card?.categories?.length})</h1>
      {
        menuCard?.card?.card?.itemCards?.map((item) => {
          // console.log(item);

          return <ItemList itemInfo={item.card.info} key={item.card.info.id}/>
        })
      }
      {
        menuCard?.card?.card?.categories?.map((item) => {

          // console.log(item);
          // console.log(item.itemCardS.card.info.name);
         
          return (
            <div key={item.categoryId} className='w-300'>
              <h2 className='bg-green-500 font-bold'>{item.title} ({item?.itemCards?.length})</h2>
              {
                item.itemCards.map((item) => {
                  //  console.log(item);
                  return <ItemList itemInfo={item.card.info} key={item.card.info.id}/>
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default RestaurantCategory;