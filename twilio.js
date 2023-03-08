const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const accountSid = 'AC1c6f2c1bc5464a13f7441a08cb786484';
const authToken = 'e6cf1e3c8d1351ad74d95570b81947b4';
const client = require('twilio')(accountSid, authToken);

readline.question("Enter your phone number: ", (toNumber) => {
    client.messages
        .create({
            body: 'Make sure to complete your Antigone Essay!',
            messagingServiceSid: 'MG34f311cee9de073e8b59e8a180e5ec98',
            to: toNumber
        })
        .then(message => console.log(message.sid))
        .done();
    readline.close();
});