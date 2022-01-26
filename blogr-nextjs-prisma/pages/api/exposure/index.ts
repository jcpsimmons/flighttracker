import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { greatCircleDistance } from "great-circle-distance";
import prisma from "../../../lib/prisma";
import PlaneSpeeds from "../../../utils/planeData";

// POST /api/exposure
export default async function handle(req, res) {
  const { destination, origin, plane } = req.body;
  const speed = PlaneSpeeds[plane] as unknown as number;

  const {
    latitude: originLat,
    longitude: originLon,
    iata: originName,
  } = origin;
  const {
    latitude: destinationLat,
    longitude: destinationLon,
    iata: destinationName,
  } = destination;

  const distance =
    greatCircleDistance({
      lat1: originLat,
      lng1: originLon,
      lat2: destinationLat,
      lng2: destinationLon,
    }) * 0.62137;

  const result = await prisma.exposure.create({
    data: {
      originLat,
      originLon,
      originName,
      destinationLat,
      destinationLon,
      destinationName,
      plane,
      distance: parseInt(distance.toFixed(0)),
      speed,
    },
  });
  res.json(result);
}
