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
      const { data: residentResponse } = await useFetch(
        `${API_URL}/api/residents/${uid}`
      ).json<H3Response<Resident>>();
      const { data: ledgerResponse } = await useFetch(
        `${API_URL}/api/residents/ledger/${uid}`
      ).json<H3Response<Ledger>>();
      const { data: collectionResponse } = await useFetch(
        `${API_URL}/api/residents/collection/${uid}`
      ).json<H3Response<Collection>>();

      const resident = camelize(residentResponse.value);
      const ledger = camelize(ledgerResponse.value);
      const collection = camelize(collectionResponse.value);

      return {
        ...resident?.data,
        ledgers: ledger?.data,
        collections: collection?.data,
      };
    } catch (error) {
      console.error("Error fetching residents:", error);
      return { data: {} };
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
