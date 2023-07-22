import { NextResponse } from "next/server";
import { getUserFromToken } from "@/helper/getUserFromToken";

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  const isVarified = await getUserFromToken(token);     
//   if (token) {
//     const user=await getUserFromToken(token)
//     console.log(user);
//   }

  if (isPublicPath && isVarified)
    return NextResponse.redirect(new URL("/", request.nextUrl));

  if (!isPublicPath && !isVarified)
    return NextResponse.redirect(new URL("/login", request.nextUrl));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup"],
};
