import mongoose from 'mongoose';


const apartmentSchema = new mongoose.Schema({
	code: { type: String, required: true, unique: true }, // e.g. AC100
	name: { type: String, required: true },
	address: { type: String },
	type: { type: String },
	owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // property owners
	residents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	agent: { type: mongoose.Schema.Types.ObjectId, ref: 'UnionAgent', required: true }
});

export default mongoose.model('Apartment', apartmentSchema);
