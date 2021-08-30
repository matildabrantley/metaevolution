import React, { useState, useRef } from "react";
import { useTrail, animated } from "react-spring";

const config = { mass: 6, tension: 1800, friction: 500 };

function Glide({ children }) {
  const [clicked, setState] = useState(true);
  const trail = useTrail(children.length, {
    config,
    from: { opacity: 0, x: 100 },
    to: { opacity: clicked ? 1 : 0, x: clicked ? 20 : 10 }
  });
  return (
    <div onClick={() => setState(clicked => !clicked)}>
      {trail.map(({ x, ...otherProps }, i) => (
        <animated.div
          key={ children[i] }
          style={{
            ...otherProps,
            transform: x.to(x => `translate3d(${x}px, 0, 0)`)
          }}
        >
          <animated.div>{ children[i] }</animated.div>
        </animated.div>
      ))}
    </div>
  );
}
  export default Glide;