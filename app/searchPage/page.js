import Review from "./review";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function SearchPage() {
  let session = await getServerSession(authOptions);
  return (
    <div>
      <Review session={session} />
    </div>
  );
}
