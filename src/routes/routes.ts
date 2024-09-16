import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { AttendeeController } from "../controllers/AttendeeController";

import { recommendNearbyPlaces } from '../controllers/MapboxController';

//const mapboxService = new MapboxService();
//  const mapboxController = new MapboxController(mapboxService);

const router = Router();

router.post("/events", EventController.create);
router.get("/events", EventController.getAll);
router.put("/events/:id", EventController.update);
router.delete("/events/:id", EventController.delete);
router.post("/attendees", AttendeeController.register);
router.get("/attendees", AttendeeController.getAll);

// Ruta para obtener ubicaciones cercanas basadas en eventos
router.get('/recommend-nearby', recommendNearbyPlaces);
//router.get("/locations/nearby", mapboxController.getNearbyLocations.bind(mapboxController));

export default router;