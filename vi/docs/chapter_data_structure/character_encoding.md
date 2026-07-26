# Mã hóa ký tự *

Trong máy tính, mọi dữ liệu đều được lưu ở dạng nhị phân và ký tự `char` cũng không ngoại lệ. Để biểu diễn ký tự, cần một **bộ ký tự** định nghĩa quan hệ một–một giữa mỗi ký tự và một số nhị phân. Có bảng ánh xạ này, máy tính có thể tra số rồi chuyển thành ký tự tương ứng.

## Bộ ký tự ASCII

<u>Mã ASCII</u>, tên đầy đủ là American Standard Code for Information Interchange, là một trong những bộ ký tự lâu đời nhất. Nó dùng 7 bit thấp của một byte cho mỗi ký tự, nên biểu diễn tối đa 128 ký tự khác nhau. Như bảng dưới đây, ASCII gồm chữ hoa, chữ thường tiếng Anh, các chữ số 0–9, dấu câu và ký tự điều khiển như xuống dòng, tab.

![Bảng mã ASCII](character_encoding.assets/ascii_table.png)

Tuy nhiên, **ASCII chỉ biểu diễn được tiếng Anh.** Khi máy tính phổ biến trên toàn thế giới, bộ ký tự <u>EASCII</u> ra đời để hỗ trợ thêm ngôn ngữ. Nó mở rộng 7 bit của ASCII thành 8 bit và biểu diễn 256 ký tự khác nhau.

Nhiều khu vực lần lượt tạo biến thể EASCII phù hợp với ngôn ngữ của mình. Các bộ này giữ nguyên 128 ký tự đầu giống ASCII, nhưng định nghĩa 128 vị trí sau theo nhu cầu địa phương. Vì vậy, cùng một giá trị byte có thể được hiểu thành ký tự khác nhau tùy bộ ký tự.

Cách làm này giữ tương thích với tài liệu tiếng Anh cũ và bổ sung ký tự khu vực. Nhưng nếu không gửi kèm tên biến thể EASCII, bên nhận không thể giải mã đúng 128 giá trị phía sau. Việc trộn nhiều ngôn ngữ trong cùng tài liệu cũng khó. Bài toán không chỉ là tăng kích thước bảng mà còn là bảo đảm bên gửi và bên nhận thống nhất quy tắc.

## Bộ ký tự GBK

Theo thời gian, **số vị trí của EASCII vẫn không đủ cho nhiều ngôn ngữ.** Hệ chữ Hán có gần một trăm nghìn chữ và hàng nghìn chữ được dùng thường ngày. Năm 1980, cơ quan tiêu chuẩn hóa Trung Quốc công bố <u>GB2312</u> với 6.763 chữ Hán, đáp ứng phần lớn nhu cầu xử lý tiếng Trung thông thường.

GB2312 vẫn thiếu một số chữ hiếm và chữ phồn thể. <u>GBK</u> mở rộng GB2312 và chứa tổng cộng 21.886 chữ Hán. Trong mã hóa GBK, ký tự ASCII dùng 1 byte, còn chữ Hán dùng 2 byte. Kiểu mã hóa khu vực này hiệu quả cho ngôn ngữ đích nhưng tiếp tục gây vấn đề tương thích trong môi trường đa ngôn ngữ.

Với quy tắc độ dài biến đổi của GBK, chương trình phải nhận biết byte hiện tại là một ký tự ASCII hoàn chỉnh hay byte đầu của chữ Hán hai byte. Nếu đoán sai mã hóa tệp, ranh giới byte có thể lệch và nhiều ký tự liên tiếp bị hỏng. Các mã vùng khác cũng không tương thích trực tiếp, buộc phần mềm quốc tế duy trì nhiều bảng chuyển đổi.

## Bộ ký tự Unicode

Khi công nghệ máy tính phát triển, số bộ ký tự và tiêu chuẩn mã hóa tăng nhanh rồi tạo ra hai vấn đề lớn. Thứ nhất, mỗi bộ thường chỉ định nghĩa một ngôn ngữ nên không hoạt động tốt trong môi trường đa ngôn ngữ. Thứ hai, ngay cả một ngôn ngữ cũng có nhiều tiêu chuẩn; hai máy dùng mã khác nhau sẽ thấy ký tự bị lỗi khi trao đổi dữ liệu.

Các nhà nghiên cứu đặt câu hỏi: **nếu tạo một bộ ký tự đủ đầy để chứa mọi ngôn ngữ và ký hiệu trên thế giới, liệu có thể đồng thời giải quyết môi trường đa ngôn ngữ và lỗi ký tự không?** Ý tưởng đó dẫn đến Unicode, một bộ ký tự lớn và thống nhất.

<u>Unicode</u> về lý thuyết chứa hơn một triệu ký tự. Mục tiêu là gom chữ viết và ký hiệu của nhiều ngôn ngữ vào cùng không gian, giảm vấn đề do tiêu chuẩn riêng biệt. Từ khi công bố năm 1991, Unicode liên tục bổ sung ngôn ngữ, ký hiệu và emoji; đến tháng 9 năm 2022 đã chứa 149.186 ký tự.

