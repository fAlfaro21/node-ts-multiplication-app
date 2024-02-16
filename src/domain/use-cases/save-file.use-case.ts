import fs from 'fs';

export interface SaveFileUseCase{
    execute: ( options: Options ) => boolean;
}

export interface Options {
    fileContent : string;
    fileDestination?: string;
    fileName?   : string;
}

export class SaveFile implements SaveFileUseCase {

    constructor(
        //Dependency Injection o DI
    ){};

    execute({ 
        fileContent, 
        fileDestination = 'outputs', 
        fileName = 'table', 
    }: Options): boolean {

        try {
            //Creamos el directorio
            //Este sería el caso recursivo (recursive: true):
            //const outputPath = `outputs/folder1/folder2/folder3`;
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${ fileName }.txt`, fileContent);
            return true;

        } catch (error) {
            console.error(error); //Ponerlo en Winston para que no cree ruido en nuestro testing
            return false;
        }


    }

}