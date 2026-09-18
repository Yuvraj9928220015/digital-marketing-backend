const express = require("express");
const router = express.Router();
const {
    createContact,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact,
} = require("../controller/contactController");

router.post("/", createContact);
router.get("/", getAllContacts);
router.get("/:id", getContactById);
router.patch("/:id", updateContactStatus);
router.delete("/:id", deleteContact);

module.exports = router;