import { useFetch } from "@vueuse/core";
import type { Reminder } from "@/types/reminder";
import type { H3Response } from "@/types/h3response";
import camelize from "camelize";

const API_URL = import.meta.env.VITE_API_URL;

export const reminderRepository = {
  async fetchReminders({
    uid,
    params,
  }: {
    uid: string;
    params: Record<string, any>;
  }) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/api/reminders/${uid}${
      queryString ? "?" + queryString : ""
    }`;

    try {
      const { data: response } = await useFetch(url).json<H3Response>();
      return camelize(response.value);
    } catch (error) {
      console.error("Error fetching reminders:", error);
      return { data: [], total: 0 };
    }
  },

  async addReminder(payload: Reminder) {
    try {
      const { data, error } = await useFetch(`${API_URL}/api/reminders`, {
        method: "POST",
        body: JSON.stringify(payload),
      }).json<H3Response>();

      if (error.value) {
        throw new Error(error.value.message || "Network error");
      }

      return data.value;
    } catch (error) {
      console.error("Error adding reminder:", error);
      return {
        statusCode: 500,
        message:
          error instanceof Error ? error.message : "Failed to add reminder",
      };
    }
  },
};
