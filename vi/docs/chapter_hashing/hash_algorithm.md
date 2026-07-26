# Thuật toán băm

Hai phần trước giới thiệu nguyên lý hoạt động của bảng băm và cách xử lý xung đột. Tuy nhiên, định địa chỉ mở và tạo chuỗi riêng **chỉ bảo đảm bảng băm vẫn hoạt động khi có xung đột, chứ không làm giảm tần suất xung đột**.

Nếu xung đột xảy ra quá thường xuyên, hiệu suất bảng băm sẽ giảm mạnh. Với tạo chuỗi riêng, trong trường hợp lý tưởng, các cặp khóa–giá trị được phân bố đều giữa các bucket và truy vấn đạt hiệu quả tối ưu; trong trường hợp tệ nhất, mọi cặp nằm trong cùng một bucket khiến độ phức tạp suy giảm thành $O(n)$.

![Trường hợp lý tưởng và tệ nhất của xung đột băm](hash_algorithm.assets/hash_collision_best_worst_condition.png)

**Phân bố của các cặp khóa–giá trị do hàm băm quyết định**. Nhắc lại hai bước của hàm băm: trước tiên tính giá trị băm, sau đó chia lấy dư cho độ dài mảng.

```shell
index = hash(key) % capacity
```

Khi sức chứa `capacity` cố định, **thuật toán `hash()` quyết định giá trị đầu ra**, từ đó quyết định cách các cặp khóa–giá trị được phân bố trong bảng.

Vì vậy, để giảm xác suất xung đột, cần tập trung vào thiết kế thuật toán `hash()`.

## Mục tiêu của thuật toán băm

Để xây dựng bảng băm vừa nhanh vừa vững, thuật toán băm nên có các tính chất sau.

- **Tính xác định**: Cùng một đầu vào luôn phải tạo ra cùng một đầu ra; khi đó bảng băm mới đáng tin cậy.
- **Hiệu suất cao**: Quá trình tính giá trị băm phải đủ nhanh. Chi phí tính toán càng nhỏ thì bảng băm càng thực dụng.
- **Phân bố đồng đều**: Thuật toán phải giúp các cặp khóa–giá trị phân bố đều trong bảng. Phân bố càng đều thì xác suất xung đột càng thấp.

Thuật toán băm không chỉ dùng để cài đặt bảng băm mà còn xuất hiện rộng rãi trong nhiều lĩnh vực.

- **Lưu mật khẩu**: Để bảo vệ mật khẩu, hệ thống thường không lưu văn bản thuần mà lưu giá trị băm. Khi người dùng nhập mật khẩu, hệ thống băm đầu vào và so sánh với giá trị đã lưu; hai giá trị khớp thì mật khẩu được xem là đúng.
- **Kiểm tra tính toàn vẹn dữ liệu**: Bên gửi tính giá trị băm của dữ liệu và gửi kèm. Bên nhận tính lại giá trị băm của dữ liệu nhận được rồi so sánh; nếu khớp, dữ liệu được xem là nguyên vẹn.

Trong ứng dụng mật mã, thuật toán băm cần các tính chất bảo mật mạnh hơn để ngăn việc suy ngược, chẳng hạn đoán mật khẩu gốc từ giá trị băm.

- **Tính một chiều**: Không thể suy ra thông tin về dữ liệu đầu vào từ giá trị băm.
- **Kháng xung đột**: Phải cực kỳ khó tìm hai đầu vào khác nhau tạo cùng một giá trị băm.
- **Hiệu ứng thác lũ**: Một thay đổi nhỏ ở đầu vào phải tạo ra thay đổi lớn và khó dự đoán ở đầu ra.

Lưu ý rằng **“phân bố đồng đều” và “kháng xung đột” là hai khái niệm độc lập**. Phân bố đồng đều không đồng nghĩa với kháng xung đột. Ví dụ, với `key` ngẫu nhiên, `key % 100` có thể cho đầu ra phân bố đều, nhưng thuật toán quá đơn giản: mọi `key` có cùng hai chữ số cuối đều cho cùng kết quả. Do đó, có thể dễ dàng suy ra một `key` phù hợp từ giá trị băm và phá cơ chế mật khẩu.

## Thiết kế thuật toán băm

