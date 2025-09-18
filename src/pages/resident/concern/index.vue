<script setup lang="ts">
	import { ref, onMounted, reactive } from 'vue';
	import type { Concern } from '@/types/concern';
	import { useConcernStore } from '@/stores/concern';
	import { useCurrentUser } from 'vuefire';
	import { useResidentStore } from '@/stores/resident';
	import { useRouter } from 'vue-router';
	import { useToast } from 'primevue';

	const router = useRouter();
	const toast = useToast();
	const residentStore = useResidentStore();
	const concernStore = useConcernStore();
	const selectedContent = ref();
	const concern = reactive<Concern>({});
	const errors = reactive({
		selectedContent: '',
		content: '',
	});

	const contents = ref([
		'Disconnection / Cut-Off',
		'Pull-Out',
		'For Reconnection',
		'Biling Inquiry',
		'High Consumption',
		'Re-Read',
		'Erroneous Billing',
		'No Water',
		'High Pressure',
		'Low Pressure',
		'Filthy Water',
		'Others',
	]);

	onMounted(async () => {
		const user = useCurrentUser() as any;
		if (!user.value) {
			console.log('No user is signed in.');
			router.push('/');
		}
		const residentId = user.value.uid;
		await residentStore.fetchResident(residentId);
		concern.name = residentStore.resident?.fullname;
		concern.area = residentStore.resident?.book;
		concern.uid = residentId;
		concern.accountNumber = residentId;
	});

	function validateForm() {
		let isValid = true;
		if (!selectedContent.value) {
			errors.selectedContent = 'Please select a concern.';
			isValid = false;
		} else {
			errors.selectedContent = '';
		}
		if (selectedContent.value === 'Others' && !concern.content) {
			errors.content = 'Please enter your concern.';
			isValid = false;
		} else {
			errors.content = '';
		}
		return isValid;
	}

	async function submitConcern(payload: Concern) {
		if (!validateForm()) {
			return;
		}
		const response = await concernStore.addConcern({
			...payload,
			content:
				selectedContent.value === 'Others'
					? payload.content
					: selectedContent.value,
		});
		toast.add({
			severity: response.status,
			summary: response.statusMessage,
			detail: response.message,
			life: 3000,
		});
	}
</script>
<template>
	<div
		class="h-screen flex justify-center items-center"
		v-if="residentStore.isLoading">
		<i
			class="pi pi-spin pi-spinner text-primary"
			style="font-size: 2rem"></i>
	</div>
	<div class="p-2 md:p-4 lg:p-5">
		<div class="flex flex-col gap-5">
			<form
				@submit.prevent="submitConcern(concern)"
				class="p-2 md:p-3 lg:p-6 bg-white">
				<div class="flex justify-between items-end md:items-center pb-3">
					<div
						class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
						Send a concern
					</div>
					<RouterLink
						to="/resident/faq"
						class="text-primary-500 text-sm ml-2">
						<i class="pi pi-question-circle"></i>
						FAQs
					</RouterLink>
				</div>
				<div class="flex justify-between items-end md:items-center pb-3">
					<div>
						<label>Select concern message: </label><br />
						<Select
							v-model="selectedContent"
							:options="contents"
							placeholder="Select a Concern"
							checkmark
							:highlightOnSelect="false"
							class="w-full md:w-56" />
						<span
							v-if="errors.selectedContent"
							class="text-red-500"
							>{{ errors.selectedContent }}</span
						>
					</div>
				</div>
				<div v-if="selectedContent === 'Others'">
					<label>Message:</label>
					<Textarea
						v-model="concern.content"
						rows="5"
						class="bg-gray-100 w-full"
						placeholder="Enter your concern here..." />
					<span
						v-if="errors.content"
						class="text-red-500"
						>{{ errors.content }}</span
					>
				</div>
				<div class="flex justify-end mt-4">
					<Button
						label="Send"
						severity="primary"
						icon="pi pi-send"
						iconPos="right"
						type="submit"
						:loading="concernStore.isLoading" />
				</div>
			</form>
			<!-- <div class="shadow-sm rounded-border p-2 md:p-3 lg:p-6  bg-white ">
                <div
                    class="text-xl font-medium text-surface-900 dark:text-surface-0 mb-2">
                    List of concerns
                </div><hr/>
                <ConcernList :concerns="store.concerns"/>
            </div> -->
		</div>
	</div>
</template>
