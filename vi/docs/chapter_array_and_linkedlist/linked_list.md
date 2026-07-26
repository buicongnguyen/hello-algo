# Danh sách liên kết

Bộ nhớ trống trong một hệ thống đang chạy có thể nằm rải rác. Mảng cần một vùng nhớ liên tục, vì vậy hệ thống đôi khi không thể cấp phát một mảng rất lớn dù tổng bộ nhớ trống vẫn đủ. Danh sách liên kết linh hoạt hơn trong tình huống này.

**Danh sách liên kết** là cấu trúc tuyến tính gồm các đối tượng nút. Các nút được nối bằng tham chiếu; mỗi tham chiếu ghi vị trí của nút tiếp theo. Nhờ đó, các nút có thể nằm ở những địa chỉ không liên tục.

Nếu mảng dùng thứ tự vật lý trong bộ nhớ để biểu diễn thứ tự logic, danh sách liên kết dùng tham chiếu nằm trong từng nút. Chỉ cần địa chỉ nút kế tiếp chính xác, hai nút ở rất xa nhau trong bộ nhớ vẫn có thể được duyệt như hai phần tử liên tiếp.

![Định nghĩa và cách lưu trữ danh sách liên kết](linked_list.assets/linkedlist_definition.png)

Mỗi **nút** chứa hai phần: giá trị và tham chiếu đến nút tiếp theo.

- Nút đầu tiên được gọi là **nút đầu**; nút cuối cùng là **nút đuôi**.
- Nút đuôi trỏ đến giá trị rỗng, chẳng hạn `None` trong Python.
- Trong C, C++, Go hoặc Rust, khái niệm tham chiếu ở đây thường được biểu diễn bằng con trỏ.
- Vì mỗi nút cần thêm tham chiếu, danh sách liên kết thường tốn nhiều bộ nhớ hơn mảng khi lưu cùng số lượng giá trị.

Nếu mất tham chiếu đến nút đầu, chương trình có thể mất luôn đường truy cập tới toàn bộ danh sách. Ngược lại, chỉ cần giữ nút đầu là có thể lần theo `next` để thăm mọi nút. Đây là bất biến cốt lõi của danh sách liên kết đơn.

Trong hình minh họa, các nút được vẽ cạnh nhau nhưng địa chỉ thật không cần theo thứ tự ấy. Bộ cấp phát chọn bất kỳ vùng trống nào khi tạo nút; điều cấu trúc phải bảo đảm là mỗi `next` trỏ đúng đến nút logic tiếp theo. Ghi đè sai một liên kết có thể làm mất đường tới cả đoạn phía sau, nên thứ tự cập nhật tham chiếu rất quan trọng.

```python
class ListNode:
    """Nút của danh sách liên kết đơn."""

    def __init__(self, value: int):
        self.value = value
        self.next: ListNode | None = None
```

## Các thao tác thường gặp

### Khởi tạo danh sách liên kết

Chúng ta tạo từng nút rồi thiết lập quan hệ `next`. Danh sách gồm nhiều đối tượng độc lập, nhưng thường dùng nút đầu để đại diện cho toàn bộ danh sách.

Quá trình khởi tạo trước hết tạo các nút rời, sau đó nối `next` của nút trước với nút sau. `next` của nút cuối giữ giá trị rỗng để đánh dấu điểm dừng. Danh sách rỗng có chính tham chiếu đầu là rỗng; danh sách một phần tử có nút đầu đồng thời là nút đuôi. Hai trường hợp biên này cần được kiểm tra khi viết phép chèn và xóa.

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

