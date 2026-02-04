import { createAuthClient } from "better-auth/client";
import { magicLinkClient } from "better-auth/client/plugins";

export const getAuthClient = () => {
  const origin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "http://localhost:3000";

  return createAuthClient({
    baseURL: `${origin}/api/auth`,
    plugins: [magicLinkClient()]
  });
};
