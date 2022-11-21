import { prisma } from "@/config";
import { InsertTicket } from "@/protocols";
import { Ticket, TicketType } from "@prisma/client";

async function findTicketByEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
  });
}

async function findTicketTypeById(ticketTypeId: number): Promise<TicketType> {
  return prisma.ticketType.findFirst({
    where: { id: ticketTypeId },
  });
}

async function findTicketTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function createTicket(objectToInsert: InsertTicket): Promise<Ticket> {
  return prisma.ticket.create({
    data: objectToInsert,
  });
}

async function findTicketsByTicketId(ticketId: number): Promise<Ticket> {
  return prisma.ticket.findFirst({
    where: { id: ticketId },
  });
}

const ticketsRepository = {
  findTicketByEnrollmentId,
  findTicketTypeById,
  findTicketTypes,
  createTicket,
  findTicketsByTicketId,
};

export default ticketsRepository;
