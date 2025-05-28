<script setup lang="ts">
	import { ref } from 'vue';
	import type { Announcement } from '@/types/announcement';
	import ViewAnnouncement from '@/pages/admin/dashboard/_components/modals/view-announcement-modal.vue';

	const props = defineProps<{ announcement: Announcement[] }>();
</script>
<template>
	<div class="p-4 border rounded-lg">
		<span class="text-lg font-semibold">Announcement</span>
		<div class="max-h-96 overflow-auto">
			<div
				v-for="announcement in props.announcement"
				:key="announcement.uid"
				class="flex items-start gap-2 bg-primary-100 p-4 rounded-lg my-2">
				<OverlayBadge severity="info"> </OverlayBadge>
				<div class="flex justify-between items-center flex-1">
					<div>
						<span class="text-sm text-gray-500"
							>Target Area:
							{{ announcement.area ? announcement.area : 'All Areas' }}</span
						>
						<div class="font-semibold capitalize">{{ announcement.type }}</div>
					</div>
					<ViewAnnouncement :announcement="announcement" />
				</div>
			</div>
		</div>
	</div>
</template>
