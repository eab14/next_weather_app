import { useEffect, useRef } from "react";
import { SVG_forrest } from "./svg";
import { useBG } from "@/context/BackgroundContext";

const Background = () =>  {

    const weatherRef= useRef();
    const backgroundRef = useRef();

    const { setBackground, setCanvas, setCtx } = useBG();

    useEffect(() => {

        setCanvas(weatherRef.current);
        setBackground(backgroundRef.current);
        setCtx(weatherRef.current.getContext('2d'));

    }, [])
    
    return (
        <>
            <canvas ref={weatherRef} id="weather_canvas"></canvas>
            <section ref={backgroundRef}>{ SVG_forrest() }</section>
        </>
    );

}

export default Background;