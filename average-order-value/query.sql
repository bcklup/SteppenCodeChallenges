SELECT
  c.name,
  oc.num_orders,
  SUM(oli.quantity*oli.unit_price) as 'total_order_value',
  SUM(oli.quantity*oli.unit_price)/oc.num_orders AS 'avg_order_value'
FROM order_line_items as oli, orders as o, customers as c, (
  SELECT customer_id, COUNT(order_id) as 'num_orders' FROM orders GROUP by customer_id
) oc
WHERE
  c.customer_id = o.customer_id AND oli.order_id = o.order_id AND oc.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY avg_order_value DESC, total_order_value DESC, num_orders DESC


-- NOTE: SQL testing done via SQLite in DBeaver
