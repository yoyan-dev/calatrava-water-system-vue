<template>
	<div class="card">
		<DataTable
			:value="areas"
			:loading="loading"
			responsiveLayout="scroll"
			:rows="15"
			paginator
			paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
			currentPageReportTemplate="{first} - {last} of {totalRecords}">
			<template #empty>
				<div class="text-center py-8 text-surface-500">No areas found.</div>
			</template>

			<template #loading>
				<div class="text-center py-8">Loading areas...</div>
			</template>

			<Column
				field="name"
				header="Area Name"
				sortable>
				<template #body="{ data }">
					<div class="font-medium">{{ data.name }}</div>
					<div
						v-if="data.code"
						class="text-sm text-surface-500">
						{{ data.code }}
					</div>
				</template>
			</Column>

			<Column
				field="description"
				header="Description">
				<template #body="{ data }">
					<span class="text-sm text-surface-600">
						{{ data.description || '—' }}
					</span>
				</template>
			</Column>

			<Column
				header="Status"
				style="width: 120px">
				<template #body="{ data }">
					<Tag
						:value="data.isActive ? 'Active' : 'Inactive'"
						:severity="data.isActive ? 'success' : 'danger'"
						rounded />
				</template>
			</Column>

			<Column
				header="Actions"
				style="width: 160px">
				<template #body="{ data }">
					<div class="flex gap-2">
						<Button
							icon="pi pi-pencil"
							text
							rounded
							severity="info"
							@click="$emit('edit', data)" />

						<Button
							:icon="data.isActive ? 'pi pi-ban' : 'pi pi-check-circle'"
							text
							rounded
							:severity="data.isActive ? 'warning' : 'success'"
							:label="data.isActive ? 'Deactivate' : 'Activate'"
							class="hidden sm:inline-flex"
							@click="$emit('toggle-active', data)" />

						<Button
							icon="pi pi-trash"
							text
							rounded
							severity="danger"
							@click="$emit('delete', data.id)" />
					</div>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script setup lang="ts">
	import DataTable from 'primevue/datatable';
	import Column from 'primevue/column';
	import Button from 'primevue/button';
	import Tag from 'primevue/tag';

	defineProps<{
		areas: any[];
		loading: boolean;
	}>();

	defineEmits(['edit', 'delete', 'toggle-active']);
</script>
