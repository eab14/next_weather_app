import { createContext, useContext, useState, useEffect } from "react";
import { gsap } from "gsap";

const BackgroundContext = createContext();

export const useBG = () => useContext(BackgroundContext);

export const BackgroundProvider = ({ children }) => {

    const [ canvas, setCanvas ] = useState(null);
    const [ background, setBackground ] = useState(null);
    const [ ctx, setCtx ] = useState(null);
    const [ inter, setInter ] = useState(null);
    const [ animation, setAnimation ] = useState(null);
    
    const addRain = (desc) => {

        if (inter) clearInterval(inter);

        setSky("Rain");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let max = 0;
        let drop_width = 1;

        switch (desc) {

            case "light rain": max = parseInt(canvas.width / 15); break;
            
            case "moderate rain":
            case "light intensity shower rain":
                max = max = parseInt(canvas.width / 10); break;

            case "heavy intensity rain": max = parseInt(canvas.width / 5); drop_width = 2; break;
            case "very heavy rain": max = max = parseInt(canvas.width / 4); drop_width = 2; break;
            case "extreme rain": max = max = parseInt(canvas.width / 3); drop_width = 2;

        }

        const drops = [];

        let wind = -1;
        let angle = (wind !== 0) ? wind / 20 : 0;

        for (let i = 0; i < max; i++) {

            drops.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                length: Math.random() * 20 + 10,
                speed: Math.random() * 2 + 4,
                width: Math.random() * 2 + drop_width,
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

        setSky("Thunderstorm");
        addRain("heavy intensity rain");

        const sky = document.getElementById("sky");
        const tsInterval = setInterval(() => gsap.to(sky, { fill: "#f0f0f0", duration: 0.1, repeat: 3, yoyo: true }), 5000);
        setInter(tsInterval);

    }

    const setSky = (type) => {

        resetCanvas();
        
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

    const setDaylight = (time, sunrise, sunset, timezone) => {

        let offset = 14400;
        time = time + (offset + timezone);
        sunrise = sunrise + (offset + timezone);
        sunset = sunset + (offset + timezone);

        const sky = document.getElementById("sky");
        sky.style.opacity = (time >= sunrise && time < sunset) ? 1 : 0.2;

    }

    const setWind = (speed) => {

        resetWind();

        let km = speed * 3.2;
        let offset = 0;
        let duration = 0.4;

        if (km >= 10 && km < 20) offset = -2;
        else if (km >= 20 && km < 30) offset = -4;
        else if (km >= 30 && km < 45) { offset = -7; duration = 0.38 }
        else if (km >= 45) { offset = -12; duration = 0.35; }

        const trees = document.querySelectorAll(".tree");

        trees.forEach((tree) => 
            gsap.to(tree, { rotate: offset + Math.random(), transformOrigin: "50%, 100%", duration: duration + (Math.random() / 2), yoyo: true, repeat: -1 }));

    }

    const resetWind = () => {

        const trees = document.querySelectorAll(".tree");
        trees.forEach((tree) => { gsap.to(tree, { rotate: 0, yoyo: false, repeat: 0 }) });
    }

    const resetCanvas = () => {

        resetWind();
        cancelAnimationFrame(animation);
        clearInterval(inter);

        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (canvas) {

            canvas.style.transform = '';
            canvas.style.transition = '';

        }

    };

    function drawWeather(type, array, angle, wind) {

        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
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
    
        const rainFrame = requestAnimationFrame(() => drawWeather(type, array, angle, wind));
        setAnimation(rainFrame);

    }

    const context = {
        addRain,
        addSnow,
        addThunderstorm,
        setSky,
        setWind,
        setBackground,
        setCanvas,
        setCtx,
        resetCanvas,
        setDaylight
    }

    return (
        <BackgroundContext.Provider value={context}>
            { children }
        </BackgroundContext.Provider>
    )

}