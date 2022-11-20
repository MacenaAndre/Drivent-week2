import { prisma } from "@/config";
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

const ticketsRepository = {
  findTicketByEnrollmentId,
  findTicketTypeById,
};

export default ticketsRepository;
