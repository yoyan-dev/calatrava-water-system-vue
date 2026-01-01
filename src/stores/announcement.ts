import { defineStore } from 'pinia';
import { announcementRepository } from '@/repositories/v2/announcementRepository';
import { ref } from 'vue';
import type { Announcement } from '@/types/announcement';
import { auth } from '@/plugins/firebase';

export const useAnnouncementStore = defineStore('announcement', () => {
	const announcements = ref<Announcement[]>([]);

	const fetchAnnouncements = async (filters?: {
		status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | null;
	}) => {
		const data = await announcementRepository.getAll(filters);
		announcements.value = data;
	};

	const createAnnouncement = async (data: Partial<Announcement>) => {
		if (auth.currentUser) data.createdBy = auth.currentUser.uid;
		else return;
		const result = await announcementRepository.create(data);
		announcements.value.unshift(result);
	};

	const updateAnnouncement = async (
		id: string,
		data: Partial<Announcement>,
	) => {
		await announcementRepository.update(id, data);
		const index = announcements.value.findIndex((item) => item.id === id);
		if (index > -1) Object.assign(announcements.value[index], data);
	};

	const deleteAnnouncement = async (id: string) => {
		return await announcementRepository.delete(id);
	};

	const archiveAnnouncement = async (id: string) => {
		return await announcementRepository.archive(id);
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
