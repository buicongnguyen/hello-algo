# Bài tập

## Ôn tập khái niệm

### Thuật toán hoán vị này có bỏ sót kết quả không?

Một thuật toán tại vị trí `i` chỉ hoán đổi phần tử `i` với từng vị trí từ `i` đến cuối rồi đệ quy cho `i+1`. Hãy giải thích vì sao nó sinh mọi hoán vị của các phần tử khác nhau.

??? success "Đáp án"

    Mỗi lựa chọn đặt một trong các phần tử chưa dùng vào vị trí `i`. Sau đó bài toán con hoán vị toàn bộ phần còn lại. Các nhánh có lựa chọn đầu khác nhau không trùng nhau, và quy nạp theo số vị trí còn lại cho thấy mọi hoán vị đều được sinh đúng một lần.

### Thứ tự chọn số có quan trọng không?

Khi tìm các tập con có tổng bằng mục tiêu, vì sao duyệt ứng viên từ một chỉ mục `start` giúp tránh các kết quả chỉ khác thứ tự?

??? success "Đáp án"

    Sau khi chọn một phần tử, chỉ xét các phần tử phía sau nên mỗi tập chỉ xuất hiện theo một thứ tự chỉ mục tăng dần. Nếu mỗi tầng lại xét toàn bộ mảng, cùng một tập có thể xuất hiện như `[a,b]` và `[b,a]`.

### Quân hậu tiếp theo có thể đặt ở đâu?

Trong bài toán n quân hậu, khi đã đặt quân hậu ở các hàng trước, những điều kiện nào giúp cắt tỉa vị trí ở hàng hiện tại?

??? success "Đáp án"

    Cột chưa được dùng, đường chéo chính `row-col` chưa có quân và đường chéo phụ `row+col` chưa có quân. Bất kỳ vị trí vi phạm điều kiện nào đều không thể dẫn tới lời giải và được cắt tỉa ngay.

## Bài tập lập trình

### Hoán vị của các phần tử khác nhau

Cho mảng các số nguyên khác nhau, hãy trả về mọi hoán vị.

??? tip "Gợi ý"

    Cố định lần lượt từng vị trí. Hoán đổi mỗi ứng viên vào vị trí hiện tại, đệ quy, rồi hoàn tác phép hoán đổi để khôi phục trạng thái.

[LeetCode](https://leetcode.com/problems/permutations/)
