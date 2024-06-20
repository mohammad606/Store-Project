"use server";
import { cookies } from "next/headers";

export async function setServerCookie(key: string, value: string) {
  cookies().set({
    name: key,
    value: value,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // أسبوع واحد
  });
}

export async function getCookieServer(
  key: string,
): Promise<string | undefined> {
  return cookies().get(key)?.value;
}

export async function deleteCookieServer(key: string): Promise<void> {
  cookies().delete(key);
}