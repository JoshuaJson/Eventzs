import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../excel/uploads/')); // Carpeta donde se almacenan los CSV
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '.csv'); // Nombre del archivo con la fecha actual
  }
});

export const upload = multer({ storage });