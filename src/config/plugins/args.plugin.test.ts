
//Hacemos esto para simular que estamos enviando los argumentos por consola
//..esta es la forma en que se suelen probar aplicaciones de consola
const runCommand = async( args: string[] ) => {
    //Voy a añadir al argv los argumentos que quiera utilizar para los tests
    process.argv = [...process.argv, ...args];
    //Ya con todos los valores en el argv, puedo invocar el archivo ./args.plugin
    //...para ejectuar la construcción y tal
    const { yarg } = await import('./args.plugin');
    //Si situamos el cursos sobre yarg, veremos que ya tenemos la estructura que estamos esperando
    return yarg;
};

describe('Test args.plugin.ts', () => {

    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })

    test('should return default values', async() => {

        const argv = await runCommand([ '-b', '5' ]);
        //Ojo, la clave está en el segundo expect:
        expect(argv).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'outputs',
        }));

    });

    test('should return configuration with values', async() => {

        const argv = await runCommand([ 
            '-b', '6',
            '-l', '20',
            '-s',
            '-n', 'test-name',
            '-d', 'test-destination',
         ]);

        expect(argv).toEqual( expect.objectContaining({
            b: 6,
            l: 20,
            s: true,
            n: 'test-name',
            d: 'test-destination',
        }));

    })

});