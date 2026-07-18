# Mã hóa số *

> Các mục có dấu sao là phần đọc thêm. Nếu thời gian hạn chế hoặc nội dung còn khó, bạn có thể quay lại sau khi hoàn thành các chương cốt lõi.

## Mã dấu–trị tuyệt đối, bù một và bù hai

Các kiểu số nguyên có thể biểu diễn nhiều hơn một số âm so với số dương. Ví dụ, miền giá trị của `byte` là $[-128, 127]$. Nguyên nhân nằm ở cách máy tính biểu diễn số có dấu.

**Số nguyên trong máy tính thường được lưu dưới dạng bù hai.** Trước khi giải thích lý do, chúng ta định nghĩa ba cách biểu diễn.

- **Mã dấu–trị tuyệt đối**: bit cao nhất là bit dấu; $0$ biểu diễn số dương, $1$ biểu diễn số âm; các bit còn lại biểu diễn độ lớn.
- **Bù một**: số dương giữ nguyên mã dấu–trị tuyệt đối; với số âm, đảo mọi bit giá trị và giữ bit dấu.
- **Bù hai**: số dương giữ nguyên; với số âm, lấy bù một rồi cộng $1$.

![Chuyển đổi giữa mã dấu–trị tuyệt đối, bù một và bù hai](number_encoding.assets/1s_2s_complement.png)

Mã dấu–trị tuyệt đối trực quan nhưng không thuận tiện cho phép tính. Nếu cộng trực tiếp mã của $1$ và $-2$, chúng ta nhận kết quả sai:

$$
0000 0001 + 1000 0010 = 1000 0011 → -3
$$

Khi dùng bù một, phép cộng cho kết quả đúng sau khi chuyển ngược về mã dấu–trị tuyệt đối:

$$
0000 0001 + 1111 1101 = 1111 1110 → -1
$$

Mã dấu–trị tuyệt đối và bù một đều có hai cách biểu diễn số không:

$$
+0 → 0000 0000; -0 → 1000 0000
$$

Hai biểu diễn cho cùng một giá trị gây mơ hồ và buộc phần cứng phải xử lý thêm. Bù hai giải quyết vấn đề này. Với `byte` 8 bit, quá trình đổi $-0$ sang bù hai tạo bit nhớ thứ chín; bit tràn bị bỏ đi nên cả $+0$ và $-0$ đều trở thành `0000 0000`.

$$
1000 0000 → 1111 1111 → 1 0000 0000 → 0000 0000
$$

Mẫu bù hai `1000 0000` không còn dùng cho $-0$, nên được quy ước biểu diễn $-128$. Vì vậy `byte` có miền $[-128, 127]$.

$$
(-127) + (-1) → 1000 0001 + 1111 1111 = 1000 0000 → -128
$$

Các ví dụ trên đều quy phép toán về phép cộng. Đây là một lợi ích quan trọng: mạch cộng dễ triển khai, tối ưu và song song hóa hơn nhiều mạch riêng biệt. Phép trừ $a - b$ có thể chuyển thành $a + (-b)$; nhiều phép toán phức tạp cũng được xây dựng từ phép cộng và các phép logic cơ bản.

Nhờ bù hai, máy tính có thể dùng cùng một mạch để cộng số dương và số âm, không cần xử lý riêng hai số không và không cần một mạch trừ độc lập. Điều này đơn giản hóa phần cứng và tăng hiệu quả.

## Mã hóa số thực dấu phẩy động

`int` và `float` đều thường chiếm 4 byte, nhưng `float` có miền giá trị lớn hơn rất nhiều. Nguyên nhân là `float` dùng một phần bit để biểu diễn số mũ.

Theo IEEE 754, một `float` 32 bit gồm:

- bit dấu $S$: 1 bit;
- phần số mũ $E$: 8 bit;
- phần trị $N$: 23 bit.

Với số chuẩn hóa, giá trị được tính gần đúng theo công thức:

$$
value = (-1)^S × 2^{E - 127} × (1 + N)
$$

![Ví dụ tính giá trị float theo IEEE 754](number_encoding.assets/ieee_754_float.png)

Trong ví dụ ở hình, $S = 0$, $E = 124$ và $N = 2^{-2} + 2^{-3} = 0.375$:

$$
value = (-1)^0 × 2^{124 - 127} × (1 + 0.375) = 0.171875
$$

Phần số mũ giúp `float` đạt giá trị dương xấp xỉ $3.4 × 10^{38}$. Đổi lại, **miền rộng hơn phải đánh đổi bằng độ chính xác**. `int` dùng toàn bộ 32 bit để biểu diễn các số nguyên phân bố đều; với `float`, giá trị càng lớn thì khoảng cách giữa hai số biểu diễn được liền kề thường càng lớn.

Hai giá trị số mũ biên có ý nghĩa đặc biệt.

| Số mũ $E$ | Phần trị $N = 0$ | Phần trị $N ≠ 0$ |
| --- | --- | --- |
| $0$ | $+0$ hoặc $-0$ | số phi chuẩn |
| $1$ đến $254$ | số chuẩn hóa | số chuẩn hóa |
| $255$ | $+∞$ hoặc $-∞$ | `NaN` |

Số phi chuẩn cho phép biểu diễn các giá trị dương nhỏ hơn số chuẩn hóa nhỏ nhất, làm quá trình tiến về không mượt hơn. Kiểu `double` độ chính xác kép dùng nguyên tắc tương tự nhưng dành nhiều bit hơn cho số mũ và phần trị.
