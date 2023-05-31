"use client"

import ListingFilters from "./components/ListingFilters"
import HomeListings from "./components/HomeListings"
import Navbar from "./navigation/navbar"
import { homeListingType } from "./types/homeListingType"
import { listingData } from "./data/listingData"
import { useState } from "react"
import { filterType } from "./types/filterType"
const App=()=>{
  const listings:homeListingType[]=[];
  listingData["data"].forEach((listing:any)=>{
    listings.push({id:listing["info"]["id"],type:listing["category"],mainImageUrl:listing["info"]["mainImage"]["url"],city:listing["info"]["location"]["city"],price:listing["info"]["price"],rating:listing["info"]["ratings"]["guestSatisfactionOverall"]});
  })

  const [typeToFilterBy,setTypeToFilterBy]=useState<filterType>({city:"",type:""});
  return (
    <div>
      <Navbar />
      <ListingFilters typeToFilterBy={typeToFilterBy} setTypeToFilterBy={setTypeToFilterBy}/>
      <HomeListings typeToFilterBy={typeToFilterBy} listings={listings} />
    </div>
  )
}

export default App