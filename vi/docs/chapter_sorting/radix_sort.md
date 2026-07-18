# Sắp xếp cơ số

Radix sort xử lý từng chữ số từ thấp tới cao bằng một phép sắp xếp ổn định, thường là counting sort.

![Tổng quan radix sort](radix_sort.assets/radix_sort_overview.png)

```python
def radix_sort(values):
    place = 1
    maximum = max(values, default=0)
    while maximum // place:
        buckets = [[] for _ in range(10)]
        for value in values:
            buckets[(value // place) % 10].append(value)
        values[:] = [value for bucket in buckets for value in bucket]
        place *= 10
    return values
```

Với $d$ chữ số và cơ số $b$, thời gian là $O(d(n + b))$. Thuật toán phù hợp với số nguyên hoặc chuỗi có độ dài giới hạn.
