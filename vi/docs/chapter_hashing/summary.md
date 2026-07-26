# Tóm tắt

### Ôn tập trọng tâm

- Khi nhập `key`, bảng băm có thể trả về `value` tương ứng trong thời gian $O(1)$ nên đạt hiệu suất rất cao.
- Các thao tác thường dùng gồm truy vấn, thêm cặp khóa–giá trị, xóa cặp và duyệt bảng băm.
- Hàm băm ánh xạ `key` sang một chỉ số mảng, nhờ đó truy cập bucket và lấy `value` tương ứng.
- Hai khóa khác nhau có thể cho cùng chỉ số sau khi băm, dẫn đến kết quả truy vấn sai; hiện tượng này được gọi là xung đột băm.
- Sức chứa bảng càng lớn thì xác suất xung đột càng thấp, vì vậy mở rộng có thể làm giảm xung đột. Tương tự mảng, mở rộng bảng băm có chi phí lớn.
- Hệ số tải bằng số phần tử chia cho số bucket, phản ánh mức độ xung đột và thường được dùng làm điều kiện kích hoạt mở rộng.
- Tạo chuỗi riêng lưu mọi phần tử xung đột trong cùng danh sách liên kết. Nếu danh sách quá dài, hiệu suất truy vấn giảm; có thể đổi danh sách thành cây đỏ–đen để cải thiện.
- Định địa chỉ mở xử lý xung đột bằng thăm dò. Thăm dò tuyến tính dùng bước cố định nhưng không thể xóa trực tiếp và dễ tạo cụm. Dùng nhiều hàm băm giảm tạo cụm nhưng tăng chi phí tính toán.
- Ngôn ngữ lập trình chọn cách cài đặt khác nhau. `HashMap` của Java dùng tạo chuỗi riêng, còn `dict` của Python dùng định địa chỉ mở.
- Với bảng băm, thuật toán băm nên có tính xác định, hiệu suất cao và phân bố đồng đều. Trong mật mã, nó còn cần kháng xung đột và có hiệu ứng thác lũ.
- Thuật toán băm thường dùng số nguyên tố lớn làm mô-đun để tăng độ đồng đều của giá trị và giảm xung đột.
- Những thuật toán phổ biến gồm MD5, SHA-1, SHA-2 và SHA-3. MD5 thường chỉ còn dùng để kiểm tra tính toàn vẹn, còn SHA-2 phổ biến trong ứng dụng và giao thức bảo mật.
- Ngôn ngữ lập trình thường cung cấp thuật toán băm tích hợp cho các kiểu dữ liệu để tính chỉ số bucket. Nói chung, chỉ đối tượng bất biến mới có thể băm an toàn.

### Hỏi và đáp

**Hỏi**: Khi nào độ phức tạp thời gian của bảng băm suy giảm thành $O(n)$?

Độ phức tạp có thể suy giảm thành $O(n)$ khi xung đột rất nghiêm trọng. Nếu hàm băm được thiết kế tốt, sức chứa phù hợp và xung đột phân bố đều thì thao tác có độ phức tạp $O(1)$. Khi dùng bảng băm tích hợp của ngôn ngữ lập trình, thông thường có thể xem độ phức tạp là $O(1)$.

**Hỏi**: Vì sao không dùng hàm băm $f(x) = x$ để loại bỏ xung đột?

Với $f(x) = x$, mỗi phần tử tương ứng một chỉ số duy nhất, thực chất giống như dùng mảng. Không gian đầu vào thường lớn hơn rất nhiều không gian đầu ra, tức độ dài mảng, nên bước cuối của hàm băm thường là chia lấy dư cho độ dài. Mục tiêu của bảng băm là ánh xạ không gian trạng thái lớn sang không gian nhỏ hơn mà vẫn cung cấp truy vấn $O(1)$.

**Hỏi**: Vì sao bảng băm có thể hiệu quả hơn mảng, danh sách liên kết hoặc cây nhị phân dù bản thân nó được cài đặt bằng những cấu trúc đó?

Trước hết, bảng băm có hiệu suất thời gian cao hơn nhưng hiệu suất không gian thấp hơn vì một phần đáng kể bộ nhớ được để trống.

Tiếp theo, bảng băm chỉ nhanh hơn trong những tình huống phù hợp. Nếu một chức năng đạt cùng độ phức tạp bằng mảng hoặc danh sách liên kết, cấu trúc đơn giản thường chạy nhanh hơn vì bảng băm phải trả thêm chi phí tính hàm băm và có hằng số thời gian lớn hơn.

Cuối cùng, hiệu suất bảng băm có thể suy giảm. Với tạo chuỗi riêng, thao tác tìm kiếm vẫn diễn ra trong danh sách liên kết hoặc cây đỏ–đen và có nguy cơ xuống tới $O(n)$.

**Hỏi**: Dùng nhiều hàm băm có hạn chế không thể xóa trực tiếp không? Vị trí đã đánh dấu xóa có tái sử dụng được không?

Dùng nhiều hàm băm là một dạng định địa chỉ mở, nên không thể xóa trực tiếp mà phải đánh dấu phần tử đã xóa. Vị trí được đánh dấu có thể tái sử dụng: khi thêm phần tử mới và hàm băm chỉ tới vị trí đó, phần tử mới có thể được đặt vào đây. Cách làm vừa giữ nguyên chuỗi thăm dò vừa sử dụng không gian hiệu quả.

**Hỏi**: Vì sao xung đột cũng xuất hiện trong quá trình tìm kiếm của thăm dò tuyến tính?

Hàm băm chỉ tới bucket và cặp khóa–giá trị tương ứng. Nếu `key` không khớp, đó là một xung đột. Quá trình thăm dò tiếp tục theo bước định trước cho đến khi tìm thấy đúng cặp hoặc xác định tìm kiếm thất bại.

**Hỏi**: Vì sao mở rộng bảng băm có thể giảm xung đột?

Bước cuối của hàm băm thường chia lấy dư cho độ dài mảng $n$ để giữ đầu ra trong phạm vi chỉ số. Khi mở rộng, $n$ thay đổi nên chỉ số của các khóa cũng có thể thay đổi. Những khóa từng rơi vào cùng bucket có thể được phân tán sang nhiều bucket mới.

**Hỏi**: Nếu mục tiêu là truy cập hiệu quả, vì sao không dùng mảng trực tiếp?

Khi `key` là các số nguyên liên tục trong một phạm vi nhỏ, mảng đúng là lựa chọn đơn giản và hiệu quả. Nhưng nếu `key` là kiểu khác, chẳng hạn chuỗi, cần một hàm băm để ánh xạ khóa sang chỉ số mảng rồi lưu phần tử trong mảng bucket. Cấu trúc đó chính là bảng băm.
