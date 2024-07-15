export function calculateAntipodes(
  lat: number,
  lon: number
): { lat: number; lon: number } {
  // Calculate the antipode coordinates
  const antipodeLat = -lat;
  const antipodeLon = lon < 0 ? lon + 180 : lon - 180;

  return {
    lat: antipodeLat,
    lon: antipodeLon,
  };
}
