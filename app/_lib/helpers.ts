import { supabase } from "./supabase/client";

export const APP_TOAST_ID: string = "app-toast";

export async function signIn() {
  try {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function signOut() {
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error(err);
  }
}
