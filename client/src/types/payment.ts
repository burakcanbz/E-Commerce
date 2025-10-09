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

type OrderDetails = {
  _id: string;
  itemsPrice: number;
  totalPrice: number;
  user: {
    _id: string;
    email: string;
    phone?: string;
  };
  shippingAddress: {
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
  orderItems: {
    _id: string;
    name: string;
    category?: string;
    price: number;
  }[];
};

export type CardInfo = {
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