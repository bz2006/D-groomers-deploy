import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay with your API key and secret
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY!,
    key_secret: process.env.RAZORPAY_API_SECRET!,
});

// Function to verify payment
const verifyPayment = (orderId: string, paymentId: string, signature: string): boolean => {
    const generatedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET!)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');
    console.log(generatedSignature, signature)
    return generatedSignature === signature;
};

// API route handler
export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = reqBody
        console.log(reqBody)

        if (verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {

            return NextResponse.json({
                message: 'Payment verified successfully',
                data:{verified:true}

            }, { status: 200 })
        } else {
            return NextResponse.json({
                message: 'Payment verification failed'

            }, { status: 400 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            error: 'Something went wrong'

        }, { status: 500 })
    }


}
