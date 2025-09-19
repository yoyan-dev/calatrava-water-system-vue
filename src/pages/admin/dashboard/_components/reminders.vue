<script setup lang="ts">
import { ref } from "vue";
import type { Reminder } from "@/types/reminder";
import ViewReminder from "@/pages/admin/dashboard/_components/modals/view-reminder-modal.vue";

const props = defineProps<{ reminders: Reminder[] }>();
</script>
<template>
	<div class="p-4 border border-surface-200 dark:border-surface-800 rounded-lg bg-surface-0 dark:bg-surface-900 shadow-sm">
		<span class="text-lg font-semibold text-surface-900 dark:text-surface-50">Reminders</span>
		<div class="max-h-96 overflow-y-auto">
			<ul class="list-none p-0 m-0 divide-y divide-surface-200 dark:divide-surface-700">
				<li
					v-for="reminder in props.reminders"
					:key="reminder.uid"
					class="flex items-start gap-3 p-4 bg-orange-100 dark:bg-orange-900/20 rounded-sm"
				>
					<OverlayBadge severity="danger" class="mt-1" />
					<div class="flex flex-col flex-1">
						<div class="flex justify-between items-center">
							<div>
								<span class="text-sm text-surface-500 dark:text-surface-400">
									Due: {{ reminder.dueDate }}
								</span>
								<div class="font-semibold capitalize text-surface-800 dark:text-surface-200">
									{{ reminder.name }}
								</div>
							</div>
							<ViewReminder :reminder="reminder" />
						</div>
					</div>
				</li>
			</ul>
			<div
				v-if="!props.reminders?.length"
				class="text-sm text-surface-500 dark:text-surface-400 text-center py-4"
			>
				No reminders found.
			</div>
		</div>
	</div>
</template>
