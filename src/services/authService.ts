import { getDefaultHeaders } from "@/lib/util";
import {
  ERROR_MESSAGES,
  STATUS,
  HTTP_METHODS,
  API_ENDPOINT,
} from "../../public/const";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginData {
  email: string;
  password: string;
}

interface ForgotPwData {
  email: string;
}

export interface ForgotPwResponse {
  message: string;
  status: string;
}

const getLogin = async (
  loginData: LoginData,
): Promise<{
  status: string;
  accessToken?: string;
  message?: string;
  error: string | null;
}> => {
  const url = `${API_BASE_URL}${API_ENDPOINT.USER_LOGIN}`;

  try {
    const response = await fetch(url, {
      method: HTTP_METHODS.POST,
      headers: getDefaultHeaders(),
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message || ERROR_MESSAGES.AUTHENTICATION_FAILED);
    }

    const data = await response.json();
    return data?.accessToken
      ? { status: STATUS.SUCCESS, accessToken: data.accessToken, error: null }
      : { status: STATUS.ERROR, error: ERROR_MESSAGES.INVALID_LOGIN_RESPONSE };
  } catch (error: unknown) {
    return {
      status: STATUS.ERROR,
      error:
        error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

const forgotPw = async (
  loginData: ForgotPwData,
): Promise<{ data: ForgotPwResponse | null; error: string | null }> => {
  const url = `${API_BASE_URL}${API_ENDPOINT.FORGOT_PASSWORD}`;

  try {
    const response = await fetch(url, {
      method: HTTP_METHODS.POST,
      headers: getDefaultHeaders(),
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    return { data: await response.json(), error: null };
  } catch (error: unknown) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

export { getLogin, forgotPw };
