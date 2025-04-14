const express = require('express');
const router = express.Router();
const controller = require('./controller');
const {
  teamMemberValidationRules,
  teamMemberIdValidationRules,
  teamMemberFilterValidationRules,
  departmentValidationRules,
  departmentIdValidationRules,
} = require('../../middleware/teams');

// Complete Team Data route
router.get('/complete', controller.getCompleteTeamData);

// Team Section routes
router.get('/section', controller.getTeamSection);
router.post(
  '/section',
  controller.createTeamSection
);
router.put(
  '/section/:id',
  departmentIdValidationRules,
  controller.updateTeamSection
);

// Team Members routes
router.get(
  '/members',
  teamMemberFilterValidationRules,
  controller.getAllTeamMembers
);
router.get(
  '/members/:id',
  teamMemberIdValidationRules,
  controller.getTeamMemberById
);
router.post(
  '/members',
  teamMemberValidationRules,
  controller.createTeamMember
);
router.put(
  '/members/:id',
  teamMemberIdValidationRules,
  teamMemberValidationRules,
  controller.updateTeamMember
);
router.delete(
  '/members/:id',
  teamMemberIdValidationRules,
  controller.deleteTeamMember
);

// Team Gallery routes
router.get('/gallery', controller.getAllGalleryImages);
router.get(
  '/gallery/:id',
  departmentIdValidationRules,
  controller.getGalleryImageById
);
router.post(
  '/gallery',
  controller.createGalleryImage
);
router.put(
  '/gallery/:id',
  departmentIdValidationRules,
  controller.updateGalleryImage
);
router.delete(
  '/gallery/:id',
  departmentIdValidationRules,
  controller.deleteGalleryImage
);

module.exports = router;
