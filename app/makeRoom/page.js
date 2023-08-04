import Make from "./make";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function MakeRoom() {
  let session = await getServerSession(authOptions);
  return (
    <div>
      <Make session={session} />
    </div>
  );
}
