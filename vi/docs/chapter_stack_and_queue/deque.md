# Hàng đợi hai đầu

Trong hàng đợi thông thường, chúng ta chỉ có thể loại bỏ phần tử ở đầu hoặc thêm phần tử ở cuối. Như hình dưới đây, <u>hàng đợi hai đầu (deque)</u> linh hoạt hơn: phần tử có thể được thêm hoặc loại bỏ ở cả đầu lẫn cuối.

![Các thao tác của hàng đợi hai đầu](deque.assets/deque_operations.png)

## Các thao tác thường dùng của deque

Các thao tác thường dùng của deque được trình bày trong bảng sau. Tên phương thức cụ thể phụ thuộc vào ngôn ngữ lập trình.

Bảng: Hiệu suất của các thao tác deque

| Phương thức    | Mô tả                       | Độ phức tạp thời gian |
| -------------- | --------------------------- | --------------------- |
| `push_first()` | Thêm phần tử vào đầu         | $O(1)$                |
| `push_last()`  | Thêm phần tử vào cuối        | $O(1)$                |
| `pop_first()`  | Loại bỏ phần tử ở đầu        | $O(1)$                |
| `pop_last()`   | Loại bỏ phần tử ở cuối       | $O(1)$                |
| `peek_first()` | Truy cập phần tử ở đầu       | $O(1)$                |
| `peek_last()`  | Truy cập phần tử ở cuối      | $O(1)$                |

Tương tự, chúng ta có thể dùng trực tiếp lớp deque do ngôn ngữ lập trình cung cấp:

```python
# Mã chính thức đa ngôn ngữ được chèn từ nguồn đã khóa.
```

