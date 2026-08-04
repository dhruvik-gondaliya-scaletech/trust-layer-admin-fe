import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { AUTH_KEY } from "./auth";

// ─── API Response Types ───────────────────────────────────────────────────────

/**
 * Shape of every successful response from the TrustLayer backend.
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

/**
 * Shape of every error response from the TrustLayer backend.
 */
export interface ApiErrorResponse {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
}

/** Typed error thrown by the response interceptor so callers get a clean message */
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly path: string;
  public readonly timestamp: string;

  constructor(payload: ApiErrorResponse) {
    super(payload.message);
    this.name = "ApiError";
    this.statusCode = payload.statusCode;
    this.path = payload.path;
    this.timestamp = payload.timestamp;
  }
}

// ─── Http Service ─────────────────────────────────────────────────────────────

/** Public routes where a 401 should NOT trigger a redirect to login */
const PUBLIC_ROUTES: string[] = [
  "/login",
];

class HttpService {
  private static instance: HttpService;
  private readonly axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:3000/api/v1",
      withCredentials: false,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });

    this.attachRequestInterceptor();
    this.attachResponseInterceptor();
  }

  // ─── Request interceptor ─────────────────────────────────────────────────

  private attachRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== "undefined") {
          try {
            const token = localStorage.getItem(AUTH_KEY);
            if (token && !config.headers.Authorization) {
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch {
            // Silently ignore storage access errors (e.g. private browsing restrictions)
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }

  // ─── Response interceptor ────────────────────────────────────────────────

  private attachResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      // ── Success handler ──────────────────────────────────────────────
      (response: AxiosResponse) => {
        const envelope = response.data as ApiSuccessResponse<unknown>;

        // Backend always returns { success: true, data, timestamp }
        // Unwrap the envelope so callers receive `data` directly.
        if (
          envelope &&
          typeof envelope === "object" &&
          "success" in envelope &&
          envelope.success === true &&
          "data" in envelope
        ) {
          return {
            ...response,
            data: envelope.data,
          } as AxiosResponse;
        }

        // Fallback: return raw response for any non-enveloped endpoint
        return response;
      },

      // ── Error handler ────────────────────────────────────────────────
      (error) => {
        // --- Parse backend error envelope ---
        if (error.response?.data) {
          const errorData = error.response.data as any;

          // Re-throw as a typed ApiError when the backend error shape or a message is present
          if (
            typeof errorData === "object" &&
            errorData !== null &&
            ("message" in errorData || "error" in errorData)
          ) {
            let errorMessage = "Request failed";
            if (typeof errorData.message === "string") {
              errorMessage = errorData.message;
            } else if (Array.isArray(errorData.message)) {
              errorMessage = errorData.message.join(", ");
            } else if (typeof errorData.error === "string") {
              errorMessage = errorData.error;
            }

            const apiError = new ApiError({
              statusCode: errorData.statusCode ?? error.response?.status ?? 500,
              timestamp: errorData.timestamp ?? new Date().toISOString(),
              path: errorData.path ?? "",
              message: errorMessage,
            });
            return Promise.reject(apiError);
          }
        }

        // --- Handle 401: redirect to login unless on a public route ---
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            const isPublicRoute = PUBLIC_ROUTES.some(
              (route) => currentPath === route || currentPath.startsWith(route + "/")
            );

            if (!isPublicRoute) {
              // Remove stored tokens
              try {
                localStorage.removeItem(AUTH_KEY);
                sessionStorage.clear();
              } catch {
                // ignore
              }
              window.location.href = "/login";
            }
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // ─── Singleton ───────────────────────────────────────────────────────────

  public static getInstance(): HttpService {
    if (!HttpService.instance) {
      HttpService.instance = new HttpService();
    }
    return HttpService.instance;
  }

  // ─── HTTP Methods ────────────────────────────────────────────────────────

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export default HttpService.getInstance();
