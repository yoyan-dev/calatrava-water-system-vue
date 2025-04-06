import { useFetch } from "@vueuse/core";
import type { Resident } from "@/types/resident";
import type { H3Response } from "@/types/h3response";
import camelize from "camelize";
import type { Ledger } from "@/types/ledger";
import type { Collection } from "@/types/collection";

const API_URL = import.meta.env.VITE_API_URL;

export const residentRepository = {
  async fetchResident(uid: string) {
    try {
      const { data: response } = await useFetch(
        `${API_URL}/api/residents/${uid}`
      ).json<H3Response<Resident>>();
      return camelize(response.value);
    } catch (error) {
      console.error("Error fetching residents:", error);
      return { data: {} };
    }
  },

  async fetchResidentLedgers(uid: string) {
    try {
      const { data: response } = await useFetch(
        `${API_URL}/api/residents/ledger/${uid}`
      ).json<H3Response<Ledger[]>>();
      return camelize(response.value);
    } catch (error) {
      console.error("Error fetching residents:", error);
      return { data: [] };
    }
  },

  async fetchResidentCollections(uid: string) {
    try {
      const { data: response } = await useFetch(
        `${API_URL}/api/residents/collection/${uid}`
      ).json<H3Response<Collection[]>>();
      return camelize(response.value);
    } catch (error) {
      console.error("Error fetching residents:", error);
      return { data: [] };
    }
  },

  async fetchResidents(params: Record<string, any>) {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_URL}/api/residents${
      queryString ? "?" + queryString : ""
    }`;

    try {
      const { data: response } = await useFetch(url, { refetch: true })
        .get()
        .json<H3Response<Resident[]>>();
      return camelize(response.value);
    } catch (error) {
      console.error("Error fetching residents:", error);
      return { data: [], total: 0 };
    }
  },
};
