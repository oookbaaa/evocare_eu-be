const express = require("express");
const router = express.Router();

router.use("/file", require("../files_management/fileUpload"));
router.use("/common", require("../app/common/routes"));

module.exports = router;
