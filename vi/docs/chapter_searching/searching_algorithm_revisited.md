# Nhìn lại các thuật toán tìm kiếm

<u>Thuật toán tìm kiếm</u> dùng để tìm một phần tử hoặc một nhóm phần tử thỏa điều kiện trong mảng, danh sách liên kết, cây, đồ thị và các cấu trúc dữ liệu khác.

Dựa trên cách triển khai, có thể chia chúng thành hai nhóm:

- **Định vị mục tiêu bằng cách duyệt cấu trúc dữ liệu**, chẳng hạn duyệt mảng, danh sách liên kết, cây hoặc đồ thị.
- **Tận dụng cách dữ liệu được tổ chức hoặc thông tin đã biết để tra cứu hiệu quả**, chẳng hạn tìm kiếm nhị phân, tra cứu băm và tìm trên cây tìm kiếm nhị phân.

Các kỹ thuật riêng lẻ đã xuất hiện ở những chương trước. Phần này hệ thống hóa chúng theo yêu cầu tiền xử lý, chi phí truy vấn, cập nhật và bộ nhớ.

## Tìm kiếm vét cạn

Tìm kiếm vét cạn định vị mục tiêu bằng cách lần lượt duyệt các phần tử của cấu trúc dữ liệu.

- **Tìm kiếm tuyến tính** áp dụng cho mảng và danh sách liên kết. Thuật toán bắt đầu ở một đầu, đọc từng phần tử cho đến khi gặp mục tiêu hoặc đi hết cấu trúc.
- **Tìm kiếm theo chiều rộng và chiều sâu** là hai chiến lược duyệt cây, đồ thị. BFS đi theo từng lớp từ gần đến xa; DFS đi hết một nhánh rồi quay lui để thử nhánh khác cho đến khi duyệt xong miền có thể đến.

Ưu điểm của vét cạn là đơn giản, tổng quát, **không cần tiền xử lý dữ liệu hay xây dựng cấu trúc phụ**. Nó phù hợp khi chỉ tìm một lần, dữ liệu nhỏ hoặc cập nhật liên tục khiến duy trì một chỉ mục trở nên đắt đỏ.

Tuy nhiên, **độ phức tạp thời gian thường là $O(n)$**, trong đó $n$ là số phần tử. Khi dữ liệu lớn và phải truy vấn nhiều lần, đọc lại toàn bộ cấu trúc cho mỗi truy vấn tạo ra chi phí đáng kể.

## Tìm kiếm thích nghi

Tìm kiếm thích nghi tận dụng thuộc tính của dữ liệu, chẳng hạn thứ tự đã sắp xếp, để loại bỏ nhanh những vùng không thể chứa mục tiêu.

- **Tìm kiếm nhị phân** dùng tính có thứ tự để giảm một nửa phạm vi sau mỗi vòng và phù hợp với cấu trúc truy cập ngẫu nhiên như mảng.
- **Tra cứu băm** lưu dữ liệu dưới dạng khóa–giá trị trong bảng băm để định vị khóa gần như trực tiếp.
- **Tìm kiếm trên cây** dùng cây tìm kiếm nhị phân hoặc cây cân bằng, so sánh giá trị nút để loại bỏ nhanh một nhánh.

Những phương pháp này rất hiệu quả, **có thể đạt $O(\log n)$ hoặc thậm chí trung bình $O(1)$**.

Đổi lại, **chúng thường cần tiền xử lý hoặc cấu trúc phụ**. Tìm kiếm nhị phân cần mảng đã sắp xếp; tra cứu băm cần xây bảng; tìm trên cây cần tạo và duy trì quan hệ cây. Chèn, xóa và cân bằng lại các cấu trúc đó cũng tiêu tốn thời gian và bộ nhớ.

!!! tip

    Thuật toán tìm kiếm thích nghi cũng thường được gọi là thuật toán tra cứu, chủ yếu dùng để nhanh chóng lấy phần tử mục tiêu trong một cấu trúc dữ liệu cụ thể. Hiệu quả truy vấn đến từ công việc tổ chức dữ liệu được thực hiện trước hoặc trong các lần cập nhật.

## Lựa chọn phương pháp tìm kiếm

Với tập dữ liệu kích thước $n$, có thể chọn tìm tuyến tính, tìm nhị phân, tìm trên cây hoặc tra cứu băm. Hình dưới đây đối chiếu nguyên lý của bốn phương pháp.

