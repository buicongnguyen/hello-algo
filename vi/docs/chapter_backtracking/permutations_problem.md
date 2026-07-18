# Bài toán hoán vị

Hoán vị chọn lần lượt một phần tử chưa dùng cho từng vị trí. Cây đệ quy có độ sâu $n$ và mỗi lá biểu diễn một hoán vị hoàn chỉnh.

![Cây đệ quy của hoán vị](permutations_problem.assets/permutations_i.png)

```python
def unique_permutations(values):
    values.sort()
    used = [False] * len(values)
    path, result = [], []

    def search():
        if len(path) == len(values):
            result.append(path.copy())
            return
        for i, value in enumerate(values):
            if used[i]:
                continue
            if i > 0 and values[i] == values[i - 1] and not used[i - 1]:
                continue
            used[i] = True
            path.append(value)
            search()
            path.pop()
            used[i] = False

    search()
    return result
```

Với phần tử trùng nhau, sắp xếp trước rồi chỉ cho phép phần tử trùng xuất hiện theo một thứ tự cố định ở cùng tầng tìm kiếm.

![Cắt tỉa hoán vị trùng](permutations_problem.assets/permutations_ii_pruning.png)
