export type QuestionType =
	| 'TEXT'
	| 'RADIO'
	| 'CHECKBOX'
	| 'RATING'
	| 'NPS'
	| 'YESNO';

export interface Question {
	id: string;
	type: QuestionType;
	label: string;
	options?: string[];
	required: boolean;
	order: number;
}

export interface Survey {
	id: string;
	title: string;
	description?: string;
	status: 'DRAFT' | 'PUBLISHED' | 'CLOSED';
	questions: Question[];
	responsesCount: number;
	createdAt?: Date;
	publishedAt?: Date;
}
