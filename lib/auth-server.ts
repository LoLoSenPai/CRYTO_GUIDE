import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type SessionData = {
  user?: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  session?: Record<string, unknown> | null;
};

type SessionPayload = {
  data?: SessionData | null;
  session?: SessionData["session"] | null;
  user?: SessionData["user"] | null;
};

export async function getServerSession(): Promise<SessionData | null> {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") ?? "";

  const result = (await auth.api.getSession({
    headers: new Headers({ cookie: cookieHeader })
  })) as SessionPayload | { response: SessionPayload };

  const payload = "response" in result ? result.response : result;
  if (!payload) return null;
  if ("data" in payload && payload.data) {
    return payload.data;
  }
  return payload as SessionPayload;
}

export async function getServerSessionDebug() {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") ?? "";
  const result = (await auth.api.getSession({
    headers: new Headers({ cookie: cookieHeader })
  })) as SessionPayload | { response: SessionPayload };

  return {
    cookieHeader,
    hasSecret: Boolean(process.env.BETTER_AUTH_SECRET),
    raw: "response" in result ? result.response : result
  };
}

type AccountRecord = {
  providerId?: string;
  accountId?: string;
};

export async function getUserAccounts() {
  const headerStore = await headers();
  const cookieHeader = headerStore.get("cookie") ?? "";

  const result = (await auth.api.listUserAccounts({
    headers: new Headers({ cookie: cookieHeader })
  })) as AccountRecord[] | { response: AccountRecord[] };

  return "response" in result ? result.response : result;
}
