import express from 'express';
import helmet from 'helmet';
import crypto from 'crypto';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import sanitize from 'sanitize-filename';
import mmm from 'mmmagic';

const magic = new mmm.Magic(mmm.MAGIC_MIME_TYPE);

const mongoose = require('mongoose');
mongoose.connect('mongodb://root:example@172.17.0.1:27017/admin', {useNewUrlParser: true}).then((res) => {
  console.log('Connected to DB.');
}, (err) => {
  throw Error(err);
});

const escapeRegex = (str) => {
  const rule = /[|\\{}()[\]^$+*?.]/g;
	return str.replace(rule, '\\$&');
};

const FileSchema = mongoose.Schema({
  name: String,
  hash: String,
  path: String,
  size: Number
});

const File = mongoose.model('File', FileSchema);

const PORT = 8080;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const sanitized = sanitize(file.originalname);
    const name = crypto.createHash('md5').update(`${sanitized}${Date.now()}`).digest('hex');
    cb(null, name);
  }
});

let upload = multer({
  storage,
  limits: {
    fieldNameSize: 255,
    fileSize: 10*1000*1000,
    files: 1,
    fields: 1
  }
});

let app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
  }
}));
app.use(helmet.permittedCrossDomainPolicies({ permittedPolicies: 'none' }));
app.use(helmet.noCache());
app.use(helmet.referrerPolicy({policy: 'no-referrer'}))

app.get('/v1/documents', (req, res) => {
  let condition = {};

  if (req.query.name) {
    const regex = new RegExp(escapeRegex(req.query.name), 'i');

    condition = {
      name: regex
    };
  }

  File.find(condition).select({"name": 1, "size": 1}).exec((err, docs) => {
    if (err) {
      return res.status(400).send();
    }

    res.status(200).json(docs);
  });
});

app.post('/v1/documents', upload.single('file'), (req, res) => {
  const {originalname, filename, path, size} = req.file;

  const payload = new File({
    name: sanitize(originalname),
    hash: filename,
    path: path,
    size: size
  });

  magic.detectFile(path, function(err, result) {
      if (err) {
        res.status(400).send();
        return;
      }

      if (result !== 'image/jpeg' && result !== 'image/png') {
        fs.unlink(path, () => {});
        res.status(400).send();
        return;
      }

      payload.save().then(document => {
        res.status(201).json({
          _id: document._id,
          name: document.name,
          size: document.size
        });
      }, () => {
        res.status(400).send();
        fs.unlink(`public/uploads/${filename}`, () => {});
      });
  });
});

app.delete('/v1/documents/:id', (req, res) => {
  File.findByIdAndRemove(req.params.id, (err, file) => {
    if (err) {
      return res.status(400).send();
    }

    const response = {
      id: file._id
    };

    res.status(200).send(response);
    fs.unlink(`public/uploads/${file.hash}`, () => {});
  });
});

// disallow endpoint enumeration
app.all('*', (req, res) => {
  // add random timer
  res.status(400).send();
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`> Ready on http://localhost:${PORT}`);
});
