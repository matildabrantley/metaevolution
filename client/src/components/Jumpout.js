import React, { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "../index.css";

function Jumpout({ children }) {
    
    const [animatedProps, setAnimatedProps] = useSpring(() => {
        return {
            coords: [1, 1, 1],
            // react-spring physics
            config: { mass: 5, tension: 150, friction: 10, precision: 0.00002 }
        };
    });
    
    // hover state
    const [hoveredOver, setHoveredOver] = useState(false);
    const [red, setRed] = useState(255);
    const [green, setGreen] = useState(255);
    const [blue, setBlue] = useState(255);

    const ref = useRef(); 
    return (<animated.div
        className="jumpout"
        onMouseEnter={() => { setHoveredOver(true);
                              setRed(Math.random() * 180 + 75);
                              setGreen(Math.random() * 180 + 75);
                              setBlue(Math.random() * 180 + 75);
        }}
        ref={ref}
        style={{
            color: `rgb( ${red}, ${green}, ${blue})`,
            display: 'inline-Block',
            //Hovered element pops out over other elements
            zIndex: hoveredOver ? 2 : 1,
            transform: animatedProps.coords.to((xCoord, yCoord, scale) =>
            `perspective(1000px) rotateX(${xCoord}deg) rotateY(${yCoord}deg) scale(${scale})`)
        }}
        onMouseMove={({ clientX, clientY }) => {
          //Mouse
          const xCoord = clientX - (ref.current.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft));
          const yCoord = clientY - (ref.current.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop));
  
          const coords = [-1 * (yCoord - ref.current.clientHeight / 2) / 80 + 300, 
            (xCoord - ref.current.clientWidth / 2) / 80 + 30,
            1.5 //Scaling factor for hovered element
          ];
          setAnimatedProps({ coords: coords });
        }}
        onMouseLeave={() => {
          setHoveredOver(false);
          // Reset coordinates
          setAnimatedProps({ coords: [0, 0, 1] });
        }}
      >{children}</animated.div>);
  }

  export default Jumpout;