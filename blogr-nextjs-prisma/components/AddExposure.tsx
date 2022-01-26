import Script from "next/script";
import { useEffect, useState } from "react";
import Router from "next/router";
import PlaneSpeeds from "../utils/planeData";
import Spinner from "./elements/Spinner";
import Button from "./elements/Button";

const AddExposure = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect((): void => {
    const poll = setInterval(() => {
      if (window?.AirportInput) {
        const options = {
          formatting: `<div class="$(unique-result)" data-index="$(i)">$(IATA) - $(name)</div>`,
        };

        window.AirportInput("origin", options);
        window.AirportInput("destination", options);

        clearInterval(poll);
      }
    }, 1000);

    const checkLoading = setInterval(() => {
      if (!!document.querySelector(".autocomplete-results.origin")) {
        setTimeout(() => {
          setIsLoading(false);
          clearInterval(checkLoading);
        }, 1000);
      }
    });
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
    <div className="border-black border-2 p-4 rounded text-center shadow-md shadow-gray-500 font-bold transition-all mb-52">
      <div className="bg-black -ml-4 -mr-4 -mt-4 py-2 pt-4 text-white ">
        <h1 className="text-center font-bold text-2xl mb-4">Add Exposure</h1>
      </div>
      {isLoading && <Spinner className="m-10" />}
      <form
        className={isLoading ? "hidden" : "block"}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="my-4 flex-col flex">
          <label className="mb-2" htmlFor="name">
            Where are you leaving from?
          </label>
          <input
            className="w-full rounded-md border-2 border-black"
            type="text"
            id="origin"
            autoComplete="new-password"
            autoComplete="off"
          />
        </div>
        <div className="my-4 flex-col flex">
          <label className="mb-2" htmlFor="name">
            Where are you going to?
          </label>
          <input
            className="w-full rounded-md border-2 border-black"
            type="text"
            id="destination"
            autoComplete="new-password"
            autoComplete="off"
          />
        </div>
        <div className="my-4 flex-col flex">
          <label className="mb-2 w-full" htmlFor="airplane block">
            What will you be flying in?
          </label>
          <select id="airplane" className="border-2 border-black">
            <option value="Boeing 737">Boeing 737</option>
          </select>
        </div>
        <Button type="submit" size="md">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddExposure;

declare global {
  interface Window {
    AirportInput: any;
  }
}
