# Mã hóa số *

!!! tip

    Trong cuốn sách này, các mục có dấu sao * là nội dung tự chọn. Nếu thời gian hạn chế hoặc phần này còn khó, có thể hoàn thành các chương cốt lõi trước rồi quay lại sau.

## Mã dấu–trị tuyệt đối, bù một và bù hai

Quan sát bảng ở phần trước sẽ thấy mọi kiểu số nguyên đều biểu diễn được nhiều hơn một số âm so với số dương. Chẳng hạn, phạm vi của `byte` là $[-128, 127]$. Hiện tượng có vẻ trái trực giác này bắt nguồn từ ba cách biểu diễn: mã dấu–trị tuyệt đối, bù một và bù hai.

Trước hết, cần nhớ rằng **máy tính lưu số nguyên có dấu bằng dạng “bù hai”**. Trước khi phân tích lý do, hãy định nghĩa ba khái niệm:

- **Mã dấu–trị tuyệt đối**: dùng bit cao nhất của biểu diễn nhị phân làm bit dấu. $0$ chỉ số dương, $1$ chỉ số âm, còn các bit còn lại biểu diễn độ lớn.
- **Bù một**: với số dương, bù một giống mã dấu–trị tuyệt đối. Với số âm, đảo tất cả bit trừ bit dấu.
- **Bù hai**: với số dương, bù hai giống mã dấu–trị tuyệt đối. Với số âm, lấy bù một rồi cộng thêm $1$.

Hình sau cho thấy cách chuyển đổi giữa mã dấu–trị tuyệt đối, bù một và bù hai.

![Chuyển đổi giữa mã dấu–trị tuyệt đối, bù một và bù hai](number_encoding.assets/1s_2s_complement.png)

<u>Mã dấu–trị tuyệt đối</u> rất trực quan nhưng có nhược điểm. Trước hết, **không thể dùng trực tiếp mã dấu–trị tuyệt đối của số âm trong phép tính**. Ví dụ, nếu tính $1 + (-2)$ theo biểu diễn này thì kết quả là $-3$, rõ ràng sai.

$$
\begin{aligned}
& 1 + (-2) \newline
& \rightarrow 0000 \; 0001 + 1000 \; 0010 \newline
& = 1000 \; 0011 \newline
& \rightarrow -3
\end{aligned}
$$

Để khắc phục, <u>bù một</u> được đưa ra. Chuyển mã dấu–trị tuyệt đối sang bù một, tính $1 + (-2)$ trên các bit bù một, rồi đổi kết quả về mã dấu–trị tuyệt đối sẽ thu được $-1$ chính xác.

Điểm cốt lõi là thay vì tách riêng dấu và độ lớn để tính toán, số âm được xử lý như một dãy bit có cùng độ dài với số dương. Nhờ đó, biểu thức trộn số dương và âm có thể dùng chung quy tắc cộng nhị phân.

$$
\begin{aligned}
& 1 + (-2) \newline
& \rightarrow 0000 \; 0001 \; \text{(dấu–trị tuyệt đối)} + 1000 \; 0010 \; \text{(dấu–trị tuyệt đối)} \newline
& = 0000 \; 0001 \; \text{(bù một)} + 1111  \; 1101 \; \text{(bù một)} \newline
& = 1111 \; 1110 \; \text{(bù một)} \newline
& = 1000 \; 0001 \; \text{(dấu–trị tuyệt đối)} \newline
& \rightarrow -1
\end{aligned}
$$

Mặt khác, **mã dấu–trị tuyệt đối có hai biểu diễn cho số 0 là $+0$ và $-0$**. Một giá trị ứng với hai mã nhị phân khác nhau gây ra sự mơ hồ. Nếu không muốn phân biệt số không dương và âm trong điều kiện, phần cứng phải thực hiện kiểm tra bổ sung và làm giảm hiệu quả tính toán.

$$
\begin{aligned}
+0 & \rightarrow 0000 \; 0000 \newline
-0 & \rightarrow 1000 \; 0000
\end{aligned}
$$

Bù một vẫn giữ vấn đề số không dương và âm. Vì vậy, máy tính dùng <u>bù hai</u>. Hãy theo dõi quá trình đổi số không âm từ mã dấu–trị tuyệt đối sang bù một rồi sang bù hai.

