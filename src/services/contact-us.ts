import { ContactUsFormValues } from "@/app/contactUs/page";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ContactUsPayload = ContactUsFormValues & { token: string };

export const getContactUsToken = async () => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.token) {
    return data.token;
  } else {
    throw new Error(data.error);
  }
};

export const postContactUs = async (payload: ContactUsPayload) => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();

  if (data.message) {
    return data.message;
  } else {
    throw new Error(data.error);
  }
};
