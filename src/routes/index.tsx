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

    const [currentPosition, setCurrentPosition] =
      useState<GeolocationPosition | null>(null);
    const [antipode, setAntipode] = useState<{
      lat: number;
      lon: number;
    } | null>(null);

    useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position);
          setCurrentPosition(position);
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
                <table>
                  <tr>
                    <td>Latitude</td>
                    <td>{currentPosition.coords.latitude}</td>
                  </tr>
                  <tr>
                    <td>Longitude</td>
                    <td>{currentPosition.coords.longitude}</td>
                  </tr>
                  <tr>
                    <td>Altitude</td>
                    <td>{currentPosition.coords.altitude}</td>
                  </tr>
                  <tr>
                    <td>Accuracy</td>
                    <td>{currentPosition.coords.accuracy}</td>
                  </tr>
                  <tr>
                    <td>Altitude Accuracy</td>
                    <td>{currentPosition.coords.altitudeAccuracy}</td>
                  </tr>
                  <tr>
                    <td>Heading</td>
                    <td>{currentPosition.coords.heading}</td>
                  </tr>
                  <tr>
                    <td>Speed</td>
                    <td>{currentPosition.coords.speed}</td>
                  </tr>
                </table>
              </div>
              <div style={{ width: "100%", height: "500px" }}>
                <Content
                  lat={currentPosition.coords.latitude}
                  lng={currentPosition.coords.longitude}
                  zoom={16}
                >
                  <Marker
                    position={{
                      lat: currentPosition.coords.latitude,
                      lng: currentPosition.coords.longitude,
                    }}
                  />
                </Content>
              </div>
              <p>
                ref:{" "}
                <a href="https://developer.mozilla.org/ja/docs/Web/API/GeolocationCoordinates">
                  https://developer.mozilla.org/ja/docs/Web/API/GeolocationCoordinates
                </a>
              </p>
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
