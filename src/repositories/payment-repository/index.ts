import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function findPayment(ticketId: number): Promise<Payment> {
  return prisma.payment.findFirst({
    where: { ticketId }
  });
}

const paymetnRepository = {
  findPayment,
};

export default paymetnRepository;
