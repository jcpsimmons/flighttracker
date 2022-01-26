import { useEffect } from "react";
import prisma from "../lib/prisma";
import { greatCircleDistance } from "great-circle-distance";
import PlaneSpeeds from "../utils/planeData";

const Exposure = ({
  exp: { destinationName, originName, distance, speed, plane, completed },
}) => {
  return (
    <div>
      <h1>
        {originName}-{">"}
        {destinationName}
      </h1>
      <p>{distance} miles</p>
      <p>{plane}</p>
      <p>{speed} mph</p>
    </div>
  );
};

const ExposureList = ({ exposures }) => {
  return (
    <div>
      {exposures
        .sort((a, b) => a.distance - b.distance)
        .map((exp) => (
          <Exposure {...{ exp }} />
        ))}
    </div>
  );
};

export default ExposureList;
