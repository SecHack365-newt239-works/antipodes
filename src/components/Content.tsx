import { useEffect, useRef, useState } from "react";

// 最初にMapを表示する時の設定
const DEFAULT = {
  CENTER: {
    lat: 35.6973225,
    lng: 139.8265658,
  },
  ZOOM: 16,
} as const;

// width指定がないと描画されない。
const VIEW_STYLE = {
  width: "100%",
  aspectRatio: "16 / 9",
};

type Props = {
  lat: number;
  lng: number;
};

const Content: React.FC<Props> = ({ lat, lng }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      const option = {
        center: {
          lat,
          lng,
        },
        zoom: DEFAULT.ZOOM,
      };
      setMap(new window.google.maps.Map(ref.current, option));
    }
  }, []);

  return <div ref={ref} style={VIEW_STYLE} />;
};

export default Content;
