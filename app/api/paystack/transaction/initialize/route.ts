/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const url = "https://api.paystack.co/transaction/initialize";

  const body = await req.json();

  const headers = {
    Authorization: `Bearer ${secretKey}`,
    "Content-Type": "application/json",
  };

  const requestPayload = {
    email: body.email,
    amount: body.amount * 100, // amount is passed in Naira and converted to kobo for Paystack
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      throw new Error("Paystack transaction initialization failed");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
