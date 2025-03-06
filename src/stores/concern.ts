import { ref } from "vue";
import { defineStore } from "pinia";
import type { Concern } from "@/types/concern";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { useFirestore } from "vuefire";
import type { StoreResponse } from "@/types/store-response";

export const useConcernStore = defineStore("concern", () => {
  const db = useFirestore();
  const concerns = ref<Concern[]>([]);
  const isLoading = ref(false);

  async function fetchConcerns() {
    isLoading.value = true;
    const concernQuery = query(
      collection(db, "concerns"),
      orderBy("createdAt", "desc")
    );
    const concernSnapshot = await getDocs(concernQuery);
    const result = concernSnapshot.docs.map((doc) => ({
      ...doc.data(),
      uid: doc.id,
    }));
    concerns.value = result;
    isLoading.value = false;
  }

  async function addConcern(concern: Concern): Promise<StoreResponse> {
    isLoading.value = true;
    try {
      const concernRef = await addDoc(collection(db, "concerns"), {
        ...concern,
        createdAt: Timestamp.now(),
      });
      concerns.value.push({ ...concern, uid: concernRef.id });
    } catch (error) {
      return {
        status: "error",
        statusMessage: "Error message",
        message: "Failed to send concern",
      };
    } finally {
      isLoading.value = false;
      return {
        status: "success",
        statusMessage: "Success message",
        message: "Concern send successfully",
      };
    }
  }

  async function deleteConcern(uid: string): Promise<StoreResponse> {
    isLoading.value = true;
    try {
      await deleteDoc(doc(db, "concerns", uid));
      concerns.value = concerns.value.filter((val) => val.uid !== uid);
    } catch (error) {
      return {
        status: "error",
        statusMessage: "Error message",
        message: "Error failed to delete concern.",
      };
    } finally {
      isLoading.value = false;
      return {
        status: "success",
        statusMessage: "Success message",
        message: "Concern deleted successfully",
      };
    }
  }

  return {
    isLoading,
    concerns,
    deleteConcern,
    fetchConcerns,
    addConcern,
  };
});
