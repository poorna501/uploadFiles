/**
 *
 * @Description Multer File Upload Module
 * @Author Faid Mohammad
 *
 */
 const multer = require('multer');
 const md5 = require('md5');
 const uniqueSlug = require('unique-slug')
 const config = require('config')
 
 const storage = multer.diskStorage({
     destination: config.get('temp'),
     filename: function (_req, file, cb) {
         const fileFormat = (file.originalname).split(".");
         let fileExtension = fileFormat[fileFormat.length - 1]
         if (fileExtension == 'blob') {
             fileExtension = 'aac'
         }
         const fileName = md5(uniqueSlug()) + "." + fileExtension
         cb(null, fileName);
     }
 });
 const upload = multer({storage});
 module.exports = upload;