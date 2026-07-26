# Ngăn xếp

<u>Ngăn xếp</u> là cấu trúc dữ liệu tuyến tính tuân theo nguyên tắc vào sau, ra trước (Last In, First Out — LIFO).

Chúng ta có thể hình dung ngăn xếp như một chồng đĩa trên bàn. Nếu mỗi lần chỉ được di chuyển một chiếc đĩa, muốn lấy chiếc ở dưới cùng thì trước hết phải lần lượt lấy tất cả đĩa nằm phía trên. Thay những chiếc đĩa bằng các phần tử thuộc nhiều kiểu khác nhau, chẳng hạn số nguyên, ký tự hoặc đối tượng, chúng ta thu được cấu trúc dữ liệu ngăn xếp.

Trong hình dưới đây, đầu chứa phần tử được thêm gần nhất gọi là **đỉnh ngăn xếp**, còn đầu kia gọi là **đáy ngăn xếp**. Thao tác thêm phần tử vào đỉnh gọi là **đẩy vào** (push); thao tác lấy phần tử ở đỉnh ra gọi là **lấy ra** (pop).

![Nguyên tắc LIFO của ngăn xếp](stack.assets/stack_operations.png)

## Các thao tác thường gặp trên ngăn xếp

Bảng dưới đây trình bày các thao tác phổ biến. Tên phương thức cụ thể có thể khác nhau giữa các ngôn ngữ lập trình; ở đây chúng ta dùng cách gọi thông dụng là `push()`, `pop()` và `peek()`.

Bảng: Hiệu suất của các thao tác ngăn xếp

| Phương thức | Mô tả | Độ phức tạp thời gian |
| --- | --- | --- |
| `push()` | Đẩy phần tử vào đỉnh ngăn xếp | $O(1)$ |
| `pop()` | Lấy phần tử ở đỉnh ra khỏi ngăn xếp | $O(1)$ |
| `peek()` | Truy cập phần tử ở đỉnh | $O(1)$ |

Thông thường, chúng ta có thể dùng trực tiếp lớp ngăn xếp do ngôn ngữ lập trình cung cấp. Một số ngôn ngữ không có lớp chuyên biệt; khi đó có thể dùng mảng hoặc danh sách liên kết như một ngăn xếp, đồng thời tránh gọi những thao tác không thuộc giao diện của ngăn xếp.

```python
# Nhóm mã chính thức về các thao tác ngăn xếp
```

??? pythontutor "Trực quan hóa mã"

    https://pythontutor.com/render.html#code=%22%22%22Driver%20Code%22%22%22%0Aif%20__name__%20%3D%3D%20%22__main__%22%3A%0A%20%20%20%20%23%20%E5%88%9D%E5%A7%8B%E5%8C%96%E6%A0%88%0A%20%20%20%20%23%20Python%20%E6%B2%A1%E6%9C%89%E5%86%85%E7%BD%AE%E7%9A%84%E6%A0%88%E7%B1%BB%EF%BC%8C%E5%8F%AF%E4%BB%A5%E6%8A%8A%20list%20%E5%BD%93%E4%BD%9C%E6%A0%88%E6%9D%A5%E4%BD%BF%E7%94%A8%0A%20%20%20%20stack%20%3D%20%5B%5D%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%85%A5%E6%A0%88%0A%20%20%20%20stack.append%281%29%0A%20%20%20%20stack.append%283%29%0A%20%20%20%20stack.append%282%29%0A%20%20%20%20stack.append%285%29%0A%20%20%20%20stack.append%284%29%0A%20%20%20%20print%28%22%E6%A0%88%20stack%20%3D%22,%20stack%29%0A%0A%20%20%20%20%23%20%E8%AE%BF%E9%97%AE%E6%A0%88%E9%A1%B6%E5%85%83%E7%B4%A0%0A%20%20%20%20peek%20%3D%20stack%5B-1%5D%0A%20%20%20%20print%28%22%E6%A0%88%E9%A1%B6%E5%85%83%E7%B4%A0%20peek%20%3D%22,%20peek%29%0A%0A%20%20%20%20%23%20%E5%85%83%E7%B4%A0%E5%87%BA%E6%A0%88%0A%20%20%20%20pop%20%3D%20stack.pop%28%29%0A%20%20%20%20print%28%22%E5%87%BA%E6%A0%88%E5%85%83%E7%B4%A0%20pop%20%3D%22,%20pop%29%0A%20%20%20%20print%28%22%E6%A0%88%E9%A1%B6%E5%85%83%E7%B4%A0%20peek%20%3D%22,%20peek%29%0A%0A%20%20%20%20%23%20%E8%8E%B7%E5%8F%96%E6%A0%88%E7%9A%84%E9%95%BF%E5%BA%A6%0A%20%20%20%20size%20%3D%20len%28stack%29%0A%0A%20%20%20%20%23%20%E5%88%A4%E6%96%AD%E6%98%AF%E5%90%A6%E4%B8%BA%E7%A9%BA%0A%20%20%20%20is_empty%20%3D%20len%28stack%29%20%3D%3D%200&cumulative=false&curInstr=2&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false

## Triển khai ngăn xếp

Để hiểu sâu hơn cách ngăn xếp hoạt động, chúng ta sẽ tự triển khai một lớp ngăn xếp.

