import axios from 'axios';
// import dotenv from 'dotenv';

// dotenv.config();

const HandlePayment = async (Bamount: number) => {
    // Load Razorpay script and handle payment once it's loaded
    loadRazorpayScript();

    const response = await axios.post("/api/payments/new-payment", { amount: Bamount });
    const { id, currency, amount: orderAmount } = response.data.data;

    console.log(response.data.data, "ll")

    return new Promise((resolve, reject) => {
        const options = {
            key: process.env.RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
            amount: orderAmount, // Use Bamount instead of orderAmount
            currency: currency, // Add your currency here
            name: 'D_Groomers',
            description: 'Test Transaction',
            order_id: id, // Replace with your actual order ID
            handler: function (response: any) {
                // Resolve the promise with the response
                resolve(response);
            },
            prefill: {
                name: 'Your Name',
                email: 'your.email@example.com',
                contact: '9999999999',
            },
            theme: {
                color: '#9400D3',
            },
        };

        // Check if Razorpay is available
        if ((window as any).Razorpay) {
            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.open();
        } else {
            console.error('Razorpay is not loaded.');
        }
    });


};

const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);
};

export default HandlePayment;
