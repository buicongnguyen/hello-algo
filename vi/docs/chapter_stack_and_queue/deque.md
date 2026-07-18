# Hàng đợi hai đầu

**Hàng đợi hai đầu**, hay deque, cho phép thêm và xóa phần tử ở cả đầu lẫn cuối. Vì vậy nó có thể hoạt động như ngăn xếp, hàng đợi hoặc kết hợp cả hai.

![Các thao tác của hàng đợi hai đầu](deque.assets/deque_operations.png)

## Các thao tác thường gặp

- `push_first()` và `pop_first()` thao tác ở đầu;
- `push_last()` và `pop_last()` thao tác ở cuối;
- `peek_first()` và `peek_last()` đọc hai đầu;
- mọi thao tác trên hai đầu nên tốn $O(1)$.

```python
from collections import deque


values: deque[int] = deque([3, 2])
values.appendleft(1)
values.append(5)
first = values[0]
last = values[-1]
values.popleft()
values.pop()
```

## Triển khai deque *

### Triển khai bằng danh sách liên kết đôi

Mỗi nút giữ liên kết đến nút trước và nút sau; cấu trúc giữ cả đầu và đuôi. Nhờ đó, thêm hoặc xóa ở hai phía chỉ thay đổi một số liên kết và tốn $O(1)$.

![Deque dựa trên danh sách liên kết đôi](deque.assets/linkedlist_deque_step1.png)

### Triển khai bằng mảng

Mảng vòng dùng hai chỉ mục hoặc một chỉ mục đầu cùng kích thước hiện tại. Phép modulo ánh xạ vị trí logic sang vị trí vật lý, cho phép cả hai đầu đi vòng qua biên mảng.

![Deque dựa trên mảng vòng](deque.assets/array_deque_step1.png)

Mảng động tận dụng bộ nhớ đệm tốt nhưng đôi lúc phải mở rộng. Danh sách liên kết đôi mở rộng theo nút nhưng tốn hai liên kết cho mỗi phần tử.

## Ứng dụng của deque

- hàng đợi đơn điệu để tìm cực trị trên cửa sổ trượt;
- lập lịch công việc và thuật toán work stealing;
- kiểm tra chuỗi đối xứng từ hai đầu;
- lưu lịch sử giới hạn kích thước;
- BFS 0–1, đưa cạnh trọng số $0$ vào đầu và trọng số $1$ vào cuối.
