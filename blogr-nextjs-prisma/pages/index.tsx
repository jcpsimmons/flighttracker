import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Script from "next/script";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";

import { getSession } from "next-auth/react";

const Main: React.FC<{}> = () => {
  return (
    <>
      <Layout>
        <div className="text-4xl font-bold text-center bg-white p-48">
          <h1>this is the index - you gotta log in or go to /dashboard</h1>
        </div>
      </Layout>
    </>
  );
};

// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   // redirect to dashboard if logged in...
//   // const exposures = await prisma.exposure.findMany();
// }

export default Main;
