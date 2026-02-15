import { QueryClient, QueryFunction } from "@tanstack/react-query";

/** Error with optional parsed JSON body for 4xx/5xx responses */
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: { message?: string; error?: string }
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function throwIfResNotOk(res: Response): Promise<never> {
  if (res.ok) return undefined as never;
  const text = (await res.text()) || res.statusText;
  let body: { message?: string; error?: string } | undefined;
  try {
    body = text ? (JSON.parse(text) as { message?: string; error?: string }) : undefined;
  } catch {
    body = undefined;
  }
  const serverMessage = body?.message ?? body?.error;
  const displayMessage = typeof serverMessage === "string" ? serverMessage : text;
  throw new ApiError(`${res.status}: ${displayMessage}`, res.status, body);
}

export async function apiRequest<T = unknown>(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  
  // Return empty object for DELETE requests or if no content
  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    return {} as T;
  }
  
  return await res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "returnNull" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
