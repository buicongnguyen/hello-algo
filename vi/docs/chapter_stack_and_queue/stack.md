# Ngăn xếp

**Ngăn xếp** là cấu trúc tuyến tính tuân theo quy tắc vào sau–ra trước, viết tắt là LIFO. Phần tử chỉ được thêm hoặc lấy ra tại một đầu gọi là **đỉnh ngăn xếp**; đầu còn lại là đáy.

![Quy tắc LIFO của ngăn xếp](stack.assets/stack_operations.png)

## Các thao tác thường gặp

- `push()` thêm phần tử vào đỉnh trong $O(1)$.
- `pop()` xóa và trả về phần tử đỉnh trong $O(1)$.
- `peek()` đọc phần tử đỉnh mà không xóa trong $O(1)$.
- `is_empty()` và `size()` kiểm tra trạng thái trong $O(1)$.

```python
class ArrayStack:
    """Ngăn xếp số nguyên dựa trên mảng động."""

    def __init__(self):
        self._data: list[int] = []

    def size(self) -> int:
        return len(self._data)

    def is_empty(self) -> bool:
        return not self._data

    def push(self, value: int) -> None:
        self._data.append(value)

    def pop(self) -> int:
        if self.is_empty():
            raise IndexError("Ngăn xếp rỗng")
        return self._data.pop()

    def peek(self) -> int:
        if self.is_empty():
            raise IndexError("Ngăn xếp rỗng")
        return self._data[-1]
```

## Triển khai ngăn xếp

### Triển khai bằng danh sách liên kết

Chọn nút đầu làm đỉnh. `push()` tạo nút mới và nối trước nút đầu; `pop()` chuyển nút đầu sang nút kế tiếp. Cả hai chỉ đổi một số liên kết nên tốn $O(1)$, nhưng mỗi nút cần thêm bộ nhớ cho tham chiếu.

![Thêm và xóa trong ngăn xếp dựa trên danh sách liên kết](stack.assets/linkedlist_stack_step1.png)

### Triển khai bằng mảng

Chọn cuối mảng làm đỉnh để thêm và xóa không phải dịch phần tử. Mảng động cho chi phí trung bình dồn $O(1)$ đối với `push()`, dù một lần mở rộng riêng lẻ có thể tốn $O(n)$.

![Thêm và xóa trong ngăn xếp dựa trên mảng](stack.assets/array_stack_step1.png)

## So sánh hai cách triển khai

| Tiêu chí | Mảng động | Danh sách liên kết |
| --- | --- | --- |
| `push()` / `pop()` | Trung bình dồn $O(1)$ | $O(1)$ |
| Chi phí bộ nhớ | Có thể dư sức chứa | Thêm một liên kết mỗi nút |
| Hiệu quả bộ nhớ đệm | Thường tốt | Thường kém hơn |
| Mở rộng | Đôi lúc phải sao chép | Thêm từng nút linh hoạt |

## Ứng dụng điển hình

- quản lý lời gọi hàm và ngăn xếp đệ quy;
- hoàn tác và làm lại trong trình soạn thảo;
- kiểm tra dấu ngoặc và tính biểu thức;
- duyệt theo chiều sâu và quay lui;
- lịch sử trang trước trong trình duyệt.
