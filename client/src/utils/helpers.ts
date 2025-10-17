import type { CardInfo, PaymentData } from "../types/payment";
import type { UserInfo } from "../types/redux";

export const convertToUTC = (time: string | null | undefined) => {
  if (time) {
    const date = new Date(time);
    date.setHours(date.getHours() + 3);
    return date.toISOString().replace("T", " ").slice(0, 19);
  }
  return "";
};

export const getQueryParams = (queryParams: URLSearchParams) => {
  const rawCategory = queryParams.get("category");
  const category = rawCategory
    ? rawCategory[0].toUpperCase() + rawCategory.slice(1)
    : "Default";
  return { category };
};

export const imageToBase64 = async (img: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);

  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  return data;
};

export const getUserInfoFromLocalStorage = (): UserInfo | null => {
  const stored = localStorage.getItem("userInfo");
  const userInfo = stored ? JSON.parse(stored) : null;
  return userInfo;
};

export const hideUserName = (name: string): string => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0][0] + "*".repeat(names[0].length - 1);
  } else {
    return names.map((n) => n[0] + "*".repeat(n.length - 1)).join(" ");
  }
};

export const spacer = (): string => {
  const length = 18;
  return "\u00A0".repeat(length);
};

export const bottomNavigationPaths = ["/", "/category"];

export const createPaymentData = (orderDetails: any, state: CardInfo): PaymentData => {
  return {
    locale: "",
    conversationId: "123456789",
    price: orderDetails?.itemsPrice.toString(),
    paidPrice: (orderDetails?.totalPrice * 1.2).toString(),
    currency: "",
    installment: "1",
    basketId: orderDetails?._id,
    paymentChannel: "",
    paymentGroup: "",
    paymentCard: {
      cardHolderName: state.name,
      cardNumber: state.number,
      expireMonth: state.expiry.split("/")[0].trim(),
      expireYear: state.expiry.split("/")[1].trim(),
      cvc: state.cvc,
      registerCard: '0',
    },
    buyer: {
      id: orderDetails?.user._id,
      name: state.name.split(" ")[0],
      surname: state.name.split(" ")[1] || " ",
      gsmNumber: orderDetails?.user.phone || "+905350000000",
      email: orderDetails?.user.email,
      identityNumber: "74300864791",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2013-04-21 15:12:09",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "85.34.78.112",
      city: orderDetails?.shippingAddress.city,
      country: orderDetails?.shippingAddress.country,
      zipCode: orderDetails?.shippingAddress.postalCode,
    },
    shippingAddress: {
      contactName: "Jane Doe",
      city: orderDetails?.shippingAddress.city,
      country: orderDetails?.shippingAddress.country,
      address: orderDetails?.shippingAddress.address,
      zipCode: orderDetails?.shippingAddress.postalCode,
    },
    billingAddress: {
      contactName: state.name,
      city: orderDetails?.shippingAddress.city,
      country: orderDetails?.shippingAddress.country,
      address: orderDetails?.shippingAddress.address,
      zipCode: orderDetails?.shippingAddress.postalCode,
    },
    basketItems: orderDetails?.orderItems.map((item: any) => ({
      id: item._id,
      name: item.name,
      category1: item.category || "General",
      itemType: "",
      price: item.price.toString(),
    })),
  };
};