$$
\begin{aligned}
-0 \rightarrow \; & 1000 \; 0000 \; \text{(dấu–trị tuyệt đối)} \newline
= \; & 1111 \; 1111 \; \text{(bù một)} \newline
= 1 \; & 0000 \; 0000 \; \text{(bù hai)} \newline
\end{aligned}
$$

Cộng $1$ vào bù một của số không âm tạo ra bit nhớ. Tuy nhiên, `byte` chỉ có 8 bit nên bit $1$ thứ chín bị bỏ. Do đó, **bù hai của số không âm là $0000 \; 0000$, giống bù hai của số không dương.** Bù hai chỉ còn một mã cho 0 và loại bỏ sự mơ hồ.

Một câu hỏi cuối vẫn còn: nếu phạm vi `byte` là $[-128, 127]$, số âm bổ sung $-128$ đến từ đâu? Với mọi số nguyên trong $[-127, +127]$, đều có mã dấu–trị tuyệt đối, bù một và bù hai tương ứng; có thể chuyển qua lại giữa mã dấu–trị tuyệt đối và bù hai.

Tuy nhiên, **bù hai $1000 \; 0000$ là trường hợp đặc biệt không có mã dấu–trị tuyệt đối tương ứng.** Nếu áp dụng phép đổi thông thường sẽ nhận $0000 \; 0000$, nhưng mã đó biểu diễn $0$, tạo mâu thuẫn. Máy tính quy ước dãy bù hai đặc biệt $1000 \; 0000$ biểu diễn $-128$. Thật vậy, tính $(-1) + (-127)$ trong bù hai cho kết quả $-128$.

$$
\begin{aligned}
& (-127) + (-1) \newline
& \rightarrow 1111 \; 1111 \; \text{(dấu–trị tuyệt đối)} + 1000 \; 0001 \; \text{(dấu–trị tuyệt đối)} \newline
& = 1000 \; 0000 \; \text{(bù một)} + 1111  \; 1110 \; \text{(bù một)} \newline
& = 1000 \; 0001 \; \text{(bù hai)} + 1111  \; 1111 \; \text{(bù hai)} \newline
& = 1000 \; 0000 \; \text{(bù hai)} \newline
& \rightarrow -128
\end{aligned}
$$

Việc tất cả phép tính trên đều là phép cộng gợi ra một nguyên lý quan trọng. **Mạch phần cứng bên trong máy tính chủ yếu được thiết kế quanh phép cộng**, vì phép cộng dễ hiện thực bằng mạch, thuận lợi cho xử lý song song và chạy nhanh hơn so với việc xây dựng những mạch hoàn toàn tách biệt.

Điều đó không có nghĩa máy tính chỉ thực hiện được phép cộng. **Kết hợp phép cộng với một số phép logic cơ bản có thể tạo ra các phép toán khác.** Phép trừ $a - b$ đổi thành $a + (-b)$; phép nhân và chia cũng có thể phân rã thành chuỗi phép cộng, trừ và dịch bit.

Giờ có thể tổng kết lý do dùng bù hai. Cùng một mạch và quy tắc cộng có thể xử lý cả số dương lẫn số âm. Không cần mạch trừ riêng, không phải xử lý hai dạng số 0, vì thế thiết kế phần cứng đơn giản và hiệu quả hơn đáng kể.

Bù hai là một thiết kế tinh tế cân bằng phạm vi giá trị với chi phí mạch trong số bit hữu hạn. Phần này chỉ trình bày nguyên lý cốt lõi; người đọc quan tâm có thể tiếp tục nghiên cứu các chi tiết về tràn số và số học mô-đun.

## Mã hóa số dấu phẩy động

Quan sát kỹ sẽ thấy `int` và `float` đều chiếm 4 byte nhưng `float` có phạm vi lớn hơn rất nhiều. Vì còn phải biểu diễn phần thập phân, tưởng như phạm vi của `float` phải nhỏ hơn; sự khác biệt nằm ở cách dùng các bit.

Thực tế, **`float` dùng phương pháp biểu diễn khác số nguyên**. Viết một dãy nhị phân 32 bit như sau:

$$
b_{31} b_{30} b_{29} \ldots b_2 b_1 b_0
$$

Theo tiêu chuẩn IEEE 754, `float` 32 bit gồm ba phần:

