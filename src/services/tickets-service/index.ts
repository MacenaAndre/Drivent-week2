import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/ticket-repository";
import { TicketType } from "@prisma/client";

type FullTicket =  {
        id: number,
        status: string, //RESERVED | PAID
        ticketTypeId: number,
        enrollmentId: number,
        TicketType: TicketType,
        createdAt: Date,
        updatedAt: Date,
      }

async function getTicketsByEnrollmentId(enrollmentId: number): Promise<FullTicket> {
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId);

  if(!ticket) {
    throw notFoundError();
  }

  const ticketType = await ticketsRepository.findTicketTypeById(ticket.ticketTypeId);

  const result = {
    ...ticket,
    TicketType: ticketType
  };

  return result;
}

const ticketsService = {
  getTicketsByEnrollmentId
};

export default ticketsService;
