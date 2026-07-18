# Bài toán khoảng cách chỉnh sửa

Khoảng cách Levenshtein là số thao tác chèn, xóa hoặc thay thế ít nhất để biến chuỗi này thành chuỗi kia.

![Ví dụ khoảng cách chỉnh sửa](edit_distance_problem.assets/edit_distance_example.png)

Gọi $dp[i][j]$ là chi phí biến $i$ ký tự đầu của `source` thành $j$ ký tự đầu của `target`. Nếu hai ký tự cuối bằng nhau, dùng trạng thái chéo; nếu khác, chọn tốt nhất trong chèn, xóa và thay thế.

```python
def edit_distance(source, target):
    previous = list(range(len(target) + 1))
    for i, left in enumerate(source, 1):
        current = [i]
        for j, right in enumerate(target, 1):
            if left == right:
                current.append(previous[j - 1])
            else:
                current.append(1 + min(previous[j], current[j - 1], previous[j - 1]))
        previous = current
    return previous[-1]
```

![Chuyển trạng thái khoảng cách chỉnh sửa](edit_distance_problem.assets/edit_distance_state_transfer.png)

Thuật toán dùng $O(mn)$ thời gian và $O(n)$ không gian sau tối ưu hàng cuộn.
