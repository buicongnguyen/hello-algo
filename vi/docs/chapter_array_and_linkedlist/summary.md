# Tóm tắt Chương 4

### Ôn tập trọng tâm

- Mảng và danh sách liên kết đại diện cho lưu trữ liên tục và lưu trữ phân tán; ưu và nhược điểm của chúng bổ sung cho nhau.
- Mảng hỗ trợ truy cập ngẫu nhiên `O(1)` và dùng ít chi phí cấu trúc, nhưng chèn hoặc xóa thường tốn `O(n)` và độ dài cố định.
- Danh sách liên kết thay đổi liên kết để chèn và xóa trong `O(1)` khi đã biết vị trí, đồng thời mở rộng linh hoạt; đổi lại, truy cập nút tốn `O(n)` và mỗi nút cần thêm bộ nhớ.
- Ba loại phổ biến là danh sách liên kết đơn, vòng và đôi.
- Danh sách động là tập hợp có thứ tự thường được triển khai bằng mảng động. Nó giữ ưu điểm truy cập của mảng và tự mở rộng sức chứa.
- Thêm cuối danh sách động có chi phí trung bình dồn `O(1)`, nhưng một lần mở rộng riêng lẻ tốn `O(n)`.
- Ổ đĩa, RAM và bộ nhớ đệm tạo thành hệ thống phân tầng cân bằng tốc độ, dung lượng và chi phí.
- Dòng bộ nhớ đệm, nạp trước, tính cục bộ không gian và tính cục bộ thời gian giúp CPU giảm số lần đọc RAM.
- Mảng thường thân thiện với bộ nhớ đệm hơn danh sách liên kết, nhưng lựa chọn cuối cùng phải dựa trên nhu cầu thực tế.

Ưu và nhược điểm của mảng với danh sách liên kết bổ sung cho nhau. Lưu trữ liên tục hỗ trợ tính địa chỉ và tận dụng bộ nhớ đệm; lưu trữ phân tán cho phép sửa liên kết linh hoạt ở vị trí đã biết. Danh sách động bổ sung cơ chế tự mở rộng cho mảng nhưng không loại bỏ phần sức chứa trống hay chi phí sao chép thỉnh thoảng xảy ra.

Khi chọn cấu trúc, không nên chỉ so sánh ký hiệu độ phức tạp mà phải xét mẫu công việc. Mảng thường thuận lợi khi truy cập vị trí bất kỳ và duyệt toàn bộ diễn ra nhiều; danh sách liên kết có lợi khi đã giữ tham chiếu nút và cần chèn/xóa thường xuyên.

Cách dùng bộ nhớ cũng là một phần quyết định. Mảng cần một khối liên tục và có thể dành sức chứa cho tương lai nhưng không lưu liên kết trên mỗi phần tử. Danh sách liên kết dùng được các khối nhỏ linh hoạt, đổi lại mỗi nút mang thêm tham chiếu và chi phí cấp phát. Bố trí liên tục còn giúp dòng bộ nhớ đệm và nạp trước tăng tốc xử lý tuần tự.

### Hỏi và đáp

**Mảng nằm trên ngăn xếp và mảng nằm trên vùng nhớ heap có hiệu quả giống nhau không?**

Cả hai đều lưu phần tử liên tục nên hiệu quả truy cập dữ liệu gần giống nhau. Tuy nhiên, cấp phát trên ngăn xếp thường nhanh và tự động nhưng dung lượng nhỏ; vùng nhớ heap lớn và linh hoạt hơn nhưng cấp phát, giải phóng có thể chậm và dễ phân mảnh hơn.

Mảng trên ngăn xếp thường được tạo và hủy cùng vòng đời lời gọi hàm; nếu quá lớn, nó có thể vượt giới hạn ngăn xếp. Mảng trên heap cho phép xác định kích thước khi chạy và sống lâu hơn, nhưng trong ngôn ngữ quản lý thủ công phải được giải phóng đúng cách. Dù ở vùng nào, các phần tử trong mảng vẫn liên tục và công thức tính địa chỉ theo chỉ mục không đổi.

Vì vậy không nên kết luận chung rằng “ngăn xếp luôn nhanh” hay “mảng heap truy cập ngẫu nhiên chậm”. Chi phí cấp phát, không gian khả dụng và vòng đời khác nhau, nhưng cách đọc một mảng đã tồn tại là giống nhau. Phải nêu rõ đang so sánh khía cạnh nào.

**Vì sao phần tử mảng thường phải cùng kiểu?**

Khi các phần tử có cùng kích thước, hệ thống tính được địa chỉ bằng công thức cố định:

```text
địa chỉ phần tử = địa chỉ đầu mảng + kích thước phần tử × chỉ mục
```

