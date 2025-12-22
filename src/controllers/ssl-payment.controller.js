import axios from "axios";
import { ObjectId } from "mongodb";
import { sslPaymentCollection } from "../models/sslPayment.models.js";

export const createSSLPayment = async (req, res) => {
    const paymentData = req.body;

    const trxid = new ObjectId().toString();

    paymentData.transactionID = trxid;

    // stape 1: initiate the payment
    const initiate = {
        store_id: "buyne6949586debb4e",
        store_passwd: "buyne6949586debb4e@ssl",
        total_amount: paymentData.totalAmount,
        currency: 'BDT',
        tran_id: trxid, // use unique tran_id for each api call
        success_url: 'http://localhost:5000/api/ssl-payment/success-payment',
        fail_url: 'http://localhost:5173/fail',
        cancel_url: 'http://localhost:5173/cancel',
        ipn_url: 'http://localhost:5000/api/ipn-success-payment',
        shipping_method: 'NO',
        product_name: `${paymentData.productName}`,
        product_category: `${paymentData.productCategory}`,
        product_profile: 'general',
        multi_card_name: 'mastercard, visacard, amexcard',
        value_a: "ref001_A&",
        value_b: "ref002_B&",
        value_c: "ref003_C&",
        value_d: "ref004_D",
        cus_name: `${paymentData.userName}`,
        cus_email: `${paymentData.email}`,
        cus_add1: 'Dhaka&',
        cus_add2: 'Dhaka&',
        cus_city: 'Dhaka&',
        cus_state: 'Dhaka&',
        cus_postcode: 1000,
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka&',
        ship_add2: 'Dhaka&',
        ship_city: 'Dhaka&',
    };


    // step 2: initiate the payment request to SSLCOMMERZ
    const iniResponse = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        initiate,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    );

    const saveData = await sslPaymentCollection.insertOne(paymentData)

    // step 3: get the GatewayPageURL and redirect to that URL
    const gatewayUrl = iniResponse.data?.GatewayPageURL;

    // step 4: redirect the client to the gateway page URL
    res.send({ gatewayUrl });
};

export const sslPaymentSuccess = async (req, res) => {
    // step 5: success the payment
    const paymentInfo = req.body;

    // step 6: validate the payment
    const { data } = await axios.get(`https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?
        val_id=${paymentInfo.val_id}&store_id=buyne6949586debb4e&store_passwd=buyne6949586debb4e@ssl&format=json`);

    if (data.status !== "VALID") {
        return res.status(400).send({ message: "Payment Failed" });
    }

    // step 7: update payment status in the database
    const updatePayment = await sslPaymentCollection.updateOne(
        {
            transactionID: data.tran_id
        },
        {
            $set: {
                paymentStatus: "Success"
            }
        },
        {
            upsert: true
        }
    );
    res.send(updatePayment);


    console.log(updatePayment);
}