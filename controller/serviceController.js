const Service = require("../model/serviceModel");

exports.createService = async (req, res) => {
    try {
        const { title, desc, icon, href, order } = req.body;

        if (!title || !desc || !icon) {
            return res.status(400).json({
                success: false,
                message: "title, desc and icon are required",
            });
        }

        const newService = await Service.create({ title, desc, icon, href, order });

        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: newService,
        });
    } catch (error) {
        console.error("createService error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating the service",
        });
    }
};

exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ order: 1 });

        return res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });
    } catch (error) {
        console.error("getAllServices error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch services",
        });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return res.status(200).json({ success: true, data: service });
    } catch (error) {
        console.error("getServiceById error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch service",
        });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const deleted = await Service.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        console.error("deleteService error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete service",
        });
    }
};