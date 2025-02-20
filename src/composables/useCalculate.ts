export default function useCalculate() {
	function calculateWaterBill(usage: number) {
		// Define tiered rates
		const tiers = [
			{ min: 0, max: 10, rate: 75, fixed: true }, // Fixed price for 0-10 m³
			{ min: 11, max: 20, rate: 12 }, // ₱12 per m³ for 11-20 m³
			{ min: 21, max: 30, rate: 13.5 }, // ₱13.5 per m³ for 21-30 m³
			{ min: 31, max: 40, rate: 15 }, // ₱15 per m³ for 31-40 m³
			{ min: 41, max: 50, rate: 16.5 }, // ₱16.5 per m³ for 41-50 m³
			{ min: 51, max: Infinity, rate: 18 }, // ₱18 per m³ for 51+ m³
		];

		let totalBill = 0;

		// Loop through each tier and calculate the cost
		for (const tier of tiers) {
			if (usage <= 0) break;

			if (tier.fixed) {
				totalBill += tier.rate; // Fixed charge for 0-10 m³
			} else {
				let cubicMeters = Math.min(usage, tier.max - tier.min + 1);
				totalBill += cubicMeters * tier.rate;
			}

			usage -= tier.max - tier.min + 1;
		}

		// Calculate environmental fee (25% of water charge)
		let environmentalFee = totalBill * 0.25;
		let totalAmount = totalBill + environmentalFee;

		return {
			waterCharge: totalBill.toFixed(2),
			environmentalFee: environmentalFee.toFixed(2),
			totalBill: totalAmount.toFixed(2),
		};
	}
	return {
		calculateWaterBill,
	};
}
