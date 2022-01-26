import Script from "next/script";
import { useEffect, useState } from "react";
import Router from "next/router";
import PlaneSpeeds from "../utils/planeData";

const AddExposure = () => {
  const [origin, setOrigin] = useState({});
  const [destination, setDestination] = useState({});

  useEffect((): void => {
    const poll = setInterval(() => {
      if (window?.AirportInput) {
        const options = {
          formatting: `<div class="$(unique-result)"
                       single-result" 
                       data-index="$(i)"> 
                     $(IATA) $(name)</div>`,
        };

        window.AirportInput("origin", options);
        window.AirportInput("destination", options);
        clearInterval(poll);
      }
    }, 1000);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [originEl, destinationEl, planeEl] = e.target;
    const origin = extractGeoData(originEl);
    const destination = extractGeoData(destinationEl);
    const plane = planeEl.value;
    const speed = PlaneSpeeds[plane];

    try {
      const body = { origin, destination, plane, speed };
      await fetch("/api/exposure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      Router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const extractGeoData = (el) => {
    const longitude = parseFloat(el.dataset.lon);
    const latitude = parseFloat(el.dataset.lat);
    const iata = el.dataset.iata;

    return { latitude, longitude, iata };
  };

  return (
    <div>
      <h1>Add Exposure</h1>
      <form onSubmit={handleSubmit} autoComplete="chrome-off">
        <div>
          <label htmlFor="name">Origin</label>
          <input type="text" id="origin" autoComplete="new-password" />
        </div>
        <div>
          <label htmlFor="name">Destination</label>
          <input type="text" id="destination" autoComplete="new-password" />
        </div>
        <div>
          <select>
            <option value="Boeing 737">Boeing 737</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      <Script src="https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js" />
    </div>
  );
};

export default AddExposure;

declare global {
  interface Window {
    AirportInput: any;
  }
}
