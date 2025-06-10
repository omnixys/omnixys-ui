// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const roles: string[] = Array.isArray(token?.roles) ? token.roles : [];



    if (!roles.includes("Admin") && !roles.includes("Manager")) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/person/:path*"],
};