??? pythontutor "Chạy trực quan"

    [Quan sát quá trình nối các nút trong Python Tutor](https://pythontutor.com/render.html#code=class%20Node%3A%0A%20%20%20%20def%20__init__%28self%2Cvalue%29%3A%0A%20%20%20%20%20%20%20%20self.value%3Dvalue%0A%20%20%20%20%20%20%20%20self.next%3DNone%0An0%3DNode%281%29%0An1%3DNode%283%29%0An0.next%3Dn1&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

### Chèn nút

Giả sử cần chèn nút `P` giữa hai nút kề nhau `n0` và `n1`. Khi đã có tham chiếu đến `n0`, chúng ta chỉ cần đổi hai liên kết nên thao tác chèn tốn $O(1)$ thời gian.

Nếu chèn vào cùng vị trí của mảng, các phần tử phía sau phải dịch chuyển nên tốn $O(n)$. Ưu thế của danh sách liên kết xuất hiện khi vị trí đã được biết: dữ liệu không di chuyển, chỉ hai tham chiếu thay đổi.

Phải để nút mới ghi nhớ nút kế tiếp cũ trước khi đổi `n0.next`. Nếu lập tức cho `n0.next` trỏ tới nút mới mà chưa lưu địa chỉ cũ, phần danh sách phía sau sẽ không còn đường truy cập. Khi chèn trước nút đầu, đặt `next` của nút mới tới đầu cũ rồi cập nhật tham chiếu đầu. Khi chèn sau đuôi, cần duy trì riêng tham chiếu đuôi hoặc duyệt từ đầu tới cuối.

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

Muốn xóa nút ngay sau `n0`, chúng ta cho `n0.next` bỏ qua nút đó và trỏ đến nút kế tiếp. Sau thao tác, nút bị xóa có thể vẫn giữ tham chiếu cũ, nhưng không còn được truy cập khi duyệt từ nút đầu.

Trong ngôn ngữ có quản lý bộ nhớ tự động, nút không còn đường truy cập sẽ được thu hồi về sau. Với ngôn ngữ quản lý thủ công, chương trình phải giải phóng vùng nhớ đúng lúc và tránh giải phóng một nút vẫn đang được sử dụng.

Xóa nút không di chuyển toàn bộ phần phía sau mà chỉ đổi đích của liên kết trước nó. Nếu xóa nút đầu, phải chuyển tham chiếu đầu sang nút kế tiếp. Mã cũng cần xử lý an toàn danh sách rỗng và yêu cầu xóa sau nút cuối. Trong môi trường nơi mã bên ngoài còn giữ nút đã xóa, đặt `next` của nút đó thành rỗng có thể làm trạng thái rõ ràng hơn.

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

Mảng truy cập ngẫu nhiên trong $O(1)$, nhưng danh sách liên kết không hỗ trợ tính trực tiếp địa chỉ theo chỉ mục. Muốn lấy nút thứ $i$, chương trình phải đi từ nút đầu qua $i - 1$ liên kết. Vì vậy truy cập có độ phức tạp $O(n)$.

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

Chương trình so sánh từng giá trị theo thứ tự và trả về vị trí khi gặp mục tiêu. Nếu mục tiêu không tồn tại, phải đi tới tham chiếu rỗng sau nút đuôi nên trường hợp xấu nhất tỉ lệ với toàn bộ chiều dài danh sách.

Danh sách liên kết không có công thức tính địa chỉ của nút kế tiếp xa hơn, vì vậy không thể bỏ qua một đoạn trong khi tìm. Ngay cả khi danh sách đã sắp xếp, không thể nhảy tức thời tới chỉ mục giữa để hưởng trọn lợi thế của tìm kiếm nhị phân như mảng. Nếu tra cứu xảy ra thường xuyên, có thể cần kết hợp bảng băm hoặc cây làm chỉ mục.

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

Độ phức tạp `O(1)` của chèn và xóa danh sách liên kết giả định rằng chúng ta đã có tham chiếu đến vị trí cần thao tác. Nếu phải tìm vị trí trước, toàn bộ quá trình vẫn có thể tốn `O(n)`.

Vì vậy, mẫu thao tác quyết định hiệu quả thực tế. Nếu thường chèn hoặc xóa ở đầu, đuôi hay một vị trí luôn được giữ tham chiếu, danh sách liên kết phát huy ưu thế. Nếu thường đọc theo số thứ tự bất kỳ, mỗi lần đều phải duyệt nên mảng phù hợp hơn.

Về bộ nhớ, nhận xét “danh sách liên kết chỉ tạo đúng số nút cần thiết” chưa phản ánh toàn bộ chi phí. Mảng có thể dư sức chứa nhưng không cần lưu liên kết trên mỗi phần tử. Danh sách liên kết không đặt trước các ô trống, song mỗi nút mang thêm tham chiếu và thông tin quản lý đối tượng. Với giá trị nhỏ, phần phụ này có thể lớn hơn dữ liệu. Mảng liên tục cũng tận dụng bộ nhớ đệm tốt hơn, trong khi các nút rải rác có thể buộc CPU nạp nhiều dòng bộ nhớ đệm khác nhau.

## Các loại danh sách liên kết

- **Danh sách liên kết đơn**: mỗi nút giữ giá trị và liên kết đến nút tiếp theo; nút đuôi trỏ đến `None`.
- **Danh sách liên kết vòng**: nút đuôi trỏ lại nút đầu; bất kỳ nút nào cũng có thể được xem là điểm bắt đầu.
- **Danh sách liên kết đôi**: mỗi nút giữ cả liên kết đến nút trước và nút sau. Cấu trúc này duyệt được hai chiều nhưng dùng thêm bộ nhớ.

Danh sách vòng không có tham chiếu rỗng làm điểm dừng, vì vậy phép duyệt phải nhận biết lúc quay lại nút bắt đầu. Danh sách đôi cần cập nhật cả liên kết trước lẫn sau khi xóa một nút và duy trì bất biến hai chiều luôn thống nhất. Càng nhiều khả năng, số liên kết cần sửa và độ phức tạp cài đặt càng tăng.

```python
# Mã chính thức về danh sách liên kết đơn, vòng và đôi được chèn từ nguồn đã khóa.
```

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

Trong ứng dụng thực tế, cấu trúc thường giữ đồng thời tham chiếu đầu và đuôi để phù hợp với các thao tác chính. Chẳng hạn, hàng đợi giữ đuôi để thêm nút mà không phải tìm từ đầu. Bộ nhớ đệm LRU kết hợp danh sách liên kết đôi với bảng băm: bảng băm tìm nút theo khóa, còn các liên kết cập nhật nhanh thứ tự sử dụng gần đây. Lợi ích của danh sách liên kết trở nên rõ nhất khi vị trí nút được cung cấp bởi một cơ chế khác.

Danh sách liên kết thay đổi kích thước linh hoạt và sửa liên kết nhanh ở vị trí đã biết, đổi lại phải trả chi phí tham chiếu và tính cục bộ bộ nhớ đệm thấp. Lựa chọn thực tế cần xét đồng thời độ phức tạp thao tác, bố trí bộ nhớ và mẫu truy cập.
