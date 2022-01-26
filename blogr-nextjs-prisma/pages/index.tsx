import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Dashboard from "../components/Dashboard";

const Main: React.FC<{}> = ({ exposures }) => {
  return (
    <Layout>
      <Dashboard {...{ exposures }} />
    </Layout>
  );
};

export async function getStaticProps() {
  const exposures = await prisma.exposure.findMany();
  return {
    props: {
      exposures: exposures,
    },
  };
}

export default Main;