Unicode gán cho mỗi ký tự một **điểm mã**, tức mã định danh duy nhất. Phạm vi từ U+0000 đến U+10FFFF tạo thành một không gian số thống nhất. Tuy nhiên, **Unicode tự nó không quy định điểm mã phải được lưu thành dãy byte nào.** Khi các mã có độ dài khác nhau nằm cạnh nhau, vẫn cần quy tắc lưu trữ để biết ranh giới của từng ký tự.

Vì thế cần phân biệt bộ ký tự và mã hóa ký tự. Bộ Unicode trả lời “ký tự này mang số nào”; UTF-8, UTF-16 và UTF-32 trả lời “số đó được lưu thành dãy byte nào”. Một điểm mã có thể tạo dãy byte khác nhau tùy mã hóa, nhưng sau khi giải mã đều chỉ cùng một ký tự Unicode.

Cách đơn giản nhất là lưu mọi ký tự với cùng độ dài. Trong hình dưới, mỗi ký tự của “Hello” cần 1 byte, còn mỗi ký tự của “算法” cần 2 byte. Nếu ép toàn bộ “Hello 算法” thành 2 byte mỗi ký tự và điền 0 vào phần cao, hệ thống có thể đọc đúng mỗi 2 byte thành một ký tự.

![Ví dụ mã hóa Unicode](character_encoding.assets/unicode_hello_algo.png)

Nhưng ASCII cho thấy ký tự tiếng Anh chỉ cần 1 byte. Dùng 2 byte cho tất cả làm tài liệu tiếng Anh lớn gấp đôi và lãng phí bộ nhớ. Vì vậy, cần một mã hóa Unicode hiệu quả hơn: vừa xác định rõ ranh giới điểm mã, vừa dùng ít byte cho ký tự thường gặp.

## Mã hóa UTF-8

UTF-8 hiện là mã hóa Unicode phổ biến nhất trên thế giới. Đây là **mã hóa độ dài biến đổi dùng 1–4 byte tùy ký tự**. Ký tự ASCII dùng 1 byte, nhiều ký tự Latin và Hy Lạp dùng 2 byte, chữ Hán phổ biến dùng 3 byte, một số ký tự hiếm dùng 4 byte.

Quy tắc UTF-8 chia thành hai trường hợp:

- Ký tự 1 byte đặt bit cao nhất là $0$, 7 bit còn lại chứa điểm mã Unicode. Vì 128 điểm mã đầu của Unicode chính là ASCII, **UTF-8 tương thích ngược với ASCII**; tài liệu ASCII cũ có thể được đọc trực tiếp như UTF-8.
- Ký tự dài $n$ byte, với $n > 1$, đặt $n$ bit cao đầu tiên của byte thứ nhất thành $1$, bit thứ $(n + 1)$ thành $0$. Từ byte thứ hai, hai bit cao nhất luôn là $10$; các bit còn lại chứa điểm mã.

Hình dưới minh họa mã UTF-8 của “Hello 算法”. Vì $n$ bit đầu byte thứ nhất đều là $1$, hệ thống đếm số bit $1$ này để biết ký tự dài $n$ byte.

Tại sao hai bit đầu của các byte tiếp theo là $10$? Mẫu $10$ đóng vai trò dấu kiểm tra. Nếu hệ thống bắt đầu đọc nhầm từ một byte ở giữa, nó thấy tiền tố $10$ và nhanh chóng nhận ra đây không phải điểm bắt đầu ký tự.

$10$ có thể làm dấu vì theo quy tắc UTF-8, hai bit đầu của một ký tự không thể là $10$. Nếu giả sử là $10$, số bit $1$ đầu tiên cho thấy ký tự dài $1$ byte, tức thuộc ASCII; nhưng bit cao nhất của ASCII phải là $0$, tạo mâu thuẫn.

Tính tự đồng bộ đặc biệt hữu ích khi truyền mạng hoặc khi một phần tệp hỏng. Dù bắt đầu từ byte giữa, chương trình có thể nhận ra byte tiếp diễn và tìm ranh giới ký tự kế tiếp. Việc giữ nguyên biểu diễn ASCII cũng cho phép giao thức và công cụ cũ chuyển dần sang Unicode mà không phải thay đổi toàn bộ.

![Ví dụ mã hóa UTF-8](character_encoding.assets/utf-8_hello_algo.png)

Ngoài UTF-8, hai mã hóa Unicode thường gặp khác là:

- **UTF-16**: dùng 2 hoặc 4 byte cho một ký tự. ASCII và nhiều ký tự ngoài tiếng Anh phổ biến dùng 2 byte; một số ký tự dùng 4 byte. Với ký tự 2 byte, giá trị UTF-16 giống điểm mã Unicode.
- **UTF-32**: dùng 4 byte cho mọi ký tự. Với tài liệu có nhiều ASCII, nó tốn nhiều không gian hơn đáng kể so với UTF-8 và UTF-16.

