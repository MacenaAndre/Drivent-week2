import { notFoundError, unauthorizedError } from "@/errors";
import { BodyPayment, InsertPayment } from "@/protocols";
import paymetnRepository from "@/repositories/payment-repository";
import ticketsRepository from "@/repositories/ticket-repository";
import { Payment } from "@prisma/client";

async function readTickets(ticketId: number, enrollmentId: number): Promise<void> {
  const ticket = await ticketsRepository.findTicketsByTicketId(ticketId);
  
  if(!ticket) {
    throw notFoundError();
  }

  if(ticket.enrollmentId !== enrollmentId) {
    throw unauthorizedError();
  }
}

async function readPayments(ticketId: number): Promise<Payment> {
  const payment = await paymetnRepository.findPayment(ticketId);
  return payment;
}

async function insertPayment(paymentBody: BodyPayment, enrollmentId: number): Promise<void> {
  const ticket = await ticketsRepository.findTicketsByTicketId(paymentBody.ticketId);
  
  if(!ticket) {
    throw notFoundError();
  }

  const userTicket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId);

  if(!userTicket) {
    throw unauthorizedError();
  }

  const ticketType = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);

  const postObject: InsertPayment = {
    ticketId: paymentBody.ticketId,
    value: ticketType.price,
    cardIssuer: paymentBody.cardData.issuer,
    cardLastDigits: paymentBody.cardData.number.slice(11),
  };

  await paymetnRepository.createPayment(postObject);
}

async function editTicketStatus(ticketId: number): Promise<void> {
  await ticketsRepository.updateTicket(ticketId);
}

const paymentsService = {
  readTickets,
  readPayments,
  insertPayment,
  editTicketStatus,
};

export default paymentsService;
