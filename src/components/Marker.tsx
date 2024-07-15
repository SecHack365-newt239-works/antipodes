import { useEffect, useState } from "react";

const Marker: React.FC<google.maps.MarkerOptions> = (options) => {
  const [markar, setMarkar] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!markar) {
      setMarkar(new google.maps.Marker());
    }

    return () => {
      if (markar) {
        markar.setMap(null);
      }
    };
  }, [markar]);

  useEffect(() => {
    if (markar) {
      markar.setOptions(options);
    }
  }, [markar, options]);

  return null;
};

export default Marker;