Nhóm ví dụ chính thức minh họa cùng một chuỗi hành động ở 13 ngôn ngữ: khởi tạo deque, thêm phần tử ở cả hai phía, đọc phần tử đầu và cuối, loại bỏ ở cả hai phía, lấy độ dài và kiểm tra trạng thái rỗng. Nhờ đặt các ngôn ngữ trong cùng một nhóm thẻ, người đọc có thể tập trung vào ngôn ngữ đang học mà vẫn dễ đối chiếu tên phương thức khi cần.

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ deque trong Python Tutor](https://pythontutor.com/render.html#code=from%20collections%20import%20deque%0Adeq%20%3D%20deque%28%29%0Adeq.append%282%29%0Adeq.appendleft%281%29%0Afront%20%3D%20deq%5B0%5D%0Arear%20%3D%20deq%5B-1%5D%0Adeq.popleft%28%29%0Adeq.pop%28%29&cumulative=false&curInstr=7&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

## Cài đặt deque *

Cách cài đặt deque tương tự hàng đợi. Có thể chọn danh sách liên kết hoặc mảng làm cấu trúc dữ liệu nền.

### Cài đặt bằng danh sách liên kết đôi

Ở phần trước, chúng ta dùng danh sách liên kết đơn thông thường để cài đặt hàng đợi vì nó cho phép xóa nút đầu (tương ứng ra hàng) và thêm nút sau nút đuôi (tương ứng vào hàng) một cách thuận tiện.

Với deque, cả đầu và cuối đều phải hỗ trợ thao tác thêm và loại bỏ. Nói cách khác, cấu trúc còn phải thực hiện được các thao tác theo hướng ngược lại. Vì vậy, chúng ta dùng “danh sách liên kết đôi” làm cấu trúc nền.

Trong hình dưới đây, nút đầu và nút đuôi của danh sách liên kết đôi lần lượt đóng vai trò đầu và cuối deque, nhờ đó có thể thêm và loại bỏ nút ở cả hai phía.

Khi thêm ở đầu, nút mới trở thành nút đầu và liên kết hai chiều giữa nó với nút đầu cũ phải được cập nhật. Thêm ở cuối thực hiện phép biến đổi đối xứng với nút đuôi. Khi loại bỏ, cấu trúc chuyển tham chiếu đầu hoặc đuôi sang nút kế cận rồi ngắt các liên kết không còn dùng. Với deque chỉ có một phần tử, cả đầu lẫn cuối đều phải trở về trạng thái rỗng sau khi loại bỏ.

![Thao tác thêm và loại bỏ trong deque cài đặt bằng danh sách liên kết](deque.assets/linkedlist_deque_step1.png)

![Thêm phần tử vào cuối deque liên kết](deque.assets/linkedlist_deque_step2_push_last.png)

![Thêm phần tử vào đầu deque liên kết](deque.assets/linkedlist_deque_step3_push_first.png)

![Loại bỏ phần tử ở cuối deque liên kết](deque.assets/linkedlist_deque_step4_pop_last.png)

![Loại bỏ phần tử ở đầu deque liên kết](deque.assets/linkedlist_deque_step5_pop_first.png)

Mã cài đặt được trình bày dưới đây:

```python
# Mã chính thức đa ngôn ngữ được chèn từ nguồn đã khóa.
```

### Cài đặt bằng mảng

Tương tự cách cài đặt hàng đợi bằng mảng, chúng ta có thể dùng mảng vòng để cài đặt deque.

Mảng vòng ánh xạ vị trí logic sang chỉ số vật lý bằng phép lấy dư. Khi thêm ở đầu, chỉ số đầu lùi một vị trí và có thể vòng từ chỉ số 0 về cuối mảng; khi thêm ở cuối, vị trí mới nằm ngay sau phần tử cuối hiện tại. Hai thao tác loại bỏ cập nhật chỉ số và kích thước theo hướng ngược lại. Thiết kế này tái sử dụng các ô trống ở hai phía mà không phải dịch toàn bộ phần tử.

![Thao tác thêm và loại bỏ trong deque cài đặt bằng mảng](deque.assets/array_deque_step1.png)

![Thêm phần tử vào cuối deque mảng](deque.assets/array_deque_step2_push_last.png)

![Thêm phần tử vào đầu deque mảng](deque.assets/array_deque_step3_push_first.png)

![Loại bỏ phần tử ở cuối deque mảng](deque.assets/array_deque_step4_pop_last.png)

![Loại bỏ phần tử ở đầu deque mảng](deque.assets/array_deque_step5_pop_first.png)

Dựa trên cài đặt hàng đợi, chúng ta chỉ cần bổ sung phương thức “thêm ở đầu” và “loại bỏ ở cuối”:

```python
# Mã chính thức đa ngôn ngữ được chèn từ nguồn đã khóa.
```

Các bản cài đặt chính thức giữ cùng giao diện cho danh sách liên kết đôi và mảng vòng. Điều đó giúp người đọc so sánh trực tiếp cách một thao tác ở mức trừu tượng được chuyển thành thay đổi liên kết hoặc thay đổi chỉ số ở tầng lưu trữ.

## Ứng dụng của deque

Deque kết hợp logic của cả ngăn xếp lẫn hàng đợi. **Vì vậy, nó có thể đáp ứng mọi tình huống ứng dụng của hai cấu trúc này, đồng thời mang lại độ linh hoạt cao hơn**.

Chức năng “hoàn tác” trong phần mềm thường được cài đặt bằng ngăn xếp: hệ thống đưa mỗi thay đổi vào ngăn xếp rồi hoàn tác bằng thao tác lấy ra. Tuy nhiên, vì tài nguyên hệ thống có giới hạn, phần mềm thường giới hạn số bước hoàn tác, chẳng hạn chỉ lưu 50 bước. Khi số phần tử vượt 50, phần mềm phải xóa thao tác cũ nhất ở đáy ngăn xếp, tức phía đầu hàng. **Ngăn xếp không hỗ trợ thao tác này nên cần dùng deque để thay thế**. Logic cốt lõi của hoàn tác vẫn tuân theo LIFO; deque chỉ bổ sung sự linh hoạt cho các quy tắc phụ.

Như vậy, thao tác hoàn tác vẫn lấy thay đổi mới nhất ở một phía, còn việc duy trì giới hạn lịch sử chỉ thỉnh thoảng loại bỏ thay đổi cũ nhất ở phía kia. Đây là ví dụ điển hình cho việc giữ nguyên quy tắc nghiệp vụ chính của ngăn xếp nhưng chọn deque để đáp ứng thêm một ràng buộc quản lý tài nguyên.
