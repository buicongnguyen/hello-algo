# Bài tập

## Ôn tập khái niệm

### Heap thay đổi thế nào sau khi chèn 10?

Cho max-heap `[9, 7, 8, 3, 2, 5]`. Hãy chèn `10` và nêu các lần đổi chỗ.

??? success "Đáp án"

    Thêm `10` ở cuối: `[9, 7, 8, 3, 2, 5, 10]`. Nó lớn hơn nút cha `8` nên đổi chỗ, rồi lớn hơn gốc `9` nên đổi tiếp. Kết quả là `[10, 7, 9, 3, 2, 5, 8]`.

### Kiểm tra quan hệ cha–con trong min-heap

Với mảng `[1, 3, 2, 7, 6, 4]`, hãy kiểm tra điều kiện min-heap bằng chỉ mục cha và con.

??? success "Đáp án"

    Với chỉ mục bắt đầu từ 0, con trái và phải của `i` là `2i+1`, `2i+2`. Mỗi nút cha trong mảng đều không lớn hơn các nút con tồn tại, nên đây là min-heap. Không cần so sánh hai anh em với nhau.

### Giữ ba số lớn nhất bằng min-heap

Khi đọc một luồng số, vì sao min-heap sức chứa 3 có thể giữ ba giá trị lớn nhất?

??? success "Đáp án"

    Đưa số vào cho tới khi heap có 3 phần tử. Sau đó, chỉ thay đỉnh khi số mới lớn hơn đỉnh nhỏ nhất. Vì đỉnh luôn là phần tử nhỏ nhất trong ba ứng viên, cuối cùng heap giữ đúng ba số lớn nhất. Mỗi lần cập nhật mất $O(\log 3)$.

## Bài tập lập trình

### Phần tử lớn thứ k trong mảng

Cho mảng số nguyên và `k`, hãy trả về phần tử lớn thứ `k` theo thứ tự sắp xếp, không phải phần tử khác nhau thứ `k`.

??? tip "Gợi ý"

    Duy trì min-heap tối đa `k` phần tử. Khi heap vượt `k`, lấy đỉnh ra. Sau khi đọc hết mảng, đỉnh là đáp án.

[LeetCode](https://leetcode.com/problems/kth-largest-element-in-an-array/)
