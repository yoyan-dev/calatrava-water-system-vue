import { defineStore } from 'pinia';
import { announcementRepository } from '@/repositories/v2/announcementRepository';
import { ref as vueRef } from 'vue';
import type { Announcement } from '@/types/announcement';
import { auth } from '@/plugins/firebase';
import { fileToURL } from '@/composables/fileToURL';

export const useAnnouncementStore = defineStore('announcement', () => {
	const announcements = vueRef<Announcement[]>([]);

	const fetchAnnouncements = async (filters?: {
		status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null;
	}) => {
		const data = await announcementRepository.getAll(filters);
		announcements.value = data;
	};

	const createAnnouncement = async (
		data: Partial<Announcement> & { imageFile?: File | null },
	) => {
		if (auth.currentUser) data.createdBy = auth.currentUser.uid;
		else return;
		const result = await announcementRepository.create(data);
		announcements.value.unshift(result);
	};

	const updateAnnouncement = async (
		id: string,
		data: Partial<Announcement> & { imageFile?: File | null },
	) => {
		await announcementRepository.update(id, data);
		const index = announcements.value.findIndex((item) => item.id === id);
		if (data.imageFile) {
			data.imageUrl = fileToURL(data.imageFile);
			delete data.imageFile;
		}
		if (index > -1) Object.assign(announcements.value[index], data);
	};

	const deleteAnnouncement = async (id: string) => {
		await announcementRepository.delete(id);

		// Instantly remove from local state — no extra read!
		announcements.value = announcements.value.filter((ann) => ann.id !== id);
	};

	const archiveAnnouncement = async (id: string) => {
		await announcementRepository.archive(id);

		// Update local state: change status to ARCHIVED
		const index = announcements.value.findIndex((ann) => ann.id === id);
		if (index !== -1) {
			announcements.value[index].status = 'ARCHIVED';
			// Optional: force reactivity (Vue 3 usually handles this, but safe)
			announcements.value = [...announcements.value];
		}
	};

	const getAnnouncementById = async (id: string) => {
		return await announcementRepository.getById(id);
	};

	return {
		announcements,

		createAnnouncement,
		updateAnnouncement,
		deleteAnnouncement,
		archiveAnnouncement,
		getAnnouncementById,
		fetchAnnouncements,
	};
});
