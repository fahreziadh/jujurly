import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Button from "./Button";

export default function Menu() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between py-3 container mx-auto">
      <Link href="/">
        <a className="font-bold text-xl">Jujurly</a>
      </Link>
      {session ? (
        <div className="space-x-3">
          <span>{session.user.name}</span>
          <Button onClick={signOut} text="Logout" />
        </div>
      ) : (
        <Button onClick={signIn} text="Login" />
      )}
    </div>
  );
}
