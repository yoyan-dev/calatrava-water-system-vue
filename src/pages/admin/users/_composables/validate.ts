import type { User } from '@/types/user';

interface ValidationResult {
	error: boolean;
	errorAccountNumberMessage?: string;
	errorEmailMessage?: string;
	errorDisplayNameMessage?: string;
	errorPasswordMessage?: string;
	errorFullnameMessage?: string;
	errorBookMessage?: string;
	// Add more as needed
}

export function validateForm(data: User): ValidationResult {
	const errors: ValidationResult = { error: false };

	if ('accountNumber' in data && !data.accountNumber) {
		errors.error = true;
		errors.errorAccountNumberMessage = 'Account Number is required.';
	}

	if ('email' in data) {
		if (!data.email) {
			errors.error = true;
			errors.errorEmailMessage = 'Email is required.';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
			errors.error = true;
			errors.errorEmailMessage = 'Email is invalid.';
		}
	}

	if ('displayName' in data && !data.displayName) {
		errors.error = true;
		errors.errorDisplayNameMessage = 'Display Name is required.';
	}

	if ('password' in data && !data.password) {
		errors.error = true;
		errors.errorPasswordMessage = 'Password is required.';
	} else if ('password' in data && data.password && data.password.length < 6) {
		errors.error = true;
		errors.errorPasswordMessage = 'Password must be at least 6 characters.';
	}

	if ('fullname' in data && !data.fullname) {
		errors.error = true;
		errors.errorFullnameMessage = 'Fullname is required.';
	}

	if ('book' in data && !data.book) {
		errors.error = true;
		errors.errorBookMessage = 'Book is required.';
	}

	return errors;
}
