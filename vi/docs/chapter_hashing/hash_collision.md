# Xung đột băm

Phần trước đã chỉ ra rằng **trong phần lớn trường hợp, không gian đầu vào của hàm băm lớn hơn rất nhiều so với không gian đầu ra**, nên về lý thuyết xung đột băm là không thể tránh khỏi. Chẳng hạn, nếu đầu vào là mọi số nguyên còn đầu ra chỉ gồm các chỉ số trong phạm vi sức chứa mảng, chắc chắn nhiều số nguyên sẽ được ánh xạ tới cùng một bucket.

Xung đột băm có thể làm kết quả truy vấn sai và ảnh hưởng nghiêm trọng đến khả năng sử dụng bảng băm. Một cách xử lý đơn giản là cứ mở rộng bảng cho đến khi xung đột biến mất. Cách này trực tiếp và hiệu quả về mặt kết quả, nhưng rất kém hiệu suất vì mở rộng đòi hỏi di chuyển nhiều dữ liệu và tính lại giá trị băm. Có hai hướng cải thiện.

1. Cải tiến cấu trúc để **bảng băm vẫn hoạt động đúng khi xung đột xảy ra**.
2. Chỉ mở rộng khi thực sự cần thiết, tức khi mức độ xung đột đã nghiêm trọng.

Hai phương pháp chính để cải tiến cấu trúc bảng băm là tạo chuỗi riêng và định địa chỉ mở.

## Tạo chuỗi riêng

Trong bảng băm ban đầu, mỗi bucket chỉ lưu được một cặp khóa–giá trị. <u>Tạo chuỗi riêng</u> thay phần tử đơn trong mỗi bucket bằng một danh sách liên kết, xem mỗi cặp khóa–giá trị là một nút và lưu mọi cặp bị xung đột trong cùng danh sách.

![Bảng băm dùng tạo chuỗi riêng](hash_collision.assets/hash_table_chaining.png)

Các thao tác cơ bản của bảng băm tạo chuỗi riêng hoạt động như sau.

- **Truy vấn phần tử**: Nhập `key`, dùng hàm băm tính chỉ số bucket, truy cập đầu danh sách tương ứng, rồi duyệt và so sánh khóa cho đến khi tìm thấy cặp cần thiết.
- **Thêm phần tử**: Dùng hàm băm tìm danh sách tương ứng, sau đó chèn nút biểu diễn cặp khóa–giá trị vào danh sách.
- **Xóa phần tử**: Dùng hàm băm tìm danh sách, duyệt để xác định nút đích rồi xóa nút đó.

Phương pháp tạo chuỗi riêng có hai hạn chế chính.

- **Tăng mức sử dụng không gian**: Nút danh sách liên kết cần lưu con trỏ nên chiếm nhiều bộ nhớ hơn phần tử mảng.
- **Giảm hiệu suất truy vấn**: Để tìm phần tử trong một bucket, phải duyệt tuyến tính danh sách liên kết.

Mã dưới đây cài đặt đơn giản một bảng băm tạo chuỗi riêng. Có hai điểm cần lưu ý.

- Để mã ngắn gọn, bản cài đặt dùng danh sách động thay cho danh sách liên kết. Mảng bảng băm chứa nhiều bucket và mỗi bucket là một danh sách.
- Bản cài đặt có phương thức mở rộng. Khi hệ số tải vượt quá `2/3`, bảng được mở rộng lên `2` lần kích thước ban đầu.

```python
# Mã bảng băm tạo chuỗi riêng chính thức được chèn từ nguồn đã khóa.
```

Khi danh sách liên kết trở nên quá dài, thời gian truy vấn `O(n)` là không tốt. **Khi đó có thể chuyển danh sách thành cây AVL hoặc cây đỏ–đen**, qua đó giảm độ phức tạp truy vấn xuống `O(log n)`.

## Định địa chỉ mở

<u>Định địa chỉ mở</u> không đưa thêm một cấu trúc dữ liệu khác vào bảng băm. Thay vào đó, nó xử lý xung đột bằng cách thăm dò lặp lại. Các chiến lược thường gặp gồm thăm dò tuyến tính, thăm dò bậc hai và dùng nhiều hàm băm.

Hãy dùng thăm dò tuyến tính để tìm hiểu cơ chế của bảng băm định địa chỉ mở.

### Thăm dò tuyến tính

Thăm dò tuyến tính dùng một bước nhảy cố định để lần lượt kiểm tra các bucket, vì vậy thao tác hơi khác bảng băm thông thường.

- **Thêm phần tử**: Tính chỉ số bucket bằng hàm băm. Nếu bucket đã có phần tử, tiếp tục thăm dò từ vị trí xung đột với bước cố định, thường là `1`, cho đến khi tìm thấy bucket trống rồi chèn phần tử.
- **Tìm phần tử**: Nếu gặp xung đột, tiếp tục thăm dò với cùng bước nhảy cho đến khi tìm thấy khóa và trả về `value`. Nếu gặp bucket trống, khóa đích không có trong bảng nên trả về `None`.

Hình dưới đây cho thấy cách phân bố cặp khóa–giá trị trong bảng băm định địa chỉ mở dùng thăm dò tuyến tính. Theo hàm băm này, các khóa có hai chữ số cuối giống nhau được ánh xạ tới cùng bucket; quá trình thăm dò đặt chúng vào bucket đó và các bucket kế tiếp.

![Phân bố cặp khóa–giá trị trong bảng băm thăm dò tuyến tính](hash_collision.assets/hash_table_linear_probing.png)

