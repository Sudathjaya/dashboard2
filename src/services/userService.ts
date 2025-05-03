import { getDefaultHeaders } from "@/lib/util";
import { ApiResponse, UserProfile } from "@/types/interfaces";
import { ERROR_MESSAGES, HTTP_METHODS, API_ENDPOINT } from "../../public/const";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetProfileResponse {
  data: { data: UserProfile | null } | null;
  error: string | null;
}

const getProfile = async (token: string): Promise<GetProfileResponse> => {
  const url = `${API_BASE_URL}${API_ENDPOINT.USER_PROFILE}`;

  try {
    const response = await fetch(url, {
      method: HTTP_METHODS.GET,
      headers: getDefaultHeaders(token),
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

const userInvite = async (
  token: string,
  payload: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.USER_INVITE}`;
    const response = await fetch(url, {
      method: HTTP_METHODS.POST,
      headers: getDefaultHeaders(token),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const responseData = await response.json();
    return { data: responseData, error: null };
  } catch (error: unknown) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

const getTeamAdmins = async (token: string): Promise<any> => {
  const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_ADMINS}`;

  try {
    const response = await fetch(url, {
      method: HTTP_METHODS.GET,
      headers: getDefaultHeaders(token),
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

const deleteUserById = async (
  token: string,
  id: string,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_ADMINS}/${id}`;
    const response = await fetch(url, {
      method: HTTP_METHODS.DELETE,
      headers: getDefaultHeaders(token),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }

    const responseData = await response.json();
    return { data: responseData, error: null };
  } catch (error: unknown) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

export { getProfile, userInvite, getTeamAdmins, deleteUserById };
