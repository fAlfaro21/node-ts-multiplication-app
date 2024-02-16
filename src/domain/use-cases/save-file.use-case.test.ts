import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('save-file.use-case', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'customm-outputs/file-destination',
        fileName: 'custom-table-name',
    };

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    //No funciona para los spy's con mockimplementation
    /* beforeEach( () => {
        jest.clearAllMocks();
    }) */

    afterEach(() => {
        //Para borrar de manera recursiva los outputs
        const outputFolderExists = fs.existsSync('outputs');
        if( outputFolderExists ) fs.rmSync('outputs', { recursive: true });
        
        const customOutputFolderExists = fs.existsSync(customOptions.fileDestination);
        if( customOutputFolderExists ) fs.rmSync(customOptions.fileDestination, { recursive: true });

    });
    
    test('Should save file with default values', () => {
        
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        const options = {
            fileContent : 'test content',
        }
        
        const result = saveFile.execute( options );
        //Para verificar que efectivamente el fichero existe en el destino/nombre por defecto
        const fileExists = fs.existsSync(filePath);
        //Para verificar que el contenido existe
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( options.fileContent );
    });

    test('Should save file with custom values', () => {
        
        const saveFile = new SaveFile();
        
        const result = saveFile.execute( customOptions );
        const fileExists = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf8' });

        expect( result ).toBeTruthy();
        expect( fileExists ).toBeTruthy();
        expect( fileContent ).toBe( customOptions.fileContent );

    });

    test('Should return false if directory could not be created', () => {
        
        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            //Sobreescribimos la respuesta del mkdirSync
            () => { throw new Error('This is a custom error message from testing');}
        );
        
        const result = saveFile.execute( customOptions );

        expect( result ).toBeFalsy();

        mkdirSpy.mockRestore();

    });

    test('Should return false if file could not be created', () => {
        
        const saveFile = new SaveFile();
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            //Sobreescribimos la respuesta del mkdirSync
            () => { throw new Error('This is a custom writing error message');}
        );
        
        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBeFalsy();

        writeFileSpy.mockRestore();

    });

})