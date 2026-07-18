import { NextRequest, NextResponse } from "next/server";

const BASE_URL = "https://api.circle.com";

async function proxy(request: NextRequest, path: string[]) {
  const search = request.nextUrl.search;
  const url = `${BASE_URL}/${path.join("/")}${search}`;

  const headers = new Headers();

  // Kunci real HANYA ada di server, tidak pernah diekspos ke browser.
  // Ini beda dari NEXT_PUBLIC_KIT_KEY yang kita coba sebelumnya —
  // CIRCLE_KIT_KEY plain server-only.
  const kitKey = process.env.CIRCLE_KIT_KEY;

  if (!kitKey) {
    throw new Error("CIRCLE_KIT_KEY is missing");
  }

  headers.set("Authorization", `Bearer ${kitKey}`);

  // Forward semua header dari browser KECUALI yang bisa bikin request ke
  // Circle gagal atau salah (host/origin/referer beda antara browser <->
  // server, authorization di-override paksa di atas).
  request.headers.forEach((value, key) => {
    const lower = key.toLowerCase();

    if (
      lower === "host" ||
      lower === "origin" ||
      lower === "referer" ||
      lower === "connection" ||
      lower === "content-length" ||
      lower === "authorization"
    ) {
      return;
    }

    headers.set(key, value);
  });

  const requestBody =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.text();

  const response = await fetch(url, {
    method: request.method,
    headers,
    body: requestBody,
    redirect: "manual",
  });

  const text = await response.text();

  return new NextResponse(text, {
    status: response.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

async function handler(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  return proxy(request, path);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}