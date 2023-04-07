export const addNewOrder = (newOrder) => {
    const orders = localStorage.getItem('orders') ?  JSON.parse(localStorage.getItem('orders')) : [];
    let cloneOfOrders = orders;
    cloneOfOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(cloneOfOrders));
    return cloneOfOrders;
}