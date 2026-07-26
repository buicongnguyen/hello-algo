# Kiểu dữ liệu cơ bản

Dữ liệu trong máy tính xuất hiện dưới nhiều dạng như văn bản, hình ảnh, video, âm thanh và mô hình 3D. Dù được tổ chức khác nhau, tất cả cuối cùng đều được cấu thành từ các kiểu dữ liệu cơ bản. Thuật toán đọc, so sánh và tính toán trên những giá trị này để xử lý thông tin phức tạp hơn.

**Kiểu dữ liệu cơ bản là kiểu mà CPU có thể thao tác trực tiếp**, chủ yếu gồm:

- Các kiểu số nguyên `byte`, `short`, `int`, `long`.
- Các kiểu dấu phẩy động `float`, `double`, dùng để biểu diễn số thập phân.
- Kiểu ký tự `char`, dùng để biểu diễn chữ viết, dấu câu, ký hiệu và cả emoji trong nhiều ngôn ngữ.
- Kiểu Boolean `bool`, dùng để biểu diễn hai trạng thái “có” và “không”, đúng và sai.

**Kiểu dữ liệu cơ bản được lưu ở dạng nhị phân trong máy tính.** Một chữ số nhị phân là một bit; trên phần lớn hệ điều hành hiện đại, $1$ byte gồm $8$ bit.

Đơn vị số học và logic của CPU đọc trực tiếp các nhóm bit có kích thước xác định. Kiểu dữ liệu quyết định cùng một dãy bit phải được diễn giải như số nguyên, số thực, ký tự hay giá trị logic. Vì thế, bản thân các bit trong bộ nhớ chưa tạo nên đầy đủ ý nghĩa; cần có cả kiểu dữ liệu và quy tắc biểu diễn mà chương trình áp dụng.

Phạm vi giá trị phụ thuộc vào số bit được cấp và cách diễn giải chúng. Cùng số bit nhưng số nguyên và số dấu phẩy động dùng quy tắc khác nhau, nên có phạm vi và độ chính xác khác nhau. Lấy các kiểu số nguyên của Java làm ví dụ:

- `byte` chiếm $1$ byte = $8$ bit và biểu diễn được $2^8$ giá trị.
- `int` chiếm $4$ byte = $32$ bit và biểu diễn được $2^{32}$ giá trị.

Bảng sau liệt kê không gian, phạm vi và giá trị mặc định của các kiểu cơ bản trong Java. Không cần ghi nhớ toàn bộ; chỉ cần hiểu tổng quan và tra cứu khi cần.

| Nhóm | Kiểu | Kích thước | Giá trị nhỏ nhất | Giá trị lớn nhất | Giá trị mặc định |
| --- | --- | --- | --- | --- | --- |
| Số nguyên | `byte` | 1 byte | $-2^7$ ($-128$) | $2^7 - 1$ ($127$) | $0$ |
| Số nguyên | `short` | 2 byte | $-2^{15}$ | $2^{15} - 1$ | $0$ |
| Số nguyên | `int` | 4 byte | $-2^{31}$ | $2^{31} - 1$ | $0$ |
| Số nguyên | `long` | 8 byte | $-2^{63}$ | $2^{63} - 1$ | $0$ |
| Số thực | `float` | 4 byte | $1.175 \times 10^{-38}$ | $3.403 \times 10^{38}$ | $0.0\text{f}$ |
| Số thực | `double` | 8 byte | $2.225 \times 10^{-308}$ | $1.798 \times 10^{308}$ | $0.0$ |
| Ký tự | `char` | 2 byte | $0$ | $2^{16} - 1$ | $0$ |
| Boolean | `bool` | 1 byte | $\text{false}$ | $\text{true}$ | $\text{false}$ |

Bảng trên áp dụng riêng cho định nghĩa kiểu cơ bản của Java. Mỗi ngôn ngữ có quy ước riêng, nên kích thước, phạm vi và giá trị mặc định có thể khác nhau.

Số bit của kiểu số nguyên càng lớn thì số giá trị có thể biểu diễn càng tăng theo hàm mũ. Kiểu dấu phẩy động dành một phần bit cho số mũ để bao phủ các giá trị rất lớn và rất nhỏ, nhưng không thể biểu diễn chính xác mọi số thực. Phạm vi ký tự liên hệ với bộ ký tự và cách mã hóa, còn Boolean thường được lưu theo đơn vị mà CPU có thể định địa chỉ.

