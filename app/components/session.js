import { CgProfile } from "react-icons/cg";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Log from "./log";

export default async function Session() {
  let session = await getServerSession(authOptions);

  return (
    <div className="navbar-r">
      <Log session={session} />

      {session != null ? <button className="user-name">My</button> : null}
    </div>
  );
}
