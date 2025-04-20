import { NextResponse } from "next/server";

export function removeUser() {
  const response = NextResponse.next();
  response.cookies.delete("authjs.session-token");
  return response;
}
