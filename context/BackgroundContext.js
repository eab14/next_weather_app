import { createContext, useContext, useState, useEffect } from "react";
import { gsap } from "gsap";

const BackgroundContext = createContext();

export const useBG = () => useContext(BackgroundContext);

export const BackgroundProvider = ({ children }) => {

    const [ canvas, setCanvas ] = useState(null);
    const [ background, setBackground ] = useState(null);
    const [ ctx, setCtx ] = useState(null);
    const [ inter, setInter ] = useState(null);
    
    const addRain = () => {

        if (inter) clearInterval(inter);

        setSky("Rain");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const maxDrops = 500;
        const drops = [];

        let wind = -1;
        let angle = (wind !== 0) ? wind / 20 : 0;

        for (let i = 0; i < maxDrops; i++) {

            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 2 + 4,
                width: Math.random() * 2 + 1,
                angle: Math.random() * Math.PI
            });

        }

        drawWeather("rain", drops, angle, wind);

    }

    const addSnow = () => {

        if (inter) clearInterval(inter);

        setSky("Snow");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const maxFlakes = 100;
        const flakes = [];
        let wind = -1;

        for (let i = 0; i < maxFlakes; i++) {

            flakes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 2,
                speed: Math.random() * 1 + 0.5,
                drift: Math.random() * 2 - 1
            });
            
        }

        drawWeather("snow", flakes, 0, wind)

    }

    const addThunderstorm = () => {

        addRain();
        setSky("Thunderstorm");

        const sky = document.getElementById("sky");
        const tsInterval = setInterval(() => gsap.to(sky, { fill: "#f0f0f0", duration: 0.1, repeat: 3, yoyo: true }), 5000);
        setInter(tsInterval);

    }

    const setSky = (type) => {

        const sky = document.getElementById("sky");

        switch (type) {
        
            // case "night": sky.style.fill = "#141414"; break;
            case "Drizzle": sky.style.fill = "#777"; break;
            case "Rain": sky.style.fill = "#555"; break;
            case "Thunderstorm": sky.style.fill = "#444"; break;
            case "Snow": sky.style.fill = "#888"; break;
            case "clear sky": sky.style.fill = "#86edf2"; break;
            case "few clouds": sky.style.fill = "#eee"; break;
            case "scattered clouds": sky.style.fill = "#ddd"; break;
            case "broken clouds": sky.style.fill = "#aaa"; break;
            case "overcast clouds": sky.style.fill = "#888"; break;

        }

    }
    const setWind = () => {}

    const clearCanvas = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

    function drawWeather(type, array, angle, wind) {

        clearCanvas();
    
        if (type === "rain") {

            ctx.fillStyle = 'rgba(174,194,224,0.5)';
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
    
            for (let i = 0; i < array.length; i++) {

                const drop = array[i];
                ctx.beginPath();
                ctx.moveTo(drop.x, drop.y);
                ctx.lineTo(drop.x + angle, drop.y + drop.length);
                ctx.stroke();
    
                drop.y += drop.speed;
                drop.x += Math.sin(wind);
    
                if (drop.y > canvas.height) { drop.y = -drop.length; drop.x = Math.random() * canvas.width; }
                if (drop.x > canvas.width || drop.x < 0) drop.x = Math.random() * canvas.width;

            }

        } 
        
        else if (type === "snow") {

            ctx.fillStyle = 'rgba(200, 200, 200, 0.8)';
    
            for (let i = 0; i < array.length; i++) {

                const flake = array[i];
                ctx.beginPath();
                ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);
                ctx.fill();
    
                flake.y += flake.speed;
                flake.x += flake.drift + wind;
    
                if (flake.y > canvas.height) { flake.y = -flake.radius; flake.x = Math.random() * canvas.width; }
                if (flake.x > canvas.width || flake.x < 0) flake.x = Math.random() * canvas.width;

            }

        }
    
        requestAnimationFrame(() => drawWeather(type, array, angle, wind));

    }

    useEffect(() => { return () => (inter) && clearInterval(inter); }, [ inter ]);

    const context = {
        addRain,
        addSnow,
        addThunderstorm,
        setSky,
        setWind,
        setBackground,
        setCanvas,
        setCtx
    }

    return (
        <BackgroundContext.Provider value={context}>
            { children }
        </BackgroundContext.Provider>
    )

}