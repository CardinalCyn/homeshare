"use client"

import '../src/app/globals.css'
import { useRouter } from "next/router"
import { listingData } from "../src/app/data/listingData"
import Navbar from "@/app/navigation/navbar";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import MyComponent from '../src/app/components/map'
const Listing=()=>{
    const router = useRouter();
    const id = router.query.id;

    const [currentListing,setCurrentListing]=useState<any>();
    const [isMobile, setIsMobile] = useState(false);
    useEffect(()=>{
        if(!id) return;
        let foundListing=false;
        for(const listing of listingData["data"]){
            if(listing["info"]["id"]===id){
                foundListing=true;
                setCurrentListing(listing);
                break;
            }
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
          };
          window.addEventListener("resize", handleResize);
          handleResize();
          return () => {
            window.removeEventListener("resize", handleResize);
          };
    },[id])

    const [showMoreDescription,setShowMoreDescription]=useState(false);
    const [showMoreAmenities,setShowMoreAmenities]=useState(false)
    return(
        <div>
            <Navbar />
            <div id="listingContainer" className="mt-10" style={{ marginLeft: isMobile?'1rem':'20rem', marginRight: isMobile?'0':'20rem' }}>
                {currentListing===undefined?
                <div>Invalid Listing</div>
                :<div>
                    {isMobile===true&&<Image key={`${currentListing["title"]}-img`} width={100} height={100} src={currentListing["info"]["mainImage"]["url"]} alt={currentListing["title"]} style={{width:'100%',height:'100%',marginLeft:"auto",marginRight:"auto"}}/>}
                    {isMobile===true&&<button style={{marginTop:"20px",background: "#FF5A5F",color: "#fff",border: "none",padding: "10px 20px",borderRadius: "4px",fontSize: "16px",cursor: "pointer",}} onClick={()=>router.push(`./listingImages/?id=${id}`)}>View more images</button>}
                    <div className='mt-5' style={{fontSize:isMobile?'2em':'3em'}}>
                        {currentListing["info"]["title"]||""}
                    </div>
                    <div style={{fontSize:'1em',marginTop:isMobile?"10px":"",marginBottom:"20px"}}>
                        {currentListing["info"]["location"]["city"]}, {currentListing["info"]["location"]["country"]["code"]}
                    </div>
                    {isMobile===false&&<div className='flex' id="imageSection">
                        <Image key={`${currentListing["title"]}-img`} width={800} height={800} src={currentListing["info"]["mainImage"]["url"]} alt={currentListing["title"]} />
                        <div>
                            <Image key={`${currentListing["subImg1"]}-img`} width={400} height={400} src={currentListing["info"]["images"]["data"][0]["url"]} alt={currentListing["title"]} />
                            <Image key={`${currentListing["subImg2"]}-img`} width={400} height={400} src={currentListing["info"]["images"]["data"][1]["url"]} alt={currentListing["title"]} />
                        </div>
                    </div>}
                    {isMobile===false&&<button type="button" onClick={()=>router.push(`./listingImages/?id=${id}`)} style={{marginTop:"20px",background: "#FF5A5F",color: "#fff",border: "none",padding: "10px 20px",borderRadius: "4px",fontSize: "16px",cursor: "pointer",}}>View more images</button>}
                    {isMobile?
                    <div style={{position: "fixed",bottom: 0,width: "100%",background: "#fff",padding: "20px",boxShadow: "0px -4px 10px rgba(0, 0, 0, 0.1)",zIndex:"99"}}>
                        <div className='flex' style={{ justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                                ${currentListing["info"]["price"]}/ night
                            </div>
                            <button style={{background: "#FF5A5F",color: "#fff",border: "none",padding: "10px 20px",borderRadius: "4px",fontSize: "16px",cursor: "pointer",}}>
                                Reserve
                            </button>
                        </div>
                    </div>
                    :<div id="fixedDiv" style={{
                        width: "372px",
                        height: "320px",
                        padding: "40px",
                        right: "0px",
                        top: "400px",
                        position: "sticky",
                        zIndex: "10",
                        float: "right",
                        backgroundColor: "#F7F9FA",
                        borderRadius: "25px",
                        textAlign: "center",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
                      }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>
                          ${currentListing["info"]["price"]}/ night
                        </div>
                        <div className='flex justify-center'>
                          <div className='mr-10'>
                            <p style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "4px" }}>Check-in</p>
                            <p>{new Date().toLocaleDateString()}</p>
                          </div>
                          <div className='ml-10'>
                            <p style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "4px" }}>Check-out</p>
                            <p>{new Date().toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className='flex flex-col justify-center mt-4'>
                          <select style={{ width: "200px", marginRight: "0px", marginBottom: "8px", padding: "8px" }} name="Guest Count" id="count">
                            <option value="1 Guest">1 Guest</option>
                            <option value="2 Guests">2 Guests</option>
                            <option value="3 Guests">3 Guests</option>
                            <option value="4 Guests">4 Guests</option>
                            <option value="5 Guests">5 Guests</option>
                            <option value="6 Guests">6 Guests</option>
                            <option value="7 Guests">7 Guests</option>
                            <option value="8 Guests">8 Guests</option>
                          </select>
                          <button style={{
                            background: "#FF5A5F",
                            color: "#fff",
                            border: "none",
                            padding: "12px 24px",
                            borderRadius: "4px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            cursor: "pointer"
                          }}>
                            Reserve
                          </button>
                        </div>
                      </div>}
                    <div>
                        <div style={{fontSize:isMobile?'1.5em':'2.5em'}}>
                            {currentListing["category"]||"Home"+` hosted by ${currentListing["info"]["host"]["name"]}`}
                        </div>
                        <div className='flex'>
                            {currentListing["info"]["details"]["data"].map((detail:any,index:number)=>{
                                return <li key={index}><span style={{ position:'relative',left:'-10px'}}>{`${detail["value"]} ${detail["type"]}`}</span></li>
                            })}
                        </div>
                        <div className="mt-10" style={{maxWidth:'800px',maxHeight:showMoreDescription?'None':'100px',overflow:'hidden'}}>
                        Description<br/>
                        {currentListing["info"]["description"]}
                        </div>
                        {showMoreDescription===false&&<div>...<br/><button onClick={()=>setShowMoreDescription(true)} style={{background: "#FF5A5F",color: "#fff",border: "none",padding: "10px 20px",borderRadius: "4px",fontSize: "16px",cursor: "pointer",}}>Show More</button></div>}
                        <div className="mb-10" style={{fontSize:isMobile?'1.5em':'2.5em'}}>
                                What we offer
                            </div>
                        <div className='mt-10' style={{ maxHeight: showMoreAmenities ? 'None' : '200px', overflow: 'hidden',width:isMobile?'100%':'25%' }}>
                            
                            <div className="amenities-grid">
                                {currentListing["info"]["amenities"]["data"]
                                .filter((amenity: any) => {
                                    return amenity["available"]===true;
                                })
                                .map((amenity: any,index:number) => {
                                    return <div key={index} className="amenity-item">{amenity["title"]}</div>;
                                })}
                            </div>
                        </div>
                        {showMoreAmenities===false&&<div>...<br/><button style={{background: "#FF5A5F",color: "#fff",border: "none",padding: "10px 20px",borderRadius: "4px",fontSize: "16px",cursor: "pointer",}} onClick={()=>setShowMoreAmenities(true)}>Show More</button></div>}
                        <div className='mt-10'>
                            <div style={{fontSize:'2.5rem'}}>
                                Location
                            </div>
                            <div className='mt-5'>
                                {currentListing["info"]["location"]["city"]}, {currentListing["info"]["location"]["country"]["title"]}
                            </div>
                            <MyComponent dimensions={isMobile?{width:'385px',height:'400px'}:{width: '1100px',height: '450px'}} location={{lat:currentListing["info"]["location"]["lat"],lng:currentListing["info"]["location"]["long"]}}/>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Listing