import { useState } from "react";
import Button from "./elements/Button";
import AddExposure from "./AddExposure";
import ExposureList from "./ExposureList";

const Dashboard = ({ exposures }) => {
  const [isShowExposure, setIsShowExposure] = useState(false);

  return (
    <div>
      <h1>Exposure Planner</h1>
      {!isShowExposure && (
        <Button onClick={() => setIsShowExposure(true)}>+</Button>
      )}
      {isShowExposure && <AddExposure {...{ setIsShowExposure }} />}
      <ExposureList {...{ exposures }} />
    </div>
  );
};

export default Dashboard;
