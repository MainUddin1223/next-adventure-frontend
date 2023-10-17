import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiRequest) {
    return NextResponse.json({ name: "File uploaded" })
}