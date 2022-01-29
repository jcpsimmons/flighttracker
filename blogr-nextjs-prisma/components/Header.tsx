import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  return (
    <nav className="flex justify-between border-b-2 border-black bg-white  py-3 px-8 bg-slate-800 text-white items-center sm:flex-row flex-col">
      {status == "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <h1 className="font-bold text-2xl">Exposure Tracker</h1>
          </div>
          <div>
            {session ? (
              <div className="flex flex-row text-gray-400">
                <p className="pr-2">{session.user.email}</p>
                <button onClick={() => signOut()}>
                  <a className="text-sm hover:underline">(Log out)</a>
                </button>
              </div>
            ) : (
              <Link href="/api/auth/signin">
                <a data-active={isActive("/signup")}>Log in</a>
              </Link>
            )}
          </div>
        </>
      )}
    </nav>
  );
};

export default Header;
