import React, { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "../index.css";

function Flipout({ children }) {
    
    const [animatedProps, setAnimatedProps] = useSpring(() => {
        return {
            coords: [1, 1, 1],
            // react-spring physics
            config: { mass: 7, tension: 140, friction: 20, precision: 0.000018 }
        };
    });
    
    // hover state
    const [isMouseDown, setIsMouseDown] = useState(false);

    const ref = useRef(); 
    return (
      <animated.div
        className="flipout"
        onMouseEnter={() => setIsMouseDown(true)}
        ref={ref}
        style={{zIndex: isMouseDown ? 2 : 1,
            transform: animatedProps.coords.to((xCoord, yCoord, scale) =>
            `perspective(1000px) rotateX(${xCoord}deg) rotateY(${yCoord}deg) scale(${scale})`)
        }}
        onMouseDown={({ clientX, clientY }) => {
          //Mouse
          const xCoord = clientX - (ref.current.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft));
          const yCoord = clientY - (ref.current.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop));
  
          const coords = [-1 * (yCoord - ref.current.clientHeight / 2) / 80 + 200, 
            (xCoord - ref.current.clientWidth / 2) / 80,
            2 //Scaling factor for hovered element
          ];
          setAnimatedProps({ coords: coords });
        }}
        onMouseUp={() => {
          setIsMouseDown(false);
          // Reset coordinates
          setAnimatedProps({ coords: [0, 0, 1] });
        }}
      >
        {children}
      </animated.div>
    );
  }

  export default Flipout;