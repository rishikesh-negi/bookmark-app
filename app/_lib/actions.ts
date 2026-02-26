"use server";

import { FetchedBookmark } from "@/types/global.types";
import { revalidatePath } from "next/cache";
import validator from "validator";
import { getBookmark } from "./data-service";
import { supabaseServerClient } from "./supabase/server";

export interface FormState {
  status: "idle" | "success" | "error" | "fail";
  message?: string;
}

export interface EditBookmarkFormState extends FormState {
  bookmark?: FetchedBookmark;
}

const urlValidationOptions = {
  require_protocol: true,
  require_host: true,
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
};

export async function getSessionUser() {
  const supabase = await supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  return user;
}

export async function createBookmarkAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const supabase = await supabaseServerClient();
  const user = await getSessionUser();
  if (!user)
    return {
      status: "fail",
      message: "Only authenticated users can create a bookmark",
    };

  const title = (formData.get("title") as string).trim();
  const url = (formData.get("url") as string).trim();

  if (title.length === 0)
    return { status: "error", message: "A bookmark must have a valid title" };
  if (!validator.isURL(url, urlValidationOptions))
    return {
      status: "error",
      message: "Only a valid URL can be bookmarked",
    };

  const { error } = await supabase
    .from("bookmarks")
    .insert([{ title, url, owner: user.id }]);
  console.log(error);
  if (error) return { status: "fail", message: "Failed to create bookmark" };

  revalidatePath("/account/bookmarks");
  return { status: "success", message: "Bookmark successfully added!" };
}

export async function editBookmarkAction(
  prevState: EditBookmarkFormState,
  formData: FormData,
): Promise<EditBookmarkFormState> {
  const supabase = await supabaseServerClient();
  const user = await getSessionUser();

  if (!user)
    return {
      status: "fail",
      message: "Only authenticated users can edit a bookmark",
      bookmark: prevState.bookmark,
    };

  if (!prevState?.bookmark?.id)
    return {
      status: "error",
      message: "Edit failed. Bookmark not found",
      bookmark: prevState.bookmark,
    };

  const title = (formData.get("title") as string).trim();
  const url = (formData.get("url") as string).trim();

  if (title.length === 0)
    return {
      status: "error",
      message: "A bookmark must have a valid title",
      bookmark: prevState.bookmark,
    };
  if (!validator.isURL(url, urlValidationOptions))
    return {
      status: "error",
      message: "Only a valid URL can be bookmarked",
      bookmark: prevState.bookmark,
    };

  if (title === prevState.bookmark.title && url === prevState.bookmark.url)
    return {
      status: "error",
      message: "No changes found in the bookmark data",
      bookmark: prevState.bookmark,
    };

  const { data: bookmark, error } = await supabase
    .from("bookmarks")
    .update({ title, url })
    .eq("id", prevState.bookmark.id)
    .select()
    .single();

  if (error)
    return {
      status: "fail",
      message: "Edit failed. Something went wrong",
      bookmark: prevState.bookmark,
    };

  revalidatePath("/account/bookmarks");
  return {
    status: "success",
    message: "Bookmark successfully edited!",
    bookmark,
  };
}

export async function deleteBookmark(id: number) {
  const supabase = await supabaseServerClient();
  const user = await getSessionUser();
  if (!user) throw new Error("You must be logged in to perform this action");

  const bookmark = await getBookmark(id);

  // Prevent malicious users from deleting bookmarks not belonging to their account:
  if (user.id !== bookmark.owner) throw new Error("Unauthorized access!");

  const { error } = await supabase.from("bookmarks").delete().eq("id", id);
  if (error) throw new Error("Bookmark could not be deleted");

  revalidatePath("/account/bookmarks");
}
