import Script from "next/script";
import { useEffect, useState } from "react";
import Router from "next/router";

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

    const [originEl, destinationEl] = e.target;
    const origin = extractGeoData(originEl);
    const destination = extractGeoData(destinationEl);

    try {
      const body = { origin, destination, plane: "boeing whatever" };
      await fetch("/api/exposure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const extractGeoData = (el) => {
    const longitude = parseFloat(el.dataset.lon);
    const latitude = parseFloat(el.dataset.lat);
    const name = el.dataset.iata;

    return { latitude, longitude, name };
  };

  return (
    <div>
      <h1>Add Exposure</h1>
      <form onSubmit={handleSubmit} autoComplete="chrome-off">
        <div>
          <label htmlFor="name">Origin</label>
          <input type="text" id="origin" />
        </div>
        <div>
          <label htmlFor="name">Destination</label>
          <input type="text" id="destination" />
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
