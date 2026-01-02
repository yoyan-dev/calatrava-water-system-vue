<!-- _components/announcement-cards.vue -->
<template>
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
		<div
			v-for="ann in announcements"
			:key="ann.id"
			class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
			<!-- Priority Badge -->
			<div
				class="px-4 py-2 text-white text-sm font-medium"
				:class="{
					'bg-orange-500': ann.priority === 'NORMAL',
					'bg-amber-500': ann.priority === 'IMPORTANT',
					'bg-red-600': ann.priority === 'CRITICAL',
				}">
				{{ ann.priority }}
			</div>

			<!-- Card Body -->
			<div class="p-5">
				<h3
					class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
					{{ ann.title }}
				</h3>

				<p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
					{{ ann.content }}
				</p>

				<!-- Meta -->
				<div
					class="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
					<span class="px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
						{{ ann.status }}
					</span>
					<span v-if="ann.publishedAt">
						Published: {{ formatDate(ann.publishedAt) }}
					</span>
					<span v-if="ann.expiresAt">
						Expires: {{ formatDate(ann.expiresAt) }}
					</span>
				</div>

				<!-- Actions -->
				<div
					class="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
					<Button
						v-tooltip.bottom="'Edit'"
						icon="pi pi-pencil"
						severity="secondary"
						text
						rounded
						@click="$emit('open-edit-dialog', ann)" />
					<Button
						v-tooltip.bottom="'Archive'"
						icon="pi pi-inbox"
						severity="info"
						text
						rounded
						@click="$emit('archive', ann.id)" />
					<Button
						v-tooltip.bottom="'Delete Permanently'"
						icon="pi pi-trash"
						severity="danger"
						text
						rounded
						@click="$emit('delete', ann.id)" />
				</div>
			</div>
		</div>

		<!-- Empty State -->
		<div
			v-if="announcements.length === 0"
			class="col-span-full text-center py-12">
			<i
				class="pi pi-megaphone text-5xl text-gray-300 dark:text-gray-600 mb-4"></i>
			<p class="text-gray-500 dark:text-gray-400">No announcements found.</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Announcement } from '@/types/announcement';

	defineProps<{
		announcements: Announcement[];
		loading?: boolean;
	}>();

	defineEmits<{
		(e: 'open-edit-dialog', announcement: Announcement): void;
		(e: 'delete', id: string): void;
		(e: 'archive', id: string): void;
	}>();

	const formatDate = (iso: string) => {
		return new Date(iso).toLocaleDateString(undefined, {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		});
	};
</script>
