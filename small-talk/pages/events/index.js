/**
 * 
 */
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout";

export const Events = ({data}) =>{
    const [windowWidth, setWindowWidth] = useState(null);
    
    useEffect(() => {
        setWindowWidth(window.innerWidth);
    },[])

    return(
        <div className='bg-slate-800 text-white'>
            <Layout width={windowWidth} renderHeader={true} renderFooter={true}>
                <h1>Events Page</h1>
            </Layout>  
        </div>
    )
}

export default Events;