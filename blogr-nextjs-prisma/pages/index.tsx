import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import Dashboard from "../components/Dashboard";

const Main: React.FC<> = () => {
  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
};

export default Main;
