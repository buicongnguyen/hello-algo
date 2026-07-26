# Bảng băm

<u>Bảng băm</u>, còn gọi là <u>ánh xạ băm</u>, lưu quan hệ ánh xạ từ khóa `key` đến giá trị `value` để hỗ trợ truy vấn hiệu quả. Cụ thể, khi biết một khóa `key`, bảng băm có thể trả về giá trị `value` tương ứng trong thời gian $O(1)$.

Giả sử có $n$ sinh viên, mỗi người có hai thông tin là họ tên và mã sinh viên. Nếu cần hỗ trợ truy vấn “cho mã sinh viên, trả về họ tên tương ứng”, có thể dùng bảng băm như hình dưới đây.

![Biểu diễn trừu tượng của bảng băm](hash_map.assets/hash_table_lookup.png)

Ngoài bảng băm, mảng và danh sách liên kết cũng có thể thực hiện chức năng truy vấn. Hiệu suất của chúng được so sánh như sau.

- **Thêm phần tử**: Chỉ cần thêm phần tử vào cuối mảng hoặc danh sách liên kết, tốn thời gian `O(1)`.
- **Truy vấn phần tử**: Vì mảng hoặc danh sách liên kết không có thứ tự, phải duyệt qua mọi phần tử, tốn thời gian `O(n)`.
- **Xóa phần tử**: Trước tiên phải tìm phần tử, sau đó mới xóa khỏi mảng hoặc danh sách liên kết, tốn thời gian `O(n)`.

Bảng: So sánh hiệu suất truy vấn phần tử

| | Mảng | Danh sách liên kết | Bảng băm |
| --- | --- | --- | --- |
| Tìm phần tử | $O(n)$ | $O(n)$ | $O(1)$ |
| Thêm phần tử | $O(1)$ | $O(1)$ | $O(1)$ |
| Xóa phần tử | $O(n)$ | $O(n)$ | $O(1)$ |

Có thể thấy **các thao tác thêm, xóa, truy vấn và cập nhật trong bảng băm đều có độ phức tạp thời gian `O(1)`**, nhờ đó bảng băm đạt hiệu suất rất cao.

## Các thao tác thường dùng của bảng băm

Các thao tác phổ biến gồm khởi tạo, truy vấn, thêm cặp khóa–giá trị và xóa cặp khóa–giá trị. Mỗi nhóm thẻ dưới đây trình bày cùng thao tác bằng 13 ngôn ngữ lập trình.

Khi thêm một cặp có khóa chưa tồn tại, bảng tạo ánh xạ mới; nếu khóa đã tồn tại, giá trị cũ được cập nhật. Truy vấn luôn bắt đầu từ khóa chứ không từ vị trí vật lý của phần tử, còn xóa phải loại bỏ đúng quan hệ giữa khóa và giá trị. Vì giao diện chỉ công khai các thao tác theo khóa, người dùng không cần biết bucket cụ thể nằm ở đâu trong mảng nền.

