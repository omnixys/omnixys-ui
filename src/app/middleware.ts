// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { getLogger } from '../utils/logger';

export async function middleware(req: NextRequest) {
  const logger = getLogger(middleware.name);
  const { method, nextUrl } = req;
  const requestId = crypto.randomUUID();

  logger.info(`➡️ ${method} ${nextUrl.pathname} [${requestId}]`);

  const token = await getToken({ req });
  const roles: string[] = Array.isArray(token?.roles) ? token.roles : [];

  logger.debug('JWT Roles:', roles);
  logger.debug('Headers:', Object.fromEntries(req.headers.entries()));

  if (!roles.includes('Admin') && !roles.includes('Manager')) {
    logger.warn(
      `🚫 Unauthorized access to ${nextUrl.pathname} by ${token?.email ?? 'Unknown User'}`,
    );
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  const response = NextResponse.next();
  response.headers.set('X-Request-ID', requestId);

  return response;
}

export const config = {
  matcher: ['/person/:path*'], // Middleware gilt nur für diese Pfade
};
