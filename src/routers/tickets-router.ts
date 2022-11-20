import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsByUser, getTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketsByUser)
  .get("/types", getTicketTypes);
  
export { ticketsRouter };
