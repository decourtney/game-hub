import dbConnect from "@/lib/dbConnect";
import { User } from "@/models/BaseUSerSchema";

export async function generateUniqueUsername(
  baseUsername: string
): Promise<string> {
  await dbConnect(); // Ensure the database is connected

  let username = baseUsername;
  let count = 0;

  while (await User.findOne({ username })) {
    count++;
    username = `${baseUsername}${count}`;
  }

  return username;
}
