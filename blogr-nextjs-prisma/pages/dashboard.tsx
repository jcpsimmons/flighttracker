import { useState } from "react";
import Button from "../components/elements/Button";
import AddExposure from "../components/AddExposure";
import ExposureList from "../components/ExposureList";
import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import Script from "next/script";

const Dashboard = ({ initialExposures }) => {
  const [exposures, setExposures] = useState([]);
  const { data: session } = useSession();

  const [isShowExposure, setIsShowExposure] = useState(false);

  useState(() => {
    setExposures(initialExposures);
  }, [initialExposures]);

  const refetchExposures = async () => {
    const res = await fetch("http://localhost:3000/api/exposure", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setExposures(data.exposures);
  };

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center">
          <ExposureList {...{ exposures, setExposures }} />{" "}
          {!isShowExposure && (
            <Button onClick={() => setIsShowExposure(true)}>+</Button>
          )}
          {isShowExposure && (
            <AddExposure {...{ setIsShowExposure, refetchExposures }} />
          )}
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
  if (res.status === 401) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
      props: {},
    };
  }
  const data = await res.json();

  return {
    props: {
      initialExposures: data.exposures,
    },
  };
}

export default Dashboard;
