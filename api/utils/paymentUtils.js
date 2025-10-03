const Iyzipay = require("iyzipay");

const iyzipay = new Iyzipay({
  apiKey: process.env.IYZICO_API_KEY,
  secretKey: process.env.IYZICO_API_KEY_SECRET,
  uri: process.env.IYZICO_BASE_URL,
});

const paymentCreate = (request) => {
  return new Promise((resolve, reject) => {
    iyzipay.payment.create(request, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const refundRequest = (request) => {
  return new Promise((resolve, reject) => {
    iyzipay.refundToBalance.create(request, function (err, result) {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const refundPaymentRequestBody = {
  paymentId: "26966411",
  callbackUrl: "https://www.merchant.com/callback",
};

const fillPaymentRequestBody = (data) => {
    data.locale = Iyzipay.LOCALE.TR;
    data.currency = Iyzipay.CURRENCY.TRY;
    data.paymentChannel = Iyzipay.PAYMENT_CHANNEL.WEB;
    data.paymentGroup = Iyzipay.PAYMENT_GROUP.PRODUCT;
    data.basketItems = data.basketItems?.map(item => ({
        ...item,
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL
    }))
    return data;
}

module.exports = {
  paymentCreate,
  refundRequest,
  fillPaymentRequestBody,
  refundPaymentRequestBody,
};
