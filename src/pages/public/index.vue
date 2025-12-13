<template>
	<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
		<!-- Hero Section -->
		<section class="bg-linear-to-r from-blue-600 to-blue-800 text-white py-20">
			<div class="container mx-auto px-4 text-center">
				<div class="flex justify-center mb-6">
					<img
						src="/logo.png"
						alt="MyWater Logo"
						class="h-24 w-24" />
				</div>
				<h1 class="text-4xl md:text-5xl font-bold mb-4">
					Calatrava Water System
				</h1>
				<p class="text-lg md:text-xl max-w-2xl mx-auto mb-8">
					Your trusted water utility provider in the Municipality of Calatrava.
					Manage your account, pay bills, and stay connected with us.
				</p>
				<div class="flex justify-center gap-4">
					<!-- <Button
						label="Sign In"
						icon="pi pi-sign-in"
						class="p-button-rounded p-button-lg bg-white text-blue-800 hover:bg-gray-100"
						@click="$router.push('/login')" />
					<Button
						label="Register"
						icon="pi pi-user-plus"
						class="p-button-rounded p-button-lg p-button-outlined text-white border-white hover:bg-white hover:text-blue-800"
						@click="$router.push('/register')" /> -->
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section class="py-16 bg-white dark:bg-gray-800">
			<div class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-3xl font-medium text-center text-gray-900 dark:text-white mb-12">
					We Offer More Than Just Water
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div
						v-for="feature in features"
						:key="feature.title"
						class="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center">
						<i
							:class="`pi ${feature.icon} text-4xl text-blue-600 dark:text-blue-400 mb-4`" />
						<h3
							class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							{{ feature.title }}
						</h3>
						<p class="text-gray-600 dark:text-gray-300">
							{{ feature.description }}
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="py-16 bg-blue-50 dark:bg-blue-900">
			<div class="container mx-auto px-4 text-center">
				<h2
					class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Ready to Get Started?
				</h2>
				<p
					class="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8">
					Join thousands of satisfied customers managing their water services
					with ease.
				</p>
				<div>Visit our office now for more information.</div>
				<!-- <Button
					label="Create Your Account"
					icon="pi pi-user-plus"
					class="p-button-rounded p-button-lg p-button-success"
					@click="$router.push('/register')" /> -->
			</div>
		</section>

		<!-- Contact Section -->
		<section class="py-16 bg-gray-100 dark:bg-gray-800">
			<div class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
					Get in Touch
				</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
					<div class="text-center">
						<i
							class="pi pi-phone text-4xl text-blue-600 dark:text-blue-400 mb-4" />
						<h3
							class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Hotline
						</h3>
						<p class="text-gray-600 dark:text-gray-300">
							Call us at <strong>1627</strong> for immediate assistance.
						</p>
					</div>
					<div class="text-center">
						<i
							class="pi pi-envelope text-4xl text-blue-600 dark:text-blue-400 mb-4" />
						<h3
							class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Email Support
						</h3>
						<p class="text-gray-600 dark:text-gray-300">
							Reach us at
							<a
								href="mailto:support@mywater.ph"
								class="text-blue-600 dark:text-blue-400 hover:underline"
								>calatravawatersystem@gmail.com</a
							>
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="bg-gray-900 text-white py-8">
			<div class="container mx-auto px-4 text-center">
				<p class="text-sm mb-2">&copy; 2025 MyWater. All rights reserved.</p>
				<div class="flex justify-center gap-4">
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.facebook.com/Calatravawaterworkssystem"
						class="text-gray-400 hover:text-white">
						<i class="pi pi-facebook text-xl" />
					</a>
					<!-- <a
						href="#"
						class="text-gray-400 hover:text-white">
						<i class="pi pi-twitter text-xl" />
					</a>
					<a
						href="#"
						class="text-gray-400 hover:text-white">
						<i class="pi pi-instagram text-xl" />
					</a> -->
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const features = ref([
		{
			title: 'Easy Bill Payments',
			icon: 'pi-credit-card',
			description:
				'Pay your water bills in seconds with GCash, Maya, or bank cards. (coming soon)',
		},
		{
			title: 'Real-Time Usage',
			icon: 'pi-chart-line',
			description: 'Track your water consumption and get tips to save more.',
		},
		{
			title: '24/7 Support',
			icon: 'pi-headphones',
			description: 'Our team is here for you via hotline, email, or live chat.',
		},
	]);
</script>

<style lang="css">
	/* Tailwind utilities are enough, but add custom gradient */
	.bg-gradient-to-r {
		background-image: linear-gradient(to right, var(--tw-gradient-stops));
	}
</style>
