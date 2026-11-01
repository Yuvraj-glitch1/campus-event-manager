import { Router } from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.route("/create").post(createEvent);
router.route("/getEvents").get(getEvents);
router.route("/update/:id").patch(updateEvent);
router.route("/delete/:id").delete(deleteEvent);

export default router;