Xét riêng không gian, UTF-8 hiệu quả cho tiếng Anh vì mỗi ký tự chỉ cần 1 byte. Một số ký tự ngoài tiếng Anh, chẳng hạn chữ Hán phổ biến, có thể dùng 2 byte trong UTF-16 nhưng 3 byte trong UTF-8, nên UTF-16 đôi khi nhỏ hơn. Xét tương thích, UTF-8 phổ biến nhất và được nhiều công cụ, thư viện ưu tiên.

Không có một mã hóa luôn nhỏ nhất cho mọi tài liệu. Hiệu quả phụ thuộc các ký tự xuất hiện và tần suất của chúng. Dẫu vậy, trên web và trong trao đổi dữ liệu công khai, khả năng tương thích ASCII, phục hồi ranh giới ký tự và hỗ trợ rộng trên nhiều hệ điều hành thường khiến UTF-8 trở thành lựa chọn mặc định.

## Mã hóa ký tự trong ngôn ngữ lập trình

Trong quá khứ, nhiều ngôn ngữ lưu chuỗi khi chạy bằng biểu diễn nội bộ như UTF-16 hoặc UTF-32. Biểu diễn gần độ dài cố định giúp xử lý chuỗi giống mảng và tạo một số lợi ích:

- **Truy cập ngẫu nhiên**: trong chuỗi UTF-16, có thể tính vị trí tương đối dễ. UTF-8 có độ dài biến đổi nên để tìm ký tự thứ $i$ phải duyệt từ đầu đến đó, mất $O(n)$ thời gian.
- **Tính số ký tự**: tương tự truy cập, độ dài chuỗi UTF-16 có thể được tính trong $O(1)$. Muốn đếm số ký tự thật của UTF-8 phải duyệt toàn chuỗi.
- **Phép toán chuỗi**: tách, ghép, chèn và xóa tương đối đơn giản với UTF-16. UTF-8 cần tính thêm để tránh cắt ở giữa một dãy byte ký tự.

Thiết kế mã hóa của ngôn ngữ phản ánh lịch sử và môi trường chạy:

- `String` của Java dùng UTF-16. Khi Java mới được thiết kế, các nhà thiết kế dự đoán 16 bit đủ cho mọi ký tự; Unicode sau đó mở rộng vượt quá 16 bit. Một số ký tự vì thế được biểu diễn bằng **cặp thay thế** gồm hai đơn vị 16 bit.
- Chuỗi JavaScript và TypeScript cũng dùng UTF-16. Khi Netscape giới thiệu JavaScript năm 1995, Unicode còn ở giai đoạn đầu và 16 bit được xem là đủ.
- C# dùng UTF-16 vì nền tảng .NET và nhiều công nghệ Microsoft, bao gồm Windows, sử dụng UTF-16 rộng rãi.

Các ngôn ngữ từng đánh giá thấp số ký tự Unicode phải dùng cặp thay thế cho điểm mã vượt 16 bit. Một ký tự có thể chiếm 2 hoặc 4 byte, làm mất ưu điểm cố định và tăng độ phức tạp của mã xử lý.

Vì vậy, cần xác định rõ “độ dài” trong từng API. Có hàm trả số byte, hàm trả số đơn vị mã UTF-16, hàm khác trả số điểm mã Unicode. Một ký tự mà người dùng nhìn thấy cũng có thể gồm nhiều điểm mã do dấu kết hợp hoặc chuỗi emoji. Nếu cắt chuỗi hay di chuyển con trỏ chỉ theo đơn vị lưu, chương trình có thể tách đôi một ký tự hiển thị.

Một số ngôn ngữ chọn chiến lược khác:

- `str` của Python dùng Unicode và linh hoạt chọn đơn vị lưu theo điểm mã lớn nhất trong chuỗi. Nếu toàn bộ là ASCII có thể dùng 1 byte mỗi ký tự; nếu nằm trong mặt phẳng đa ngôn ngữ cơ bản có thể dùng 2 byte; nếu có ký tự vượt phạm vi đó có thể dùng 4 byte.
- `string` của Go lưu nội bộ bằng UTF-8 và cung cấp kiểu `rune` cho một điểm mã Unicode.
- `str` và `String` của Rust lưu nội bộ bằng UTF-8; kiểu `char` biểu diễn một điểm mã Unicode.

Nội dung trên mô tả cách ngôn ngữ lưu chuỗi trong lúc chạy. **Cần phân biệt với cách lưu chuỗi vào tệp hoặc truyền qua mạng.** Ở biên bên ngoài, chuỗi thường được mã hóa thành UTF-8 nhờ tính tương thích và hiệu quả không gian.

Khi biểu diễn nội bộ và bên ngoài khác nhau, quá trình mã hóa và giải mã bắt buộc xảy ra tại ranh giới vào/ra. Chương trình phải chỉ rõ bộ ký tự và chính sách xử lý lỗi. Giả định rằng “chuỗi đã là chữ nên không cần nghĩ đến byte” có thể dẫn đến ký tự hỏng, dữ liệu bị cắt hoặc lỗ hổng xác thực.

Một chương trình an toàn xác nhận rõ mã hóa đầu vào, chuyển đổi có kiểm soát và luôn bảo toàn ranh giới ký tự.
