import { useState } from "react";
import AddExposure from "./AddExposure";
import ExposureList from "./ExposureList";

const Dashboard = ({ exposures }) => {
  const [isShowExposure, setIsShowExposure] = useState(true);

  return (
    <div>
      <h1>Exposure Planner</h1>
      {isShowExposure && <AddExposure />}
      <ExposureList {...{ exposures }} />
    </div>
  );
};

export default Dashboard;
