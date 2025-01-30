import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Resident } from '@/types/resident';

export const useResidentStore = defineStore('resident', () => {
	const residents = ref<Resident[]>([]);

	function fetchResidents() {
		residents.value = [
			{ id: '1', accountNo: '0126-7237', firstName: 'Jeremy', middleName: 'Chua', lastName: 'Maglinte',  address: 'San Carlos City', classification: 'Residential', },
		];
	}

	function addResident(resident: Resident) {
		resident.id = (residents.value.length + 1).toString();
		residents.value.push({ waterBill: 10, ...resident });
		console.log(resident);
	}

	function deleteResident(id: string) {
		residents.value = residents.value.filter((val) => val.id !== id);
	}

	function updateResident(resident: Resident) {
		const result = residents.value.find((item) => item.id === resident.id);
		Object.assign(result || {}, resident);
	}

	return {
		residents,
		fetchResidents,
		addResident,
		deleteResident,
		updateResident,
	};
});
