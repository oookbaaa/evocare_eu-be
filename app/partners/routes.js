const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
  partnerValidationRules,
  partnerIdValidationRules,
  partnerFilterValidationRules,
} = require('../../middleware/partners');


// Partners routes
router.get(
  '/',
  partnerFilterValidationRules,
  controller.getAllPartners
);
router.get(
  '/:id',
  partnerIdValidationRules,
  controller.getPartnerById
);
router.post(
  '/',
  partnerValidationRules,
  controller.createPartner
);
router.put(
  '/:id',
  partnerIdValidationRules,
  partnerValidationRules,
  controller.updatePartner
);
router.delete(
  '/:id',
  partnerIdValidationRules,
  controller.deletePartner
);

module.exports = router;
