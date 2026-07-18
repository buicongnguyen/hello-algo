# Sắp xếp thùng

Bucket sort phân phối phần tử vào các thùng theo khoảng giá trị, sắp xếp từng thùng rồi nối kết quả.

![Tổng quan bucket sort](bucket_sort.assets/bucket_sort_overview.png)

```python
def bucket_sort(values, bucket_count=5):
    if not values:
        return values
    low, high = min(values), max(values)
    width = (high - low + 1) / bucket_count
    buckets = [[] for _ in range(bucket_count)]
    for value in values:
        index = min(int((value - low) / width), bucket_count - 1)
        buckets[index].append(value)
    values[:] = [value for bucket in buckets for value in sorted(bucket)]
    return values
```

Khi dữ liệu phân bố đều, thời gian gần $O(n + k)$ với $k$ thùng. Hiệu năng phụ thuộc mạnh vào hàm ánh xạ và phân bố dữ liệu.
