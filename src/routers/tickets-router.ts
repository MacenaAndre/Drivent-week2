import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsByUser } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketsByUser);
  
export { ticketsRouter };
