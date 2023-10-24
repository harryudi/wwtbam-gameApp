import React, { useEffect, useState } from 'react'

export default function Timer({setStopGame, questionNumber}) {
    const [timer, setTimer]=useState(3)
    useEffect(()=>{
        if (timer===0) return setStopGame(true);
        const interval = setInterval(()=>{
            setTimer((prev)=>prev - 1);
        }, 1000)
    },[setStopGame, timer]);
    
    useEffect(()=> {
        setTimer(30);
    },[questionNumber]);
    
    return timer;
}