Tuy nhiên, **thăm dò tuyến tính dễ tạo thành cụm**. Một vùng liên tiếp đã bị chiếm càng dài thì xung đột mới càng dễ xuất hiện trong vùng đó, khiến cụm tiếp tục lớn lên. Vòng lặp này dần làm giảm hiệu suất thêm, xóa, truy vấn và cập nhật.

Điều quan trọng là **không thể xóa trực tiếp phần tử khỏi bảng băm định địa chỉ mở**. Nếu xóa và để lại bucket trống `None`, quá trình tìm kiếm sẽ dừng ngay khi gặp bucket đó. Các phần tử nằm xa hơn trong chuỗi thăm dò trở nên không thể truy cập, khiến chương trình kết luận sai rằng chúng không tồn tại.

![Vấn đề truy vấn do xóa trong định địa chỉ mở](hash_collision.assets/hash_table_open_addressing_deletion.png)

Để khắc phục, có thể dùng <u>xóa lười</u>: không loại bỏ trực tiếp phần tử mà **dùng hằng `TOMBSTONE` để đánh dấu bucket đã xóa**. Cả `None` và `TOMBSTONE` đều biểu thị vị trí có thể nhận cặp mới, nhưng khi tìm kiếm gặp `TOMBSTONE`, quá trình vẫn phải tiếp tục vì có thể còn cặp khóa–giá trị ở phía sau.

Tuy vậy, **xóa lười có thể làm bảng băm suy giảm hiệu suất nhanh hơn**. Mỗi lần xóa để lại một dấu mộ; khi số `TOMBSTONE` tăng lên, tìm kiếm phải bỏ qua nhiều dấu mộ trước khi tới phần tử đích.

Một cách cải thiện là ghi lại chỉ số `TOMBSTONE` đầu tiên gặp trong khi thăm dò và đổi chỗ phần tử đích vừa tìm được vào đó. Nhờ vậy, mỗi lần truy vấn hoặc chèn có thể đưa phần tử gần hơn với vị trí lý tưởng, tức gần nơi quá trình thăm dò bắt đầu, qua đó cải thiện hiệu suất.

Mã sau cài đặt bảng băm định địa chỉ mở bằng thăm dò tuyến tính và xóa lười. Để tận dụng không gian, bảng được xem như một “mảng vòng”; khi vượt cuối mảng, quá trình quay lại đầu và tiếp tục.

```python
# Mã bảng băm định địa chỉ mở chính thức được chèn từ nguồn đã khóa.
```

### Thăm dò bậc hai

Thăm dò bậc hai tương tự thăm dò tuyến tính và là một chiến lược phổ biến của định địa chỉ mở. Khi xung đột xảy ra, nó không nhảy một khoảng cố định mà nhảy theo “bình phương số lần thăm dò”, tức $1, 4, 9, \dots$ bước.

Thăm dò bậc hai có những ưu điểm sau.

- Khoảng nhảy bằng bình phương số lần thăm dò giúp giảm hiệu ứng tạo cụm của thăm dò tuyến tính.
- Khoảng nhảy lớn hơn giúp tìm vị trí trống ở xa và phân bố dữ liệu đồng đều hơn.

Tuy nhiên, phương pháp này không hoàn hảo.

- Hiện tượng tạo cụm vẫn tồn tại; một số vị trí có khả năng bị chiếm cao hơn vị trí khác.
- Vì bình phương tăng nhanh, quá trình có thể không thăm được toàn bộ bảng. Do đó, dù bảng vẫn có bucket trống, phương pháp có thể không tiếp cận được bucket đó.

### Dùng nhiều hàm băm

Đúng như tên gọi, phương pháp này dùng nhiều hàm $f_1(x)$, $f_2(x)$, $f_3(x)$, $\dots$ để thăm dò.

- **Thêm phần tử**: Nếu $f_1(x)$ gặp xung đột, thử $f_2(x)$ rồi tiếp tục cho đến khi tìm được vị trí trống và chèn phần tử.
- **Tìm phần tử**: Kiểm tra theo cùng thứ tự các hàm băm cho đến khi tìm thấy phần tử đích. Nếu gặp vị trí trống hoặc đã thử hết các hàm, phần tử không có trong bảng và trả về `None`.

So với thăm dò tuyến tính, dùng nhiều hàm băm ít tạo cụm hơn nhưng phải trả thêm chi phí tính toán cho nhiều hàm.

!!! tip

    Mọi bảng băm định địa chỉ mở, gồm thăm dò tuyến tính, thăm dò bậc hai và dùng nhiều hàm băm, đều có hạn chế là không thể xóa trực tiếp phần tử.

## Lựa chọn của các ngôn ngữ lập trình

Các ngôn ngữ lập trình chọn chiến lược cài đặt bảng băm khác nhau.

- Python dùng định địa chỉ mở; kiểu từ điển `dict` sử dụng số giả ngẫu nhiên để thăm dò.
- Java dùng tạo chuỗi riêng. Từ JDK 1.8, khi độ dài mảng của `HashMap` đạt 64 và một danh sách liên kết dài tới 8, danh sách được đổi thành cây đỏ–đen để tăng hiệu suất tìm kiếm.
- Go dùng tạo chuỗi riêng. Mỗi bucket lưu tối đa 8 cặp khóa–giá trị; nếu vượt sức chứa, một bucket tràn được nối thêm. Khi có quá nhiều bucket tràn, Go thực hiện kiểu mở rộng cùng sức chứa để duy trì hiệu suất.
