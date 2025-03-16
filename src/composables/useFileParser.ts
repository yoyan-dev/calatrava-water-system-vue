import { ref } from 'vue';
import Papa from 'papaparse';
import type { FileUploadSelectEvent } from 'primevue';

export function useFileParser() {
	const csvData = ref<any[]>([]);

	function parseCsvFile(event: FileUploadSelectEvent) {
		const file = event.files[0];
		Papa.parse(file as File, {
			header: true,
			complete: (result: any) => {
				const filteredData = result.data
					.filter((row: any) =>
						Object.values(row).some((value) => value !== '' && value !== null),
					)
					.map((row: any) =>
						Object.fromEntries(
							Object.entries(row).map(([key, value]) => [
								key,
								typeof value === 'string' ? value.toLowerCase() : value,
							]),
						),
					);

				csvData.value = filteredData;
				console.log(filteredData);
			},
			error: (error: any) => {
				console.error('Error parsing CSV file:', error);
			},
		});
	}

	return {
		csvData,
		parseCsvFile,
	};
}
