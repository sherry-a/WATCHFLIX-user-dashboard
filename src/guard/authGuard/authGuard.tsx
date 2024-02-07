"use client";
import { useUserContext } from "@/hooks/user/user";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { PUBLIC_ROUTES } from "@/utility/constants/routes/routes";
const AuthGuard = ({
 children,
}: {
 children: React.ReactNode;
}): ReactNode => {
 const { isAuthenticated } = useUserContext();
 const currentURL = usePathname();
 const router = useRouter();
 useEffect(() => {
  if (!isAuthenticated && currentURL !==PUBLIC_ROUTES.signIn && currentURL!==PUBLIC_ROUTES.signUp) {
    router.push('/signIn');
  }
  else if(isAuthenticated&& (currentURL===PUBLIC_ROUTES.signIn || currentURL===PUBLIC_ROUTES.signUp)){
    router.push('/dashboard/home')
  }
 }, [isAuthenticated, router, currentURL]);
 return children;
};
export default AuthGuard;
