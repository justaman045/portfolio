import { NextResponse } from "next/server";

const API_URL = `${process.env.EMAIL_API_BASE}/subscribe`;

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // Add CORS headers
        "Access-Control-Allow-Origin": "*", // Replace with the appropriate origin
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({
        api_key: process.env.NEXT_PUBLIC_EMAIL_API_KEY,
        email: email,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }

    // If your API already includes CORS headers, you may not need the headers here.

    return NextResponse.json({ ok: "ok" }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message || error.toString() }, { status: 500 });
  }
}
