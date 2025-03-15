<template>
	<div>
		<!-- <p
        class="m-0"
        v-if="!data">
        data
      </p>
      <div
        class="card flex justify-center"
        v-else>
        <Image
          :src="data"
          alt="Image"
          width="250"
          preview />
      </div> -->
		<div>{{ data }}</div>
	</div>
</template>

<script setup lang="ts">
	import { inject, onMounted, ref } from 'vue';
	const dialogRef = inject<any>('dialogRef');

	const visible = ref(true);
	const data = ref();

	onMounted(() => {
		data.value = dialogRef.value.data;
	});
</script>
