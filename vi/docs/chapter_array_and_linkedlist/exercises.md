# Bài tập

## Ôn tập khái niệm

### Mảng và danh sách liên kết tìm phần tử như thế nào?

Mảng và danh sách liên kết đơn đều lưu `[A, B, C, D, E]`. Hãy truy cập phần tử thứ tư `D`.

1. Mảng dùng trực tiếp chỉ mục nào?
2. Từ nút đầu `A`, danh sách đi qua các nút theo thứ tự nào?
3. Khi vị trí cần truy cập tiến gần cuối, số bước của mỗi cấu trúc thay đổi ra sao?

??? success "Đáp án"

    1. Với chỉ mục bắt đầu từ 0, mảng truy cập `arr[3]` trong $O(1)$.
    2. Danh sách đi theo `A → B → C → D`, tức ba lần theo `next`.
    3. Truy cập theo vị trí của mảng vẫn là $O(1)$; danh sách cần $O(n)$ trong trường hợp xấu nhất.

### Mảng và danh sách liên kết chèn phần tử như thế nào?

Mảng `[A, B, C, D, _]` còn một ô trống. Danh sách là `A → B → C → D` và đã có tham chiếu tới `B`. Hãy chèn `X` sau `B`.

??? success "Đáp án"

    Mảng dịch `D`, rồi `C` sang phải và đặt `X` ở chỉ mục 2, thu được `[A, B, X, C, D]`. Với danh sách, đặt `X.next = B.next` trước rồi `B.next = X`, thu được `A → B → X → C → D`. Khi đã biết `B`, đổi liên kết mất $O(1)$; nếu phải tìm `B` từ đầu thì có thể mất $O(n)$.

### Sức chứa của danh sách tăng như thế nào?

Danh sách dựa trên mảng chứa `[A, B, C]`, có `size = 3`, `capacity = 4`, và tăng gấp đôi sức chứa khi đầy. Điều gì xảy ra khi thêm `D` rồi `E`?

??? success "Đáp án"

    `D` vừa ô cuối nên `size = 4`, `capacity = 4`. Khi thêm `E`, danh sách tạo mảng sức chứa 8, sao chép bốn phần tử cũ rồi thêm `E`; kết quả là `size = 5`, `capacity = 8`. Mảng cũ không lớn lên, danh sách chỉ thay nó bằng một mảng mới.

## Bài tập lập trình

### Cộng một vào số nguyên lớn lưu bằng mảng

Mảng `digits` lưu các chữ số thập phân từ trái sang phải. Hãy mô phỏng phép cộng dọc để cộng 1 và trả về mảng kết quả.

??? tip "Gợi ý"

    Bắt đầu từ chữ số cuối. Nếu nhỏ hơn 9, tăng rồi trả về; nếu bằng 9, đổi thành 0 và tiếp tục. Nếu mọi chữ số đều bằng 9, thêm 1 ở đầu.

[LeetCode](https://leetcode.com/problems/plus-one/)

### Đảo danh sách liên kết đơn

Cho nút đầu `head`, hãy đảo mọi liên kết bằng phép lặp, không tạo nút mới, rồi trả về nút đầu mới.

??? tip "Gợi ý"

    Dùng `prev`, `cur` và `nxt`. Lưu `nxt = cur.next` trước khi đổi `cur.next = prev`, sau đó tiến cả hai con trỏ.

[LeetCode](https://leetcode.com/problems/reverse-linked-list/)
