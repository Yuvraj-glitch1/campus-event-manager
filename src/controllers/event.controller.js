import { Event } from "../models/event.model.js";

const createEvent = async (req, res) => {
  try {
    const { eventName, organizerClub, venue, maxParticipants, registrationFee } =
      req.body;

    if (!eventName || !organizerClub || !venue || !maxParticipants) {
      return res.status(400).json({
        message:
          "eventName, organizerClub, venue and maxParticipants are required",
      });
    }

    const event = await Event.create({
      eventName,
      organizerClub,
      venue,
      maxParticipants,
      registrationFee,
    });

    return res
      .status(201)
      .json({ message: "Event created successfully", event });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No data provided for update" });
    }

    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res
      .status(200)
      .json({ message: "Event updated successfully", event });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json({ message: "Event successfully deleted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export { createEvent, getEvents, updateEvent, deleteEvent };
