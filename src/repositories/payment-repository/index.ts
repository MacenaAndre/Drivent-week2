import { prisma } from "@/config";
import { InsertPayment } from "@/protocols";
import { Payment } from "@prisma/client";

async function findPayment(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

async function createPayment(postObject: InsertPayment): Promise<Payment> {
  return prisma.payment.create({
    data: postObject
  });
}

const paymetnRepository = {
  findPayment,
  createPayment,
};

export default paymetnRepository;
