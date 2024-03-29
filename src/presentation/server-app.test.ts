import { create } from 'domain';
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { ServerApp } from './server-app';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

describe('Server App', () => {

    const options = {
        base     : 2,
        limit    : 10,
        showTable: false,
        fileDestination: 'test-destination',
        fileName : 'test-fileName',
    };

    beforeEach( () => {
        jest.clearAllMocks();
    })

    test('should create ServerApp instance', () => {

        //Con esta prueba me aseguro de que el método serverApp simpre esté presente
        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf( ServerApp );
        expect( typeof ServerApp.run ).toBe( 'function' );

    });

    //Con esta prueba verficamos que cada uno de los pasos en ServerApp.run se hayan ejecutado correctamente
    test('should run ServerApp with options', () => {

        //Para espiar los logs, para simular las llamadas (sin ejecutar las llamadas)
        const logSpy = jest.spyOn(console, 'log');
        //El prototype nos dice cual es el ADn de nuestra clase
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect( logSpy ).toHaveBeenCalledTimes( 2 );
        expect( logSpy ).toHaveBeenCalledWith( 'Server running...' );
        expect( logSpy ).toHaveBeenLastCalledWith( 'File created!' );

        expect( createTableSpy ).toHaveBeenCalledTimes(1);
        expect( createTableSpy ).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });

        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });

    });

    test('should run with custom values mocked', () => {

        //Preparo mis funciones mock
        const logMock = jest.fn(); //es igual a jest.spyOn(console, 'log'). Pero tal como lo estamos haciendo, luego es más fácil limpiarlos con un jest.clearAllMocks();
        const logErrorMock = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2'); //Nos aseguramos de que devuelva un valor para que pueda ser utilizado por el mock siguiente
        const saveFileMock = jest.fn().mockReturnValue(false);//Simulamos que el archivo se crea exitosamente
        //Aquí modificamos nuestros métodos:
        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);

        expect( logMock ).toHaveBeenCalledWith( 'Server running...' );
        expect( createMock).toHaveBeenCalledWith({ "base": options.base, "limit": options.limit });
        expect( saveFileMock ).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileDestination: options.fileDestination,
            fileName: options.fileName,
        });
        //expect( logMock ).toHaveBeenCalledWith('File created!');
        expect( logErrorMock ).not.toBeCalledWith();


    });
})