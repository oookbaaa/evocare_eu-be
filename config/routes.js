const express = require('express');
const router = express.Router();

router.use('/file', require('../files_management/fileUpload'));
router.use('/common', require('../app/common/routes'));
router.use('/contents', require('../app/contents/routes'));
router.use('/media', require('../app/media/routes'));
router.use('/products', require('../app/products/routes'));
router.use('/solutions', require('../app/solutions/routes'));
router.use('/teams', require('../app/teams/routes'));
router.use('/partners', require('../app/partners/routes'));
router.use('/references', require('../app/references/routes'));
router.use('/events', require('../app/events/routes'));
router.use('/services', require('../app/services/routes'));
router.use('/news', require('../app/news/routes'));

module.exports = router;
