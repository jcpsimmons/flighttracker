import Script from "next/script";
import { useEffect, useState } from "react";

const AddExposure = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const longitude = e.target.getAttribute("data-lon");
    const latitude = e.target.getAttribute("data-lat");
    console.log(x);
  };

  return (
    <div>
      <h1>Add Exposure</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Origin</label>
          <input type="text" id="origin" onChange={() => handleChange(this)} />
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
