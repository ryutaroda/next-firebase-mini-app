import { useAuth } from "@/context/auth";
import { User } from "@/types/user";
import { useRouter } from "next/router";
import { ReactNode } from "react";


type Props = {
  children: ((user: User) => ReactNode) | ReactNode;
};

const UserGuard = ({ children }: Props) => {
  const user = useAuth();
  const router = useRouter();

  // 未ログインであれば未ログイン
  if (user === null && router.pathname !== '/') {
    router.push('/');
    return null;
  }

  // 認証確認中であれば空表示
  if (!user) {
    return null;
  }

  if (typeof children === 'function') {
    return <>{children(user)}</>;
  } else {
    return <>{children}</>;
  }
};

export default UserGuard;