import { useState } from "react";
import Button from "../components/elements/Button";
import AddExposure from "../components/AddExposure";
import ExposureList from "../components/ExposureList";
import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Script from "next/script";

const Dashboard = ({ exposures }) => {
  // const { data: session, status } = useSession();

  const [isShowExposure, setIsShowExposure] = useState(false);

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center">
          <ExposureList {...{ exposures }} />{" "}
          {!isShowExposure && (
            <Button onClick={() => setIsShowExposure(true)}>+</Button>
          )}
          {isShowExposure && <AddExposure {...{ setIsShowExposure }} />}
        </div>
      </Layout>
      <Script src="https://cdn.jsdelivr.net/npm/airport-autocomplete-js@latest/dist/index.browser.min.js" />
    </>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch("http://localhost:3000/api/exposure", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      cookie: context.req.headers.cookie,
    },
  });
  const data = await res.json();
  console.log(data);
  return {
    props: {
      exposures: data.exposures,
    },
  };
}

export default Dashboard;
