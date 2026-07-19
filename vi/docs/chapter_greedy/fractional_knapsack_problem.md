# Bài toán ba lô phân số

Mỗi vật có trọng lượng và giá trị, có thể lấy một phần của vật. Mục tiêu là tối đa hóa giá trị trong giới hạn sức chứa.

![Dữ liệu ba lô phân số](fractional_knapsack_problem.assets/fractional_knapsack_example.png)

Vì có thể chia vật, lựa chọn tốt nhất là lấy theo thứ tự giá trị trên một đơn vị trọng lượng giảm dần.

![Giá trị trên đơn vị trọng lượng](fractional_knapsack_problem.assets/fractional_knapsack_unit_value.png)

```python
def fractional_knapsack(weights, values, capacity):
    items = sorted(zip(weights, values), key=lambda item: item[1] / item[0], reverse=True)
    total = 0.0
    for weight, value in items:
        if capacity == 0:
            break
        taken = min(weight, capacity)
        total += value * taken / weight
        capacity -= taken
    return total
```

![Chiến lược tham lam cho ba lô phân số](fractional_knapsack_problem.assets/fractional_knapsack_greedy_strategy.png)

Lập luận trao đổi cho thấy nếu nghiệm lấy một phần có mật độ thấp trước mật độ cao, hoán đổi chúng không giảm trọng lượng nhưng tăng giá trị. Vì vậy thứ tự tham lam là tối ưu.
