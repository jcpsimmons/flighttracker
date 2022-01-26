import { useEffect } from "react";
import prisma from "../lib/prisma";

const Exposure = ({ exp: { destination, origin } }) => {
  return (
    <div>
      <h1>
        {origin}-{">"}
        {destination}
      </h1>
    </div>
  );
};

const ExposureList = ({ exposures }) => {
  return (
    <div>
      {exposures.map((exp) => (
        <Exposure {...{ exp }} />
      ))}
    </div>
  );
};

export default ExposureList;
