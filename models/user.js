import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, },
    lastName: { type: String, },
    paystack_ref: { type: String, },
    amountDonated: { type: Number, },
    isSubscribed: { type: Boolean, },
    planName: { type: String, },
    timeSubscribed: { type: Date, },
});

const USER = mongoose.model('user', userSchema);

export default USER;