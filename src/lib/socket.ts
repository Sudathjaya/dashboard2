import { io, Socket } from "socket.io-client";
import { useMemo } from "react";
import { useSession } from "next-auth/react";

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || "";

const useSocketHook = (): Socket => {
  const { data: session } = useSession();
  const accessToken = session?.user?.accessToken;

  const socket = useMemo(() => {
    return io(SOCKET_URL, {
      forceNew: true,
      path: "/socket.io",
      reconnectionAttempts: 3,
      timeout: 2000,
      extraHeaders: {
        token: accessToken || "",
      },
    });
  }, [accessToken]);

  return socket;
};

export default useSocketHook;
