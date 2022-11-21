import { TicketStatus } from "@prisma/client";

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type InsertTicket = {
  enrollmentId: number,
  ticketTypeId: number,
  status: TicketStatus,
};

export type CardData = {
  issuer: string,
  number: string,
  name: string,
  expirationDate: string,
  cvv: string,
}

export type BodyPayment = {
  ticketId: number,
  cardData: CardData,
};

export type InsertPayment = {
  ticketId: number
  value: number
  cardIssuer: string,
  cardLastDigits: string,
}
