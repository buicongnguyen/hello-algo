# Thuật toán là gì?

## Định nghĩa thuật toán

**Thuật toán** là một tập hợp chỉ dẫn hoặc các bước thao tác dùng để giải quyết một bài toán cụ thể trong khoảng thời gian hữu hạn. Một thuật toán có các đặc điểm sau:

- Bài toán được xác định rõ, với đầu vào và đầu ra cụ thể.
- Thuật toán khả thi và có thể hoàn thành bằng số bước, thời gian và bộ nhớ hữu hạn.
- Mỗi bước có ý nghĩa xác định; với cùng đầu vào và cùng điều kiện thực thi, thuật toán luôn cho cùng kết quả.

## Định nghĩa cấu trúc dữ liệu

**Cấu trúc dữ liệu** là cách tổ chức và lưu trữ dữ liệu. Khái niệm này bao gồm bản thân dữ liệu, mối quan hệ giữa các phần tử và những phương thức dùng để thao tác với chúng. Khi thiết kế cấu trúc dữ liệu, chúng ta thường hướng tới các mục tiêu:

- Chiếm ít không gian để tiết kiệm bộ nhớ máy tính.
- Thực hiện nhanh các thao tác như truy cập, thêm, xóa và cập nhật.
- Biểu diễn dữ liệu và quan hệ logic một cách gọn gàng để thuật toán vận hành hiệu quả.

**Thiết kế cấu trúc dữ liệu luôn chứa những sự đánh đổi.** Muốn cải thiện một mặt, chúng ta thường phải chấp nhận giảm hiệu quả ở mặt khác. Ví dụ:

- So với mảng, danh sách liên kết thuận tiện hơn khi thêm hoặc xóa dữ liệu, nhưng truy cập một phần tử theo vị trí chậm hơn.
- So với danh sách liên kết, đồ thị biểu diễn được nhiều quan hệ phong phú hơn, nhưng thường cần nhiều bộ nhớ hơn.

## Quan hệ giữa cấu trúc dữ liệu và thuật toán

Cấu trúc dữ liệu và thuật toán liên hệ chặt chẽ với nhau ở ba điểm:

- **Cấu trúc dữ liệu là nền móng của thuật toán.** Nó cung cấp cách lưu trữ có tổ chức và các thao tác trên dữ liệu.
- **Thuật toán thổi sức sống vào cấu trúc dữ liệu.** Nếu đứng một mình, cấu trúc dữ liệu chỉ lưu thông tin; khi kết hợp với thuật toán, nó mới giải quyết được một bài toán cụ thể.
- **Một thuật toán thường có thể triển khai trên nhiều cấu trúc dữ liệu, nhưng hiệu quả có thể khác nhau rất lớn.** Chọn cấu trúc phù hợp là một quyết định quan trọng.

![Mối quan hệ giữa cấu trúc dữ liệu và thuật toán](what_is_dsa.assets/relationship_between_data_structure_and_algorithm.png)

Chúng ta có thể hình dung cấu trúc dữ liệu và thuật toán giống như lắp ráp một mô hình từ các khối ghép. Một bộ khối ghép không chỉ có nhiều chi tiết mà còn đi kèm hướng dẫn lắp ráp. Làm theo từng bước trong hướng dẫn, chúng ta tạo ra mô hình hoàn chỉnh.

![Lắp ráp các khối ghép](what_is_dsa.assets/assembling_blocks.png)

| Cấu trúc dữ liệu và thuật toán | Lắp ráp các khối ghép |
| --- | --- |
| Dữ liệu đầu vào | Các khối ghép chưa lắp |
| Cấu trúc dữ liệu | Cách tổ chức khối ghép: hình dạng, kích thước, kiểu kết nối và các quan hệ khác |
| Thuật toán | Chuỗi thao tác lắp các khối thành hình dạng mục tiêu |
| Dữ liệu đầu ra | Mô hình đã hoàn thành |

Điểm đáng chú ý là cấu trúc dữ liệu và thuật toán không phụ thuộc vào một ngôn ngữ lập trình cụ thể. Vì vậy, cùng một nội dung trong sách có thể được minh họa bằng nhiều ngôn ngữ.

> Trong trao đổi thực tế, cụm “cấu trúc dữ liệu và thuật toán” thường được rút gọn thành “thuật toán”. Chẳng hạn, “bài tập thuật toán” trên LeetCode thực tế kiểm tra kiến thức ở cả hai mảng.
