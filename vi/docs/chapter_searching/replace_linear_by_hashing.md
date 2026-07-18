# Tối ưu tìm kiếm tuyến tính bằng băm

Bảng băm có thể đổi phép tìm kiếm lặp lại từ $O(n)$ trung bình xuống $O(1)$ bằng cách trả thêm bộ nhớ để lập chỉ mục.

## Ví dụ tổng hai số

Cách vét cạn thử mọi cặp tốn $O(n^2)$.

![Tổng hai số bằng vét cạn](replace_linear_by_hashing.assets/two_sum_brute_force.png)

```python
def two_sum(values, target):
    seen = {}
    for index, value in enumerate(values):
        complement = target - value
        if complement in seen:
            return [seen[complement], index]
        seen[value] = index
    return []
```

![Tổng hai số bằng bảng băm](replace_linear_by_hashing.assets/two_sum_hashtable_step3.png)

Giải pháp dùng $O(n)$ thời gian và $O(n)$ không gian. Đây là ví dụ điển hình của đánh đổi không gian lấy thời gian.
