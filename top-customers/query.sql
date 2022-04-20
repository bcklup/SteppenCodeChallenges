SELECT 
    strftime("%Y", x.ordered_at) as 'year',
    strftime("%m", x.ordered_at) as 'month',
    x.customer_id,
	MAX(x.total_order_value) as total_monthly_order_value
FROM
	(
			SELECT
					o.customer_id,
					o.ordered_at,
					o.order_id,
					SUM(oli.quantity * oli.unit_price) as total_order_value
			FROM
					orders as o
					JOIN order_line_items oli on o.order_id = oli.order_id
	GROUP BY
					o.order_id
	) x
GROUP BY strftime("%m %Y", x.ordered_at)
ORDER BY strftime("%m %Y", x.ordered_at) ASC

-- NOTE: SQL testing done via SQLite in DBeaver