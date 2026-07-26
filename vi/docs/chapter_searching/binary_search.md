# Tìm kiếm nhị phân

<u>Tìm kiếm nhị phân</u> là thuật toán tìm kiếm hiệu quả dựa trên chiến lược chia để trị. Thuật toán tận dụng thứ tự đã sắp xếp của dữ liệu để giảm một nửa phạm vi tìm kiếm sau mỗi vòng, cho đến khi tìm thấy phần tử mục tiêu hoặc khoảng tìm kiếm trở thành rỗng.

!!! question

    Cho mảng `nums` có độ dài $n$, các phần tử tăng dần và không trùng nhau. Hãy tìm rồi trả về chỉ số của phần tử `target` trong mảng. Nếu mảng không chứa phần tử này, trả về $-1$. Dữ liệu ví dụ được minh họa dưới đây.

![Dữ liệu ví dụ cho tìm kiếm nhị phân](binary_search.assets/binary_search_example.png)

Trước hết, khởi tạo hai con trỏ $i = 0$ và $j = n - 1$, lần lượt trỏ đến phần tử đầu và cuối mảng. Hai con trỏ biểu diễn khoảng tìm kiếm $[0, n - 1]$. Dấu ngoặc vuông cho biết đây là khoảng đóng, tức hai giá trị biên đều được đưa vào phạm vi cần xét.

Sau đó lặp lại hai bước chính:

1. Tính chỉ số giữa $m = \lfloor {(i + j) / 2} \rfloor$, trong đó $\lfloor \: \rfloor$ là phép lấy phần nguyên dưới.
2. So sánh `nums[m]` với `target` và xử lý một trong ba trường hợp:
    1. Nếu `nums[m] < target`, mục tiêu chỉ có thể nằm trong khoảng $[m + 1, j]$, vì vậy gán $i = m + 1$.
    2. Nếu `nums[m] > target`, mục tiêu chỉ có thể nằm trong khoảng $[i, m - 1]$, vì vậy gán $j = m - 1$.
    3. Nếu `nums[m] = target`, đã tìm thấy mục tiêu nên trả về chỉ số $m$.

Nếu mảng không chứa mục tiêu, hai biên cuối cùng sẽ vượt qua nhau và khoảng tìm kiếm trở thành rỗng. Khi đó trả về $-1$.

Các hình sau trình bày toàn bộ bảy bước. Mỗi lần so sánh loại bỏ nửa khoảng chắc chắn không thể chứa mục tiêu.

**Bước 1**

![Bước 1 của tìm kiếm nhị phân](binary_search.assets/binary_search_step1.png)

**Bước 2**

![Bước 2 của tìm kiếm nhị phân](binary_search.assets/binary_search_step2.png)

**Bước 3**

![Bước 3 của tìm kiếm nhị phân](binary_search.assets/binary_search_step3.png)

**Bước 4**

![Bước 4 của tìm kiếm nhị phân](binary_search.assets/binary_search_step4.png)

**Bước 5**

![Bước 5 của tìm kiếm nhị phân](binary_search.assets/binary_search_step5.png)

**Bước 6**

![Bước 6 của tìm kiếm nhị phân](binary_search.assets/binary_search_step6.png)

**Bước 7**

![Bước 7 của tìm kiếm nhị phân](binary_search.assets/binary_search_step7.png)

Cần lưu ý rằng $i$ và $j$ thường có kiểu `int`, nên **tổng $i + j$ có thể vượt miền biểu diễn của kiểu `int`**. Để tránh tràn số nguyên, thông thường chỉ số giữa được tính bằng công thức $m = \lfloor {i + (j - i) / 2} \rfloor$.

Nhóm mã chính thức của thuật toán:

```python
# Mã tìm kiếm nhị phân chính thức được chèn từ nguồn đã khóa.
```

**Độ phức tạp thời gian là $O(\log n)$**. Mỗi vòng lặp giảm khoảng tìm kiếm còn một nửa, nên số vòng tăng theo $\log_2 n$.

**Độ phức tạp không gian là $O(1)$**. Hai con trỏ $i$ và $j$ chỉ dùng một lượng bộ nhớ cố định, không phụ thuộc vào kích thước mảng.

## Các cách biểu diễn khoảng

Ngoài khoảng đóng ở trên, một cách biểu diễn phổ biến khác là khoảng “đóng trái, mở phải” $[0, n)$: biên trái được tính, biên phải không được tính. Với cách này, khoảng $[i, j)$ rỗng khi $i = j$.

Có thể cài đặt tìm kiếm nhị phân với cùng chức năng theo biểu diễn đó:

```python
# Mã tìm kiếm nhị phân khoảng đóng trái, mở phải được chèn từ nguồn đã khóa.
```

Trong hai cách biểu diễn, phép khởi tạo, điều kiện lặp và cách thu hẹp khoảng đều khác nhau. Điều quan trọng là chọn một quy ước rồi duy trì nhất quán bất biến của nó trong toàn bộ thuật toán.

Ở biểu diễn khoảng đóng, cả biên trái $i$ và biên phải $j$ đều thuộc phạm vi tìm kiếm, nên hai phép thu hẹp khoảng đối xứng nhau. Cách này thường dễ kiểm tra hơn và ít gây lỗi lệch một đơn vị, vì vậy được khuyến nghị khi mới triển khai.

![Hai cách định nghĩa khoảng tìm kiếm](binary_search.assets/binary_search_ranges.png)

## Ưu điểm và hạn chế

Tìm kiếm nhị phân có hiệu quả tốt cả về thời gian lẫn không gian.

- **Hiệu quả thời gian cao**: với lượng dữ liệu lớn, độ phức tạp logarit mang lại khác biệt rất rõ. Chẳng hạn khi $n = 2^{20}$, tìm kiếm tuyến tính có thể cần $2^{20} = 1048576$ lần xét, còn tìm kiếm nhị phân chỉ cần khoảng $\log_2 2^{20} = 20$ vòng.
- **Không cần bộ nhớ phụ đáng kể**: khác với cách tìm bằng bảng băm phải xây dựng thêm cấu trúc, phiên bản lặp chỉ giữ các chỉ số biên.

Tuy nhiên, thuật toán không phù hợp với mọi tình huống.

- **Dữ liệu phải có thứ tự**. Nếu đầu vào chưa sắp xếp, sắp xếp chỉ để tìm nhị phân thường không có lợi vì bước sắp xếp thường tốn $O(n \log n)$, cao hơn một lần tìm tuyến tính. Khi thường xuyên chèn phần tử, duy trì mảng có thứ tự còn đòi hỏi chèn đúng vị trí với chi phí $O(n)$.
- **Cần truy cập ngẫu nhiên hiệu quả**. Thuật toán liên tục nhảy đến phần tử giữa nên phù hợp với mảng. Trên danh sách liên kết, tìm nút giữa đã cần tuần tự đi qua các liên kết, làm mất lợi thế.
- **Dữ liệu nhỏ có thể hợp với tìm tuyến tính hơn**. Mỗi vòng tuyến tính chỉ cần một phép so sánh, trong khi một vòng nhị phân cần tính giữa, thực hiện nhiều so sánh và cập nhật biên. Vì vậy với $n$ nhỏ, hằng số chi phí có thể khiến tìm tuyến tính nhanh hơn.

Tìm kiếm nhị phân nên được chọn khi dữ liệu đã có thứ tự, cấu trúc hỗ trợ truy cập theo chỉ số và số lần tìm đủ lớn để lợi ích logarit bù lại chi phí duy trì thứ tự.
