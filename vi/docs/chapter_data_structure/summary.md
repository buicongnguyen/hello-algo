# Tóm tắt

### Ôn tập trọng tâm

- Có thể phân loại cấu trúc dữ liệu theo hai góc nhìn: cấu trúc logic và cấu trúc vật lý. Cấu trúc logic mô tả quan hệ giữa các phần tử; cấu trúc vật lý mô tả cách dữ liệu nằm trong bộ nhớ máy tính.
- Các quan hệ logic tiêu biểu gồm tuyến tính, cây và mạng. Mảng, danh sách liên kết, ngăn xếp và hàng đợi thường là cấu trúc tuyến tính; cây, đồ thị và heap là phi tuyến. Bảng băm có thể kết hợp cả hai tùy cách hiện thực.
- Khi chương trình chạy, dữ liệu được lưu trong bộ nhớ. Mỗi vùng nhớ có một địa chỉ và chương trình dùng địa chỉ đó để truy cập dữ liệu.
- Cấu trúc vật lý gồm lưu trữ liên tiếp, đại diện bởi mảng, và lưu trữ phân tán, đại diện bởi danh sách liên kết. Mọi cấu trúc dữ liệu được xây trên mảng, danh sách liên kết hoặc sự kết hợp của cả hai.
- Các kiểu cơ bản gồm số nguyên `byte`, `short`, `int`, `long`, số dấu phẩy động `float`, `double`, ký tự `char` và Boolean `bool`. Phạm vi phụ thuộc vào không gian và quy tắc biểu diễn.
- Mã dấu–trị tuyệt đối, bù một và bù hai là ba cách mã hóa số bằng nhị phân và có thể chuyển đổi lẫn nhau. Bit cao nhất của mã dấu–trị tuyệt đối biểu diễn dấu, các bit còn lại biểu diễn độ lớn.
- Máy tính lưu số nguyên có dấu bằng bù hai. Bù hai cho phép xử lý phép cộng số dương và âm theo cùng một cách, không cần mạch trừ riêng hoặc hai cách xử lý số không.
- Mã `float` gồm 1 bit dấu, 8 bit số mũ và 23 bit phần định trị. Bit số mũ tạo phạm vi rộng hơn số nguyên rất nhiều nhưng đổi lại phải hy sinh độ chính xác.
- ASCII là bộ ký tự tiếng Anh lâu đời, dùng 7 bit trong một byte để biểu diễn 128 ký tự. GBK là bộ tiếng Trung chứa hơn hai mươi nghìn chữ Hán. Unicode gom ký tự và ký hiệu của nhiều ngôn ngữ vào một không gian điểm mã chung để giảm lỗi do tiêu chuẩn khác nhau.
- UTF-8 là mã hóa Unicode độ dài biến đổi phổ biến nhất và có khả năng tương thích cao. UTF-16 và UTF-32 cũng là các mã hóa Unicode tiêu biểu. Một số ký tự ngoài tiếng Anh có thể chiếm ít không gian hơn trong UTF-16, và các ngôn ngữ như Java, JavaScript, TypeScript, C# dùng UTF-16 cho chuỗi khi chạy.

Các khái niệm của chương mô tả cùng dữ liệu ở nhiều tầng. Cấu trúc logic xác định quan hệ giữa phần tử; cấu trúc vật lý đặt quan hệ đó vào bộ nhớ. Kiểu cơ bản xác định ý nghĩa và phép toán của từng phần tử; mã hóa số và ký tự biến ý nghĩa thành dãy bit. Thuật toán hoạt động trên tất cả các tầng này, nên một lựa chọn có thể ảnh hưởng đến tốc độ truy cập, mức dùng bộ nhớ và khả năng tương thích.

Trong thiết kế thực tế, hiếm khi chỉ tối ưu một tiêu chí. Lưu liên tiếp thuận lợi cho truy cập nhưng có chi phí khi đổi kích thước; lưu phân tán linh hoạt khi đổi liên kết nhưng cần thêm tham chiếu và thời gian duyệt. Phạm vi số rộng có thể đổi lấy độ chính xác; biểu diễn ký tự gần cố định dễ truy cập nhưng tốn thêm không gian. Điều quan trọng là cân bằng theo yêu cầu.

### Câu hỏi và trả lời

**Hỏi**: Vì sao bảng băm có thể gồm cả cấu trúc dữ liệu tuyến tính và phi tuyến?

Cấu trúc nền của bảng băm là mảng. Khi giải quyết xung đột bằng **phương pháp chuỗi**, mỗi bucket trong mảng có thể trỏ đến một danh sách liên kết. Một số hiện thực còn chuyển danh sách thành cây, thường là cây đỏ–đen, nếu độ dài vượt ngưỡng.