Nếu kích thước phần tử thay đổi, công thức này không còn đủ. Danh sách liên kết truy cập qua tham chiếu nên về nguyên tắc mỗi nút có thể giữ loại dữ liệu khác nhau, dù nhiều cách triển khai vẫn dùng kiểu thống nhất để an toàn.

Kích thước đồng nhất giúp trình biên dịch tính địa chỉ bất kỳ bằng một phép nhân và một phép cộng. Muốn trộn trực tiếp các giá trị có kích thước khác nhau, cấu trúc phải lưu riêng vị trí bắt đầu hoặc lưu các tham chiếu cùng kích thước thay cho đối tượng thật. Danh sách Python hoạt động như mảng chính vì mảng nền chứa các tham chiếu đều nhau.

Kích thước cố định còn thuận lợi cho căn chỉnh và bố trí bộ nhớ đệm. Trình biên dịch biết phạm vi mỗi ô để tối ưu vòng lặp. Mảng tham chiếu giữ các ô đồng nhất, đổi lại phải đi qua thêm một tham chiếu để tới đối tượng và không bảo đảm thân đối tượng nằm liên tục.

**Sau khi xóa nút `P`, có cần đặt `P.next = None` không?**

Về thuật toán, không bắt buộc nếu danh sách đi từ nút đầu không còn đến được `P`. Trong thư viện hoặc hệ thống quản lý tài nguyên phức tạp, ngắt liên kết rõ ràng thường an toàn và dễ hiểu hơn.

Nếu mã bên ngoài vẫn giữ `P`, trường `P.next` cũng tiếp tục trỏ tới các nút sau. Liên kết này có thể gây lỗi logic hoặc kéo dài vòng đời đối tượng, nên nhiều thư viện đưa nút bị xóa về trạng thái độc lập rõ ràng.

Trong ngôn ngữ quản lý bộ nhớ thủ công, ngắt tham chiếu và giải phóng bộ nhớ là hai việc khác nhau. Chỉ đặt rỗng không tự động trả bộ nhớ; ngược lại, giải phóng một nút vẫn được dùng sẽ tạo địa chỉ không hợp lệ. Cần tuân thủ cả phép xóa logic của cấu trúc lẫn quy tắc tài nguyên của ngôn ngữ.

**Tại sao nói chèn và xóa danh sách liên kết là $O(1)$ khi tìm vị trí mất $O(n)$?**

$O(1)$ chỉ mô tả thao tác đổi liên kết khi vị trí đã biết. Nếu phải tìm nút trước, tổng thời gian là $O(n)$. Các cấu trúc duy trì sẵn tham chiếu đến hai đầu, như hàng đợi hai đầu, có thể thực hiện nhiều thao tác chèn và xóa thực sự trong $O(1)$.

Điều kiện đầu vào của thao tác phải được nói rõ. “Chèn sau một nút” nhận trực tiếp tham chiếu nút; “chèn tại một chỉ mục” còn bao gồm bước tìm vị trí. Cùng một danh sách liên kết nhưng hai giao diện có tổng chi phí khác nhau.

**Phần tham chiếu trong hình minh họa nút chiếm bao nhiêu bộ nhớ?**

Hình chỉ mô tả định tính. Dung lượng giá trị phụ thuộc kiểu như `int`, `long`, `double` hoặc đối tượng; dung lượng tham chiếu phụ thuộc hệ điều hành và môi trường biên dịch, thường là 4 hoặc 8 byte. Vì vậy không thể suy ra tỷ lệ chính xác chỉ từ kích thước các khối trong hình.

Tiêu đề đối tượng, phần đệm căn chỉnh và dữ liệu quản lý của bộ cấp phát cũng ảnh hưởng kích thước thật. Trong một nút chỉ chứa số nguyên nhỏ, tham chiếu và phần quản lý có thể lớn hơn giá trị; với một đối tượng lớn, tỉ lệ lại khác.

**Thêm cuối danh sách động luôn là $O(1)$ phải không?**

Không phải từng lần. Nếu mảng nền đầy, hệ thống phải cấp phát và sao chép trong $O(n)$. Nhưng khi sức chứa tăng theo hệ số, chi phí trung bình dồn của một chuỗi thao tác thêm vẫn là $O(1)$.

Nếu tăng sức chứa gấp đôi, sau một lần mở rộng sẽ có đủ chỗ cho nhiều phép thêm rẻ. Chia chi phí mở rộng cho toàn bộ các phép thêm giữa hai lần mở rộng cho kết quả trung bình hằng số. Tuy nhiên hệ thống thời gian thực vẫn phải xét độ trễ cực đại của một lần mở rộng hiếm gặp.

