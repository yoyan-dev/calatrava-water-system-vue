<template>
	<div class="space-y-6">
		<div>
			<label class="block text-sm font-medium mb-1"
				>Title <span class="text-red-500">*</span></label
			>
			<InputText
				v-model="local.title"
				class="w-full"
				placeholder="Enter title"
				:invalid="!local.title" />
		</div>

		<div>
			<label class="block text-sm font-medium mb-1"
				>Content <span class="text-red-500">*</span></label
			>
			<Textarea
				v-model="local.content"
				rows="6"
				class="w-full"
				placeholder="Write announcement..." />
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
			<div>
				<label class="block text-sm font-medium mb-1">Priority</label>
				<Select
					v-model="local.priority"
					:options="priorityOptions"
					optionLabel="label"
					optionValue="value"
					class="w-full" />
			</div>
			<div>
				<label class="block text-sm font-medium mb-1">Status</label>
				<Select
					v-model="local.status"
					:options="statusOptions"
					optionLabel="label"
					optionValue="value"
					class="w-full" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { Announcement } from '@/types/announcement';

	defineProps<{ modelValue: Partial<Announcement> }>();
	const local = defineModel<Partial<Announcement>>({ required: true });

	const priorityOptions = [
		{ label: 'Normal', value: 'NORMAL' },
		{ label: 'Important', value: 'IMPORTANT' },
		{ label: 'Critical', value: 'CRITICAL' },
	];

	const statusOptions = [
		{ label: 'Draft', value: 'DRAFT' },
		{ label: 'Published', value: 'PUBLISHED' },
		{ label: 'Archived', value: 'ARCHIVED' },
	];
</script>
