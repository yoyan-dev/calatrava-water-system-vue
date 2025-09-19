<script setup lang="ts">
	import { ref } from 'vue';
	import type { Announcement } from '@/types/announcement';
	import ViewAnnouncement from '@/pages/admin/dashboard/_components/modals/view-announcement-modal.vue';

	const props = defineProps<{ announcement: Announcement[] }>();
</script>
<template>
	<div class="p-4 border border-surface-200 dark:border-surface-800 rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
		<span class="text-lg font-semibold text-surface-900 dark:text-surface-50">Announcements</span>
		<div class="max-h-96 overflow-y-auto">
			<ul class="list-none p-0 m-0 divide-y divide-surface-200 dark:divide-surface-700">
				<li
					v-for="announcement in props.announcement"
					:key="announcement.uid"
					class="flex items-start gap-3 p-4"
				>
					<OverlayBadge severity="info" class="mt-1" />
					<div class="flex flex-col flex-1">
						<div class="flex justify-between items-center">
							<div>
								<span class="text-sm text-surface-500 dark:text-surface-400">
									Target Area: {{ announcement.area ?? 'All Areas' }}
								</span>
								<div class="font-semibold capitalize text-surface-800 dark:text-surface-200">
									{{ announcement.type }}
								</div>
							</div>
							<ViewAnnouncement :announcement="announcement" />
						</div>
					</div>
				</li>
			</ul>
			<div
				v-if="!props.announcement?.length"
				class="text-sm text-surface-500 dark:text-surface-400 text-center py-4"
			>
				No announcements found.
			</div>
		</div>
	</div>
</template>
