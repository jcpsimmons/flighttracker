import { useMemo, useState } from "react";
import prisma from "../lib/prisma";
import { greatCircleDistance } from "great-circle-distance";
import PlaneSpeeds from "../utils/planeData";
import Checkbox from "./elements/Checkbox";
import { randomPositive } from "../utils/textData";

const Exposure = ({
  exp: { destinationName, originName, distance, speed, plane, id, completed },
  setExposures,
}) => {
  const [isHover, setIsHover] = useState(false);

  const handleClick = async () => {
    if (!isHover) return;

    const res = await fetch("/api/exposure", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const { exposures } = await res.json();

    setExposures(exposures);
  };

  const positive = useMemo(() => randomPositive(), []);

  const genExposureText = (completed, distance, plane) => {
    if (!completed) {
      return (
        <p>
          You'll be riding in a <span className="font-bold">{plane}</span>{" "}
          travelling at a speed of{" "}
          <span className="font-bold">{speed} mph</span>
        </p>
      );
    }

    return (
      <p className="mt-6">
        You travelled <span className="font-bold">{distance} miles</span> in a{" "}
        <span className="font-bold">{plane}</span>. {positive}
      </p>
    );
  };

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleClick}
      className={`rounded relative m-8 p-2 shadow-md shadow-gray-500  border-2 text-center max-w-[24rem] transition-all pb-6 px-6 border-black ${
        completed
          ? "bg-black text-white"
          : "bg-white cursor-pointer hover:scale-105  duration-200 text-black"
      }`}
    >
      <div
        className={`-mt-2 -ml-6 -mr-6 p-2 mb-2 ${
          completed ? "bg-white" : "bg-black"
        }`}
      >
        <h1
          className={`text-2xl ${
            completed ? "text-green-600" : "text-yellow-400"
          } font-bold`}
        >
          {originName}-{">"}
          {destinationName}
        </h1>
      </div>
      <div className={`${isHover && !completed && "invisible"} relative`}>
        {!completed && (
          <p className="text-xl font-bold mt-4 mb-2">{distance} miles</p>
        )}
        {genExposureText(completed, distance, plane)}
        <p
          className={`${
            isHover && !completed ? "visible" : "invisible"
          } font-bold text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          Click to Complete
        </p>
      </div>
      {completed && (
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-6xl -rotate-12">
          👍
        </div>
      )}
    </div>
  );
};

const ExposureList = ({ exposures, setExposures }) => {
  const [isShowHidden, setIsShowHidden] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsShowHidden(!isShowHidden);
  };

  return (
    <div>
      {exposures
        .sort((a, b) => a.distance - b.distance)
        .filter((exp) => (isShowHidden ? exp : !exp.completed))
        .map((exp) => (
          <Exposure {...{ exp, setExposures }} />
        ))}{" "}
      <div
        className="flex items-center justify-center cursor-pointer mb-4"
        onClick={handleClick}
      >
        {exposures.filter((e) => e.completed).length > 0 && (
          <>
            <h3 className="text-lg font-bold">Show Completed Exposures: </h3>

            <Checkbox isChecked={isShowHidden} setIsChecked={setIsShowHidden} />
          </>
        )}
      </div>
    </div>
  );
};

export default ExposureList;
