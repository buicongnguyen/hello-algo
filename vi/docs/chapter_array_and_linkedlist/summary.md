# Tóm tắt Chương 4

### Ôn tập trọng tâm

- Mảng và danh sách liên kết đại diện cho lưu trữ liên tục và lưu trữ phân tán; ưu và nhược điểm của chúng bổ sung cho nhau.
- Mảng hỗ trợ truy cập ngẫu nhiên $O(1)$ và dùng ít chi phí cấu trúc, nhưng chèn hoặc xóa thường tốn $O(n)$ và độ dài cố định.
- Danh sách liên kết thay đổi liên kết để chèn và xóa trong $O(1)$ khi đã biết vị trí, đồng thời mở rộng linh hoạt; đổi lại, truy cập nút tốn $O(n)$ và mỗi nút cần thêm bộ nhớ.
- Ba loại phổ biến là danh sách liên kết đơn, vòng và đôi.
- Danh sách động là tập hợp có thứ tự thường được triển khai bằng mảng động. Nó giữ ưu điểm truy cập của mảng và tự mở rộng sức chứa.
- Thêm cuối danh sách động có chi phí trung bình dồn $O(1)$, nhưng một lần mở rộng riêng lẻ tốn $O(n)$.
- Ổ đĩa, RAM và bộ nhớ đệm tạo thành hệ thống phân tầng cân bằng tốc độ, dung lượng và chi phí.
- Dòng bộ nhớ đệm, nạp trước, tính cục bộ không gian và tính cục bộ thời gian giúp CPU giảm số lần đọc RAM.
- Mảng thường thân thiện với bộ nhớ đệm hơn danh sách liên kết, nhưng lựa chọn cuối cùng phải dựa trên nhu cầu thực tế.

### Hỏi và đáp

**Mảng nằm trên ngăn xếp và mảng nằm trên vùng nhớ heap có hiệu quả giống nhau không?**

Cả hai đều lưu phần tử liên tục nên hiệu quả truy cập dữ liệu gần giống nhau. Tuy nhiên, cấp phát trên ngăn xếp thường nhanh và tự động nhưng dung lượng nhỏ; vùng nhớ heap lớn và linh hoạt hơn nhưng cấp phát, giải phóng có thể chậm và dễ phân mảnh hơn.

**Vì sao phần tử mảng thường phải cùng kiểu?**

Khi các phần tử có cùng kích thước, hệ thống tính được địa chỉ bằng công thức cố định:

```text
địa chỉ phần tử = địa chỉ đầu mảng + kích thước phần tử × chỉ mục
```

Nếu kích thước phần tử thay đổi, công thức này không còn đủ. Danh sách liên kết truy cập qua tham chiếu nên về nguyên tắc mỗi nút có thể giữ loại dữ liệu khác nhau, dù nhiều cách triển khai vẫn dùng kiểu thống nhất để an toàn.

**Sau khi xóa nút `P`, có cần đặt `P.next = None` không?**

Về thuật toán, không bắt buộc nếu danh sách đi từ nút đầu không còn đến được `P`. Trong thư viện hoặc hệ thống quản lý tài nguyên phức tạp, ngắt liên kết rõ ràng thường an toàn và dễ hiểu hơn.

**Tại sao nói chèn và xóa danh sách liên kết là $O(1)$ khi tìm vị trí mất $O(n)$?**

$O(1)$ chỉ mô tả thao tác đổi liên kết khi vị trí đã biết. Nếu phải tìm nút trước, tổng thời gian là $O(n)$. Các cấu trúc duy trì sẵn tham chiếu đến hai đầu, như hàng đợi hai đầu, có thể thực hiện nhiều thao tác chèn và xóa thực sự trong $O(1)$.

**Phần tham chiếu trong hình minh họa nút chiếm bao nhiêu bộ nhớ?**

Hình chỉ mô tả định tính. Dung lượng giá trị phụ thuộc kiểu như `int`, `long`, `double` hoặc đối tượng; dung lượng tham chiếu phụ thuộc hệ điều hành và môi trường biên dịch, thường là 4 hoặc 8 byte. Vì vậy không thể suy ra tỷ lệ chính xác chỉ từ kích thước các khối trong hình.

**Thêm cuối danh sách động luôn là $O(1)$ phải không?**

Không phải từng lần. Nếu mảng nền đầy, hệ thống phải cấp phát và sao chép trong $O(n)$. Nhưng khi sức chứa tăng theo hệ số, chi phí trung bình dồn của một chuỗi thao tác thêm vẫn là $O(1)$.

**Phần bộ nhớ lãng phí của danh sách động đến từ đâu?**

Danh sách thường có sức chứa ban đầu và mở rộng theo một hệ số như $1.5$ hoặc $2$. Sau mỗi lần mở rộng, một số ô chưa được dùng. Các biến quản lý như kích thước và sức chứa cũng có chi phí nhỏ, nhưng phần ô trống thường là nguồn lãng phí chính.

**Danh sách Python có phải mảng nếu các đối tượng phần tử không nằm liên tục?**

Có. Mảng nền của danh sách Python lưu các tham chiếu liên tục, không nhất thiết lưu trực tiếp đối tượng. Nhờ đó, hệ thống vẫn lấy tham chiếu tại một chỉ mục trong $O(1)$ dù các đối tượng được tham chiếu nằm rải rác.

**`[[0]] * n` có tạo ra $n$ danh sách con độc lập không?**

Không. Các phần tử đều trỏ đến cùng một danh sách `[0]`. Muốn tạo các danh sách độc lập, dùng biểu thức sinh:

```python
n = 4
independent = [[0] for _ in range(n)]
```

Với `[0] * n`, các phần tử cũng có thể cùng tham chiếu đến một đối tượng số nguyên nhỏ, nhưng số nguyên là bất biến. Gán lại một phần tử chỉ đổi tham chiếu ở vị trí đó, nên không làm các vị trí khác thay đổi.

**Vì sao nhiều bài thuật toán C++ không dùng trực tiếp `std::list`?**

`std::list` là danh sách liên kết đôi nên mỗi phần tử cần thêm hai con trỏ và dữ liệu không nằm liên tục. Nó thường tốn bộ nhớ và tận dụng bộ nhớ đệm kém hơn `std::vector`. Vì vậy, mảng động thường được ưu tiên; danh sách liên kết chỉ phù hợp khi lợi ích chèn, xóa theo nút thực sự quan trọng.
