<script setup>
	import { computed, ref, onMounted } from 'vue';
	import { useNotificationStore } from '@/stores/notification';
	import { formatDateTimestamp } from '@/composables/formatDate';

	const store = useNotificationStore();
	const op = ref();

	onMounted(() => {
		store.fetchNotifications();
	});

	const toggle = (event) => {
		op.value.toggle(event);
		if (store.totalNotification > 0 && !store.isLoading) {
			store.totalNotification = 0;
			store.markAsAllRead();
		}
	};
</script>

<template>
	<div>
		<OverlayBadge
			@click="toggle"
			:value="store.totalNotification"
			:severity="store.totalNotification > 0 ? 'danger' : ''"
			size="small"
			class="cursor-pointer">
			<i class="pi pi-bell text-lg" />
		</OverlayBadge>
		<Popover ref="op">
			<div class="flex flex-col gap-4 min-w-64">
				<div>
					<span class="font-medium block mb-2">Notifications</span>
					<div
						v-if="store.isLoading"
						class="flex justify-center">
						<i class="pi pi-spin pi-spinner text-2xl"></i>
					</div>
					<div
						v-if="store.notifications.length === 0"
						class="text-sm text-surface-500 dark:text-surface-400">
						No notifications found.
					</div>
					<ul class="list-none p-0 m-0 flex flex-col max-h-96 overflow-y-auto">
						<li
							v-for="notification in store.notifications"
							:key="notification.uid"
							class="flex items-center gap-2 px-2 py-3 border-b rounded-border"
							:class="!notification.isRead ? 'bg-emphasis' : ''">
							<Avatar
								icon="pi pi-user"
								class="mr-2"
								size="normal" />
							<div>
								<span class="font-medium capitalize">{{
									notification.name ?? 'No name'
								}}</span>
								<div class="text-sm text-surface-500 dark:text-surface-400">
									{{
										notification.content
											? 'Send concern on'
											: ' Send receipt on'
									}}
									<span>{{ formatDateTimestamp(notification.createdAt) }}</span>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</Popover>
	</div>
</template>
