import { notFoundError, unauthorizedError } from "@/errors";
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

const paymentsService = {
  readTickets,
  readPayments,
};

export default paymentsService;
