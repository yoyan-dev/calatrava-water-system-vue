import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Concern } from '@/types/concern';

export const useConcernStore = defineStore('concern', () => {
	const concerns = ref<Concern[]>([]);

	function getConcerns() {
		concerns.value = [
			{
				id: '1',
				firstName: 'John Doe',
				content: 'Water leakage in the basement.',
			},
			{
				id: '2',
				firstName: 'Jane Smith',
				content: 'No water supply in the kitchen.',
			},
			{
				id: '3',
				firstName: 'Alice Johnson',
				content: 'Low water pressure in the shower.',
			},
			{
				id: '4',
				firstName: 'Bob Brown',
				content: 'Strange odor in the tap water.',
			},
		];
		return concerns.value;
	}

	function addConcern(concern: Concern) {
		concerns.value.push(concern);
	}

	return {
		concerns,
		getConcerns,
		addConcern,
	};
});
