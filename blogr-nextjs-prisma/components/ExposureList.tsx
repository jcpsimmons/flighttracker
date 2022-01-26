import { useState } from "react";
import prisma from "../lib/prisma";
import { greatCircleDistance } from "great-circle-distance";
import PlaneSpeeds from "../utils/planeData";

const Exposure = ({
  exp: { destinationName, originName, distance, speed, plane, completed },
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="rounded m-8 p-2 shadow-md shadow-gray-500  border-2 border-black text-center max-w-[12rem] p bg-white  transition-all cursor-pointer"
    >
      <div className="bg-black -mt-2 -ml-2 -mr-2 p-2 mb-2">
        <h1 className="text-2xl text-yellow-400 font-bold">
          {originName}-{">"}
          {destinationName}
        </h1>
      </div>
      <div className={`${isHover && "invisible"} relative`}>
        <p className="text-xl font-bold mt-4 mb-2">{distance} miles</p>
        <p>
          You'll be riding in a <span className="font-bold">{plane}</span>{" "}
          travelling at a speed of{" "}
          <span className="font-bold">{speed} mph</span>
        </p>
        <p
          className={`${
            isHover ? "visible" : "invisible"
          } font-bold text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        >
          Click to Complete
        </p>
      </div>
    </div>
  );
};

const ExposureList = ({ exposures }) => {
  return (
    <div>
      {exposures
        .sort((a, b) => a.distance - b.distance)
        .filter((exp) => !exp.completed)
        .map((exp) => (
          <Exposure {...{ exp }} />
        ))}
    </div>
  );
};

export default ExposureList;
