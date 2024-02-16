import { ServerApp } from './presentation/server-app';


describe('TEst App.ts', () => {

    test('Should call Server.run with given values', async() => {
        
        //Preparo mi procedimiento
        const serverRunMock = jest.fn();
        //Sobreescribimos el serverApp.run
        ServerApp.run = serverRunMock;
        process.argv = [ 'node', 'app.ts', '-b', '10', '-l', '5', '-s', '-n', 'test-file', '-d', 'test-destination' ];

        //Estímulo: Actúo llamando a mi aplicación y ejecutarla ya con los valores que he preparado anteriormente
        await import('./app');

        //Aserciones
        expect( serverRunMock ).toHaveBeenCalledWith({
            base: 10,
            limit: 5,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destination',
        })


    })

})