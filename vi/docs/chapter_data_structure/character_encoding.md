# Mã hóa ký tự *

Trong máy tính, ký tự cũng được lưu dưới dạng nhị phân. Để chuyển giữa ký tự và số, chúng ta cần một **bộ ký tự** quy định mỗi ký tự tương ứng với một mã số duy nhất.

## Bộ ký tự ASCII

ASCII, viết tắt của American Standard Code for Information Interchange, là một trong những bộ ký tự sớm nhất. ASCII dùng 7 bit để biểu diễn tối đa 128 ký tự, gồm chữ cái tiếng Anh, chữ số, dấu câu và các ký tự điều khiển như xuống dòng hay tab.

![Bảng mã ASCII](character_encoding.assets/ascii_table.png)

ASCII chỉ đáp ứng tiếng Anh. EASCII mở rộng lên 8 bit và 256 mã. Các biến thể EASCII giữ 128 mã đầu giống ASCII nhưng định nghĩa 128 mã sau theo nhu cầu từng khu vực. Tuy vậy, 256 mã vẫn không đủ cho nhiều hệ chữ viết.

## Bộ ký tự GBK

Năm 1980, tiêu chuẩn GB2312 được công bố để hỗ trợ xử lý tiếng Trung trên máy tính, bao gồm 6.763 chữ Hán. GBK sau đó mở rộng GB2312 để hỗ trợ thêm chữ hiếm và chữ phồn thể, với tổng cộng 21.886 chữ Hán. Trong cách mã hóa GBK, ký tự ASCII dùng 1 byte còn chữ Hán thường dùng 2 byte.

GBK là một ví dụ cho thấy các bộ ký tự theo từng ngôn ngữ có thể giải quyết nhu cầu cục bộ nhưng không thuận tiện trong môi trường đa ngôn ngữ.

## Bộ ký tự Unicode

Khi nhiều bộ ký tự cùng tồn tại, hai hệ thống dùng tiêu chuẩn khác nhau có thể hiển thị dữ liệu thành ký tự rác. Unicode ra đời để cung cấp một không gian mã thống nhất cho các ký tự và ký hiệu trên toàn thế giới.

Unicode gán cho mỗi ký tự một **điểm mã** duy nhất trong phạm vi từ `U+0000` đến `U+10FFFF`. Tuy nhiên, Unicode xác định ký tự và điểm mã chứ không tự quy định một cách lưu byte duy nhất. Chúng ta vẫn cần một dạng mã hóa như UTF-8, UTF-16 hoặc UTF-32.

Một cách đơn giản là cấp cùng số byte cho mọi ký tự. Ví dụ, nếu mỗi ký tự luôn chiếm 2 byte thì hệ thống dễ phân tách chuỗi, nhưng văn bản chỉ gồm ký tự ASCII sẽ tốn gấp đôi dung lượng cần thiết.

![Ví dụ biểu diễn điểm mã Unicode](character_encoding.assets/unicode_hello_algo.png)

## Mã hóa UTF-8

UTF-8 là cách mã hóa Unicode được sử dụng rộng rãi. Đây là **mã hóa độ dài biến đổi**, dùng từ 1 đến 4 byte cho một ký tự.

- Ký tự ASCII dùng 1 byte. Bit cao nhất là $0$, bảy bit còn lại chứa điểm mã. Vì vậy UTF-8 tương thích ngược với ASCII.
- Với ký tự dài $n$ byte, $n$ bit đầu của byte thứ nhất là $1$, bit tiếp theo là $0$. Mỗi byte nối tiếp bắt đầu bằng `10`; các bit còn lại chứa điểm mã.

Nhờ số bit `1` liên tiếp ở đầu byte thứ nhất, hệ thống biết một ký tự dài bao nhiêu byte. Tiền tố `10` của các byte nối tiếp cũng giúp phát hiện khi quá trình đọc bắt đầu ở giữa một ký tự.

![Ví dụ mã hóa UTF-8](character_encoding.assets/utf-8_hello_algo.png)

Hai dạng mã hóa Unicode phổ biến khác là:

- **UTF-16**: dùng 2 hoặc 4 byte cho một ký tự. Nhiều ký tự phổ biến dùng 2 byte, còn ký tự ngoài mặt phẳng đa ngôn ngữ cơ bản cần một cặp đại diện 4 byte.
- **UTF-32**: dùng 4 byte cố định cho mỗi điểm mã, dễ định vị nhưng thường tốn nhiều không gian hơn.

UTF-8 đặc biệt hiệu quả với văn bản có nhiều ký tự ASCII và có khả năng tương thích rất tốt. UTF-16 có thể tiết kiệm không gian hơn với một số nhóm ký tự không thuộc ASCII. Lựa chọn phù hợp phụ thuộc dữ liệu và môi trường xử lý.

## Mã hóa ký tự trong ngôn ngữ lập trình

Cách chuỗi được giữ trong bộ nhớ ảnh hưởng đến thao tác truy cập và đếm ký tự.

- Với biểu diễn có đơn vị cố định, việc truy cập theo vị trí và tính độ dài có thể đơn giản hơn.
- Với UTF-8 có độ dài biến đổi, muốn tìm ký tự thứ $i$ có thể phải đi từ đầu chuỗi, vì một ký tự có thể chiếm nhiều byte.
- Các thao tác cắt, nối, chèn và xóa phải tôn trọng ranh giới điểm mã để không tạo chuỗi byte UTF-8 không hợp lệ.

Một số ngôn ngữ có lựa chọn triển khai khác nhau.

- Java, JavaScript, TypeScript và C# sử dụng các đơn vị mã UTF-16 cho chuỗi. Ký tự ngoài phạm vi 16 bit được biểu diễn bằng cặp đại diện.
- CPython thường dùng biểu diễn chuỗi linh hoạt; dung lượng mỗi đơn vị phụ thuộc điểm mã lớn nhất xuất hiện trong chuỗi. Đây là chi tiết triển khai, không phải lời hứa chung cho mọi trình thông dịch Python.
- Go lưu `string` dưới dạng byte UTF-8 và cung cấp kiểu `rune` cho một điểm mã Unicode.
- Rust lưu `str` và `String` dưới dạng UTF-8, đồng thời cung cấp `char` để biểu diễn một giá trị vô hướng Unicode.

Cách chuỗi nằm trong bộ nhớ khi chương trình chạy khác với cách chuỗi được lưu trong tệp hoặc truyền qua mạng. Trong tệp và giao thức mạng, UTF-8 thường được ưu tiên nhờ khả năng tương thích và hiệu quả không gian.
