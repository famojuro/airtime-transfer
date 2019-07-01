const Joi = require("joi");
const PNF = require("google-libphonenumber").PhoneNumberFormat;
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();
const naijaNumber = require("naija-phone-number");

const options = {
 apiKey: process.env.ATKEY,
 username: process.env.ATUSER
};

const AfricasTalking = require("africastalking")(options);

const airtime = AfricasTalking.AIRTIME;
function validateNumber(recipient) {
 const number = phoneUtil.parseAndKeepRawInput(recipient, "NG");
 let phone = phoneUtil.format(number, PNF.E164);
 return phone;
}

 async function sendAirtime(recipient, amount) {
 const number = phoneUtil.parseAndKeepRawInput(recipient, "NG");
 let phone = phoneUtil.format(number, PNF.E164);

 airtimeRecipientList = [
  { phoneNumber: phone, currencyCode: "NGN", amount: Number(amount) }
 ];

 let options = { recipients: airtimeRecipientList };
  
   let result = await airtime.send(options);
    console.log(result);
   console.log(result.responses[0].status);
      if(result.responses[0].status==='Success') return result;
    if (result.responses[0].status === 'Failed') throw new Error("Card can not be sent");
    
 


//  airtime
//   .send(options)
//   .then(response => {
//    console.log(response);

//    res.json({ status: true, message: `Airtime of NGN ${amount} sent ` });
//   })
//   .catch(error => {
//    console.log(error);
//    res.json({ status: false, message: `Airtime of NGN${amount} not sent` });
//   });
}

function validateUser(user) {
 const auth = {
  recipient: Joi.number()
   .min(11)
   .required(),
  amount: Joi.number()
   .min(1)
   .required()
 };

 return Joi.validate(user, auth);
}
module.exports = { sendAirtime, validateUser, validateNumber };
