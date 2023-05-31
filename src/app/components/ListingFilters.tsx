"use client"

import Image from "next/image"
import { categoryType } from "../types/categoryType"
import { filtersData } from "../data/filtersData";
import { filterType } from "../types/filterType";
import { useState,useEffect } from "react";
type Props={
    typeToFilterBy:filterType,
    setTypeToFilterBy:Function,
}
const ListingFilters=({typeToFilterBy,setTypeToFilterBy}:Props)=>{
    const categories:categoryType[]=[];
    filtersData.forEach(category=>{
        categories.push({title:category["text"],id:category["id"]||"",imageUrl:category["imageUrl"]});
    })

    const filterDataById=(id:string)=>{
        console.log(id);
        if(typeToFilterBy["type"]===id) setTypeToFilterBy((prevTypeToFilterBy:filterType)=>{return { ...prevTypeToFilterBy, type: "" };});
        else setTypeToFilterBy((prevTypeToFilterBy:filterType)=>{return { ...prevTypeToFilterBy, type: id };});
    }

    const [numImagesPerRow, setNumImagesPerRow] = useState(5);

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth < 600) {
          setNumImagesPerRow(5);
        } else if (screenWidth < 900) {
          setNumImagesPerRow(7);
        } else if (screenWidth < 1200) {
          setNumImagesPerRow(10);
        }
        else if (screenWidth < 1500) {
          setNumImagesPerRow(12);
        }else{
          setNumImagesPerRow(15);
        }
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const [currentRow, setCurrentRow] = useState(0);

    const handleNext = () => {
      if(currentRow<Math.floor(categories.length / 5) - 1)setCurrentRow(currentRow + 1);
    };

    const handlePrev = () => {
      if(currentRow>0)setCurrentRow(currentRow - 1);
    };

    const renderImages = () => {
      const startIndex = currentRow * numImagesPerRow;
      const endIndex = startIndex + numImagesPerRow;
      const rowImages = categories.slice(startIndex, endIndex);

      return rowImages.map((listingAttribute,index) => (
        <button key={index} onClick={()=>filterDataById(listingAttribute["id"])} className={`flex flex-col justify-center mx-4 ${(typeToFilterBy["type"]===listingAttribute["id"]&&typeToFilterBy["type"]!=="")&&"bg-brandGreen"}`}>
        <span className="filterSpan flex flex-col items-center">
          <Image key={`${listingAttribute["title"]}-img`} width={65}  height={65} src={listingAttribute["imageUrl"]} alt={listingAttribute["title"]}/>
          <div className="text-xs">{listingAttribute["title"]}</div>
        </span>
      </button>
        
      ));
    };
    return(
    <div className="flex max-w-screen overflow-x-auto mt-10 mx-auto justify-between">
        <button onClick={handlePrev}>Previous</button>
        {renderImages()}
        <button onClick={handleNext}>Next</button>
    </div>)
}

export default ListingFilters