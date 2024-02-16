import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions {
    base     : number;
    limit    : number;
    showTable: boolean;
    fileName : string;
    fileDestination: string;
}

//Esta clase me va a sirvir para mantener estructurada la lógica de mi servidor 
//Va a orquestar como va a funcionar nuestra aplicación de entrada
export class ServerApp {

    static run( { base, limit, showTable, fileDestination, fileName }: RunOptions ){
        console.log('Server running...');
        //1. Fabricamos el contenido de la tabla
        const table = new CreateTable().execute({ base, limit });

        //2. Creamos directorio y guardamos el archivo con el contenido de la tabla
        const wasCreated = new SaveFile()
            .execute({ 
                fileContent: table, 
                fileDestination,
                fileName
            });

        if( showTable ) console.log(table);

        ( wasCreated ) 
            ? console.log('File created!')
            : console.error('File not created');

        
    }

}