```python
# Mã thao tác bảng băm chính thức được chèn từ nguồn đã khóa.
```

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ thao tác bảng băm trong Python Tutor](https://pythontutor.com/render.html#code=hmap%20%3D%20%7B%7D%0Ahmap%5B12836%5D%20%3D%20%22An%22%0Ahmap%5B15937%5D%20%3D%20%22Binh%22%0Aname%20%3D%20hmap%5B15937%5D%0Ahmap.pop%2812836%29&cumulative=false&curInstr=4&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

Có ba cách duyệt bảng băm thường gặp: duyệt các cặp khóa–giá trị, chỉ duyệt khóa và chỉ duyệt giá trị. Mã ví dụ như sau.

Duyệt cặp phù hợp khi thuật toán cần đồng thời nhận diện phần tử và xử lý dữ liệu gắn với nó. Duyệt khóa hữu ích khi chỉ cần kiểm tra tập định danh hoặc thực hiện truy vấn khác bằng từng khóa. Duyệt giá trị thích hợp cho việc tổng hợp dữ liệu mà không quan tâm khóa. Trật tự duyệt có thể phụ thuộc vào ngôn ngữ và cách cài đặt, vì vậy thuật toán không nên tự giả định thứ tự nếu hợp đồng của kiểu dữ liệu không bảo đảm điều đó.

```python
# Mã duyệt bảng băm chính thức được chèn từ nguồn đã khóa.
```

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ duyệt bảng băm trong Python Tutor](https://pythontutor.com/render.html#code=hmap%20%3D%20%7B12836%3A%20%22An%22%2C%2015937%3A%20%22Binh%22%7D%0Afor%20key%2C%20value%20in%20hmap.items%28%29%3A%0A%20%20%20%20print%28key%2C%20value%29%0Afor%20key%20in%20hmap.keys%28%29%3A%0A%20%20%20%20print%28key%29%0Afor%20value%20in%20hmap.values%28%29%3A%0A%20%20%20%20print%28value%29&cumulative=false&curInstr=6&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

## Cài đặt bảng băm đơn giản

Hãy bắt đầu từ trường hợp đơn giản nhất: **chỉ dùng một mảng để cài đặt bảng băm**. Mỗi ô trống trong mảng của bảng băm được gọi là một <u>bucket</u> và mỗi bucket có thể lưu một cặp khóa–giá trị. Do đó, truy vấn gồm hai việc: tìm bucket của `key`, rồi đọc `value` được lưu tại đó.

Làm thế nào tìm đúng bucket cho một `key`? Chúng ta dùng <u>hàm băm</u>. Hàm băm ánh xạ một không gian đầu vào lớn sang một không gian đầu ra nhỏ hơn. Trong bảng băm, không gian đầu vào là tập hợp mọi `key`, còn không gian đầu ra là tập hợp các bucket, tức các chỉ số mảng. Nói cách khác, với một `key`, **hàm băm cho biết cặp khóa–giá trị tương ứng phải được lưu ở vị trí nào trong mảng**.

Để tính chỉ số bucket từ `key`, thực hiện hai bước.

1. Dùng thuật toán băm `hash()` để tính giá trị băm.
2. Lấy giá trị băm chia lấy dư cho số bucket, tức độ dài mảng `capacity`, để nhận bucket hay chỉ số mảng `index` tương ứng với `key`.

```shell
index = hash(key) % capacity
```

Sau đó, dùng `index` để truy cập bucket tương ứng và lấy `value`.

Giả sử mảng có độ dài `capacity = 100` và thuật toán băm là `hash(key) = key`. Khi đó hàm băm là `key % 100`. Hình dưới đây minh họa cách hàm băm hoạt động khi mã sinh viên là `key` và họ tên là `value`.

![Nguyên lý hoạt động của hàm băm](hash_map.assets/hash_function.png)

Mã sau cài đặt một bảng băm đơn giản. `key` và `value` được đóng gói trong lớp `Pair` để biểu diễn một cặp khóa–giá trị.

Bản cài đặt mảng này giúp nhìn rõ cơ chế cốt lõi: phương thức băm chuyển khóa thành chỉ số, `get()` đọc bucket, `put()` đặt cặp vào bucket và `remove()` xóa cặp tại chỉ số tương ứng. Nó cố ý chưa xử lý hai khóa cùng chỉ số; hạn chế đó dẫn trực tiếp tới nội dung xung đột và mở rộng ở phần tiếp theo.

```python
# Mã bảng băm mảng chính thức được chèn từ nguồn đã khóa.
```

## Xung đột băm và mở rộng

Về bản chất, hàm băm ánh xạ không gian đầu vào gồm mọi `key` sang không gian đầu ra gồm các chỉ số mảng. Không gian đầu vào thường lớn hơn rất nhiều so với đầu ra. Vì vậy, **về lý thuyết sẽ có lúc hai đầu vào khác nhau ánh xạ tới cùng một đầu ra**.

Với hàm băm trong ví dụ trên, các `key` có hai chữ số cuối giống nhau tạo ra cùng một kết quả. Chẳng hạn, khi truy vấn hai sinh viên có mã 12836 và 20336, kết quả là:

```shell
12836 % 100 = 36
20336 % 100 = 36
```

Trong hình dưới đây, hai mã sinh viên cùng chỉ tới một tên, rõ ràng là không đúng. Hiện tượng nhiều đầu vào ánh xạ tới cùng một đầu ra được gọi là <u>xung đột băm</u>.

![Ví dụ xung đột băm](hash_map.assets/hash_collision.png)

Có thể thấy sức chứa bảng băm $n$ càng lớn thì xác suất nhiều `key` được phân vào cùng bucket càng thấp và số xung đột càng ít. Vì vậy, **mở rộng bảng băm có thể làm giảm xung đột băm**.

Trong hình dưới đây, trước khi mở rộng, hai cặp `(136, A)` và `(236, D)` xung đột; sau khi mở rộng, xung đột biến mất.

![Mở rộng bảng băm](hash_map.assets/hash_table_reshash.png)

Tương tự mở rộng mảng, mở rộng bảng băm phải di chuyển toàn bộ cặp khóa–giá trị từ bảng cũ sang bảng mới nên chi phí rất lớn. Hơn nữa, vì `capacity` thay đổi, vị trí lưu của mọi cặp phải được tính lại bằng hàm băm, làm chi phí tăng thêm. Do đó, các ngôn ngữ lập trình thường dành trước sức chứa đủ lớn để tránh mở rộng quá thường xuyên.

Không thể chỉ sao chép từng bucket cũ sang bucket có cùng chỉ số trong bảng mới. Chỉ số là kết quả của phép chia dư theo `capacity`; khi sức chứa thay đổi, một khóa có thể chuyển sang bucket hoàn toàn khác. Quá trình mở rộng vì thế phải lấy từng cặp còn hiệu lực, tính lại chỉ số với sức chứa mới rồi chèn lại. Đây thường được gọi là tái băm.

<u>Hệ số tải</u> là một khái niệm quan trọng của bảng băm, được tính bằng số phần tử chia cho số bucket. Nó phản ánh mức độ nghiêm trọng của xung đột băm và **thường được dùng làm ngưỡng kích hoạt mở rộng bảng băm**. Ví dụ, trong Java, khi hệ số tải vượt quá $0.75$, hệ thống mở rộng bảng băm lên gấp đôi kích thước ban đầu.
