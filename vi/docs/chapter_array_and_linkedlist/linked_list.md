# Danh sách liên kết

Bộ nhớ trống trong một hệ thống đang chạy có thể nằm rải rác. Mảng cần một vùng nhớ liên tục, vì vậy hệ thống đôi khi không thể cấp phát một mảng rất lớn dù tổng bộ nhớ trống vẫn đủ. Danh sách liên kết linh hoạt hơn trong tình huống này.

**Danh sách liên kết** là cấu trúc tuyến tính gồm các đối tượng nút. Các nút được nối bằng tham chiếu; mỗi tham chiếu ghi vị trí của nút tiếp theo. Nhờ đó, các nút có thể nằm ở những địa chỉ không liên tục.

![Định nghĩa và cách lưu trữ danh sách liên kết](linked_list.assets/linkedlist_definition.png)

Mỗi **nút** chứa hai phần: giá trị và tham chiếu đến nút tiếp theo.

- Nút đầu là **nút đầu**; nút cuối là **nút đuôi**.
- Nút đuôi trỏ đến giá trị rỗng, chẳng hạn `None` trong Python.
- Trong C, C++, Go hoặc Rust, khái niệm tham chiếu ở đây thường được biểu diễn bằng con trỏ.
- Vì mỗi nút cần thêm tham chiếu, danh sách liên kết thường tốn nhiều bộ nhớ hơn mảng khi lưu cùng số lượng giá trị.

```python
class ListNode:
    """Nút của danh sách liên kết đơn."""

    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None
```

## Các thao tác thường gặp

### Khởi tạo danh sách liên kết

Ta tạo từng nút rồi thiết lập quan hệ `next`. Danh sách gồm nhiều đối tượng độc lập, nhưng thường dùng nút đầu để đại diện cho toàn bộ danh sách.

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


n0 = ListNode(1)
n1 = ListNode(3)
n2 = ListNode(2)
n3 = ListNode(5)
n4 = ListNode(4)
n0.next = n1
n1.next = n2
n2.next = n3
n3.next = n4
```

### Chèn nút

Giả sử cần chèn nút `P` giữa hai nút kề nhau `n0` và `n1`. Khi đã có tham chiếu đến `n0`, ta chỉ cần đổi hai liên kết nên thao tác chèn tốn $O(1)$ thời gian.

![Ví dụ chèn một nút vào danh sách liên kết](linked_list.assets/linkedlist_insert_node.png)

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def insert(n0: ListNode, node: ListNode) -> None:
    node.next = n0.next
    n0.next = node
```

### Xóa nút

Muốn xóa nút ngay sau `n0`, ta cho `n0.next` bỏ qua nút đó và trỏ đến nút kế tiếp. Sau thao tác, nút bị xóa có thể vẫn giữ tham chiếu cũ, nhưng không còn được gặp khi duyệt từ nút đầu.

![Xóa một nút khỏi danh sách liên kết](linked_list.assets/linkedlist_remove_node.png)

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def remove_after(n0: ListNode) -> None:
    if n0.next is None:
        return
    n0.next = n0.next.next
```

### Truy cập nút

Danh sách liên kết không hỗ trợ tính trực tiếp địa chỉ theo chỉ mục. Muốn lấy nút thứ $i$, chương trình phải đi từ nút đầu qua từng liên kết. Vì vậy truy cập có độ phức tạp $O(n)$.

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def access(head: ListNode | None, index: int) -> ListNode | None:
    for _ in range(index):
        if head is None:
            return None
        head = head.next
    return head
```

### Tìm nút

Tìm nút có giá trị `target` cũng là tìm kiếm tuyến tính.

```python
class ListNode:
    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None


def find(head: ListNode | None, target: int) -> int:
    index = 0
    while head is not None:
        if head.value == target:
            return index
        head = head.next
        index += 1
    return -1
```

## So sánh mảng và danh sách liên kết

| Đặc điểm | Mảng | Danh sách liên kết |
| --- | --- | --- |
| Cách lưu | Bộ nhớ liên tục | Bộ nhớ phân tán |
| Mở rộng | Độ dài cố định, cần sao chép khi mở rộng | Điều chỉnh linh hoạt theo nút |
| Hiệu quả bộ nhớ | Ít chi phí cấu trúc nhưng có thể dư sức chứa | Mỗi nút cần thêm liên kết |
| Truy cập phần tử | $O(1)$ | $O(n)$ |
| Chèn sau vị trí đã biết | Thường $O(n)$ | $O(1)$ |
| Xóa sau vị trí đã biết | Thường $O(n)$ | $O(1)$ |

Độ phức tạp $O(1)$ của chèn và xóa danh sách liên kết giả định rằng ta đã có tham chiếu đến vị trí cần thao tác. Nếu phải tìm vị trí trước, toàn bộ quá trình vẫn có thể tốn $O(n)$.

## Các loại danh sách liên kết

- **Danh sách liên kết đơn**: mỗi nút giữ giá trị và liên kết đến nút tiếp theo; nút đuôi trỏ đến `None`.
- **Danh sách liên kết vòng**: nút đuôi trỏ lại nút đầu; bất kỳ nút nào cũng có thể được xem là điểm bắt đầu.
- **Danh sách liên kết đôi**: mỗi nút giữ cả liên kết đến nút trước và nút sau. Cấu trúc này duyệt được hai chiều nhưng dùng thêm bộ nhớ.

![Các loại danh sách liên kết thường gặp](linked_list.assets/linkedlist_common_types.png)

## Ứng dụng điển hình

Danh sách liên kết đơn thường dùng trong:

- **Ngăn xếp và hàng đợi**: cách chọn đầu thêm và đầu xóa tạo hành vi vào sau-ra trước hoặc vào trước-ra trước.
- **Bảng băm**: phương pháp nối chuỗi đặt các phần tử xung đột trong một danh sách liên kết.
- **Đồ thị**: mỗi đỉnh trong danh sách kề liên kết với danh sách các đỉnh lân cận.

Danh sách liên kết đôi phù hợp khi cần truy cập nhanh phần tử trước và sau:

- lưu tham chiếu cha trong cây;
- lịch sử tiến và lùi của trình duyệt;
- thuật toán loại bỏ bộ nhớ đệm LRU, nơi cần thêm, xóa và di chuyển nút nhanh.

Danh sách liên kết vòng phù hợp với hoạt động lặp theo chu kỳ:

- lập lịch round-robin trong hệ điều hành;
- quản lý các khối đệm tuần hoàn cho luồng âm thanh hoặc video.
