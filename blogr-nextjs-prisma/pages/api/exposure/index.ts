import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

// POST /api/exposure
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { destination, origin, plane } = req.body;

  const {
    latitude: originLat,
    longitude: originLon,
    name: originName,
  } = origin;
  const {
    latitude: destinationLat,
    longitude: destinationLon,
    name: destinationName,
  } = destination;

  const session = await getSession({ req });
  const result = await prisma.exposure.create({
    data: {
      originLat,
      originLon,
      destinationLat,
      destinationLon,
      plane,
    },
  });
  res.json(result);
}
