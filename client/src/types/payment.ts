type PaymentCard = {
  cardHolderName: string;
  cardNumber: string;
  expireMonth: string;
  expireYear: string;
  cvc: string;
  registerCard: string;
};

type Buyer = {
  id: string;
  name: string;
  surname: string;
  gsmNumber: string;
  email: string;
  identityNumber: string;
  lastLoginDate: string;
  registrationDate: string;
  registrationAddress: string;
  ip: string;
  city?: string;
  country?: string;
  zipCode?: string;
};

type Address = {
  contactName: string;
  city?: string;
  country?: string;
  address?: string;
  zipCode?: string;
};

type BasketItem = {
  id: string;
  name: string;
  category1: string;
  itemType: string;
  price: string;
};

export type Focused = "number" | "name" | "expiry" | "cvc" | undefined;

export interface CardState {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus?: Focused;
}

export interface CardInfo {
  name: string;
  number: string;
  expiry: string;
  cvc: string;
};

export type PaymentData = {
  locale: string;
  conversationId: string;
  price: string;
  paidPrice: string;
  currency: string;
  installment: string;
  basketId?: string;
  paymentChannel: string;
  paymentGroup: string;
  paymentCard: PaymentCard;
  buyer: Buyer;
  shippingAddress: Address;
  billingAddress: Address;
  basketItems: BasketItem[];
};