const FILE_UPLOAD_PATH_LOCAL = "./uploads";

const FileUpload = require('multer')({ dest: FILE_UPLOAD_PATH_LOCAL });


const router = require('express').Router();

router.post('/upload', FileUpload.single('name'), (req, res, next)=>{
    console.log(req.file);
    res.end(' success file upload');
});
