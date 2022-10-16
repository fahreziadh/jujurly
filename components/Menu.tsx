import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { sign } from "crypto";

export default function Menu() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between py-3">
      <Link href="/">
        <a className="font-bold text-xl">Jujurly</a>
      </Link>
      {session ? (
        <div className="space-x-3">
          <span>{session.user.name}</span>
          <button
            className="text-sm bg-zinc-900 text-white px-3 py-2"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-zinc-900 text-white px-3 py-2 hover:bg-zinc-100 hover:text-zinc-900 text-sm"
        >
          Login
        </button>
      )}
    </div>
  );
}
