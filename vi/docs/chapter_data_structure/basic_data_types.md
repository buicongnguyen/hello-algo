# Kiểu dữ liệu cơ bản

Dữ liệu trong máy tính có thể xuất hiện dưới nhiều dạng như văn bản, hình ảnh, video, âm thanh hay mô hình 3D. Dù được tổ chức khác nhau, chúng đều được tạo nên từ các kiểu dữ liệu cơ bản.

**Kiểu dữ liệu cơ bản là những kiểu mà CPU có thể thao tác trực tiếp.** Các nhóm chính gồm:

- kiểu số nguyên `byte`, `short`, `int`, `long`;
- kiểu số thực dấu phẩy động `float`, `double`;
- kiểu ký tự `char`, dùng cho chữ cái, dấu câu và nhiều ký hiệu;
- kiểu Boolean `bool`, biểu diễn hai trạng thái đúng và sai.

Kiểu dữ liệu cơ bản được lưu dưới dạng nhị phân. Một chữ số nhị phân là một bit; trong hầu hết hệ điều hành hiện đại, $1$ byte gồm $8$ bit.

Miền giá trị phụ thuộc vào số bit dành cho kiểu dữ liệu và cách mã hóa. Ví dụ trong Java:

- `byte` chiếm $1$ byte, tức $8$ bit, và biểu diễn được $2^8$ giá trị;
- `int` chiếm $4$ byte, tức $32$ bit, và biểu diễn được $2^{32}$ giá trị.

Bảng sau chỉ dùng để hình dung; không cần ghi nhớ toàn bộ.

| Nhóm | Kiểu | Dung lượng | Giá trị nhỏ nhất | Giá trị lớn nhất | Mặc định |
| --- | --- | --- | --- | --- | --- |
| Số nguyên | `byte` | 1 byte | $-2^7$ | $2^7 - 1$ | $0$ |
| Số nguyên | `short` | 2 byte | $-2^{15}$ | $2^{15} - 1$ | $0$ |
| Số nguyên | `int` | 4 byte | $-2^{31}$ | $2^{31} - 1$ | $0$ |
| Số nguyên | `long` | 8 byte | $-2^{63}$ | $2^{63} - 1$ | $0$ |
| Số thực | `float` | 4 byte | khoảng $-3.403 × 10^{38}$ | khoảng $3.403 × 10^{38}$ | $0.0$ |
| Số thực | `double` | 8 byte | khoảng $-1.798 × 10^{308}$ | khoảng $1.798 × 10^{308}$ | $0.0$ |
| Ký tự | `char` | 2 byte | $0$ | $2^{16} - 1$ | $0$ |
| Boolean | `bool` | thường là 1 byte | `false` | `true` | `false` |

Bảng trên mô tả các kiểu cơ bản của Java. Mỗi ngôn ngữ có định nghĩa riêng nên dung lượng, miền giá trị và giá trị mặc định có thể khác nhau.

- Trong Python, `int` có thể lớn tùy ý trong giới hạn bộ nhớ; `float` thường là số thực 64 bit độ chính xác kép; Python không có kiểu `char` riêng, một ký tự là chuỗi `str` có độ dài 1.
- C và C++ không quy định duy nhất kích thước của mọi kiểu cơ bản; kích thước phụ thuộc cách triển khai và nền tảng.
- Trong C và C++, `char` chiếm 1 byte. Ở nhiều ngôn ngữ khác, cách biểu diễn ký tự liên quan đến cơ chế mã hóa ký tự.
- Về lý thuyết, Boolean chỉ cần 1 bit. Trong thực tế, nó thường chiếm ít nhất 1 byte vì đây là đơn vị bộ nhớ nhỏ nhất mà CPU hiện đại thường định địa chỉ trực tiếp.

Vậy kiểu dữ liệu cơ bản liên quan thế nào đến cấu trúc dữ liệu? Cấu trúc dữ liệu nhấn mạnh **cách tổ chức**, còn kiểu dữ liệu cơ bản mô tả **loại nội dung**.

Một mảng có thể biểu diễn một dãy giá trị theo thứ tự bất kể phần tử là số nguyên, số thực, ký tự hay Boolean. Trong Python, danh sách còn có thể giữ tham chiếu đến nhiều loại đối tượng khác nhau.

```python
# Các danh sách đại diện cho nhiều loại dữ liệu cơ bản
numbers: list[int] = [0] * 5
decimals: list[float] = [0.0] * 5
characters: list[str] = ["0"] * 5
bools: list[bool] = [False] * 5

# Danh sách Python có thể giữ nhiều loại đối tượng
data = [0, 0.0, "a", False, object()]
```

Tóm lại, **kiểu dữ liệu cơ bản xác định nội dung mà phần tử có thể mang, còn cấu trúc dữ liệu xác định cách các phần tử được tổ chức và liên hệ với nhau**.
