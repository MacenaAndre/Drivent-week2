import { notFoundError } from "@/errors";
import { InsertTicket } from "@/protocols";
import ticketsRepository from "@/repositories/ticket-repository";
import { TicketType } from "@prisma/client";

type FullTicket =  {
        id: number,
        status: string,
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

async function getAllTicketTypes(): Promise<TicketType[]> {
  const ticketTypes = await ticketsRepository.findTicketTypes();
  return ticketTypes;
}

async function insertTicket(enrollmentId: number, ticketTypeId: number) {
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId);  
  if(!ticket) {
    const objectToInsert: InsertTicket = {
      enrollmentId,
      ticketTypeId,
      status: "RESERVED",
    };
    
    await ticketsRepository.createTicket(objectToInsert);
  }
}

const ticketsService = {
  getTicketsByEnrollmentId,
  getAllTicketTypes,
  insertTicket,
};

export default ticketsService;
