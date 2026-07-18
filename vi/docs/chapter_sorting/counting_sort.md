# Sắp xếp đếm

Counting sort đếm số lần xuất hiện của từng khóa nguyên trong một miền hữu hạn rồi dựng lại dãy.

![Tổng quan counting sort](counting_sort.assets/counting_sort_overview.png)

```python
def counting_sort(values):
    if not values:
        return values
    low, high = min(values), max(values)
    counts = [0] * (high - low + 1)
    for value in values:
        counts[value - low] += 1
    index = 0
    for offset, count in enumerate(counts):
        for _ in range(count):
            values[index] = offset + low
            index += 1
    return values
```

Thời gian $O(n + k)$ và không gian $O(k)$, trong đó $k$ là độ rộng miền khóa. Phiên bản dùng tổng tiền tố có thể ổn định.
