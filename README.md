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


### Postman url
https://www.getpostman.com/collections/31773186f017dfd35be6

Change path in default.jon file, where have to store images in locally
    "path": "/home/ubuntu/images"

### nginx configuration 

For defined path will create one nginx domain ex:(http://img.server.com) to upload and download files

server {
  listen         80;
  server_name    http://img.server.com;
	root /home/ubuntu/images/;
	autoindex off;
	proxy_buffering off;
  location / {
    proxy_pass http://ip;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  # Following is necessary for Websocket support
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    add_header "Cache-Control" "max-age=0, no-cache, no-store, must-revalidate";
    add_header "Pragma" "no-cache";
    add_header "X-Content-Type-Options" "nosniff";
  }
}





