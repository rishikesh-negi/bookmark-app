"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { getBroadcastChannel } from "../_lib/broadcast";

export default function SessionStatusBroadcaster() {
  const { status } = useSession();
  const sessionStatusRef = useRef<
    "authenticated" | "unauthenticated" | "loading"
  >(status);

  useEffect(() => {
    const channel = getBroadcastChannel();
    if (status !== "loading" && sessionStatusRef.current !== status) {
      channel?.postMessage({ sessionStatus: status });
      sessionStatusRef.current = status;
    }
  }, [status]);

  return null;
}
