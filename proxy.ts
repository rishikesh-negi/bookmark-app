import { type NextRequest } from "next/server";
import { updateSession } from "./app/_lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: ["/account"],
};
