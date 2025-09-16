
import { useState, useEffect } from 'react';
import ShimmerEffect from '../utility/ShimmerEffect';
import axios from "axios"
import { FaStar } from "react-icons/fa";
import { useParams } from 'react-router';
import RestaurantCategory from './RestaurantCategory';

const RestaurantMenu = () => {

    const { resId } = useParams();
    // console.log(resId);

    const [restMenu, setRestMenu] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);


    async function fetchData() {
        try {
            // const response=await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.1397082&lng=79.0631071&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER");
            // const data =await response.json()
            // setRestMenu(data)

            const response = await axios.get("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.1397082&lng=79.0631071&restaurantId=" + resId + "&catalog_qa=undefined&submitAction=ENTER");
            // console.log(response);
            setRestMenu(response.data)

        } catch (error) {
            console.log(error);
        }
    }

    if (!restMenu) {
        return <ShimmerEffect />
    }
    // console.log(restMenu)

    // console.log(restMenu.data.cards[0].card.card.text)
    const { text } = restMenu.data.cards[0].card.card
    // console.log(text);
    const { avgRating, areaName } = restMenu.data.cards[2].card.card.info
    // console.log(avgRating ,areaName);
    const { costForTwoMessage, totalRatingsString } = restMenu.data.cards[2].card.card.info
    const { message } = restMenu.data.cards[2].card.card.info.labels[2]
    const { slaString } = restMenu.data.cards[2].card.card.info.sla


    const { cards } = restMenu.data.cards[4].groupedCard.cardGroupMap.REGULAR      // Getting All Menu categories.
    // console.log(cards);

    const filteredCategory = cards.filter((category) => {
        // console.log(category);
        return (category?.card?.card["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" || category?.card?.card["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory")

    })

    // console.log(filteredCategory);


    return (
        <div className='flex flex-col items-center'>
            <div>
                <h1 className='text-2xl font-bold '>{text}</h1>
                <div className='flex items-center'> <span className='bg-green-700 rounded-full p-1'><FaStar className='text-white' /></span> <span>{avgRating}</span> <span>({totalRatingsString})</span> <span>{costForTwoMessage}</span></div>
                <p>{message}</p>
                <p>{areaName}</p>
                <p>{slaString}</p>
            </div>
            <div>
                {
                    filteredCategory.map((category) => {
                        // console.log(category)
                        return <RestaurantCategory menuCard={category} key={category.card.card.categoryId} />
                    })
                }

            </div>
        </div>
    )
}

export default RestaurantMenu;


// text: "Domino's Pizza"  data.cards[0].card.card.text

// avgRating: 4.6     data.data.cards[2].card.card.info.avgRating

// areaName: "Dharampeth"   data.data.cards[2].card.card.info.areaName

// slaString: "20-25 MINS"    data.cards[2].card.card.info.sla.slaString

// restaurantId: "264694"    data.cards[2].card.card.info.sla.restaurantId

// totalRatingsString: "2.1K+ ratings"         data.cards[2].card.card.info.totalRatingsString

// costForTwoMessage: "₹400 for two"           data.cards[2].card.card.info.costForTwoMessage

// Cuisines    data.cards[2].card.card.info.labels[2].message