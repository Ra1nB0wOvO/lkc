document.getElementById('orderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const customerName = document.getElementById('customerName').value;
    const orderItems = document.getElementById('orderItems').value;

    const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ customerName, orderItems })
    });

    if (response.ok) {
        const newOrder = await response.json();
        addOrderToList(newOrder);
        document.getElementById('orderForm').reset();
    } else {
        alert('提交订单失败');
    }
});

async function fetchOrders() {
    const response = await fetch('/api/orders');
    if (response.ok) {
        const orders = await response.json();
        orders.forEach(addOrderToList);
    }
}

function addOrderToList(order) {
    const orderList = document.getElementById('orderList');
    const li = document.createElement('li');
    li.textContent = `客户: ${order.customerName}, 订单内容: ${order.orderItems}`;
    orderList.appendChild(li);
}

// 初始化加载订单列表
fetchOrders();