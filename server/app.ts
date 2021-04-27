import express from 'express';
const bodyParser = require('body-parser');
import http from 'http'
const stripe = require('stripe')('sk_test_51IkNliKkNQOErIGpugciJheY99FHFugkuxXR5Iw7SBbxx5DOlVVkhzFQn4fwyPILtnwfKRjY6dWw7DWO8NBJmOK000colk1xCn')
const cors = require('cors')


const app = express();
const server = http.createServer(app)
const PORT = 8000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/pay', async (req:any, res:any) => {
    const {token, product} = req.body
    const customer = await stripe.customers.create({
        email: token.email,
        source: token
    })
    const charge = await stripe.charges.create({
        amount: Number(product.price) * 100,
        currency: 'usd',
        customer: customer.id,
        receipt_email: token.email,
        description: 'some',
        shipping: {
            name: token.name,
            address: {
                line1: token.address_line1,
                line2: token.address_line2,
                city: token.address_city,
                country: token.address_country,
                postal_code: token.address_zip,
            }
        }
    })
    res.send(charge.status)
})


server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });