import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";

// width指定がないと描画されない。
const VIEW_STYLE = {
  width: "100%",
  aspectRatio: "16 / 9",
};

type Props = {
  lat: number;
  lng: number;
  zoom: number;
  children?:
    | React.ReactElement<google.maps.MarkerOptions>[]
    | React.ReactElement<google.maps.MarkerOptions>;
};

const Content: React.FC<Props> = ({ lat, lng, children, zoom }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: {
          lat,
          lng,
        },
        zoom,
      };
      setMap(new window.google.maps.Map(ref.current, option));
    }
  }, []);

  return (
    <>
      <div ref={ref} style={VIEW_STYLE} />
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { map });
        }
      })}
    </>
  );
};

export default Content;
