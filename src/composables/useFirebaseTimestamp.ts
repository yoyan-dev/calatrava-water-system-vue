import { format } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

export default function useFirebaseTimestamp() {
	function formatTimestamp(
		timestamp: Timestamp,
		formatString = 'MMM dd, yyyy',
	) {
		if (!timestamp) return '';

		const date =
			timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);

		return format(date, formatString);
	}

	return { formatTimestamp };
}
