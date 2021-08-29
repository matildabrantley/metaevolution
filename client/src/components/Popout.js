import React, { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "../index.css";

function Popout({ children }) {
    
    const [animatedProps, setAnimatedProps] = useSpring(() => {
        return {
            coords: [1, 1, 1],
            // react-spring physics
            config: { mass: 5, tension: 150, friction: 30, precision: 0.00002 }
        };
    });
    
    // hover state
    const [hoveredOver, setHoveredOver] = useState(false);

    const ref = useRef(); 
    return (
      <animated.div
        className="popout"
        onMouseEnter={() => setHoveredOver(true)}
        ref={ref}
        style={{
            //Hovered element pops out over other elements
            zIndex: hoveredOver ? 2 : 1,
            transform: animatedProps.coords.to((xCoord, yCoord, scale) =>
            `perspective(1000px) rotateX(${xCoord}deg) rotateY(${yCoord}deg) scale(${scale})`)
        }}
        onMouseMove={({ clientX, clientY }) => {
          //Mouse
          const xCoord = clientX - (ref.current.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft));
          const yCoord = clientY - (ref.current.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop));
  
          const coords = [-1 * (yCoord - ref.current.clientHeight / 2) / 80, 
            (xCoord - ref.current.clientWidth / 2) / 80,
            1.15 //Scaling factor for hovered work card
          ];
          setAnimatedProps({ coords: coords });
        }}
        onMouseLeave={() => {
          setHoveredOver(false);
          // Reset coordinates
          setAnimatedProps({ coords: [0, 0, 1] });
        }}
      >
        {children}
      </animated.div>
    );
  }

  export default Popout;