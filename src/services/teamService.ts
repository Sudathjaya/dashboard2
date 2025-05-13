import { getDefaultHeaders } from "@/lib/util";
import { ERROR_MESSAGES, HTTP_METHODS, API_ENDPOINT } from "../../public/const";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const getCategory = async (token: string): Promise<any> => {
  const url = `${API_BASE_URL}${API_ENDPOINT.GROUP_CATEGORY}`;

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

const getMembers = async (
  token: string,
  pageNumber: number,
  page_size: number,
  group: string,
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_DASHBOARD}?page=${pageNumber}&page_size=${page_size}&group_id=${group}`;
    const response = await fetch(url, {
      method: HTTP_METHODS.GET,
      headers: getDefaultHeaders(token),
    });

    if (!response.ok) {
      const { message } = await response.json();
      throw new Error(message);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    return {
      data: null,
      error:
        error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR,
    };
  }
};

const createGroup = async (
  token: string,
  payload: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.CREATE_GROUP}`;
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

const getTeamPlayers = async (
  token: string,
  pageNumber: number,
  page_size: number,
  order: string,
  order_by: string,
  searchValue: string,
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_PLAYERS}?page=${pageNumber}&page_size=${page_size}&order=${order}&order_by=${order_by}&search=${searchValue}`;
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

const addPlayers = async (
  token: string,
  payload: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.ADD_PLAYERS}`;
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

const deletePlayer = async (
  token: string,
  payload: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.GROUP}/${payload?.group_id}/player/${payload.user_id}`;
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

const updateGroup = async (
  token: string,
  group: string,
  payload: Record<string, unknown>,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.UPDATE_GROUP}/${group}`;
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

const deleteGroupById = async (
  token: string,
  group: string,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.GROUP}/${group}`;
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

const inviteTeam = async (
  token: string,
  payload: any,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_INVITE}`;
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

const updateTeamRole = async (
  token: string,
  payload: any,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
): Promise<ApiResponse<any>> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_CHANGE_ROLE}`;
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

const getTeamPlayersAll = async (
  token: string
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.TEAM_PLAYERS}`;
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

export {
  getCategory,
  getMembers,
  createGroup,
  getTeamPlayers,
  addPlayers,
  deletePlayer,
  updateGroup,
  deleteGroupById,
  inviteTeam,
  updateTeamRole,
  getTeamPlayersAll
};
