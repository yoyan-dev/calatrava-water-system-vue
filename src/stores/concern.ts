import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Concern } from '@/types/resident';

export const useConcernStore = defineStore('concern', () => {
  const concerns = ref<Concern[]>([]);

  function getConcerns() {
    concerns.value = [  
        { id: '1', name: "John Doe", message: "Water leakage in the basement." },
        { id: '2', name: "Jane Smith", message: "No water supply in the kitchen." },
        { id: '3', name: "Alice Johnson", message: "Low water pressure in the shower." },
        { id: '4', name: "Bob Brown", message: "Strange odor in the tap water." }
    ];
    return concerns.value;
  }

  function addConcern(concern: Concern) {
    concerns.value.push(concern);
  }

  return {
    concerns,
    getConcerns,
    addConcern
  };
});
