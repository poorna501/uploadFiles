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
        localpath: config.get('path') +'/'+ uploadtype + '/' + fileName
      })
    })
    return res.json({status: 'success', data: uploadArr})   
  } else {
    return res.json({status: 'failed',data: null})
  }
})

router.post('/', upload.array('filename'), function (req, res, _next) {
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
        filename:originalname,
        url
      })
    })
    return res.json({status: 'success', data: uploadArr})   
  } else {
    return res.json({status: 'failed', data: null})
  }
})

module.exports = router
