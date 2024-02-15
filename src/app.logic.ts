import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";

const { b:base, l:limit, s:showTable } = yarg;
let outputMessage = '';
const headerMessage = `
===============================
        Tabla del ${ base }
===============================\n
`;

for(let i = 1; i <= limit; i++) {
    outputMessage += `${ base } x ${ i } = ${ base * i }\n`;
};

outputMessage = headerMessage + outputMessage;

if( showTable ){
    console.log(outputMessage);
};

//Graba el arcivo de salida en el path: outputs/tabla-5.txt con el contenido de outputMessage
//1. Preparamos la raíz del path en el que queremos dejar el fichero
const outputPath = `outputs`;
//Este sería el caso recursivo:
//const outputPath = `outputs/folder1/folder2/folder3`;

//Creamos el directorio
fs.mkdirSync(outputPath, { recursive: true });

//Escribimos el fichero en el path
fs.writeFileSync(`${outputPath}/tabla-${ base }.txt`, outputMessage);
console.log('File created!');

