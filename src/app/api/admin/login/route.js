import { NextResponse } from "next/server";

export async function POST(req) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 });
}