// fileUpload.js
const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const { executeQuery } = require("../config/database");
const router = express.Router();

// Middleware setup for file upload
router.use(fileUpload());

// Route to handle single file upload
router.post('/upload/:directory', auth, async (req, res) => {
    const directory = req.params.directory;
    const baseUrl = process.env.BASE_URL;
    
    if (!baseUrl) {
        return res.status(500).json({ error: 'BASE_URL not configured in environment' });
    }

    if (!req.files || !req.files.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const { hotelId } = req.body;
    
    if (!hotelId) {
        return res.status(400).json({ error: 'hotelId is required' });
    }
    const file = req.files.file;
    const fileExt = path.extname(file.name).toLowerCase();
    const isImage = ['.jpg', '.jpeg', '.png'].includes(fileExt);
    const isVideo = ['.mp4', '.mov', '.avi'].includes(fileExt);

    if (!isImage && !isVideo) {
        return res.status(400).json({ error: 'Invalid file type' });
    }

    if ((isImage && file.size > 200 * 1024) || (isVideo && file.size > 20 * 1024 * 1024)) {
        return res.status(400).json({ error: 'File size exceeds limit' });
    }

    const uploadPath = path.join(__dirname, '../uploads', directory);

    try {
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        const filePath = path.join(uploadPath, file.name);
        await file.mv(filePath);
        const fileUrl = `${baseUrl}/uploads/${directory}/${file.name}`;    
        const fileType = isImage ? "image" : "video";
        if (parseInt(hotelId) === 0) {
            return res.status(200).json({ url: fileUrl, type: fileType, message: "File uploaded but not linked to any hotel." });
        }
        const query = `
        INSERT INTO media (id_hotel, type, url, titre, ordre, categorie, date_debut_affichage, date_fin_affichage, date_debut_sejour, date_fin_sejour) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const currentDate = new Date().toISOString().split('T')[0];
        const oneYearLater = new Date();
        oneYearLater.setFullYear(new Date().getFullYear() + 1);
        const dateFin = oneYearLater.toISOString().split('T')[0];
        await executeQuery(query, [hotelId, fileType, fileUrl, '', 0, null, currentDate, dateFin, currentDate, dateFin]);
        res.status(200).json({ url: fileUrl, type: fileType});
    } catch (error) {
        console.error('File upload error:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

router.delete('/mediaFile', auth, async (req, res) => {
    const { url, hotelId, directory } = req.body;
    if (!url || !directory) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        // Extract file name from URL
        const fileName = path.basename(url);
        const filePath = path.join(__dirname, '../uploads', directory, fileName);

        // Check if the file exists and delete it
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        } else {
            console.warn(`File not found: ${filePath}`);
        }

        // Delete from database
        const deleteQuery = `DELETE FROM media WHERE url = ?`;
        await executeQuery(deleteQuery, [url, hotelId]);

        res.status(200).json({ message: 'Media deleted successfully' });
    } catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({ error: 'Failed to delete media' });
    }
});


module.exports = router;



