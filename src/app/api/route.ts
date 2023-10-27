import { db, sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { rows } = await sql`SELECT * FROM transactions`;
    return NextResponse.json({
      data: rows,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: e,
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { description, value_in, value_out, date } = await request.json();
    const { rows } =
      await sql`INSERT INTO transactions (description, value_in, value_out, date) VALUES (${description}, ${value_in}, ${value_out}, ${date}) RETURNING *`;
    return NextResponse.json({
      data: rows,
      status: 200,
    });
  } catch (e) {
    return NextResponse.json({
      message: e,
      status: 500,
    });
  }
}
