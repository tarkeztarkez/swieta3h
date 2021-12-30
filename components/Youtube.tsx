import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import ReactPlayer, { ReactPlayerProps } from "react-player";

function Youtube(props: ReactPlayerProps) {
  const [size, setSize] = useState([0, 0]);
  const [width, setwidth] = useState(640);
  const [height, setheight] = useState(360);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (window.innerHeight < 390) {
      setheight(window.innerHeight - 10);
      setwidth(Math.floor(height * 1.777));
    } else if (window.innerWidth < 670) {
      setwidth(window.innerWidth - 10);
      setheight(Math.floor(width * 0.5625));
    } else {
      setwidth(640);
      setheight(360);
    }
  }, [size]);

  return <ReactPlayer {...props} width={width} height={height} />;
}

export default Youtube;
