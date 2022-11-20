import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsByUser, getTicketTypes, postTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketsByUser)
  .get("/types", getTicketTypes)
  .post("/", validateBody(createTicketSchema), postTicket);
  
export { ticketsRouter };
