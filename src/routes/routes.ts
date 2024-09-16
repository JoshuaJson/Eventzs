import { Router } from "express";
import { EventController } from "../controllers/EventController";
import { AttendeeController } from "../controllers/AttendeeController";
import { recommendNearbyPlaces } from '../controllers/MapboxController';

const router = Router();

router.post("/events", EventController.create);
router.get("/events", EventController.getAll);
router.put("/events/:id", EventController.update);
router.delete("/events/:id", EventController.delete);
router.post("/attendees", AttendeeController.register);
router.get("/attendees", AttendeeController.getAll);
router.get('/events/:id/details', EventController.getEventDetails);

// Ruta para obtener ubicaciones cercanas basadas en eventos
router.get('/recommend-nearby/:id', recommendNearbyPlaces);



export default router;