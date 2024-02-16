import { yarg } from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server-app";


//console.log(process.argv); //argument values
//console.log(yarg.b); 

//Función autoinvocada anónima asincrona:
(async() => {
    await main();
})();

async function main(){

    const { b:base, l:limit, s:showTable, n:fileName, d:fileDestination } = yarg;
    
    ServerApp.run({ base, limit, showTable, fileName, fileDestination });

}
