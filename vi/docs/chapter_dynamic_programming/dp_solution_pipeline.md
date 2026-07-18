# Quy trình giải bài toán quy hoạch động

Quy trình thực hành gồm: xác định quyết định, định nghĩa trạng thái, lập phương trình chuyển, đặt điều kiện biên và chọn thứ tự tính.

![Ví dụ tổng đường đi nhỏ nhất](dp_solution_pipeline.assets/min_path_sum_example.png)

Với lưới chi phí, $dp[i][j]$ là tổng nhỏ nhất để đến ô $(i,j)$:

$$
dp[i][j] = grid[i][j] + \min(dp[i-1][j], dp[i][j-1])
$$

```python
def min_path_sum(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [float("inf")] * cols
    dp[0] = 0
    for row in range(rows):
        for col in range(cols):
            from_left = dp[col - 1] if col > 0 else float("inf")
            dp[col] = grid[row][col] + min(dp[col], from_left)
    return dp[-1]
```

![Định nghĩa trạng thái và bảng dp](dp_solution_pipeline.assets/min_path_sum_solution_state_definition.png)

Mảng một chiều lưu hàng hiện tại: `dp[col]` trước cập nhật là giá trị từ trên, còn `dp[col-1]` là giá trị từ trái.
