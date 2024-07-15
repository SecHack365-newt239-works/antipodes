import { useEffect, useState } from "react";

import { Wrapper } from "@googlemaps/react-wrapper";
import { createFileRoute } from "@tanstack/react-router";

import Content from "#/components/Content";
import Marker from "#/components/Marker";
import { calculateAntipodes } from "#/libs/antipodes";

export const Route = createFileRoute("/")({
  component: () => {
    // see https://developers.google.com/maps/documentation/javascript
    const googleMapsApiKey = import.meta.env.VITE_API_KEY as string;

    const [currentPosition, setCurrentPosition] = useState<{
      lat: number;
      lon: number;
    } | null>(null);
    const [antipode, setAntipode] = useState<{
      lat: number;
      lon: number;
    } | null>(null);

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setAntipode(
            calculateAntipodes(
              position.coords.latitude,
              position.coords.longitude
            )
          );
        });
      }
    }, []);

    return (
      <Wrapper apiKey={googleMapsApiKey}>
        <div style={{ display: "flex", flexDirection: "row", gap: "1%" }}>
          {currentPosition && (
            <div style={{ width: "48%" }}>
              <div>
                <h2>Current Position</h2>
                <p>Latitude: {currentPosition.lat}</p>
                <p>Longitude: {currentPosition.lon}</p>
              </div>
              <div style={{ width: "100%", height: "500px" }}>
                <Content
                  lat={currentPosition.lat}
                  lng={currentPosition.lon}
                  zoom={16}
                >
                  <Marker
                    position={{
                      lat: currentPosition.lat,
                      lng: currentPosition.lon,
                    }}
                  />
                </Content>
              </div>
            </div>
          )}
          {antipode && (
            <div style={{ width: "48%" }}>
              <div>
                <h2>Antipode</h2>
                <p>Latitude: {antipode.lat}</p>
                <p>Longitude: {antipode.lon}</p>
              </div>
              <div style={{ width: "100%", height: "500px" }}>
                <Content lat={antipode.lat} lng={antipode.lon} zoom={4}>
                  <Marker
                    position={{
                      lat: antipode.lat,
                      lng: antipode.lon,
                    }}
                  />
                </Content>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    );
  },
});
