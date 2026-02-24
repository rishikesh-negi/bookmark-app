import { FetchedBookmark } from "@/types/global.types";
import { supabaseServerClient } from "./supabase/server";

export async function getBookmark(id: number): Promise<FetchedBookmark> {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Bookmark doesn't exist");
  return data;
}

export async function getBookmarks(userId: string): Promise<FetchedBookmark[]> {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("owner", userId);

  if (error) throw new Error("Unable to fetch bookmarks");
  return data;
}