![Nhiều chiến lược tìm kiếm](searching_algorithm_revisited.assets/searching_algorithms.png)

Bảng sau tổng hợp hiệu quả và đặc điểm của chúng. Các giá trị của cây giả định cấu trúc được cân bằng; bảng băm dùng độ phức tạp trung bình khi hàm băm và xử lý xung đột hoạt động tốt.

| Đặc điểm | Tìm tuyến tính | Tìm nhị phân | Tìm trên cây | Tra cứu băm |
| --- | --- | --- | --- | --- |
| Tìm phần tử | $O(n)$ | $O(\log n)$ | $O(\log n)$ | $O(1)$ |
| Chèn phần tử | $O(1)$ | $O(n)$ | $O(\log n)$ | $O(1)$ |
| Xóa phần tử | $O(n)$ | $O(n)$ | $O(\log n)$ | $O(1)$ |
| Không gian phụ | $O(1)$ | $O(1)$ | $O(n)$ | $O(n)$ |
| Tiền xử lý | Không | Sắp xếp $O(n \log n)$ | Dựng cây $O(n \log n)$ | Dựng bảng băm $O(n)$ |
| Dữ liệu có thứ tự | Không yêu cầu | Có | Có | Không |

Việc lựa chọn còn phụ thuộc vào quy mô, yêu cầu độ trễ truy vấn, số lần truy vấn, tần suất chèn/xóa, nhu cầu giữ thứ tự và giới hạn bộ nhớ.

**Tìm kiếm tuyến tính**

- Có tính tổng quát cao và không cần tiền xử lý. Nếu chỉ truy vấn một lần, chi phí sắp xếp hoặc xây cấu trúc phụ có thể lớn hơn chính một lần duyệt.
- Phù hợp với dữ liệu nhỏ, khi khác biệt về bậc độ phức tạp chưa tạo ra tác động thực tế đáng kể.
- Phù hợp với dữ liệu cập nhật rất thường xuyên vì không phải duy trì chỉ mục phụ sau mỗi thay đổi.

**Tìm kiếm nhị phân**

- Phù hợp với tập dữ liệu lớn đã có thứ tự, cho hiệu suất ổn định với trường hợp xấu nhất $O(\log n)$.
- Kích thước không nên vượt khả năng cấp một vùng nhớ liên tục cho mảng.
- Không phù hợp khi chèn và xóa thường xuyên vì giữ mảng có thứ tự đòi hỏi di chuyển nhiều phần tử.
- Rất hữu ích khi một mảng tĩnh được truy vấn nhiều lần hoặc khi bài toán có tính đơn điệu cho phép tìm trên miền đáp án.

**Tra cứu băm**

- Phù hợp khi yêu cầu truy vấn khóa rất nhanh, với độ phức tạp trung bình $O(1)$.
- Không phù hợp nếu cần duy trì thứ tự hoặc truy vấn theo khoảng, vì bảng băm không tự giữ khóa đã sắp xếp.
- Phụ thuộc nhiều vào hàm băm, hệ số tải và chiến lược xử lý xung đột; thiết kế kém có thể làm hiệu suất suy giảm.
- Cần thêm không gian để giữ số vùng chứa đủ lớn và giảm xung đột, nên không phù hợp nếu bộ nhớ rất hạn chế.

**Tìm kiếm trên cây**

- Phù hợp với dữ liệu lớn vì các nút có thể nằm rời rạc trong bộ nhớ.
- Giữ được thứ tự và hỗ trợ truy vấn khoảng, phần tử gần nhất, phần tử nhỏ nhất/lớn nhất.
- Cây tìm kiếm nhị phân thông thường có thể bị lệch sau nhiều lần chèn/xóa, khiến thời gian suy giảm đến $O(n)$.
- AVL hoặc cây đỏ-đen duy trì mọi thao tác ở $O(\log n)$ nhưng phải trả thêm chi phí xoay và cập nhật thông tin cân bằng.

Không có phương pháp nào tốt nhất cho mọi trường hợp. Cần tính cả chi phí xây dựng, số truy vấn dự kiến và chi phí duy trì dữ liệu sau cập nhật, thay vì chỉ so sánh thời gian của một lần tìm.
