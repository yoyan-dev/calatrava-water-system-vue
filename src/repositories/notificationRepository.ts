import { useFetch } from "@vueuse/core";
import type { Notification } from "@/types/notification";
import type { H3Response } from "@/types/h3response";

const API_URL = import.meta.env.VITE_API_URL;

export const notificationRepository = {
  async fetchNotifications() {
    const url = `${API_URL}/api/notifications`;

    try {
      const { data: response } = await useFetch(url).json<
        H3Response<Notification[]>
      >();
      return response.value;
    } catch (error) {
      console.error("Error fetching ledger:", error);
      return { data: [], total: 0 };
    }
  },
  async markAsAllRead() {
    try {
      const { data } = await useFetch(`${API_URL}/api/notifications`, {
        method: "PUT",
      }).json<H3Response>();

      return data.value;
    } catch (error) {
      console.error("Error marking as read:", error);
      return {
        statusCode: 500,
        message:
          error instanceof Error ? error.message : "Failed to mark as read",
      };
    }
  },
};
