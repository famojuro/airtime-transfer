const {
 validateUser,
 validateNumber,
 sendAirtime
} = require("../controllers/airtime");
const express = require("express");
const router = express.Router();
const PNF = require("google-libphonenumber").PhoneNumberFormat;
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
const naijaNumber = require("naija-phone-number");

// require("dotenv").config();

// const options = {
//  apiKey: process.env.ATKEY,
//  username: process.env.ATUSER
// };

// const AfricasTalking = require("africastalking")(options);

// const airtime = AfricasTalking.AIRTIME;

// Send airtime
router.post("/send", async(req, res) => {
 const recipient = req.body.recipient;
 const amount = req.body.amount;
 const { error } = validateUser(req.body);
    validateNumber(recipient);

 if (recipient.length === null ||recipient.length != 11 || error || !naijaNumber.isValid(recipient))
  return res
   .status(400)
   .json({
    status: false,
    message: "Please enter a valid phone  number or amount"
   });
//  validateNumber(recipient);
try {
  await sendAirtime(recipient, amount);
   res.json({ status: true, message: `Airtime of NGN ${amount} sent ` });
}
   catch(ex) {
   res.json({ status: false, message: `Airtime of NGN${amount} not sent` });
   }
 
 // if(recipient.length !=11 || error || !naijaNumber.isValid(recipient)) return res.status(400).json({status:false, message: 'Please enter a valid phone number number or amount'})

 //     const number = phoneUtil.parseAndKeepRawInput(recipient, 'NG');
 //     let phone= phoneUtil.format(number, PNF.E164);

 //     airtimeRecipientList = [{phoneNumber: phone, currencyCode: 'NGN',amount: Number(amount)}];
 //     console.log(req.body);
 // let options = {recipients: airtimeRecipientList}

 // airtime.send(options).then(response =>{
 //     console.log(response);

 //     res.json({ status: true, message: `Airtime of NGN ${amount} sent `});
 // }).catch(error => {
 //     console.log(error);
 //     res.json({ status: false, message: `Airtime of NGN${amount} not sent`});
 // });
});

module.exports = router;
