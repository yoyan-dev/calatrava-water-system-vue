<template>
	<div>
		<h2 class="text-xl font-bold mb-2">📍 Geo-tag Water System</h2>
		<div
			id="map"
			style="height: 500px"></div>
	</div>
</template>

<script setup>
	import { useCoordinateStore } from '@/stores/coordinate';
	import L from 'leaflet';
	import { onMounted, ref } from 'vue';

	const store = useCoordinateStore();

	onMounted(async () => {
		await store.fetchCoordinates();
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const { latitude, longitude } = position.coords;
				const map = L.map('map').setView([latitude, longitude], 18);

				L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
					maxZoom: 20,
					subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
				}).addTo(map);
				const customIcon = L.icon({
					iconUrl: '/mark.png',
					iconSize: [38, 38],
					iconAnchor: [19, 38],
					popupAnchor: [0, -38],
				});

				L.marker([latitude, longitude], { icon: customIcon })
					.addTo(map)
					.bindPopup('📍 You are here')
					.openPopup();

				store.coordinates.map((tag) => {
					L.marker([tag.lat, tag.lng], { icon: customIcon })
						.addTo(map)
						.bindPopup(tag.name)
						.openPopup();
				});

				initMapListeners(map);
				console.log(store.coordinates);
			},
			(error) => {
				alert('Location access denied. Showing default location.');
				const map = L.map('map').setView([10.3157, 123.8854], 13);

				L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
					maxZoom: 20,
					subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
				}).addTo(map);

				initMapListeners(map);
			},
		);

		function initMapListeners(map) {
			map.on('click', async (e) => {
				const { lat, lng } = e.latlng;

				const name = prompt('Enter location label:');
				if (!name) return;

				L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();

				await store.addCoordinate({
					name,
					lat,
					lng,
				});
				console.log(store.coordinates);
			});
		}
	});
</script>
