# Bài toán ba lô vô hạn

Ba lô vô hạn cho phép dùng mỗi loại vật nhiều lần. Vì trạng thái hiện tại có thể tiếp tục dùng cùng vật, mảng sức chứa được duyệt theo chiều tăng.

![Dữ liệu ba lô vô hạn](unbounded_knapsack_problem.assets/unbounded_knapsack_example.png)

```python
def unbounded_knapsack(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for current in range(weight, capacity + 1):
            dp[current] = max(dp[current], dp[current - weight] + value)
    return dp[capacity]
```

## Đổi tiền

Đổi tiền là biến thể tối thiểu hóa số đồng xu để tạo đúng số tiền.

```python
def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for coin in coins:
        for current in range(coin, amount + 1):
            dp[current] = min(dp[current], dp[current - coin] + 1)
    return -1 if dp[amount] == amount + 1 else dp[amount]
```

![Ví dụ đổi tiền](unbounded_knapsack_problem.assets/coin_change_example.png)

Đếm số tổ hợp dùng phép cộng thay cho `min`; thứ tự vòng lặp theo loại đồng xu giúp không đếm các hoán vị của cùng một tổ hợp.
