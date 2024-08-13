import mongoose from 'mongoose';

const packageSchema = new mongoose.Schema({
    packagename: {
        type: String,
    },
    packagedes: {
        type: String,
    },
    services: [{
        type: String
    }],
    charge: {
        type: Number,
    },
    pid: {
        type: String
    }
});

const groomingPackagesSchema = new mongoose.Schema({
    puppy: [packageSchema],
    teenage: [packageSchema],
    adult: [packageSchema],
});

const breedsSchema = new mongoose.Schema({
    breedname: {
        type: String,
        default: 'Golden Retriever'
    },
    img: {
        type: String,
        default:""
    },
    groomingPackages: groomingPackagesSchema
});

const Breeds = mongoose.models.breeds || mongoose.model('breeds', breedsSchema);

export default Breeds;


