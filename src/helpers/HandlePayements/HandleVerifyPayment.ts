import axios from 'axios';

const HandleVerifyPayment = async (razorpay_order_id:string, razorpay_payment_id:string, razorpay_signature:string) => {
    // Load Razorpay script and handle payment once it's loaded
    

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/payments/verify-payment`, { 
        razorpay_order_id:razorpay_order_id, 
        razorpay_payment_id:razorpay_payment_id, 
        razorpay_signature:razorpay_signature
    });
    //const { id, currency, amount: orderAmount } = response.data.data;

    return response

   

};


export default HandleVerifyPayment;
