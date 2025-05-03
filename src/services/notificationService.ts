import { getDefaultHeaders, getDefaultHeaders2 } from "@/lib/util";
import { ERROR_MESSAGES, HTTP_METHODS, API_ENDPOINT } from "../../public/const";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const getNotificationsList = async (token: string): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.NOTIFICATIONS_LIST}`;
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

const getNotificationsMarkAsSeen = async (
  token: string,
  id: string,
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.NOTIFICATIONS_MARK_AS_SEEN}/${id}`;
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

const getNotificationsMarkActionComplete = async (
  token: string,
  id: string,
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.NOTIFICATIONS_ACTION_COMPLETE}/${id}`;
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

const userUpdate = async (token: string, payload: any): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.USER_UPDATE}`;
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

const getActionsList = async (token: string): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.ACTIONS_LIST}`;
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

const getActionsApprovals = async (
  token: string,
  event: string,
  status: boolean,
): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.ACTIONS_APPROVALS}/${event}/${status}`;
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

const uploadImage = async (token: string, payload: any): Promise<any> => {
  try {
    const url = `${API_BASE_URL}${API_ENDPOINT.SAVE_IMAGE}`;
    const response = await fetch(url, {
      method: HTTP_METHODS.POST,
      headers: getDefaultHeaders2(token),
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

export {
  getNotificationsList,
  getNotificationsMarkAsSeen,
  getNotificationsMarkActionComplete,
  userUpdate,
  getActionsList,
  getActionsApprovals,
  uploadImage,
};
