# Hàng đợi

**Hàng đợi** là cấu trúc tuyến tính tuân theo quy tắc vào trước–ra trước, viết tắt là FIFO. Phần tử được thêm ở **cuối hàng** và lấy ra ở **đầu hàng**.

![Quy tắc FIFO của hàng đợi](queue.assets/queue_operations.png)

## Các thao tác thường gặp

- `push()` hoặc `enqueue()` thêm phần tử vào cuối hàng.
- `pop()` hoặc `dequeue()` lấy phần tử ở đầu hàng.
- `peek()` đọc phần tử đầu mà không xóa.
- `is_empty()` và `size()` kiểm tra trạng thái.

Các thao tác trên nên có độ phức tạp $O(1)$.

```python
from collections import deque


queue: deque[int] = deque()
queue.append(1)
queue.append(3)
queue.append(2)
front = queue[0]
removed = queue.popleft()
```

## Triển khai hàng đợi

### Triển khai bằng danh sách liên kết

Duy trì tham chiếu đến cả nút đầu và nút đuôi. Thêm nút mới ở đuôi và xóa nút ở đầu đều tốn $O(1)$. Nếu chỉ giữ nút đầu, việc tìm đuôi có thể làm thao tác thêm tốn $O(n)$.

![Thêm và xóa trong hàng đợi dựa trên danh sách liên kết](queue.assets/linkedlist_queue_step1.png)

### Triển khai bằng mảng

Xóa phần tử đầu rồi dịch toàn bộ mảng sẽ tốn $O(n)$. **Mảng vòng** giải quyết vấn đề bằng cách giữ chỉ mục đầu và dùng phép modulo để quay lại đầu mảng.

```python
class ArrayQueue:
    def __init__(self, capacity: int):
        self._data = [0] * capacity
        self._front = 0
        self._size = 0

    def push(self, value: int) -> None:
        if self._size == len(self._data):
            raise OverflowError("Hàng đợi đầy")
        rear = (self._front + self._size) % len(self._data)
        self._data[rear] = value
        self._size += 1

    def pop(self) -> int:
        if self._size == 0:
            raise IndexError("Hàng đợi rỗng")
        value = self._data[self._front]
        self._front = (self._front + 1) % len(self._data)
        self._size -= 1
        return value
```

![Hàng đợi dựa trên mảng vòng](queue.assets/array_queue_step1.png)

## Ứng dụng điển hình

- hàng chờ tác vụ, in ấn và xử lý yêu cầu;
- tìm kiếm theo chiều rộng và đường đi ngắn nhất trên đồ thị không trọng số;
- bộ đệm dữ liệu giữa các thành phần có tốc độ khác nhau;
- mô phỏng hệ thống phục vụ theo thứ tự đến;
- hàng đợi thông điệp trong hệ thống phân tán.
