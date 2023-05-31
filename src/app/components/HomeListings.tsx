import Image from "next/image"
import { homeListingType } from "../types/homeListingType"
import { filterType } from "../types/filterType"

type Props={
    typeToFilterBy:filterType,
    listings:homeListingType[],
}
const HomeListings=({typeToFilterBy,listings}:Props)=>{
    return(
    <div className="mt-5">
        {listings
        .filter(listing=>{
            for(const type in typeToFilterBy){
                if((typeToFilterBy[type as keyof filterType]!==listing[type as keyof homeListingType])&&typeToFilterBy[type as keyof filterType]!==""){
                    return false;
                }
            }
            return true;
        })
        .map((listing,index)=>{
            return (
            <div className="inline-block mx-2 mb-10" key={`${listing["id"]+index}`}>
                <a href={`/listing/?id=${listing["id"]}`}>
                    <Image src={listing["mainImageUrl"]} width="0" height="0" sizes="100vw" style={{ width: '300px', height: '300px',borderRadius:'25px' }} alt={listing["id"]}/>
                    <div className="flex justify-between">
                        <div>
                            <h1 className="font-bold">
                                {listing["city"]}
                            </h1>
                            <div className="font-bold">
                                ${listing["price"]} night
                            </div>
                        </div>
                        <div className="flex items-center"><img className="h-4 w-4 mr-1" src="/star.png"/>{listing["rating"]}</div>
                    </div>
                </a>
            </div>)
        })}
    </div>)
}

export default HomeListings

