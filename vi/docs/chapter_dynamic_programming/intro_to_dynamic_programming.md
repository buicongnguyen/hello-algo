# Giới thiệu quy hoạch động

Bài toán leo cầu thang là ví dụ cơ bản: để đến bậc $i$, bước cuối đến từ bậc $i-1$ hoặc $i-2$.

![Số cách đến bậc thứ ba](intro_to_dynamic_programming.assets/climbing_stairs_example.png)

$$
dp[i] = dp[i-1] + dp[i-2]
$$

Đệ quy thuần tính lại nhiều trạng thái. Ghi nhớ giải từ trên xuống; quy hoạch động đi từ dưới lên và điền bảng theo thứ tự phụ thuộc.

```python
def climbing_stairs(n):
    if n <= 2:
        return n
    previous, current = 1, 2
    for _ in range(3, n + 1):
        previous, current = current, previous + current
    return current
```

![Quá trình quy hoạch động](intro_to_dynamic_programming.assets/climbing_stairs_dp.png)

Chỉ hai trạng thái trước được dùng, nên có thể giảm không gian từ $O(n)$ xuống $O(1)$.
