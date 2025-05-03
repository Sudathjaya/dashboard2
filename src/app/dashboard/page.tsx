"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Grid from "@mui/material/Grid2";
import { getProfile } from "@/services/userService";
import Dashboard from "./dashboard";
import { TEXTS } from "../../../public/const";
import { UserProfile } from "@/types/interfaces";
import { useAuth } from "@/context/AuthContext";

const HomePage = () => {
  const { data: session, status } = useSession();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { login } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (status === TEXTS.AUTHENTICATED && session?.user?.accessToken) {
        try {
          const { data, error } = await getProfile(session.user.accessToken);

          if (error) {
            /* eslint-disable no-console */
            console.error("Error fetching user profile:", error);
            return;
          }

          if (data?.data) {
            setUserProfile(data.data);
            const userData = {
              avatar_url: data.data?.avatar_url,
              first_name: data.data?.first_name,
              last_name: data?.data?.last_name,
              role: data.data?.role,
              email: data?.data?.email,
              groups: data?.data?.groups,
            };
            login(userData);
          }
        } catch (error) {
          if (process.env.NODE_ENV === "development") {
            console.error("Unexpected error fetching user profile:", error);
          }
        }
      }
    };

    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, session?.user?.accessToken]);

  return (
    <Grid>
      <Dashboard userProfile={userProfile} />
    </Grid>
  );
};

export default HomePage;
