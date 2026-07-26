# Biên của tìm kiếm nhị phân

## Tìm biên trái

!!! question

    Cho mảng tăng dần `nums` có độ dài $n$ và có thể chứa phần tử trùng nhau. Hãy trả về chỉ số của lần xuất hiện ngoài cùng bên trái của `target`. Nếu mảng không chứa mục tiêu, trả về $-1$.

Nhắc lại phương pháp tìm điểm chèn bằng tìm kiếm nhị phân. Sau khi vòng lặp kết thúc, con trỏ $i$ trỏ đến `target` ngoài cùng bên trái. **Vì vậy, tìm điểm chèn về bản chất cũng là tìm chỉ số của `target` ngoài cùng bên trái**.

Có thể tái sử dụng trực tiếp hàm điểm chèn để tìm biên trái. Tuy nhiên, mảng có thể không chứa `target`, dẫn đến hai trường hợp:

- Chỉ số điểm chèn $i$ nằm ngoài phạm vi mảng, chẳng hạn mục tiêu lớn hơn mọi phần tử.
- Phần tử `nums[i]` không bằng `target`, nghĩa là điểm chèn nằm giữa hai giá trị hiện có.

Nếu một trong hai điều kiện xảy ra, trả về $-1$. Cần kiểm tra giới hạn trước khi đọc mảng để không truy cập ngoài phạm vi.

```python
# Mã tìm biên trái chính thức được chèn từ nguồn đã khóa.
```

Điểm quan trọng là không trả về ngay khi gặp một phần tử bằng mục tiêu. Khi đó thuật toán vẫn tiếp tục thu hẹp về phía trái và ghi nhận vị trí ứng viên, cho đến khi chứng minh không còn phần tử bằng mục tiêu nào nằm trước nó.

## Tìm biên phải

Làm thế nào để tìm `target` ngoài cùng bên phải? Cách trực tiếp nhất là sửa nhánh `nums[m] == target`: khi gặp mục tiêu, tiếp tục tìm sang phải thay vì sang trái. Bạn đọc có thể triển khai cách này dựa trên bất biến của khoảng tìm kiếm.

Dưới đây là hai phương pháp chuyển đổi khéo léo hơn.

### Tái sử dụng phép tìm biên trái

Có thể dùng hàm tìm `target` ngoài cùng bên trái để tìm biên phải. Ý tưởng là **chuyển bài toán tìm `target` ngoài cùng bên phải thành tìm `target + 1` ngoài cùng bên trái**.

Sau khi tìm kiếm, con trỏ $i$ trỏ đến `target + 1` ngoài cùng bên trái nếu nó tồn tại, còn con trỏ $j$ trỏ đến `target` ngoài cùng bên phải. Vì vậy có thể trả về $j$.

![Chuyển tìm biên phải thành tìm biên trái](binary_search_edge.assets/binary_search_right_edge_by_left_edge.png)

Hàm điểm chèn trả về $i$, nên cần trừ $1$ để nhận được $j$:

```python
# Mã tìm biên phải chính thức được chèn từ nguồn đã khóa.
```

Sau phép chuyển đổi vẫn phải kiểm tra kết quả có thật sự trỏ đến mục tiêu hay không. Nếu mọi phần tử đều nhỏ hơn mục tiêu hoặc mảng không chứa mục tiêu, chỉ số ứng viên có thể không hợp lệ.

### Chuyển thành tìm phần tử

Khi mảng không chứa `target`, hai con trỏ $i$ và $j$ cuối cùng lần lượt trỏ đến phần tử đầu tiên lớn hơn và phần tử cuối cùng nhỏ hơn `target`.

Do đó có thể xây dựng một giá trị chắc chắn không xuất hiện trong mảng để tìm hai biên:

- Tìm `target` ngoài cùng bên trái: chuyển thành tìm `target - 0.5`, rồi trả về con trỏ $i$.
- Tìm `target` ngoài cùng bên phải: chuyển thành tìm `target + 0.5`, rồi trả về con trỏ $j$.

![Chuyển tìm biên thành tìm một phần tử không tồn tại](binary_search_edge.assets/binary_search_edge_by_element.png)

Mã được để lại như bài tập, nhưng cần lưu ý:

- Vì mảng đề bài không chứa số thập phân nên không phải xử lý trường hợp bằng giá trị tìm kiếm mới.
- Phương pháp đưa số thập phân vào nên kiểu của `target` trong hàm phải đổi thành số dấu phẩy động; Python không cần khai báo thay đổi này.

Cách chuyển đổi chỉ an toàn khi miền dữ liệu bảo đảm các giá trị trung gian như `target ± 0.5` không trùng với phần tử hợp lệ và không gây mất chính xác. Trong mã sản phẩm, biến thể cập nhật biên trực tiếp thường tổng quát hơn.
