const express = require("express");
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    deleteService,
} = require("../controller/serviceController");

router.post("/", createService);
router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.delete("/:id", deleteService);

module.exports = router;