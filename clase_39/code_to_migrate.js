function allocate(salesOrders, purchasesOrders){
    if(!Array.isArray(salesOrders) || !Array.isArray(purchasesOrders)) throw new Error('Invalid data types. Both parameters must be strings');
    const orderedSales = salesOrders.sort((a, b) => new Date(a.created) - new Date(b.created));
    const orderedPurchases = purchasesOrders.sort((a, b) => new Date(a.receiving) - new Date(b.receiving));
    const allocatedOrders = [];
    let totalQuantityInStock = 0;
    while(orderedSales.length > 0 && orderedPurchases.length > 0){
        let currentPurchase=orderedPurchases.shift();
        totalQuantityInStock+=currentPurchase.quantity;
        while (totalQuantityInStock >= orderedSales[0].quantity)
        {
            const salesOrder = orderedSales.shift();
            allocatedOrders.push({id: salesOrder.id,date: currentPurchase.receiving})
            totalQuantityInStock-=salesOrder.quantity;
            if(orderedSales.length===0) break;
        }
    }
    return allocatedOrders;
}