import { useState } from "react";
import Button from "./elements/Button";
import AddExposure from "./AddExposure";
import ExposureList from "./ExposureList";

const Dashboard = ({ exposures }) => {
  const [isShowExposure, setIsShowExposure] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <ExposureList {...{ exposures }} />{" "}
      {!isShowExposure && (
        <Button onClick={() => setIsShowExposure(true)}>+</Button>
      )}
      {isShowExposure && <AddExposure {...{ setIsShowExposure }} />}
    </div>
  );
};

export default Dashboard;
