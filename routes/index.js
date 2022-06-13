const express = require('express')
, router = express.Router()
, upload = require('../libs/fileupload')
, config = require('config')
, fs = require('fs')
,  path = require('path')
, _ = require('lodash')


router.get('/sample', function (_req, res, _next) {
  res.send('Server is up..!')
})

router.post('/upload', upload.array('filename'), function (req, res, _next) {
  //  Define Constants
  let uploadPath = ''
      , uploadtype = 'mis'
      , uploadArr = [];

  if(req.files && req.files.length) {
    //  Set the upload type if its provided from request body
    if(req.body.uploadtype && req.body.uploadtype != null) {
      uploadtype = req.body.uploadtype;
    }
    //  Set the upload path
    uploadPath = path.join(config.get('path'),uploadtype);
    //  Loop through each file and construct the uploadArr
    _.map(req.files,function(v, _k){
      //  Define globals
      let oldFilePath = v.path
        , fileName = v.filename
        , originalname = v.originalname
        , newFilePath = path.join(uploadPath,fileName)
        , url = '';

      fs.rename(oldFilePath, newFilePath, function (err) {
        if (err) throw err
      })
      url = config.get('baseUrl') + uploadtype + '/' + fileName;

      uploadArr.push({
        filename: originalname,
        url,
        //localpath: config.get('path') +'/'+ uploadtype + '/' + fileName,
        url_path: config.url_path+"imgDownload/"+ uploadtype+"/"+fileName

      })
    })
    return res.json({status: 'success', data: uploadArr})   
  } else {
    return res.json({status: 'failed',data: null})
  }
})

// For download images
router.get('/imgDownload/:uploadtype/:img_id', function (req, res) {
  if (req.params) {
    let img_path = ""
    if (req.params.uploadtype) {
      img_path = req.params.uploadtype + "/";
    }
    if (req.params.img_id) {
      img_path = img_path +"/"+req.params.img_id;
    }
    img_path = config.get('path') +"/"+ img_path;
    console.log(img_path)
    res.download(img_path)
  } else {
    let obj = {
      status: 1001, 
      message: "Error in downloading image."
    };
    res.send(obj);
  }
});

//imade details
router.post('/img_details', function (req, res) {
  if (req && req.body && req.body.id) {
    let url = config.get("path") + "/mis/"+ req.body.id;
    fs.readFile(url, function(err, data) {
      if (err) {
        res.json({
          status: 1000,
          message: "success",
          data: err,
        })
      } else {
        res.json({
          status: 1000,
          message: "success",
          data: data,
        })
      }
    });
  } else {
    res.json({
      status: 1000,
      message: "error while getting image details",
    })
  }
});




module.exports = router
