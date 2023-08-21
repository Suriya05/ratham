import express from "express";
import { bookSession, createSession, getAllSessions, getPendingSessions } from "../controllers/sessions.js";

const router = express.Router();
router.get("/", getAllSessions);
router.get("/dean/pending", getPendingSessions);
router.post("/", createSession);
router.post("/book", bookSession);

export default router;