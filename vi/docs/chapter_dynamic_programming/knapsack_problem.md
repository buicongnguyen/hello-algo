# Bài toán ba lô 0-1

Mỗi vật có trọng lượng và giá trị, được chọn tối đa một lần. Mục tiêu là tối đa hóa tổng giá trị mà không vượt sức chứa.

![Dữ liệu bài toán ba lô 0-1](knapsack_problem.assets/knapsack_example.png)

Với vật thứ $i$ và sức chứa $c$:

$$
dp[i,c] = \max(dp[i-1,c], dp[i-1,c-w_i] + v_i)
$$

```python
def knapsack_01(weights, values, capacity):
    dp = [0] * (capacity + 1)
    for weight, value in zip(weights, values):
        for current in range(capacity, weight - 1, -1):
            dp[current] = max(dp[current], dp[current - weight] + value)
    return dp[capacity]
```

Duyệt sức chứa theo chiều giảm để mỗi vật không bị dùng lại trong cùng vòng lặp. Thời gian là $O(n \times capacity)$, không gian là $O(capacity)$.

![Cây đệ quy ba lô](knapsack_problem.assets/knapsack_dfs.png)
