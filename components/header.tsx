import { useAuth } from "@/context/auth";
import Link from "next/link"
import { useState } from 'react';
import { login, logout } from '../lib/auth';
import Button from './button';
import UserMenu from "./user-menu";

const Header = () => {
  const user = useAuth();
  console.log(user);

  const [waiting, setWaiting] = useState(true);
  console.log('waiting:' + waiting);


  const signIn = () => {
    setWaiting(true);

    login()
      .catch((error) => {
        console.error(error?.code);
      }
      ).finally(() => {
        setWaiting(false);
      });
  };

  return (
    <header className="border-b flex items-center h-14 px-4">
      <h1>
        <Link href="/" legacyBehavior>
          <a className="text-2xl font-logo">iam</a>
        </Link>
      </h1>
      <span className="flex-1"></span>
      {user === null && <Button onClick={signIn}>Login</Button>}
      {user && <UserMenu />}
    </header>
  );
};

export default Header;