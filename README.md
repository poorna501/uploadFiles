# uploadFiles Service

File upload service, which support multi/single file uploading option.

# Included Packages
  - [multer][multer_link]
  - [lodash][lodash_link]
  - [unique-slug][unique_slug_link]
  - [md5][md5_link]

### Installation

UploadFile Serivce requires [Node.js](https://nodejs.org/) v4+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ cd fileupload
$ npm install -d  or yarn
$ npm start
```

[lodash_link]: <https://www.npmjs.com/package/lodash>
[multer_link]: <https://www.npmjs.com/package/multer>
[unique_slug_link]: <https://www.npmjs.com/package/unique-slug>
[md5_link]: <https://www.npmjs.com/package/md5>



Routes 
http://localhost:3000/upload

req: {
    body: {
        uploadtype:'mis'
    },
    files: [
        {
            destination:'temp_path',
            encoding:'7bit',
            fieldname:'filename',
            filename:'d1ec5926e727621204c3098bdf1b0f7f.png',
            mimetype:'image/png',
            originalname:'web banner.png',
            path:'temp_path/d1ec5926e727621204c3098bdf1b0f7f.png'
        }
    ]
}
response
--------------
{
    "status": "success",
    "data": [
        {
            "filename": "web banner.png",
            "localpath": "/home/ubuntu/images/mis/d1ec5926e727621204c3098bdf1b0f7f.png",
            "url": "http://img.server.com/mis/d1ec5926e727621204c3098bdf1b0f7f.png",
        }
    ]
}