import React, { useEffect, useState } from 'react'
import RestauranteCard from './RestauranteCard';
import axios from "axios"
import { IoIosSearch } from "react-icons/io";
import ShimmerEffect from './utility/ShimmerEffect';
import { Link } from "react-router"
import useOnlineStatus from './utility/useOnlineStatus';    //-------------------------Network Status------




const RestauranteContainer = () => {

    const [listOfRestaurent, setListOfRestaurent] = useState([]);
    const [searchInp, setSearchInp] = useState([]);
    const [filteredRestList, setfilteredRestList] = useState([])

    const networkStatus = useOnlineStatus();
    console.log(networkStatus);




    // -----------------------------------------------------------------------------------Filter--section----------
    // -----------------------------------------------------------Rating 4.0 +
    const filterRestorent = () => {
        let filteredRest = listOfRestaurent.filter((rest) => {
            return rest.info.avgRating > 4.0;
        })
        setfilteredRestList(filteredRest);
    }

    // data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants[9].info.veg
    const pureVeg = () => {
        let filteredRest = listOfRestaurent.filter((rest) => {
            if (rest.info.veg) {
                return rest;
            }
        })
        setfilteredRestList(filteredRest);
    }

    const nonVeg = () => {
        let filteredRest = listOfRestaurent.filter((rest) => {
            if (!(rest?.info?.veg)) {
                return rest;
            }
        })
        setfilteredRestList(filteredRest);
    }

    const allResto = () => {
        setfilteredRestList(listOfRestaurent);
    }


    const searchItem = (e) => {              //---------onChange--------search
        console.log(e.target.value)
        setSearchInp(e.target.value.toLowerCase())
        e.target.value.length == 0 && setfilteredRestList(listOfRestaurent)            // when the input field is empty the whole list of restourant should rendered.
    }

    const searchReselt = (e) => {
        e.preventDefault();
        if (searchInp == "") {
            // console.log("not allow")
            return
        }
        let filteredList = listOfRestaurent.filter((rest) => {
            console.log(rest.info.name.toLowerCase())
            let stringiWord = rest.info.name.toLowerCase().includes(searchInp) || rest.info.cuisines.join(" ").toLowerCase().includes(searchInp);


            // console.log(searchInp)
            // console.log(stringiWord)
            if (stringiWord) {
                console.log(rest)
                return rest
            }

        })
        // console.log(filteredList)
        filteredList.length == 0 ? console.log("Not Available") : setfilteredRestList(filteredList)      // eliminating passing empty array
        // setListOfRestaurent(filteredList);
    }


    // ---------------------------------------------------------------------------------------------------------------------
    useEffect(() => {
        fetchDataFromApi()
    }, [])

    async function fetchDataFromApi() {
        try {
            const response = await axios("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1397082&lng=79.0631071&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
            console.log(response)
            setListOfRestaurent(response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
            setfilteredRestList(response?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        } catch (error) {
            console.log(error)
        }

    }

    // -------------------------------------------------------Custome Hook To Show Network Status---------------------------
    if (networkStatus === false) {
        return (<h1>Network Not Connected Please Check Your Internet</h1>);
    }
    // --------------------------------------------------------------------------------

    if (listOfRestaurent.length === 0) {
        return <ShimmerEffect />
    }

    return (
        <>
            <div className='flex justify-between bg-blue-400 px-12 sticky top-0 z-1'>
                <div>
                    <button className=' border-1 rounded-3xl px-3 py-0.5 m-2 duration-200 hover:text-orange-500' onClick={allResto}>All</button>
                    <button className=' border-1 rounded-3xl px-2.5 py-0.5 m-2 duration-200 hover:text-orange-500' onClick={filterRestorent}>Ratings 4.0+</button>
                    <button className=' border-1 rounded-3xl px-2.5 py-0.5 m-2 duration-200 hover:text-orange-500' onClick={pureVeg}>Pure Veg</button>
                    <button className=' border-1 rounded-3xl px-2.5 py-0.5 m-2 duration-200 hover:text-orange-500' onClick={nonVeg}>Non Veg</button>
                </div>


                <form action="" className='m-2 flex' onSubmit={searchReselt}>
                    <input onChange={searchItem} type="text" value={searchInp} placeholder='Search...' className='border rounded-full py-0.5 px-3 ' />
                    <button className='px-1 py-0.5' type='submit'><IoIosSearch className='text-2xl' /></button>
                </form>

            </div>
            <div className="flex flex-wrap px-7 py-12 justify-evenly gap-x-7 gap-y-12">
                {
                    filteredRestList.map((restData) => {
                        // console.log(restData)
                        return <Link to={'restaurant/' + restData.info.id} key={restData.info.id} className=' rounded-xl w-80 shadow-xl transition-transform duration-300 hover:scale-110' > <RestauranteCard restData={restData} /> </Link>
                    })
                }
            </div>
        </>
    )
}

export default RestauranteContainer;