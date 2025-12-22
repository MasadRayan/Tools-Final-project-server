import axios from "axios";
import { ObjectId } from "mongodb";

export const createSSLPayment = async (req, res) => {
    const paymentData = req.body;

    const trxid = new ObjectId().toString();

    const initiate = {
        store_id: "buyne6949586debb4e",
        store_passwd: "buyne6949586debb4e@ssl",
        total_amount: paymentData.totalAmount,
        currency: 'BDT',
        tran_id: trxid, // use unique tran_id for each api call
        success_url: 'http://localhost:5000/success-payment',
        fail_url: 'http://localhost:5173/fail',
        cancel_url: 'http://localhost:5173/cancel',
        ipn_url: 'http://localhost:5000/ipn-success-payment',
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
    const iniResponse = await axios.post(
        "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
        initiate,
        {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    )

    const gatewayUrl = iniResponse.data?.GatewayPageURL;

    console.log(gatewayUrl);
}