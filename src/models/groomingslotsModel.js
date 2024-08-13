const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimeSchema = new Schema({
    time: String,
    available: {
        type: Boolean,
        default: true
    }
});

const SlotSchema = new Schema({
    day: Number,
    dayname:String,
    available: {
        type: Boolean,
        default: true
    },
    time:[TimeSchema]
});


const MonthlySlotSchema = new Schema({
    month: String,
    year: Number,
    slots: [SlotSchema]
});


const GroomingSlotsSchema = new Schema({
    district: String,
    fee:Number,
    monthlyslots: [MonthlySlotSchema]
});


const GroomingSlots = mongoose.models.GroomingSlots || mongoose.model('GroomingSlots', GroomingSlotsSchema);

module.exports = GroomingSlots;