Ngăn xếp tuân theo LIFO nên chỉ cho phép thêm và xóa ở đỉnh. Trong khi đó, cả mảng và danh sách liên kết đều cho phép thêm hoặc xóa ở nhiều vị trí. **Vì vậy, có thể xem ngăn xếp là một mảng hoặc danh sách liên kết đã bị giới hạn giao diện**. Chúng ta che đi các thao tác không liên quan để hành vi bên ngoài của cấu trúc chỉ còn đúng với định nghĩa ngăn xếp.

### Triển khai bằng danh sách liên kết

Khi dùng danh sách liên kết, chúng ta xem nút đầu là đỉnh ngăn xếp và nút đuôi là đáy.

Như hình dưới đây, thao tác đẩy vào chỉ cần chèn một nút mới ở đầu danh sách — thường gọi là phương pháp chèn đầu. Thao tác lấy ra chỉ cần xóa nút đầu. Cả hai đều thay đổi một số lượng liên kết cố định.

![Thêm và xóa trong ngăn xếp dựa trên danh sách liên kết](stack.assets/linkedlist_stack_step1.png)

![Đẩy một phần tử vào ngăn xếp liên kết](stack.assets/linkedlist_stack_step2_push.png)

![Lấy phần tử khỏi ngăn xếp liên kết](stack.assets/linkedlist_stack_step3_pop.png)

Dưới đây là nhóm mã chính thức triển khai ngăn xếp bằng danh sách liên kết:

```python
# Nhóm mã chính thức về linked-list stack
```

### Triển khai bằng mảng

Khi dùng mảng, chúng ta xem cuối mảng là đỉnh ngăn xếp. Thao tác đẩy vào và lấy ra lần lượt tương ứng với thêm và xóa phần tử ở cuối mảng; cả hai đều có độ phức tạp $O(1)$.

![Thêm và xóa trong ngăn xếp dựa trên mảng](stack.assets/array_stack_step1.png)

![Đẩy một phần tử vào ngăn xếp mảng](stack.assets/array_stack_step2_push.png)

![Lấy phần tử khỏi ngăn xếp mảng](stack.assets/array_stack_step3_pop.png)

Số phần tử được đẩy vào có thể tăng liên tục, vì vậy chúng ta dùng mảng động để không phải tự xử lý việc mở rộng. Nhóm mã triển khai như sau:

```python
# Nhóm mã chính thức về array stack
```

## So sánh hai cách triển khai

**Các thao tác được hỗ trợ**

Cả hai cách đều hỗ trợ đầy đủ những thao tác được định nghĩa cho ngăn xếp. Bản dùng mảng còn có khả năng truy cập ngẫu nhiên, nhưng khả năng này nằm ngoài định nghĩa ngăn xếp và thường không nên được sử dụng.

**Hiệu quả thời gian**

Trong bản dùng mảng, đẩy vào và lấy ra diễn ra trên vùng nhớ liên tục đã được cấp phát, nhờ đó có tính cục bộ bộ nhớ đệm tốt và thường chạy hiệu quả hơn. Tuy nhiên, nếu thao tác đẩy vào vượt quá sức chứa hiện tại, mảng phải mở rộng; riêng lần đẩy đó có thể suy giảm thành $O(n)$.

Danh sách liên kết mở rộng linh hoạt và không gặp đợt sao chép do tăng sức chứa. Đổi lại, mỗi lần đẩy thường phải khởi tạo một đối tượng nút và sửa liên kết nên kém hiệu quả hơn. Nếu phần tử được đưa vào vốn đã là một đối tượng nút, có thể bỏ qua bước khởi tạo và giảm chi phí.

Với các phần tử là kiểu dữ liệu cơ bản như `int` hoặc `double`, có thể rút ra:

- bản dùng mảng đôi lúc chậm khi mở rộng, nhưng vì mở rộng không xảy ra thường xuyên nên hiệu quả trung bình thường cao hơn;
- bản dùng danh sách liên kết có hiệu năng ổn định hơn giữa các lần thao tác.

**Hiệu quả không gian**

Khi khởi tạo mảng động, hệ thống thường cấp một sức chứa ban đầu lớn hơn số phần tử thực tế. Cơ chế mở rộng cũng hay tăng theo một tỷ lệ nhất định, chẳng hạn gấp đôi, nên phần sức chứa mới có thể chưa được dùng hết. **Vì vậy, ngăn xếp dựa trên mảng có thể lãng phí một phần không gian**.

Mặt khác, mỗi nút danh sách liên kết phải lưu thêm con trỏ hoặc tham chiếu. **Một nút liên kết vì thế chiếm nhiều bộ nhớ hơn một phần tử mảng**. Không thể kết luận cách nào luôn tiết kiệm bộ nhớ hơn; cần xét kiểu phần tử, sức chứa dự phòng và môi trường chạy cụ thể.

## Ứng dụng điển hình của ngăn xếp

- **Tiến và lùi trong trình duyệt, hoàn tác và làm lại trong phần mềm**. Mỗi khi mở một trang mới, trình duyệt đẩy trang trước đó vào ngăn xếp; nút quay lại thực hiện thao tác lấy ra. Để hỗ trợ cả tiến và lùi cần hai ngăn xếp phối hợp.
- **Quản lý bộ nhớ của chương trình**. Mỗi lần gọi hàm, hệ thống thêm một khung ngăn xếp lên đỉnh để lưu ngữ cảnh. Trong đệ quy, pha đi xuống liên tục đẩy khung mới, còn pha quay lui liên tục lấy khung ra.
