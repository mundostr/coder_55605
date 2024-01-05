/**
 * Como vimos, process nos permite activar "listeners", procesos que quedan escuchando
 * distintos eventos.
 * 
 * En este caso un evento de mensaje, es decir, un mensaje que llega desde otro proceso,
 * cuando llegue (cualquier mensaje, podríamos verificar cuál), el proceso iniciará,
 * es decir, comenzará el ciclo para cálculo de sumatoria.
 * 
 * Ver endpoint en auth.routes.js para un ejemplo de generación de child y llamada.
*/
process.on('message', message => {
    let result = 0;
        
    for (let i = 0; i < 5e9; i++) {
        result += i;
    }
    
    // A diferencia de una rutina común, no utilizamos return
    // sino process.send para devolver el resultado
    process.send(result);
});