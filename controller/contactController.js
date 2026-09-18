const Contact = require("../model/contactModel");

// @desc   Create new contact/proposal request
// @route  POST /api/contact
exports.createContact = async (req, res) => {
    try {
        const { fullName, email, phone, service, message } = req.body;

        if (!fullName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const newContact = await Contact.create({
            fullName,
            email,
            phone,
            service,
            message,
        });

        return res.status(201).json({
            success: true,
            message: "Your request has been submitted successfully!",
            data: newContact,
        });
    } catch (error) {
        console.error("Create Contact Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

// @desc   Get all contact requests (admin use)
// @route  GET /api/contact
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        console.error("Get Contacts Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

// @desc   Get single contact by ID
// @route  GET /api/contact/:id
exports.getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        console.error("Get Contact Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

// @desc   Update contact status (admin use)
// @route  PATCH /api/contact/:id
exports.updateContactStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: updatedContact,
        });
    } catch (error) {
        console.error("Update Contact Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};

// @desc   Delete a contact entry (admin use)
// @route  DELETE /api/contact/:id
exports.deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);

        if (!deletedContact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
        });
    } catch (error) {
        console.error("Delete Contact Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
        });
    }
};