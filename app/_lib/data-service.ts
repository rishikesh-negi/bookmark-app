import { supabase } from "@/app/_lib/supabase";
import { AppUser, FetchedBookmark } from "@/types/global.types";
import isURL from "validator/lib/isURL";

export async function getUser(email: string): Promise<AppUser> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error handling here because the inexistence of the user is handled in the signIn auth callback

  return data;
}

export async function getBookmark(id: number): Promise<FetchedBookmark> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Bookmark doesn't exist");
  return data;
}

export async function getBookmarks(userId: number): Promise<FetchedBookmark[]> {
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user", userId);

  if (error) throw new Error("Unable to fetch bookmarks");
  return data;
}

export async function createUser(newUser: AppUser): Promise<AppUser> {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create the account");
  }
  return data;
}

// export async function deleteBookmark(id) {}