Nhìn từ lưu trữ, đáy của bảng băm là mảng; mỗi bucket có thể chứa một giá trị, danh sách hoặc cây. Do đó, bảng băm có thể đồng thời chứa mảng và danh sách liên kết tuyến tính, cũng như cây phi tuyến.

Vì thế không nên trả lời “bảng băm là tuyến tính hay phi tuyến” chỉ bằng một nhãn. Cấu trúc cấp cao bố trí bucket tuyến tính, còn cấu trúc con tổ chức các phần tử xung đột có thể tuyến tính hoặc phi tuyến tùy lượng dữ liệu và chính sách hiện thực.

**Hỏi**: Kiểu `char` có luôn dài 1 byte không?

Độ dài `char` phụ thuộc ngôn ngữ và cách mã hóa. Java, JavaScript, TypeScript và C# dùng UTF-16 làm đơn vị chuỗi nên đơn vị cơ bản là 2 byte. Trong C và C++, `char` là 1 byte, nhưng điều đó không đồng nghĩa một ký tự người dùng nhìn thấy luôn nằm trong một `char`.

**Hỏi**: Gọi cấu trúc dựa trên mảng là “cấu trúc tĩnh” có mơ hồ không? Ngăn xếp vẫn chèn và xóa động.

Ngăn xếp hỗ trợ thao tác dữ liệu động, nhưng vùng lưu trữ của hiện thực dựa trên mảng có độ dài cố định. Có thể thêm hoặc bỏ phần tử cho đến giới hạn dung lượng. Khi vượt giới hạn, phải tạo mảng lớn hơn rồi sao chép dữ liệu cũ.

**Hỏi**: Khi tạo ngăn xếp hay hàng đợi không cần tự chỉ định kích thước, vì sao vẫn gọi là tĩnh?

Trong ngôn ngữ bậc cao, lớp thư viện tự chọn dung lượng ban đầu và tự mở rộng. Chẳng hạn, `ArrayList` trong Java thường bắt đầu với dung lượng 10; quá trình mở rộng được lớp xử lý. Dù người dùng không nhìn thấy, bên trong vẫn cấp phát mảng lớn hơn rồi sao chép.

Vì vậy, cần phân biệt giao diện có vẻ động với vùng lưu trữ thực tế có độ dài cố định. Thư viện che giấu quá trình cấp phát lại để dễ dùng, nhưng tại thời điểm mở rộng vẫn phát sinh không gian mới và chi phí sao chép.

**Hỏi**: Đổi từ mã dấu–trị tuyệt đối sang bù hai dùng “đảo bit rồi cộng 1”. Vì sao chiều ngược lại cũng có thể dùng cùng thao tác, thay vì “trừ 1 rồi đảo bit”?

Vì chuyển đổi giữa mã dấu–trị tuyệt đối và bù hai thực chất là tìm **phần bù**. Nếu $a + b = c$ thì $a$ là phần bù của $b$ đối với $c$, đồng thời $b$ cũng là phần bù của $a$ đối với $c$.

Lấy số nhị phân $n = 4$ bit $0010$ làm mã dấu–trị tuyệt đối và bỏ qua bit dấu. “Đảo rồi cộng 1” cho bù hai:

$$
0010 \rightarrow 1101 \rightarrow 1110
$$

Cộng hai biểu diễn được $0010 + 1110 = 10000$. Vì vậy, bù hai $1110$ là phần bù của mã $0010$ đối với $10000$. **Thao tác “đảo rồi cộng 1” chính là tìm phần bù đối với $10000$.**

Phần bù của $1110$ đối với $10000$ là gì? Có thể áp dụng đúng thao tác:

$$
1110 \rightarrow 0001 \rightarrow 0010
$$

Hai biểu diễn là phần bù của nhau đối với $10000$, nên cùng thao tác thực hiện được chuyển đổi hai chiều.

Dĩ nhiên, cũng có thể dùng phép nghịch đảo “trừ 1 rồi đảo bit” để đổi bù hai $1110$ về mã dấu–trị tuyệt đối:

$$
1110 \rightarrow 1101 \rightarrow 0010
$$

Cuối cùng, “đảo rồi cộng 1” và “trừ 1 rồi đảo” đều tính phần bù đối với $10000$ nên cho cùng kết quả. Đảo bit tìm phần bù đối với $1111$; cộng thêm 1 chuyển thành phần bù đối với $10000$, tức bù hai.

Ví dụ dùng $n = 4$, nhưng nguyên lý tổng quát cho số nhị phân có số bit bất kỳ.
