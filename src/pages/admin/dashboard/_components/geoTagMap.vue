<template>
	<div>
		<h2 class="text-xl font-bold mb-2">📍 Geo-tag Water System</h2>
		<div
			id="map"
			style="height: 500px"></div>
	</div>
</template>

<script setup>
	import L from 'leaflet';
	import { onMounted, ref } from 'vue';

	const geoTags = ref([
		{
			lat: 10.45109711173025,
			lng: 123.36110115051271,
			name: 'CARPEN',
		},
	]);

	onMounted(() => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				const map = L.map('map').setView([latitude, longitude], 15);

				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; OpenStreetMap contributors',
				}).addTo(map);

				L.marker([latitude, longitude])
					.addTo(map)
					.bindPopup('📍 You are here')
					.openPopup();

				geoTags.value.map((tag) => {
					L.marker([tag.lat, tag.lng])
						.addTo(map)
						.bindPopup(tag.name)
						.openPopup();
				});

				initMapListeners(map);
				console.log(geoTags.value);
			},
			(error) => {
				alert('Location access denied. Showing default location.');
				const map = L.map('map').setView([10.3157, 123.8854], 13);

				L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; OpenStreetMap contributors',
				}).addTo(map);

				initMapListeners(map);
			},
		);

		function initMapListeners(map) {
			map.on('click', (e) => {
				const { lat, lng } = e.latlng;

				const name = prompt('Enter location label:');
				if (!name) return;

				L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();

				geoTags.value.push({
					name,
					lat,
					lng,
				});
				console.log(geoTags.value);
			});
		}
	});
</script>

<style scoped>
	#map {
		border: 2px solid #ccc;
		border-radius: 8px;
	}
</style>
