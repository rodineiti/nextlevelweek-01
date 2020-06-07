import express from "express";
import multer from "multer";
import { celebrate, Joi } from "celebrate";
import multerCofig from "./config/multer";

import PointsController from "./Controllers/PointsController";
import ItemsController from "./Controllers/ItemsController";

const routes = express.Router();
const upload = multer(multerCofig);

routes.get("/items", new ItemsController().index);

routes.get("/points", new PointsController().index);
routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  new PointsController().store
);
routes.get("/points/:id", new PointsController().show);

export default routes;
