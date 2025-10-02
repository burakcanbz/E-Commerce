const asyncHandler = require("express-async-handler");
const { paymentCreate, refundRequest, createPaymentRequestBody, refundPaymentRequestBody } = require("../utils/paymentUtils");


/**
 * @description get config of stripe
 * @route GET /api/payment/config
 * @access Private
 * @param {Object} req - The request object containing the payment details
 * @param {Object} res - The response object to send the updated order
 * @throws {Error} Throws an error if order not found or if saving the order fails
 */
exports.getPayment = asyncHandler(async (req, res) => {

  const {price, paidPrice, basketId, paymentCard, buyer, shippingAddress, billingAddress, basketItems} = req.body; 

  try{
      const result = await paymentCreate(createPaymentRequestBody);
      res.json(result);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});


exports.refundPayment = asyncHandler(async (req, res) => {
  
  try{
    const result = await refundRequest(refundPaymentRequestBody);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});