- Bit dấu $\mathrm{S}$: 1 bit, tương ứng với $b_{31}$.
- Bit số mũ $\mathrm{E}$: 8 bit, tương ứng với $b_{30} b_{29} \ldots b_{23}$.
- Bit phần định trị $\mathrm{N}$: 23 bit, tương ứng với $b_{22} b_{21} \ldots b_0$.

Giá trị mà `float` nhị phân biểu diễn được tính bằng:

$$
\text {val} = (-1)^{b_{31}} \times 2^{\left(b_{30} b_{29} \ldots b_{23}\right)_2-127} \times\left(1 . b_{22} b_{21} \ldots b_0\right)_2
$$

Viết lại bằng ký hiệu theo góc nhìn thập phân:

$$
\text {val}=(-1)^{\mathrm{S}} \times 2^{\mathrm{E} -127} \times (1 + \mathrm{N})
$$

Phạm vi của từng thành phần là:

$$
\begin{aligned}
\mathrm{S} \in & \{ 0, 1\}, \quad \mathrm{E} \in \{ 1, 2, \dots, 254 \} \newline
(1 + \mathrm{N}) = & (1 + \sum_{i=1}^{23} b_{23-i} 2^{-i}) \subset [1, 2 - 2^{-23}]
\end{aligned}
$$

![Ví dụ tính giá trị float theo IEEE 754](number_encoding.assets/ieee_754_float.png)

Trong ví dụ trên, $\mathrm{S} = 0$, $\mathrm{E} = 124$, $\mathrm{N} = 2^{-2} + 2^{-3} = 0.375$, nên:

$$
\text { val } = (-1)^0 \times 2^{124 - 127} \times (1 + 0.375) = 0.171875
$$

Giờ có thể trả lời câu hỏi ban đầu. **`float` dành bit cho số mũ nên phạm vi lớn hơn `int` rất nhiều.** Theo công thức, số dương lớn nhất mà `float` biểu diễn được là $2^{254 - 127} \times (2 - 2^{-23}) \approx 3.4 \times 10^{38}$; đổi bit dấu sẽ cho phía giá trị âm.

**Đổi lại phạm vi rộng, `float` hy sinh độ chính xác.** `int` dùng toàn bộ 32 bit để biểu diễn số nguyên nên các số được phân bố đều. `float` dùng bit số mũ, vì vậy khi độ lớn tăng thì khoảng cách giữa hai giá trị biểu diễn được liền kề nhìn chung cũng tăng. Nhiều số thập phân quen thuộc không thể ánh xạ chính xác sang một dãy bit hữu hạn và chỉ được làm tròn đến giá trị gần nhất.

Như bảng dưới đây, $\mathrm{E} = 0$ và $\mathrm{E} = 255$ mang ý nghĩa đặc biệt; chúng dùng để biểu diễn **số 0, vô cực, $\mathrm{NaN}$ và số phi chuẩn hóa**.

| Bit số mũ E | Phần định trị $\mathrm{N} = 0$ | Phần định trị $\mathrm{N} \ne 0$ | Công thức |
| --- | --- | --- | --- |
| $0$ | $\pm 0$ | Số phi chuẩn hóa | $(-1)^{\mathrm{S}} \times 2^{-126} \times (0.\mathrm{N})$ |
| $1, 2, \dots, 254$ | Số chuẩn hóa | Số chuẩn hóa | $(-1)^{\mathrm{S}} \times 2^{(\mathrm{E} -127)} \times (1.\mathrm{N})$ |
| $255$ | $\pm \infty$ | $\mathrm{NaN}$ | |

Số phi chuẩn hóa cải thiện đáng kể độ chính xác gần 0. Số chuẩn hóa dương nhỏ nhất là $2^{-126}$, còn số phi chuẩn hóa dương nhỏ nhất là $2^{-126} \times 2^{-23}$. Cơ chế này cho phép khoảng giá trị thu hẹp dần về 0 thay vì đột ngột mất mọi biểu diễn.

Kiểu độ chính xác kép `double` dùng nguyên lý tương tự `float`, nhưng dành nhiều bit hơn cho dấu, số mũ và phần định trị. Vì nguyên lý không đổi, phần này không lặp lại toàn bộ phép suy diễn.
