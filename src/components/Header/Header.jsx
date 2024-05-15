import React from 'react'
import { RiRoadMapFill } from "react-icons/ri";

/**
 * Header component that provides title for the website.
 * 
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = () => {
  return (
    <div>
        <div className='flex justify-start gap-3 ml-6 p-2.5 items-center bg-gray-950'>
            <div className='text-emerald-500 bg-white rounded-xl p-2.5'>
                <RiRoadMapFill className='h-5 w-5'/>
            </div>
            <p className='text-white text-2xl tracking-wide header-font mt-1'>Longitude & Latitude Conversion Map</p>
        </div>
    </div>
  )
}

export default Header