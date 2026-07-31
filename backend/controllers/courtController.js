import Court from "../models/Court.js";

// Create Court (Admin)
export const createCourt = async (req, res) => {
    try {
        const { name, location, pricePerHour, description, image } = req.body;

        if (!name || !location || !pricePerHour) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        const court = await Court.create({
            name,
            location,
            pricePerHour,
            description,
            image
        });

        res.status(201).json({
            message: "Court created successfully.",
            court
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Courts
export const getCourts = async (req, res) => {
    try {
        const courts = await Court.find();

        res.status(200).json(courts);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Court By ID
export const getCourtById = async (req, res) => {
    try {
        const court = await Court.findById(req.params.id);

        if (!court) {
            return res.status(404).json({
                message: "Court not found."
            });
        }

        res.status(200).json(court);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Court (Admin)
export const updateCourt = async (req, res) => {
    try {
        const court = await Court.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!court) {
            return res.status(404).json({
                message: "Court not found."
            });
        }

        res.status(200).json({
            message: "Court updated successfully.",
            court
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Court (Admin)
export const deleteCourt = async (req, res) => {
    try {
        const court = await Court.findByIdAndDelete(req.params.id);

        if (!court) {
            return res.status(404).json({
                message: "Court not found."
            });
        }

        res.status(200).json({
            message: "Court deleted successfully."
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};