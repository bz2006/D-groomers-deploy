import { mongoose } from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true

    },
    bookings: {
        type: Number,
        default: 0,
    },
    pets: [{
        petname: {
            type: String,
        },
        dob: {
            type: String,
        },
        breed: {
            type: String,
        },
        image:{
            type:String
        }

    }],
    addresses: [{
        name: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        },
        pin: {
            type: Number
        },
        phone: {
            type: Number
        }

    }],
    defaddress: {
        type: String,
    },
    role: {
        type: Number,
        default: 0,
    },
    date: {
        type: String,
    },

},
    { timestamps: true }
);

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;