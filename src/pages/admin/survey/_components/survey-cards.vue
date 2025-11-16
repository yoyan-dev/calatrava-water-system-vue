<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
		<Card
			v-for="survey in surveys"
			:key="survey.id"
			class="shadow-lg hover:shadow-xl transition-shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
			<template #title>
				<div class="flex justify-between items-start">
					<h3
						class="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
						{{ survey.title }}
					</h3>
					<Tag
						:value="survey.status"
						:severity="statusSeverity(survey.status)"
						rounded
						class="font-medium" />
				</div>
			</template>

			<template #subtitle>
				<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
					{{ survey.description || 'No description' }}
				</p>
			</template>

			<template #content>
				<div class="flex items-center gap-4 mt-4 text-sm">
					<div class="flex items-center gap-1">
						<i class="pi pi-clock text-gray-500 dark:text-gray-400"></i>
						<span class="text-gray-700 dark:text-gray-300">{{
							formatDate(survey.createdAt)
						}}</span>
					</div>
					<div class="flex items-center gap-1">
						<i
							class="pi pi-check-circle text-primary-600 dark:text-primary-400"></i>
						<span class="font-medium text-gray-800 dark:text-gray-200">
							{{ survey.responsesCount || 0 }} responses
						</span>
					</div>
				</div>
			</template>

			<template #footer>
				<div
					class="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
					<Button
						type="button"
						icon="pi pi-eye"
						label="View"
						severity="primary"
						text
						size="small"
						class="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20"
						@click="$router.push(`/admin/surveys/${survey.id}`)" />
					<Button
						type="button"
						icon="pi pi-pencil"
						label="Edit"
						severity="secondary"
						text
						size="small"
						class="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
						@click="openEditDialog(survey)" />
					<Button
						icon="pi pi-trash"
						severity="danger"
						text
						size="small"
						class="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
						@click.stop="confirmDelete(survey)" />
				</div>
			</template>
		</Card>

		<!-- Empty State - Dark Mode Ready -->
		<div
			v-if="!surveys || surveys.length === 0"
			class="col-span-full text-center py-16">
			<i class="pi pi-inbox text-6xl text-gray-300 dark:text-gray-600 mb-4"></i>
			<p class="text-xl text-gray-500 dark:text-gray-400">No surveys yet</p>
			<p class="text-sm text-gray-400 dark:text-gray-500 mt-2">
				Create your first customer survey to get started
			</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { defineProps } from 'vue';
	import { useSurveyStore } from '@/stores/survey';
	import SurveyFormDialog from './survey-form-dialog.vue';
	import { format } from 'date-fns';
	import { useConfirm, useDialog } from 'primevue';

	const props = defineProps<{
		surveys: any[];
	}>();

	const store = useSurveyStore();
	const dialog = useDialog();
	const confirm = useConfirm();

	// Status color
	const statusSeverity = (status: string) => {
		switch (status) {
			case 'PUBLISHED':
				return 'success';
			case 'CLOSED':
				return 'danger';
			case 'DRAFT':
			default:
				return 'info';
		}
	};

	// Format date
	const formatDate = (date: string) => {
		return date ? format(new Date(date), 'MMM d, yyyy') : '—';
	};

	const openEditDialog = (survey: any) => {
		dialog.open(SurveyFormDialog, {
			data: { survey },
			props: {
				header: 'Edit Survey',
				modal: true,
				style: { width: '90vw', maxWidth: '600px' },
			},
		});
	};

	// Delete with confirm
	const confirmDelete = (survey: any) => {
		confirm.require({
			message: `Delete "${survey.title}" permanently?`,
			header: 'Confirm Delete',
			icon: 'pi pi-exclamation-triangle',
			accept: async () => {
				try {
					await store.deleteOneSurvey(survey.id);
				} catch (err) {
					// error handled in store
				}
			},
		});
	};
</script>

<style scoped>
	.line-clamp-2 {
		overflow: hidden;
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
