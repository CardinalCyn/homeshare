"use client"
import '../src/app/globals.css'
import { useRouter } from "next/router"
import { listingData } from "../src/app/data/listingData"
import Navbar from "@/app/navigation/navbar";
import ListingFilters from "@/app/components/ListingFilters";
import HomeListings from "@/app/components/HomeListings";
import { homeListingType } from "@/app/types/homeListingType";
import { useEffect, useState } from "react";
import { filterType } from "@/app/types/filterType";
const SearchResults=()=>{
    const router = useRouter();
    
    const [typeToFilterBy,setTypeToFilterBy]=useState<filterType>({city:"",type:""});
    useEffect(()=>{
        if(router.query.area){
            setTypeToFilterBy((prevTypeToFilterBy) => ({
                ...prevTypeToFilterBy,city: router.query.area as string,
            }));
        }else{
            setTypeToFilterBy((prevTypeToFilterBy) => ({
                ...prevTypeToFilterBy,city:"",
            }));
        }
        
    }, [router.query.area]);
    const listings:homeListingType[]=[];
    listingData["data"].forEach((listing:any)=>{
        listings.push({id:listing["info"]["id"],type:listing["category"],mainImageUrl:listing["info"]["mainImage"]["url"],city:listing["info"]["location"]["city"],price:listing["info"]["price"],rating:listing["info"]["ratings"]["guestSatisfactionOverall"]});
    })
    
    return(
        <div>
            <Navbar />
            <ListingFilters typeToFilterBy={typeToFilterBy} setTypeToFilterBy={setTypeToFilterBy}/>
            <HomeListings typeToFilterBy={typeToFilterBy} listings={listings} />
        </div>
    )
}

export default SearchResults;