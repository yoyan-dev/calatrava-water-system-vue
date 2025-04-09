import { useFetch } from "@vueuse/core";
import type { Concern } from "@/types/concern";
import type { H3Response } from "@/types/h3response";
import camelize from "camelize";

const API_URL = import.meta.env.VITE_API_URL;

export const concernRepository = {
  async fetchConcerns() {
    const url = `${API_URL}/api/concerns`;

    try {
      const { data: response } = await useFetch(url).json<
        H3Response<Concern[]>
      >();
      return response.value;
    } catch (error) {
      console.error("Error fetching ledger:", error);
      return { data: [], total: 0 };
    }
  },

  async addConcern(payload: any) {
    try {
      const { data } = await useFetch(`${API_URL}/api/concerns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).json<H3Response>();

      return data.value;
    } catch (error) {
      console.error("Error adding concern:", error);
      return {
        statusCode: 500,
        message:
          error instanceof Error ? error.message : "Failed to add concern",
      };
    }
  },

  // async deleteConcern(payload: Concern[]) {
  //     try {
  //         const { data, error } = await useFetch(`${API_URL}/api/concerns`, {
  //             method: 'DELETE',
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify(payload),
  //         }).json<H3Response>();

  //         if (error.value) {
  //             throw new Error(error.value.message || 'Network error');
  //         }

  //         return data.value;
  //     } catch (error) {
  //         return {
  //             statusCode: 500,
  //             message:
  //                 error instanceof Error ? error.message : 'Failed to delete concern',
  //         };
  //     }
  // },
};
