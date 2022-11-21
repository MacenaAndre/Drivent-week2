import { AuthenticatedRequest } from "@/middlewares";
import { BodyPayment } from "@/protocols";
import enrollmentsService from "@/services/enrollments-service";
import paymentsService from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId } = req.query;

  if(!ticketId) {
    return res.send(httpStatus.BAD_REQUEST);
  }

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);
    await paymentsService.readTickets(Number(ticketId), enrollmentWithAddress.id);
    const payment = await paymentsService.readPayments(Number(ticketId));

    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.send(httpStatus.UNAUTHORIZED);
    }
    return res.send(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const paymentBody = req.body as BodyPayment;

  try {
    const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);
    await paymentsService.insertPayment(paymentBody, enrollmentWithAddress.id);
    await paymentsService.editTicketStatus(paymentBody.ticketId);
    const payment = await paymentsService.readPayments(paymentBody.ticketId);

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.send(httpStatus.NOT_FOUND);
    }
    if (error.name === "UnauthorizedError") {
      return res.send(httpStatus.UNAUTHORIZED);
    }
    return res.send(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
