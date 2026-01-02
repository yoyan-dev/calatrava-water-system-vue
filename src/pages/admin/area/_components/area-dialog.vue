<template>
	<form @submit.prevent="submit">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label class="block text-sm font-medium mb-2"
					>Area Name <span class="text-red-500">*</span></label
				>
				<InputText
					v-model="form.name"
					:invalid="!form.name"
					placeholder="e.g. Barangay San Miguel"
					class="w-full" />
			</div>

			<div>
				<label class="block text-sm font-medium mb-2">Code (Optional)</label>
				<InputText
					v-model="form.code"
					placeholder="e.g. BRGY-001"
					class="w-full" />
			</div>

			<div class="md:col-span-2">
				<label class="block text-sm font-medium mb-2">Description</label>
				<Textarea
					v-model="form.description"
					rows="3"
					placeholder="Brief description of this area..."
					class="w-full" />
			</div>

			<!-- <div>
				<label class="block text-sm font-medium mb-2"
					>Parent Area (Optional)</label
				>
				<Select
					v-model="form.parentId"
					:options="parentOptions"
					optionLabel="name"
					optionValue="id"
					placeholder="None (Top Level)"
					:loading="loadingParents"
					class="w-full" />
			</div> -->

			<div>
				<label class="block text-sm font-medium mb-2">Status</label>
				<Select
					v-model="form.isActive"
					:options="[
						{ label: 'Active', value: true },
						{ label: 'Inactive', value: false },
					]"
					optionLabel="label"
					optionValue="value"
					class="w-full" />
			</div>
		</div>

		<div class="flex justify-end gap-3 mt-6">
			<Button
				label="Cancel"
				severity="secondary"
				@click="closeModal" />
			<Button
				type="submit"
				label="Save Area"
				:loading="saving" />
		</div>
	</form>
</template>

<script setup lang="ts">
	import { ref, onMounted, inject } from 'vue';
	import { useAreaStore } from '@/stores/area';
	const dialogRef = inject<any>('dialogRef');

	const store = useAreaStore();
	const saving = ref(false);
	const loadingParents = ref(false);

	const form = ref({
		name: '',
		code: '',
		description: '',
		isActive: true,
	});

	const parentOptions = ref<any[]>([]);

	// Close Modal
	const closeModal = () => {
		dialogRef.value?.close();
	};

	// Load parent options (active root + others)
	const loadParents = async () => {
		loadingParents.value = true;
		await store.fetchActiveAreas();
		parentOptions.value = store.areas.filter((a) => a.isActive);
		loadingParents.value = false;
	};

	onMounted(() => {
		loadParents();

		if (dialogRef.value.data.area) {
			form.value = { ...dialogRef.value.data.area };
		}
	});

	const submit = async () => {
		if (!form.value.name.trim()) return;

		saving.value = true;
		try {
			if (dialogRef.value.data.area) {
				await store.updateArea(dialogRef.value.data.area.id, form.value);
			} else {
				await store.createArea(form.value);
			}
			closeModal();
		} catch (err) {
			// Error handled in parent via toast
		} finally {
			saving.value = false;
		}
	};
</script>
