import mongoose from "mongoose";

const courtSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        location: { type: String, default: "Heliopolis, Cairo, Egypt", trim: true },

        pricePerHour: {
            type: Number,
            default: 300,
<<<<<<< HEAD
            min: 0,
            max: 100000
=======
            min: 0
>>>>>>> 906d52d (Implement authentication and authorization)
        },

        description: {
            type: String,
            default: ""
        },

        image: {
            type: String,
            default: ""
        },

        status: { type: String, enum: ["active", "maintenance"], default: "active" }
    },
    {
        timestamps: true
    }
);

export default mongoose.model("Court", courtSchema);
