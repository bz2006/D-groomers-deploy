import { NextRequest, NextResponse } from "next/server";
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY!,
    key_secret: process.env.RAZORPAY_API_SECRET!,
  });

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
      const { amount } = reqBody;

      const options = {
        amount: amount * 100, // Amount in the smallest currency unit
        currency: 'INR',
        receipt: `receipt_${new Date().getTime()}`,
        payment_capture: 1, // Auto capture
      };

      const order = await razorpay.orders.create(options);
      return NextResponse.json({
        message: "Location and Slots Added",
        data: order

    }, { status: 200 })
    } catch (error) {
      return NextResponse.json({
         error: 'Something went wrong'

    }, { status: 500 })
    }
}