Khi biết gần đúng kích thước cuối, đặt trước sức chứa giúp giảm số lần sao chép. Ngược lại, đặt trước quá lớn làm lãng phí không gian. Phân tích trung bình dồn mô tả một chuỗi dài, còn giới hạn độ trễ và mức bộ nhớ đỉnh cần được đánh giá riêng.

**Phần bộ nhớ lãng phí của danh sách động đến từ đâu?**

Danh sách thường có sức chứa ban đầu và mở rộng theo một hệ số như $\times 1.5$. Sau mỗi lần mở rộng, một số ô chưa được dùng. Các biến quản lý như kích thước và sức chứa cũng có chi phí nhỏ, nhưng phần ô trống thường là nguồn lãng phí chính.

Hệ số lớn giảm số lần sao chép nhưng tăng lượng ô trống trung bình; hệ số nhỏ tiết kiệm không gian nhưng mở rộng thường xuyên hơn. Thư viện chuẩn chọn một điểm cân bằng dựa trên mẫu sử dụng phổ biến và chi phí của bộ cấp phát.

Một số cài đặt không giảm sức chứa ngay sau khi xóa nhiều phần tử, vì thu nhỏ rồi sớm mở rộng lại sẽ tạo dao động tốn kém. Thay vào đó, chúng cung cấp thao tác thu gọn rõ ràng hoặc chỉ giảm dưới một điều kiện đủ chặt.

**Danh sách Python có phải mảng nếu các đối tượng phần tử không nằm liên tục?**

Có. Mảng nền của danh sách Python lưu các tham chiếu liên tục, không nhất thiết lưu trực tiếp đối tượng. Nhờ đó, hệ thống vẫn lấy tham chiếu tại một chỉ mục trong $O(1)$ dù các đối tượng được tham chiếu nằm rải rác.

Phần liên tục là các ô chứa địa chỉ đối tượng, không phải thân đối tượng. Sau khi đọc ô theo chỉ mục, chương trình đi qua tham chiếu để đến giá trị thật. Nhiều danh sách cũng có thể cùng trỏ tới một đối tượng; nếu đối tượng đó thay đổi được, sửa qua một đường sẽ xuất hiện ở các đường còn lại.

**`[[0]] * n` có tạo ra $n$ danh sách con độc lập không?**

Không. Các phần tử đều trỏ đến cùng một danh sách `[0]`. Muốn tạo các danh sách độc lập, dùng biểu thức sinh:

Phép nhân không sao chép sâu đối tượng phần tử mà chỉ lặp lại cùng tham chiếu. Vì vậy, thêm một giá trị vào một danh sách con sẽ được quan sát ở mọi vị trí. Biểu thức sinh tạo một đối tượng danh sách con mới ở mỗi lượt nên các phần tử độc lập.

```python
n = 4
independent = [[0] for _ in range(n)]
```

Với `[0] * n`, các phần tử cũng có thể cùng tham chiếu đến một đối tượng số nguyên nhỏ, nhưng số nguyên là bất biến. Gán lại một phần tử chỉ đổi tham chiếu ở vị trí đó, nên không làm các vị trí khác thay đổi.

Phải xem xét đồng thời tính thay đổi được và việc chia sẻ tham chiếu. Với đối tượng bất biến, gán mới chỉ thay địa chỉ trong một ô; với đối tượng thay đổi được, sửa nội dung sẽ hiện ở mọi tham chiếu cùng nhìn đối tượng ấy.

**Vì sao nhiều bài thuật toán C++ không dùng trực tiếp `std::list`?**

`std::list` là danh sách liên kết đôi nên mỗi phần tử cần thêm hai con trỏ và dữ liệu không nằm liên tục. Nó thường tốn bộ nhớ và tận dụng bộ nhớ đệm kém hơn `std::vector`. Vì vậy, mảng động thường được ưu tiên; danh sách liên kết chỉ phù hợp khi lợi ích chèn, xóa theo nút thực sự quan trọng.

Nhiều thuật toán còn yêu cầu bộ lặp truy cập ngẫu nhiên hoặc được cài đơn giản hơn trên vùng nhớ liên tục. `std::list` mạnh khi chèn/xóa tại một bộ lặp đã biết, nhưng nếu cộng cả chi phí tìm vị trí và cấp phát nút, lợi ích dự kiến có thể biến mất.

Không thể chọn danh sách liên kết chỉ vì “có chèn ở giữa”. Cần biết vị trí được tìm với chi phí nào, việc dịch giá trị có đắt hơn cấp phát nút hay không và dữ liệu tận dụng bộ nhớ đệm ra sao. Mảng động là mặc định thực dụng cho nhiều giá trị nhỏ và thao tác duyệt; danh sách liên kết phù hợp khi địa chỉ nút ổn định hoặc đổi liên kết nhanh là yêu cầu cốt lõi.
