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
    <nav className="flex justify-between border-b-2 border-black bg-white">
      {status == "loading" ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>
            <Link href="/">
              <a className="bold" data-active={isActive("/")}>
                Home
              </a>
            </Link>
          </div>
          <div>
            {session ? (
              <div className="flex flex-col">
                <p>
                  {session.user.name} ({session.user.email})
                </p>
                <div className="flex justify-between">
                  <Link href="/create">
                    <button>
                      <a>Add</a>
                    </button>
                  </Link>
                  <button onClick={() => signOut()}>
                    <a>Log out</a>
                  </button>
                </div>
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
