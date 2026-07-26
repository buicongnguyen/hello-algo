# Bài tập

## Ôn tập khái niệm

### Thuật toán hoán vị này có bỏ sót kết quả không?

Một thuật toán quay lui cố sinh mọi hoán vị bằng cách thử `1, 2, 3` theo thứ tự. Mỗi khi chọn số `x`, thuật toán:

1. Thêm `x` vào cuối đường hiện tại.
2. Đánh dấu `x` là “đã dùng”.
3. Gọi đệ quy để điền vị trí tiếp theo.

Khi lời gọi đệ quy trả về, học viên chỉ xóa `x` khỏi cuối đường rồi thử số kế tiếp.

<!-- numbered-subquestions -->

1. Thuật toán sinh hoán vị nào đầu tiên? Nó còn có thể sinh đủ 6 hoán vị không?
2. Trước khi trở về tầng trước, chỉ xóa số cuối khỏi đường đã đủ chưa? Nếu chưa, phải làm thêm gì và vì sao?

??? success "Đáp án"

    1. Hoán vị đầu tiên là `[1, 2, 3]`, nhưng thuật toán không thể sinh đủ mọi hoán vị. Khi các lời gọi trả về, đường ngắn lại nhưng cờ của 1, 2 và 3 vẫn ở trạng thái “đã dùng”, nên các nhánh sau không còn số nào khả dụng.

    2. Chưa đủ. Sau khi xóa `x` khỏi cuối đường, thuật toán phải đánh dấu `x` là “chưa dùng”.
        Đường hiện tại và mảng cờ cùng mô tả một trạng thái tìm kiếm. Một lựa chọn thay đổi cả hai,
        nên quay lui phải khôi phục cả hai trước khi nhánh khác có thể chọn lại `x`.

        Một cách kiểm tra bất biến hữu ích là: một vị trí được đánh dấu “đã dùng” khi và chỉ khi phần tử tại vị trí đó đang xuất hiện trong đường hiện tại.

### Thứ tự chọn số có quan trọng không?

Cho mảng đã sắp xếp `[2, 3, 5]` và giá trị đích 5. Mỗi số được chọn lặp lại.
Thuật toán yêu cầu các số trên mỗi đường tìm kiếm chỉ xuất hiện theo thứ tự không giảm.

<!-- numbered-subquestions -->

1. Có thể tìm được những tổ hợp khác nhau nào?
2. Vì sao không cần tìm cùng một nhóm số theo nhiều thứ tự? Ràng buộc thứ tự không giảm có tác dụng gì?
3. Giả sử đường hiện tại là `[3]`, lượng còn thiếu là 2 và ứng viên kế tiếp là 3. Vì sao có thể dừng kiểm tra mọi ứng viên còn lại ở tầng này?

??? success "Đáp án"

    1. Các tổ hợp khác nhau là `[2, 3]` và `[5]`.

    2. Bài tập xem `[2, 3]` và `[3, 2]` là cùng một tổ hợp; thứ tự chọn không tạo đáp án mới.
        Yêu cầu các số trên đường không giảm cho phép bỏ những cách sắp xếp trùng như `[3, 2]`.
        Mỗi đa tập vì thế chỉ có một biểu diễn chuẩn trong cây tìm kiếm.

    3. Lượng còn thiếu là 2, còn ứng viên 3 đã lớn hơn 2. Vì mảng được sắp xếp,
        mọi ứng viên phía sau còn lớn hơn và không thể thêm vào tổ hợp hiện tại.
        Do đó, thuật toán có thể kết thúc ngay vòng lựa chọn của tầng này thay vì chỉ bỏ qua số 3.

### Có thể đặt quân hậu tiếp theo ở đâu?

Đặt hậu theo từng hàng trên bàn cờ `4 × 4`, với chỉ số hàng và cột bắt đầu từ 0.
Hai quân đã được đặt tại `(0, 1)` và `(1, 3)`. Quân tiếp theo phải nằm ở hàng 2.

<!-- numbered-subquestions -->

1. Những cột nào bị loại vì đã có quân hậu?
2. Trong các cột còn lại, vị trí nào bị loại vì nằm cùng đường chéo với quân đã đặt?
3. Vị trí nào ở hàng 2 còn có thể thử?

??? success "Đáp án"

    1. Cột 1 và 3 đã có hậu, nên `(2, 1)` và `(2, 3)` bị loại.

    2. Trong các vị trí còn lại, `(2, 2)` cùng đường chéo với `(1, 3)` nên cũng bị loại.
        Vị trí `(2, 0)` không chung cột hoặc đường chéo với hai quân hiện có.

    3. Vị trí duy nhất có thể thử ở hàng 2 là `(2, 0)`.

        Kết luận này chỉ cho biết lựa chọn hiện tại hợp lệ. Nếu những hàng sau không thể hoàn thành,
        thuật toán vẫn phải quay lui, bỏ một quân trước đó và thử lựa chọn khác ở tầng sớm hơn.

## Bài tập lập trình

### Hoán vị của các phần tử phân biệt

Mảng số nguyên `nums` có ít nhất một phần tử và mọi phần tử đều khác nhau.
Hãy liệt kê mọi thứ tự có thể tạo bằng cách dùng mỗi phần tử đúng một lần và trả mỗi thứ tự dưới dạng mảng.
Các hoán vị có thể xuất hiện theo bất kỳ thứ tự nào trong kết quả.

Dùng quay lui với một mảng boolean ghi vị trí nào đã được chọn cho hoán vị hiện tại. Khi ghi một hoán vị hoàn chỉnh, phải thêm bản sao của đường vào kết quả vì đường sẽ tiếp tục bị thay đổi trong quá trình quay lui.

??? tip "Gợi ý"

    1. Độ sâu đệ quy cho biết đang điền vị trí nào của hoán vị.
    2. Ở mỗi tầng, chỉ thử những phần tử chưa được dùng.
    3. Khi độ dài đường bằng độ dài `nums`, thêm một bản sao của đường vào đáp án.
    4. Sau lời gọi đệ quy, xóa phần tử vừa thêm và đặt lại cờ đã dùng trước khi thử ứng viên kế tiếp.

[LeetCode](https://leetcode.com/problems/permutations/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
