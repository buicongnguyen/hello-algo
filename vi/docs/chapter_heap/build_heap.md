# Xây dựng heap

Có thể xây heap bằng cách chèn từng phần tử, nhưng cách đó tốn $O(n \log n)$. Thuật toán xây heap tại chỗ bắt đầu từ nút không phải lá cuối cùng và lần lượt dịch xuống về phía gốc.

```python
def build_max_heap(values):
    for i in range(len(values) // 2 - 1, -1, -1):
        sift_down(values, i)
    return values
```

![Số phép toán khi xây heap](build_heap.assets/heapify_operations_count.png)

Mặc dù mỗi lần dịch xuống có thể tốn $O(\log n)$, phần lớn nút ở gần lá và chỉ di chuyển rất ít. Tổng số bước bị chặn bởi một chuỗi hội tụ, nên xây heap có độ phức tạp $O(n)$ và không gian phụ $O(1)$.
