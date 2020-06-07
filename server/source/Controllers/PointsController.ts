import { Request, Response } from "express";
import knex from "../database/connection";

class PointsController {
  async index(request: Request, response: Response) {
    const { city, uf, items } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "point_items.point_id", "=", "points.id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map((point) => {
      return {
        ...point,
        image_url: `http://192.168.1.102:9000/uploads/${point.image}`,
      };
    });

    return response.json(serializedPoints);
  }

  async store(request: Request, response: Response) {
    const {
      name,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
      items,
    } = request.body;

    const transaction = await knex.transaction();

    const point = {
      image: request.file.filename,
      name,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude,
    };

    const insertedIds = await transaction("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items
      .split(",")
      .map((item: string) => Number(item.trim()))
      .map((item_id: Number) => {
        return {
          item_id,
          point_id,
        };
      });

    await transaction("point_items").insert(pointItems);
    await transaction.commit();

    return response.json({
      id: point_id,
      ...point,
    });
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return response.status(400).json({ message: "Point not found " });
    }

    const serializedPoint = {
      ...point,
      image_url: `http://192.168.1.102:9000/uploads/${point.image}`,
    };

    const items = await knex("items")
      .join("point_items", "point_items.item_id", "=", "items.id")
      .where("point_items.point_id", id);

    return response.json({ point: serializedPoint, items });
  }
}

export default PointsController;
