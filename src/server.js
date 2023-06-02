const express = require('express');
const fs = require('fs');
const path = require('path');
const StreamConcat = require('stream-concat');

const app = express();
const port = 3000;

const directori = 'C:/Users/Nerea/Desktop/UF1_ExamenAaD (1)/UF1_ExamenAaD/Imatges';

app.get('/', (req, res) => {
  res.send('Servidor actiu');
});

//--------------- EJ1 ---------------------------------------
app.get('/imatges', (req, res) => {
  fs.readdir(directori, (err, fitxers) => {
    if (err) {
      console.error(err);
      res.status(500).send('S\'ha produït un error en llegir el directori');
      return;
    }

    fitxers.forEach((fitxer) => {
      if (path.extname(fitxer).toLowerCase() === '.jpg') {
        const rutaFitxer1 = path.join(directori, fitxer);
        const readStream = fs.createReadStream(rutaFitxer1);

        readStream.on('data', (data) => {

          console.log(fitxer + ': ' + data.toString('hex'));
        });

        readStream.on('end', () => {
          console.log('Lectura finalitzada per a ' + fitxer);
        });
      }
    });

    res.send('Lectura de fitxers completada');
  });
});


//------------------------- EJ2 -------------------------------------
app.get('/imatgesEJ2', (req, res) => {
  fs.readdir(directori, (err, fitxers) => {
    if (err) {
      console.error(err);
      res.status(500).send('S\'ha produït un error en llegir el directori');
      return;
    }

    fitxers.forEach((fitxer) => {
      if (path.extname(fitxer).toLowerCase() === '.jpg') {
        if (fitxer.charAt(0) === 'a' || fitxer.charAt(0) === 'A') {
          const rutaFitxer = path.join(directori, fitxer);
          const readStream = fs.createReadStream(rutaFitxer);

          readStream.on('data', (data) => {

            console.log(fitxer + ': ' + data.toString('hex'));
          });

          readStream.on('end', () => {
            console.log('Lectura finalitzada per a ' + fitxer);
          });
        } else {
          console.log('AAAAAAAAHH');
        }
      }
    });

    res.send('Lectura de fitxers completada');
  });
});

//------------------------- EJ3 -------------------------------------


const file1Path = 'C:/Users/Nerea/Desktop/UF1_ExamenAaD (1)/UF1_ExamenAaD/Documents/FitxerOrigen.txt';
const file2Path = 'C:/Users/Nerea/Desktop/UF1_ExamenAaD (1)/UF1_ExamenAaD/Documents/Nerea.txt';
const outputFilePath = 'C:/Users/Nerea/Desktop/UF1_ExamenAaD (1)/UF1_ExamenAaD/Documents/FitxerDesti.txt';

// Crea las instancias de los streams de lectura para los archivos
const file1Stream = fs.createReadStream(file1Path);
const file2Stream = fs.createReadStream(file2Path);

// Crea el stream concatenado para unir los contenidos de los archivos
const concatStream = new StreamConcat([file1Stream, file2Stream]);

// Crea el stream de escritura para el archivo de salida
const outputStream = fs.createWriteStream(outputFilePath, { flags: 'a' }); // 'a' para añadir contenido al archivo existente

// Manejo de eventos para finalización y errores
concatStream.on('end', () => {
  console.log('Contenidos de los archivos concatenados y escritos en el archivo 3.');
});

concatStream.on('error', (err) => {
  console.error('Error al concatenar los archivos:', err);
});

outputStream.on('finish', () => {
  console.log('Escritura del archivo 3 completada.');
});

outputStream.on('error', (err) => {
  console.error('Error al escribir en el archivo 3:', err);
});

// Comprobar si el archivo de salida existe
if (!fs.existsSync(outputFilePath)) {
  // El archivo no existe, crearlo
  fs.writeFileSync(outputFilePath, '', { flag: 'wx' });
}

// Pipe el stream concatenado al stream de escritura
concatStream.pipe(outputStream);


//-------------------------------- EJ4 ----------------------------

const carpeta = 'C:/Users/Nerea/Desktop/UF1_ExamenAaD (1)/UF1_ExamenAaD/Documents/UF1_REC_Nerea_Torralba';
const fitxer = 'RecuNereaTorralba.txt';
const dni = '16725434L';
const rutaFitxer = path.join(carpeta, fitxer);

// Comprobar si la carpeta existe
if (!fs.existsSync(carpeta)) {
  // La carpeta no existe, crearla
  fs.mkdirSync(carpeta, { recursive: true });
}

// Comprobar si el archivo existe
if (fs.existsSync(rutaFitxer)) {
  console.log('Ja existeix pallús');
} else {
  // El archivo no existe, crearlo y escribir el DNI
  fs.writeFileSync(rutaFitxer, dni);

  console.log('Fitxer creat satisfactòriament');
}

// Mostrar todos los archivos existentes en la carpeta UF1_REC_Nerea_Torralba
fs.readdir(carpeta, (err, fitxers) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log('Fitxers existents a la carpeta UF1_REC_Nerea_Torralba:');
  fitxers.forEach((fitxer) => {
    console.log(fitxer);
  });
});







app.listen(port, () => {
  console.log('El servidor està escoltant en el port', port);
});