Thiết kế một thuật toán băm đầy đủ là vấn đề phức tạp cần cân nhắc nhiều yếu tố. Tuy nhiên, trong những tình huống yêu cầu thấp hơn, có thể tự xây dựng các thuật toán đơn giản.

- **Băm cộng**: Cộng mã ASCII của từng ký tự đầu vào và dùng tổng làm giá trị băm.
- **Băm nhân**: Tận dụng tương quan thấp do phép nhân tạo ra; ở mỗi bước, nhân với một hằng số rồi cộng mã ASCII của ký tự.
- **Băm XOR**: Lần lượt XOR từng phần tử đầu vào vào giá trị băm tích lũy.
- **Băm xoay**: Trước mỗi lần cộng mã ASCII, thực hiện một phép xoay bit trên giá trị băm.

```python
# Mã các thuật toán băm đơn giản chính thức được chèn từ nguồn đã khóa.
```

Bước cuối của mỗi thuật toán trong mã là lấy kết quả chia dư cho số nguyên tố lớn $1000000007$, nhờ đó giữ giá trị băm trong phạm vi thích hợp. Tại sao cần nhấn mạnh số nguyên tố và số hợp có nhược điểm gì?

Tóm lại, **dùng số nguyên tố lớn làm mô-đun giúp tối đa hóa độ đồng đều của giá trị băm**. Vì số nguyên tố không có ước chung với các số khác, nó làm giảm những mẫu tuần hoàn do phép chia dư tạo ra và qua đó giảm xung đột.

Giả sử chọn số hợp $9$ làm mô-đun; số này chia hết cho $3$, nên mọi `key` chia hết cho $3$ chỉ được ánh xạ vào các giá trị $0$, $3$, $6$.

$$
\begin{aligned}
\text{modulus} & = 9 \newline
\text{key} & = \{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \dots \} \newline
\text{hash} & = \{ 0, 3, 6, 0, 3, 6, 0, 3, 6, 0, 3, 6,\dots \}
\end{aligned}
$$

Nếu các `key` đầu vào tình cờ đi theo cấp số cộng này, giá trị băm sẽ tập trung thành cụm và làm xung đột nghiêm trọng hơn. Bây giờ thay `modulus` bằng số nguyên tố $13$. Vì `key` và `modulus` không có ước chung, đầu ra được phân bố đều hơn nhiều.

$$
\begin{aligned}
\text{modulus} & = 13 \newline
\text{key} & = \{ 0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, \dots \} \newline
\text{hash} & = \{ 0, 3, 6, 9, 12, 2, 5, 8, 11, 1, 4, 7, \dots \}
\end{aligned}
$$

Nếu `key` được bảo đảm ngẫu nhiên và phân bố đều, cả mô-đun nguyên tố lẫn hợp số đều có thể cho giá trị băm đồng đều. Nhưng khi `key` có tính tuần hoàn, chia dư cho hợp số dễ làm kết quả tập trung thành cụm hơn.

Vì vậy, mô-đun thường được chọn là một số nguyên tố đủ lớn để loại bỏ tối đa các mẫu tuần hoàn và tăng độ vững của thuật toán băm.

Lựa chọn mô-đun không thể sửa mọi nhược điểm của một thuật toán băm kém, nhưng nó là lớp bảo vệ quan trọng trước các mẫu có chu kỳ trong dữ liệu đầu vào. Thuật toán tốt vẫn cần trộn ảnh hưởng của từng ký tự hoặc từng bit trước khi thực hiện phép chia dư cuối cùng.

## Các thuật toán băm phổ biến

Những thuật toán đơn giản ở trên khá “mong manh” và còn xa mới đạt các mục tiêu thiết kế. Phép cộng và XOR có tính giao hoán nên băm cộng và băm XOR không phân biệt được các chuỗi chứa cùng ký tự nhưng khác thứ tự; điều này làm tăng xung đột và có thể gây rủi ro bảo mật.

Trong thực tế, các thuật toán chuẩn như MD5, SHA-1, SHA-2 và SHA-3 thường được sử dụng. Chúng có thể ánh xạ dữ liệu đầu vào có độ dài bất kỳ thành giá trị băm có độ dài cố định.