- Trong Python, `int` hỗ trợ độ chính xác tùy ý trong giới hạn bộ nhớ. `float` thường là số thực 64 bit độ chính xác kép. Python không có kiểu `char` riêng; một ký tự là chuỗi `str` có độ dài 1.
- C và C++ không cố định kích thước của mọi kiểu cơ bản; kích thước tùy cách hiện thực và nền tảng. Bảng trên tương ứng với [mô hình dữ liệu LP64](https://en.cppreference.com/w/cpp/language/types#Properties), thường dùng trên các hệ điều hành Unix 64 bit như Linux và macOS.
- Trong C và C++, `char` có kích thước 1 byte. Ở nhiều ngôn ngữ khác, không gian của một ký tự phụ thuộc vào phương pháp mã hóa được trình bày ở phần “Mã hóa ký tự”.
- Về lý thuyết chỉ cần 1 bit, $0$ hoặc $1$, để biểu diễn Boolean. Tuy nhiên, CPU hiện đại thường định địa chỉ theo đơn vị nhỏ nhất là 1 byte nên giá trị này thường chiếm ít nhất một byte trong bộ nhớ.

Kiểu dữ liệu cơ bản liên hệ thế nào với cấu trúc dữ liệu? Cấu trúc dữ liệu là cách tổ chức và lưu dữ liệu trong máy tính. Trọng tâm ở đây là **cấu trúc và quan hệ** giữa các phần tử, không phải nội dung cụ thể của từng phần tử. Ngược lại, kiểu cơ bản mô tả mỗi phần tử chứa loại giá trị nào.

Nếu cần biểu diễn “một dãy số”, mảng là lựa chọn tự nhiên vì cấu trúc tuyến tính của mảng thể hiện quan hệ liền kề và thứ tự. Nội dung lưu trong đó là số nguyên `int`, số thực `float` hay ký tự `char` không làm thay đổi bản chất tổ chức của mảng.

Nói cách khác, **kiểu dữ liệu cơ bản cung cấp “loại nội dung”, còn cấu trúc dữ liệu cung cấp “phương thức tổ chức”.** Cùng một cấu trúc mảng có thể lưu số nguyên, số thực, ký tự hoặc Boolean. Danh sách Python thậm chí có thể giữ tham chiếu đến nhiều loại đối tượng khác nhau mà vẫn duy trì cùng quan hệ thứ tự.

Chiều ngược lại cũng đúng. Cùng các giá trị số nguyên có thể được đặt trong mảng, danh sách liên kết, ngăn xếp hoặc hàng đợi; nội dung vẫn là số nguyên nhưng quan hệ giữa các phần tử và tập phép toán được phép sẽ khác nhau. Khi thiết kế thuật toán, cần xác định loại giá trị rồi chọn cấu trúc phù hợp với mẫu truy cập, chèn và xóa.

```python
# Nhóm mã chính thức về mảng chứa các kiểu dữ liệu cơ bản được chèn tại đây.
```

??? pythontutor "Thực thi trực quan"

    [Quan sát từng bước khởi tạo các mảng trong Python Tutor](https://pythontutor.com/render.html#code=numbers%20%3D%20%5B0%5D%20%2A%205%0Adecimals%20%3D%20%5B0.0%5D%20%2A%205%0Acharacters%20%3D%20%5B%270%27%5D%20%2A%205%0Abools%20%3D%20%5BFalse%5D%20%2A%205&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

Tóm lại, **kiểu dữ liệu cơ bản quyết định nội dung mà mỗi phần tử có thể mang, còn cấu trúc dữ liệu quyết định nhiều phần tử được tổ chức và liên hệ với nhau ra sao.** Hai khái niệm không cạnh tranh mà mô tả cùng dữ liệu ở hai tầng khác nhau.

Phân biệt rõ hai tầng giúp tách câu hỏi “có thể biểu diễn giá trị nào?” khỏi câu hỏi “có thể truy cập giá trị đó nhanh đến mức nào?”. Câu hỏi đầu thuộc về kiểu dữ liệu và mã hóa; câu hỏi sau chủ yếu thuộc về cấu trúc dữ liệu và thuật toán.
