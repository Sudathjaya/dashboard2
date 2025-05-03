import { getDefaultHeaders } from "@/lib/util";
import { ERROR_MESSAGES, HTTP_METHODS, API_ENDPOINT } from "../../public/const";
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getDashboardDetails = async (
  token: string,
  pageNumber: number,
  order: string,
  filed: string,
  group: string,
  searchValue: string,
  page_size: number,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_DASHBOARD}?page=${pageNumber}&page_size=${page_size}&order=${order}&filed=${filed}&group_id=${group}&search=${searchValue}`;
    const response = await fetch(url, {
      method: HTTP_METHODS.GET,
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

const getJournals = async (
  token: string,
  year: number,
  month: string,
  payload: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.JOURNAL}/${year}/${month}`;
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

const getTeamData = async (
  token: string,
  payload: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_DATA}`;
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

export { getDashboardDetails, getTeamData, getJournals };