Các thuật toán băm liên tục được nâng cấp và tối ưu. Một số nhà nghiên cứu cải thiện hiệu suất, trong khi những người khác tìm kiếm vấn đề bảo mật. Bảng dưới đây tóm tắt một số thuật toán thường gặp.

- MD5 và SHA-1 đã bị tấn công thành công nhiều lần nên không còn phù hợp với nhiều ứng dụng bảo mật.
- Dòng SHA-2, đặc biệt là SHA-256, được dùng phổ biến trong các ứng dụng và giao thức cần an toàn.
- SHA-3 có chi phí cài đặt thấp và hiệu suất tính toán tốt, nhưng mức độ phổ biến hiện chưa rộng bằng SHA-2.

Bảng: Các thuật toán băm phổ biến

| | MD5 | SHA-1 | SHA-2 | SHA-3 |
| --- | --- | --- | --- | --- |
| Năm công bố | 1992 | 1995 | 2002 | 2008 |
| Độ dài đầu ra | 128 bit | 160 bit | 256/512 bit | 224/256/384/512 bit |
| Xung đột băm | Thường xuyên | Thường xuyên | Hiếm | Hiếm |
| Mức bảo mật | Thấp, đã bị tấn công thành công | Thấp, đã bị tấn công thành công | Cao | Cao |
| Ứng dụng | Không dùng cho bảo mật, vẫn dùng kiểm tra toàn vẹn | Không còn khuyến nghị | Xác minh giao dịch tiền mã hóa, chữ ký số và nhiều ứng dụng khác | Có thể thay thế SHA-2 |

## Giá trị băm trong cấu trúc dữ liệu

Khóa của bảng băm có thể là số nguyên, số thực, chuỗi và nhiều kiểu dữ liệu khác. Ngôn ngữ lập trình thường cung cấp thuật toán băm tích hợp cho các kiểu này để tính chỉ số bucket. Trong Python, hàm `hash()` tính giá trị băm của nhiều kiểu dữ liệu.

- Giá trị băm của số nguyên và Boolean chính là giá trị của chúng.
- Giá trị băm của số thực và chuỗi được tính phức tạp hơn; bạn đọc có thể tự tìm hiểu sâu hơn.
- Giá trị băm của tuple được tạo bằng cách băm từng phần tử rồi kết hợp các kết quả.
- Giá trị băm của đối tượng thường được sinh từ địa chỉ bộ nhớ. Có thể ghi đè phương thức băm để tạo nó từ nội dung đối tượng.

!!! tip

    Định nghĩa và cách tính giá trị băm tích hợp khác nhau giữa các ngôn ngữ lập trình.

```python
# Mã giá trị băm của các kiểu dữ liệu chính thức được chèn từ nguồn đã khóa.
```

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ giá trị băm trong Python Tutor](https://pythontutor.com/render.html#code=num%20%3D%203%0Ahash_num%20%3D%20hash%28num%29%0Abol%20%3D%20True%0Ahash_bol%20%3D%20hash%28bol%29%0Adec%20%3D%203.14159%0Ahash_dec%20%3D%20hash%28dec%29%0Atext%20%3D%20%22Hello%22%0Ahash_text%20%3D%20hash%28text%29&cumulative=false&curInstr=7&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

Trong nhiều ngôn ngữ, **chỉ đối tượng bất biến mới có thể làm `key` của bảng băm**. Nếu dùng danh sách động làm khóa, nội dung danh sách thay đổi sẽ làm giá trị băm thay đổi và bảng không còn tìm thấy `value` ban đầu.

Dù biến thành viên của đối tượng tùy chỉnh, chẳng hạn nút danh sách liên kết, có thể thay đổi, đối tượng vẫn có thể băm. **Lý do là giá trị băm của đối tượng thường dựa trên địa chỉ bộ nhớ**; nội dung thay đổi nhưng địa chỉ vẫn giữ nguyên nên giá trị băm không đổi.

Giá trị băm của cùng một chuỗi có thể khác nhau giữa các lần chạy Python. **Trình thông dịch thêm một salt ngẫu nhiên vào hàm băm chuỗi mỗi khi khởi động**. Cách này giúp ngăn tấn công HashDoS và tăng tính bảo mật của thuật toán băm.
