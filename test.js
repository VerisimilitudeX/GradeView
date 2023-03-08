const accountSid = "AC0ae92750dab0dd6d9d7207e9df1fc814";
const authToken = "c34efccf21621d69326540998549e0c2";
const client = require("twilio")(accountSid, authToken);

client.messages
    .create({ body: "Hello from Twilio", from: "+18556439734", to: "+14259439454" })
    .then(message => console.log(message.sid));