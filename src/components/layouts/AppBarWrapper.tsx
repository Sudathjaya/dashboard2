"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import TopBar from "@/components/layouts/Appbar";
import { UserProfile } from "@/types/interfaces";
import { useAuth } from "@/context/AuthContext";

const TopBarWrapper = () => {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) setUserProfile(user);
  }, [user]);

  return !isLoginPage ? <TopBar userProfile={userProfile} /> : null;
};

export default TopBarWrapper;
