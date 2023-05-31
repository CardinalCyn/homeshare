"use client"

import { useState,useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {cities} from '../data/cities'
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { guestToAddType, guestType } from "../types/guestToAddType";
const Navbar=()=>{
    const [searchValue,setSearchValue]=useState("");

    const [datePickerVisible,setDatePickerVisible]=useState(false);
    
    

    const [guestPickerVisibility,setGuestPickerVisibility]=useState(false);
    const [guestsToAdd,setGuestsToAdd]=useState<guestToAddType>({Adults:0,Children:0,Infants:0});

    const [errorMessage,setErrorMessage]=useState("");

    const router=useRouter();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const onDateChange = (dates: [Date | null, Date | null], event: React.SyntheticEvent<any, Event> | undefined) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
    const submitSearch=(e: MouseEvent<HTMLSpanElement>)=>{
        e.preventDefault();
        router.push(`./SearchResults/?area=${searchValue}`);
        setSearchValue("");
    }

    const toggleDatePicker=()=>{
        setDatePickerVisible(!datePickerVisible);
        setGuestPickerVisibility(false);
    }

    const toggleShowGuests=()=>{
        setGuestPickerVisibility(!guestPickerVisibility);
        setDatePickerVisible(false);
    }
    const changeGuestsToAdd=(personType:guestType,modifier:string)=>{
        if(guestsToAdd.hasOwnProperty(personType)){
            if(modifier==="+") setGuestsToAdd((prevGuests)=>({...prevGuests,[personType]:prevGuests[personType]+1}))
            else if(modifier==="-"&&guestsToAdd[personType]>0) setGuestsToAdd((prevGuests)=>({...prevGuests,[personType]:prevGuests[personType]-1}))
        }
    }

    const errorToggle=(errorMessage:string)=>{
        setErrorMessage(errorMessage);
        setTimeout(()=>{
            setErrorMessage("");
        },3000)
    }

    const [showImage, setShowImage] = useState(false);
    useEffect(() => {
        const handleResize = () => {
          setShowImage(window.innerWidth > 768);
        };
    
        // Initial check
        handleResize();
    
        // Listen for window resize events
        window.addEventListener('resize', handleResize);
    
        // Clean up the event listener on component unmount
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return(
        <div>
            <nav className="flex">
                {showImage&&<img src="/blackhostshare.png" className="w-1/4 h-1/4 my-auto"/>}
                <div className="mx-auto my-auto mt-5">
                    <form className="bar mx-auto">
                        <div className="location">
                            <input className="locationInput" type="text" name="search" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="City" />
                        </div>
                        <button className="check-in" type="button" onClick={()=>toggleDatePicker()}><div>{startDate?startDate.toLocaleDateString():"Check in"}</div></button>
                        <button className="check-out" type="button" onClick={()=>toggleDatePicker()}><div>{endDate?endDate.toLocaleDateString():"Check out"}</div></button>
                        <div className="guests flex items-center" onClick={()=>toggleShowGuests()}>
                            <p>Guests</p>
                            <span onClick={(e) => submitSearch(e)}>
                                <img src="/search-icon.svg" className="w-4 h-4" />
                            </span>
                        </div>
                    </form>
                </div>
                <div className="flex my-auto mx-auto h-12 bg-gray-200 px-2 rounded-full cursor-pointer">
                    <svg id="svgBars" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" className="my-auto mr-2 block h-full w-full stroke-current stroke-3 overflow-visible"><g fill="none" fillRule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" className="my-auto block h-6 w-6 fill-current"><path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path></svg>
                </div>
            </nav>
            {searchValue&&<div className="rounded-b-xl border shadow-lg max-h-40 overflow-y-auto absolute z-10 bg-white left-1/2 transform -translate-x-1/2" style={{width:"600px"}}>
                {cities
                    .sort()
                    .filter((city)=>city.toLowerCase().includes(searchValue.toLowerCase()))
                    .map(city=>{
                        return(
                        <div key={city} className="cursor-pointer px-4 py-2 text-gray-600 hover:bg-brandGreen hover:text-white" onClick={()=>{setSearchValue(city)}}>
                            {city}
                        </div>)
                    })
                }
            </div>}
            {datePickerVisible&&
            <div className="mx-auto w-40 absolute z-9 left-1/2 transform -translate-x-1/2">
                <DatePicker
                    selected={startDate}
                    onChange={onDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                />
            </div>}
            {guestPickerVisibility && (
                <div className="mx-auto w-64 absolute z-9 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg">
                    <div className="p-4">
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold">Guests</h2>
                            <p className="text-gray-500 text-sm">Select the number of guests</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <div className="mr-2">
                                <span className="font-semibold">Adults</span>
                                <span className="text-gray-500 text-sm">  Ages 13 or above</span>
                            </div>
                            <div className="flex items-center">
                                <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none" onClick={() => changeGuestsToAdd("Adults", "-")}>
                                    -
                                </button>
                                <span className="mx-2">{guestsToAdd["Adults"]}</span>
                                <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none" onClick={() => changeGuestsToAdd("Adults", "+")}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center mb-2 justify-between">
                            <div className="mr-2">
                                <span className="font-semibold">Children</span>
                                <span className="text-gray-500 text-sm">Ages 2-12</span>
                            </div>
                            <div className="flex items-center">
                                <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none" onClick={() => changeGuestsToAdd("Children", "-")}>
                                    -
                                </button>
                                <span className="mx-2">{guestsToAdd["Children"]}</span>
                                <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none" onClick={() => changeGuestsToAdd("Children", "+")}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="mr-2">
                                <span className="font-semibold">Infants</span>
                                <span className="text-gray-500 text-sm">Under 2</span>
                            </div>
                            <div className="flex items-center">
                                <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none" onClick={() => changeGuestsToAdd("Infants", "-")}>
                                    -
                                </button>
                                <span className="mx-2">{guestsToAdd["Infants"]}</span>
                                <button className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none" onClick={() => changeGuestsToAdd("Infants", "+")}>
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar