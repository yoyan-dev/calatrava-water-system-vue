// src/utils/logger.ts

import { logger } from 'firebase-functions';

/**
 * Wrapper around Firebase logger with consistent formatting
 * Makes it easy to change or extend logging later
 */

export const log = {
	info: (message: string, data?: any) => {
		logger.info(message, data);
	},

	warn: (message: string, data?: any) => {
		logger.warn(message, data);
	},

	error: (message: string, data?: any) => {
		logger.error(message, data);
	},

	debug: (message: string, data?: any) => {
		logger.debug(message, data);
	},
};
