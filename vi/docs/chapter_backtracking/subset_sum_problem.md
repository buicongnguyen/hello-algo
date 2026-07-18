# Bài toán tổng tập con

Cho một dãy số dương và giá trị đích, hãy tìm các tổ hợp có tổng đúng bằng đích. Khác hoán vị, mỗi nhánh chỉ xét các phần tử nằm sau vị trí hiện tại để tránh sinh lại cùng một tập con theo thứ tự khác.

![Tìm tập con và cắt tỉa biên](subset_sum_problem.assets/subset_sum_i_naive.png)

```python
def subset_sum(values, target):
    values.sort()
    path, result = [], []

    def search(start, remaining):
        if remaining == 0:
            result.append(path.copy())
            return
        for i in range(start, len(values)):
            if i > start and values[i] == values[i - 1]:
                continue
            if values[i] > remaining:
                break
            path.append(values[i])
            search(i + 1, remaining - values[i])
            path.pop()

    search(0, target)
    return result
```

Sắp xếp giúp cắt toàn bộ phần còn lại khi phần tử hiện tại lớn hơn tổng còn thiếu; điều kiện $i > start$ loại các lựa chọn trùng ở cùng tầng.

![Quá trình quay lui tổng tập con](subset_sum_problem.assets/subset_sum_i.png)
