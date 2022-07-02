const express = require("express");
const cluster = require("cluster");
const os = require("os");
const apiErrorHandler = require("./error/apiErrorHandler");
const { uploadController } = require("./controllers/uploadController");
const { upload } = require("./multerConfig/multerConfig");
const path = require("path");

const port = process.env.port || 5000;

console.log('working')

const app = express();

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}


app.use(express.json());

const use = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);


app.post("/upload/:uuid", upload.array("files", 100), use(uploadController));

app.use(apiErrorHandler);

if(cluster.isMaster) {
  const NumberOfWorkers = os.cpus().length;
  for(let i = 0; i < NumberOfWorkers; i++){
    cluster.fork();
  }
}
else {
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
}


