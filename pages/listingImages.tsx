"use client"

import '../src/app/globals.css'
import { useRouter } from "next/router"
import { listingData } from "../src/app/data/listingData"
import { useState,useEffect } from 'react';
import Image from 'next/image';
const ListingImages=()=>{
    const router = useRouter();
    const id = router.query.id;

    const [currentListing,setCurrentListing]=useState<any>();

    useEffect(()=>{
        if(!id) return;
        let foundListing=false;
        for(const listing of listingData["data"]){
            if(listing["info"]["id"]===id){
                foundListing=true;
                setCurrentListing(listing);
                console.log(listing["info"]["images"]["data"])
                break;
            }
        }
    },[id])
    return(<div>
        {currentListing===undefined?<div>Invalid Page</div>
        :
        <div>
            {currentListing["info"]["images"]["data"].map((image:any,index:number)=>{
                return(
                <div className='' key={index}>
                    <div>
                        {image["type"]}
                    </div>
                    <Image src={image["url"]} alt={image["type"]} width={200} height={200} key={index+"img"}/>
                </div>)
            })}
        </div>}
    </div>)
}

export default ListingImages