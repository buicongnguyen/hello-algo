# Thuật toán sắp xếp

<u>Thuật toán sắp xếp</u> sắp đặt một tập dữ liệu theo một thứ tự xác định. Sắp xếp được dùng rất rộng rãi vì dữ liệu có thứ tự thường dễ tìm kiếm, phân tích và xử lý hơn dữ liệu lộn xộn.

Như hình dưới đây, dữ liệu cần sắp xếp có thể là số nguyên, số thực, ký tự, chuỗi hoặc các đối tượng phức tạp. Quy tắc thứ tự cũng được chọn theo yêu cầu: thứ tự số học, thứ tự mã ký tự ASCII, hay một quy tắc so sánh do ứng dụng tự định nghĩa.

![Ví dụ về kiểu dữ liệu và tiêu chí sắp xếp](sorting_algorithm.assets/sorting_examples.png)

## Các tiêu chí đánh giá

**Hiệu quả thực thi**: Độ phức tạp thời gian nên thấp, đồng thời tổng số phép so sánh, gán và hoán đổi cũng nên nhỏ để giảm hệ số hằng. Với khối lượng dữ liệu lớn, khác biệt về hiệu quả thực thi trở nên đặc biệt quan trọng.

**Tính tại chỗ**: <u>Sắp xếp tại chỗ</u> thao tác trực tiếp trên mảng ban đầu mà không cần một mảng phụ có kích thước tỷ lệ với đầu vào, nhờ đó tiết kiệm bộ nhớ. Trong thực tế, cách này thường giảm cả số lần sao chép dữ liệu.

**Tính ổn định**: <u>Sắp xếp ổn định</u> bảo đảm thứ tự tương đối của các phần tử có khóa bằng nhau không thay đổi sau khi sắp xếp.

Tính ổn định là điều kiện cần khi sắp xếp nhiều tầng. Giả sử bảng sinh viên đã được sắp theo tên, rồi cần sắp tiếp theo tuổi. Một <u>thuật toán không ổn định</u> có thể đảo thứ tự của hai sinh viên cùng tuổi và làm mất thứ tự theo tên đã có từ trước:

```shell
# Dữ liệu đầu vào đã được sắp theo tên
# (tên, tuổi)
  ('A', 19)
  ('B', 18)
  ('C', 21)
  ('D', 19)
  ('E', 23)

# Giả sử dùng một thuật toán không ổn định để sắp theo tuổi.
# Trong kết quả, vị trí tương đối của ('D', 19) và ('A', 19) bị đảo,
# vì vậy tính chất đã sắp theo tên của dữ liệu đầu vào bị mất.
  ('B', 18)
  ('D', 19)
  ('A', 19)
  ('C', 21)
  ('E', 23)
```

**Tính thích nghi**: <u>Sắp xếp thích nghi</u> tận dụng phần thứ tự đã tồn tại trong dữ liệu đầu vào để giảm lượng tính toán. Vì vậy trường hợp tốt nhất của một thuật toán thích nghi thường nhanh hơn trường hợp trung bình.

**Dựa trên so sánh hay không dựa trên so sánh**: <u>Sắp xếp dựa trên so sánh</u> dùng các toán tử $<$, $=$ và $>$ để quyết định thứ tự tương đối giữa các phần tử. Với mô hình này, cận tối ưu tổng quát là $O(n \log n)$. <u>Sắp xếp không dựa trên so sánh</u> có thể đạt $O(n)$ bằng cách khai thác miền giá trị hoặc cấu trúc chữ số, nhưng phạm vi áp dụng hẹp hơn.

## Thuật toán sắp xếp lý tưởng

Một thuật toán lý tưởng sẽ đồng thời **nhanh, tại chỗ, ổn định, thích nghi và áp dụng rộng rãi**. Hiện chưa có thuật toán nào kết hợp trọn vẹn mọi đặc tính đó. Vì vậy lựa chọn đúng phụ thuộc vào kích thước dữ liệu, giới hạn bộ nhớ, phân bố khóa, yêu cầu ổn định và mức độ có thứ tự sẵn của đầu vào.

Các phần tiếp theo lần lượt trình bày những thuật toán sắp xếp tiêu biểu, phân tích cách hoạt động và đánh đổi của chúng theo các tiêu chí vừa nêu.
