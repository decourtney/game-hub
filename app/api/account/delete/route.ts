import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { _nextAuthOptions } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/BaseUSerSchema";

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const session = await getServerSession(_nextAuthOptions);
    const {email, username, id, name} = await req.json();
    console.log("Request data:", email, username, id, name);

    // if (!session || !session.user?.email) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await dbConnect();

    const result = await User.deleteOne({ email });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Account deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
