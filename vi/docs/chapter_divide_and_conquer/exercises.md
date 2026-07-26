# Bài tập

## Ôn tập khái niệm

### Bài toán nào phù hợp với chia để trị?

Hãy đánh giá ba bài toán: tìm tổng mảng bằng cách chia đôi; tìm phần tử lớn nhất khi mỗi nửa có thể xử lý độc lập; mô phỏng một quá trình mà trạng thái bước sau phụ thuộc toàn bộ lịch sử trước đó.

??? success "Đáp án"

    Hai bài đầu phù hợp vì có thể chia thành bài toán con cùng dạng, giải độc lập rồi kết hợp bằng phép cộng hoặc `max`. Bài thứ ba không tự nhiên phù hợp nếu các phần không độc lập hoặc không có cách kết hợp rẻ. Chia để trị cần cả phép chia và phép hợp có ý nghĩa.

### Lũy thừa nhanh giảm số phép tính như thế nào?

So sánh tính $x^{16}$ bằng 15 phép nhân liên tiếp với phép bình phương lặp.

??? success "Đáp án"

    Có thể tính $x^2$, $x^4$, $x^8$, $x^{16}$ bằng bốn phép bình phương. Với số mũ lẻ, tách một thừa số `x`. Vì số mũ giảm một nửa sau mỗi bước, độ phức tạp là $O(\log n)$.

### Chia dãy duyệt thành cây con trái và phải

Biết preorder là `[A,B,D,E,C]` và inorder là `[D,B,E,A,C]`. Hãy xác định phần thuộc cây con trái và phải.

??? success "Đáp án"

    Phần tử đầu preorder `A` là gốc. Trong inorder, bên trái `A` là `[D,B,E]`, bên phải là `[C]`. Do cây con trái có ba nút, ba phần tử tiếp theo của preorder `[B,D,E]` thuộc cây con trái; `[C]` thuộc cây con phải.

## Bài tập lập trình

### Lũy thừa nhanh

Cài đặt hàm tính $x^n$ với `n` là số nguyên, kể cả số âm.

??? tip "Gợi ý"

    Nếu `n < 0`, đổi thành tính `1/x` với số mũ dương. Mỗi bước bình phương cơ số và chia đôi số mũ; khi bit thấp của số mũ bằng 1, nhân cơ số vào kết quả.

[LeetCode](https://leetcode.com/problems/powx-n/)
