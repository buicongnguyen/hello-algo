# Hàng đợi

<u>Hàng đợi</u> là cấu trúc dữ liệu tuyến tính tuân theo quy tắc vào trước, ra trước (First In, First Out — FIFO). Đúng như tên gọi, cấu trúc này mô phỏng một hàng người đang chờ: người mới liên tục vào cuối hàng, còn người đứng đầu lần lượt rời đi.

Trong hình dưới đây, chúng ta gọi phía đầu hàng là “đầu” (front), còn phía cuối hàng là “cuối” (rear). Thao tác thêm phần tử vào cuối hàng được gọi là “vào hàng” (enqueue), còn thao tác loại bỏ phần tử ở đầu được gọi là “ra hàng” (dequeue).

![Quy tắc FIFO của hàng đợi](queue.assets/queue_operations.png)

## Các thao tác thường dùng của hàng đợi

Các thao tác thường dùng của hàng đợi được trình bày trong bảng dưới đây. Tên phương thức có thể khác nhau giữa các ngôn ngữ lập trình; tại đây chúng ta dùng cùng quy ước đặt tên như với ngăn xếp.

Bảng: Hiệu suất của các thao tác hàng đợi

| Phương thức | Mô tả                                      | Độ phức tạp thời gian |
| ----------- | ------------------------------------------ | --------------------- |
| `push()`    | Đưa phần tử vào cuối hàng                  | $O(1)$                |
| `pop()`     | Lấy phần tử ở đầu ra khỏi hàng             | $O(1)$                |
| `peek()`    | Truy cập phần tử ở đầu mà không loại bỏ nó | $O(1)$                |

Có thể dùng trực tiếp lớp hàng đợi do ngôn ngữ lập trình cung cấp:

```python
# Mã chính thức đa ngôn ngữ được chèn từ nguồn đã khóa.
```

Trong ví dụ chính thức, mỗi ngôn ngữ đều minh họa đủ quá trình khởi tạo, đưa nhiều phần tử vào hàng, đọc phần tử đầu, lấy một phần tử ra, lấy độ dài và kiểm tra trạng thái rỗng. Một vài ngôn ngữ dùng deque hoặc mảng thay cho lớp hàng đợi chuyên biệt; khi đó cần đặc biệt chú ý độ phức tạp của thao tác xóa phần tử đầu mảng.

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ hàng đợi trong Python Tutor](https://pythontutor.com/render.html#code=from%20collections%20import%20deque%0Aque%20%3D%20deque%28%29%0Aque.append%281%29%0Aque.append%283%29%0Aque.append%282%29%0Afront%20%3D%20que%5B0%5D%0Apop%20%3D%20que.popleft%28%29&cumulative=false&curInstr=6&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

## Cài đặt hàng đợi

Để cài đặt hàng đợi, chúng ta cần một cấu trúc dữ liệu cho phép thêm phần tử ở một đầu và loại bỏ phần tử ở đầu còn lại. Cả danh sách liên kết lẫn mảng đều đáp ứng được yêu cầu này.

### Cài đặt bằng danh sách liên kết

Như hình dưới đây, chúng ta xem “nút đầu” và “nút đuôi” của danh sách liên kết lần lượt là “đầu” và “cuối” của hàng đợi. Nút chỉ được thêm sau nút đuôi và chỉ được loại bỏ ở nút đầu.

![Thao tác vào và ra hàng trong cài đặt hàng đợi bằng danh sách liên kết](queue.assets/linkedlist_queue_step1.png)

![Thêm nút vào cuối hàng đợi liên kết](queue.assets/linkedlist_queue_step2_push.png)

![Loại bỏ nút ở đầu hàng đợi liên kết](queue.assets/linkedlist_queue_step3_pop.png)

Mã cài đặt hàng đợi bằng danh sách liên kết như sau:

```python
# Mã chính thức đa ngôn ngữ được chèn từ nguồn đã khóa.
```

### Cài đặt bằng mảng

Xóa phần tử đầu tiên của mảng có độ phức tạp thời gian $O(n)$, khiến thao tác ra hàng kém hiệu quả. Tuy nhiên, chúng ta có thể tránh vấn đề này bằng một thiết kế khéo léo.

Biến `front` được dùng để chỉ tới chỉ số của phần tử đầu, còn biến `size` lưu độ dài hàng đợi. Định nghĩa `rear = front + size`; giá trị này biểu diễn vị trí ngay sau phần tử cuối hàng.

Với thiết kế đó, **khoảng hợp lệ chứa các phần tử trong mảng là `[front, rear - 1]`**. Các thao tác được thực hiện như sau:

- Vào hàng: gán phần tử mới vào chỉ số `rear`, rồi tăng `size` thêm 1.
- Ra hàng: chỉ cần tăng `front` thêm 1 và giảm `size` đi 1.

Mỗi thao tác vào hoặc ra hàng chỉ cần một số lượng thao tác cố định, vì vậy có độ phức tạp thời gian $O(1)$.

![Thao tác vào và ra hàng trong cài đặt hàng đợi bằng mảng](queue.assets/array_queue_step1.png)

![Đưa phần tử vào hàng đợi mảng](queue.assets/array_queue_step2_push.png)

![Lấy phần tử ra khỏi hàng đợi mảng](queue.assets/array_queue_step3_pop.png)

Có một vấn đề cần lưu ý: khi liên tục vào và ra hàng, cả `front` và `rear` đều dịch dần sang phải. **Khi chúng chạm cuối mảng, chúng không thể tiếp tục di chuyển**. Vấn đề được giải quyết bằng cách xem mảng như một “mảng vòng”, trong đó đầu và cuối được nối với nhau.

Khi `front` hoặc `rear` vượt qua cuối mảng, chỉ số phải quay lại đầu mảng. Quy luật tuần hoàn này được thực hiện bằng phép lấy dư, như trong mã sau:

```python
# Mã chính thức đa ngôn ngữ được chèn từ nguồn đã khóa.
```

Hàng đợi ở trên vẫn có một giới hạn: sức chứa không đổi. Có thể khắc phục bằng cách thay mảng tĩnh bằng mảng động và bổ sung cơ chế mở rộng. Bạn đọc có thể tự thử cài đặt phần này.

Kết luận khi so sánh hai cách cài đặt tương tự phần ngăn xếp nên không được lặp lại ở đây. Mảng thường tận dụng bộ nhớ liên tục tốt hơn nhưng phải quản lý sức chứa; danh sách liên kết tăng theo từng nút và có hiệu suất thao tác ổn định nhưng cần thêm bộ nhớ cho các liên kết.

## Ứng dụng điển hình của hàng đợi

- **Đơn hàng thương mại điện tử**. Sau khi người mua đặt hàng, đơn được đưa vào hàng đợi và hệ thống xử lý theo đúng thứ tự. Trong những đợt mua sắm lớn, lượng đơn khổng lồ xuất hiện trong thời gian ngắn, khiến xử lý đồng thời trở thành một thách thức quan trọng.
- **Các tác vụ cần làm**. Mọi tình huống cần nguyên tắc “đến trước, phục vụ trước”, chẳng hạn hàng tác vụ của máy in hoặc hàng đơn gọi món của nhà hàng, đều có thể dùng hàng đợi để duy trì thứ tự xử lý hiệu quả.
