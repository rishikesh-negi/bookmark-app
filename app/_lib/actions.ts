"use server";

import { auth, SessionWithUserId, signIn, signOut } from "@/app/_lib/auth";
import { supabase } from "@/app/_lib/supabase";
import { FetchedBookmark } from "@/types/global.types";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import validator from "validator";
import { getBookmark } from "./data-service";

export interface FormState {
  status: "idle" | "success" | "error" | "fail";
  message?: string;
}

export interface EditBookmarkFormState extends FormState {
  bookmark: FetchedBookmark;
}

const urlValidationOptions = {
  require_protocol: true,
  require_host: true,
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
};

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
}

export async function signOutAction() {
  await signOut({
    redirectTo: "/",
  });
}

export async function createBookmarkAction(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = (await auth()) as SessionWithUserId;
  if (!session?.user)
    return {
      status: "fail",
      message: "Only authenticated users can create a bookmark",
    };

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;

  if (title.trim().length === 0)
    return { status: "error", message: "A bookmark must have a valid title" };
  if (!validator.isURL(url, urlValidationOptions))
    return {
      status: "error",
      message: "Only a valid URL can be bookmarked",
    };

  const { error } = await supabase
    .from("bookmarks")
    .insert([{ title, url, user: session.user.userId }]);
  if (error) return { status: "fail", message: "Failed to create bookmark" };

  revalidateTag(`${session.user.userId}-bookmarks`, "max");
  revalidatePath("/account/bookmarks");
  return { status: "success", message: "Bookmark successfully added!" };
}

export async function editBookmarkAction(
  prevState: EditBookmarkFormState,
  formData: FormData,
): Promise<EditBookmarkFormState> {
  const session = (await auth()) as SessionWithUserId;

  if (!session?.user)
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

  const title = formData.get("title") as string;
  const url = formData.get("url") as string;

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

  const { error } = await supabase
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

  revalidateTag(`${session.user.userId}-bookmarks`, "max");
  revalidatePath("/account/bookmarks");
  return redirect("/account/bookmarks");
}

export async function deleteBookmark(id: number) {
  const session = (await auth()) as SessionWithUserId;
  if (!session) throw new Error("You must be logged in to perform this action");

  const bookmark = await getBookmark(id);

  // Prevent malicious users from deleting bookmarks not belonging to their account:
  if (session.user.userId !== bookmark.user)
    throw new Error("Unauthorized access!");

  const { error } = await supabase.from("bookmarks").delete().eq("id", id);
  if (error) throw new Error("Bookmark could not be deleted");

  revalidateTag(`${session.user.userId}-bookmarks`, "max");
  revalidatePath("/account/bookmarks");
}
