import { CardInfo, PaymentData } from "../types/payment";
import { UserInfo } from "../types/redux";

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
 
export const slickSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 4,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  adaptiveHeight: true,
  centerMode: false,
  responsive: [
    {
      breakpoint: 2000, // For large screens
      settings: {
        slidesToShow: 7, // Show 4 slides on large screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 1400, // For large screens
      settings: {
        slidesToShow: 6.3, // Show 4 slides on large screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 1200, // For large screens
      settings: {
        slidesToShow: 5.3, // Show 4 slides on large screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 1024, // For medium screens
      settings: {
        slidesToShow: 4.5, // Show 3 slides on medium screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 991, // For medium screens
      settings: {
        slidesToShow: 4, // Show 3 slides on medium screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 767, // For smaller screens (tablets and below)
      settings: {
        slidesToShow: 3, // Show 2 slides on small screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on small screens
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 550, // For very small screens (small tablets)
      settings: {
        slidesToShow: 2.2, // Show 1.5 slides on very small screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on very small screens
        dots: true, // Show dots navigation
        centerMode: false, // Center the slide
      },
    },
    {
      breakpoint: 480, // For very small screens (mobile)
      settings: {
        slidesToShow: 1.5, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
    {
      breakpoint: 425, // For very small screens (mobile)
      settings: {
        slidesToShow: 1.3, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
    {
      breakpoint: 390, // For very small screens (mobile)
      settings: {
        slidesToShow: 1.2, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
    {
      breakpoint: 365, // For very small screens (mobile)
      settings: {
        slidesToShow: 1.1, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
    {
      breakpoint: 344, // For very small screens (mobile)
      settings: {
        slidesToShow: 1, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
  ],
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

export const bottomNavigationPaths = ["/", "/electronics", "/casual"];

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