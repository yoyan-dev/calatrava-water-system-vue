<script setup lang="ts">
	import { ref, reactive, onMounted } from 'vue';
	import { useFetch } from '@vueuse/core';
	import type { H3Response } from '@/types/h3response';
	import { useAnnouncementStore } from '@/stores/announcement';
	import { useToast } from 'primevue';
	import type { Announcement } from '@/types/announcement';

	const API_URL = import.meta.env.VITE_API_URL;
	const isLoading = ref(false);
	const areas = ref([]);
	onMounted(async () => {
		isLoading.value = true;
		const { data: response } = await useFetch(
			`${API_URL}/books`,
		).json<H3Response>();
		isLoading.value = false;
		console.log(response.value);
		areas.value = response.value?.data?.books || [];
	});

	const toast = useToast();
	const store = useAnnouncementStore();
	const visible = ref(false);
	const announcement = reactive<Announcement>({});

	async function submit(payload: Announcement) {
		const res = await store.addAnnouncement(payload);
		toast.add({
			severity: res.status,
			summary: res.statusMessage,
			detail: res.message,
			life: 3000,
		});
		visible.value = false;
	}
</script>
<template>
	<Button
		severity="primary"
		icon="pi pi-send"
		size="small"
		class="visible md:hidden"
		@click="visible = true" />
	<div class="hidden md:block">
		<Button
			severity="primary"
			icon="pi pi-send"
			label="Announcement"
			size="small"
			@click="visible = true" />
	</div>
	<Dialog
		v-model:visible="visible"
		modal
		header="Create Announcement"
		:style="{ width: '50rem' }"
		:breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
		<form @submit.prevent="submit(announcement)">
			<div class="flex flex-col gap-3">
				<div class="flex-auto">
					<label
						for="date"
						class="block mb-2">
						Due Date
					</label>
					<DatePicker
						id="date"
						v-model="announcement.dueDate"
						showIcon
						fluid
						:showOnFocus="false" />
				</div>
				<div class="flex-auto flex gap-3 flex-wrap">
					<div>
						<label
							for="area"
							class="block mb-2">
							Area
						</label>
						<Select
							id="area"
							:options="areas"
							:isLoading="isLoading"
							v-model.trim="announcement.area"
							autofocus
							placeholder="Select an area"
							showClear
							highlightOnSelect
							fluid />
					</div>
					<div>
						<label
							for="type"
							class="block mb-2">
							Type
						</label>
						<InputText
							id="type"
							v-model.trim="announcement.type"
							autofocus
							fluid />
					</div>
				</div>
				<div class="flex-auto">
					<label
						for="content"
						class="block mb-2">
						Content
					</label>
					<Textarea
						v-model="announcement.content"
						rows="5"
						class="bg-gray-100 w-full"
						placeholder="Enter your content here..." />
				</div>
			</div>
			<div class="flex justify-end mt-2">
				<Button
					label="Send"
					severity="primary"
					icon="pi pi-send"
					iconPos="right"
					type="submit"
					:loading="store.isLoading" />
			</div>
		</form>
	</Dialog>
</template>
