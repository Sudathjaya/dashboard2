import { getDefaultHeaders } from "@/lib/util";
import { ERROR_MESSAGES, HTTP_METHODS, API_ENDPOINT } from "../../public/const";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const getTeamPlayers = async (
  token: string,
  pageNumber: number,
  page_size: number,
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_PLAYERS}?page=${pageNumber}&page_size=${page_size}`;
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

const handleTeamPlayVisibility = async (
  token: string,
  memberId: string,
  payload: any,
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_PLAY_VISIBILITY}/${memberId}`;
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

const deleteTeamMember = async (
  token: string,
  memberId: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_MEMBER}/${memberId}`;
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

export { getTeamPlayers, handleTeamPlayVisibility, deleteTeamMember };
