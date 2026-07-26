# Bài tập

## Ôn tập khái niệm

### Mảng và danh sách liên kết tìm phần tử như thế nào?

Mảng và danh sách liên kết đơn đều lưu `[A, B, C, D, E]`. Hãy truy cập phần tử thứ tư `D`.

1. Mảng dùng trực tiếp chỉ mục nào?
2. Từ nút đầu `A`, danh sách đi qua các nút theo thứ tự nào?
3. Khi vị trí cần truy cập tiến gần cuối, số bước của mỗi cấu trúc thay đổi ra sao? Nếu thường xuyên truy cập theo vị trí, cấu trúc nào phù hợp hơn và vì sao?

??? success "Đáp án"

    1. Với chỉ mục bắt đầu từ 0, phần tử thứ tư có chỉ mục 3 nên mảng truy cập `arr[3]` trong $O(1)$.

    2. Danh sách phải bắt đầu từ nút đầu và đi theo `A → B → C → D`, tức ba lần theo `next`.

    3. Mảng tính địa chỉ trực tiếp nên thời gian không đổi khi vị trí lùi về cuối.
        Muốn đến nút thứ $k$, danh sách đơn phải theo `next` đúng $k-1$ lần và trong trường hợp xấu nhất tốn $O(n)$.
        Vì vậy mảng phù hợp hơn cho truy cập lặp lại theo vị trí. Điều này không có nghĩa danh sách liên kết chậm hơn ở mọi thao tác.

### Mảng và danh sách liên kết chèn phần tử như thế nào?

Mảng `[A, B, C, D, _]` còn một ô trống. Danh sách là `A → B → C → D` và đã có tham chiếu tới `B`. Hãy chèn `X` sau `B`.

1. Mảng cần dịch những phần tử nào, và kết quả là gì?
2. Phải cập nhật `X.next` và `B.next` theo thứ tự nào?
3. Vì sao điều kiện đã có tham chiếu `B` quan trọng khi so sánh hiệu quả?

??? success "Đáp án"

    1. Mảng dịch `D`, rồi `C` sang phải và đặt `X` ở chỉ mục 2, thu được `[A, B, X, C, D]`.

    2. `B.next` ban đầu trỏ tới `C`. Trước hết đặt `X.next = B.next`, sau đó đặt `B.next = X`; kết quả là `A → B → X → C → D`.
        Nếu ghi đè `B.next` trước khi lưu liên kết cũ, đoạn từ `C` trở đi có thể mất đường truy cập.

    3. Khi đã biết `B`, chỉ cần đổi hai liên kết nên tốn $O(1)$. Nếu phải tìm `B` từ đầu, riêng bước tìm đã có thể tốn $O(n)$.

### Sức chứa của danh sách tăng như thế nào?

Danh sách dựa trên mảng chứa `[A, B, C]`, có `size = 3`, `capacity = 4`, và tăng gấp đôi sức chứa khi đầy. Điều gì xảy ra khi thêm `D` rồi `E`?

1. Sau khi thêm `D`, kích thước và sức chứa là bao nhiêu? Có cần mở rộng không?
2. Khi thêm tiếp `E`, sức chứa mới là bao nhiêu và phải sao chép mấy phần tử?
3. Vì sao danh sách có vẻ tăng sức chứa dù bản thân mảng nền không thể đổi độ dài?

??? success "Đáp án"

    1. `D` vừa ô cuối nên nội dung là `[A, B, C, D]`, `size = 4`, `capacity = 4`; chưa cần mở rộng.

    2. Khi thêm `E`, không còn ô trống nên danh sách tạo mảng sức chứa 8, sao chép bốn phần tử cũ rồi thêm `E`. Kết quả là `size = 5`, `capacity = 8`.

    3. Mảng cũ không lớn lên. Danh sách tạo một mảng mới lớn hơn, sao chép dữ liệu và thay tham chiếu nội bộ; chi tiết đó được che giấu nên người dùng thấy sức chứa danh sách tăng.

## Bài tập lập trình

### Cộng một vào số nguyên lớn lưu bằng mảng

Mảng `digits` lưu các chữ số thập phân của một số nguyên không âm từ trái sang phải; chẳng hạn `[3, 0, 8]` biểu diễn 308. Số 0 dùng `[0]`, còn đầu vào khác không có số 0 ở đầu.

Hãy mô phỏng phép cộng dọc để cộng 1 và trả về mảng kết quả cùng định dạng. Có thể sửa trực tiếp `digits`; nếu xuất hiện số nhớ mới ở đầu, hãy trả về mảng dài hơn. Thuật toán cần chạy theo thời gian tỉ lệ với độ dài và có thể dừng ngay khi không còn số nhớ.

??? tip "Gợi ý"

    1. Bắt đầu từ chữ số cuối giống phép cộng dọc.
    2. Nếu chữ số nhỏ hơn 9, tăng lên 1 rồi trả về ngay.
    3. Nếu bằng 9, đổi thành 0 và tiếp tục sang trái. Nếu mọi chữ số đều bằng 9, thêm 1 ở đầu.

[LeetCode](https://leetcode.com/problems/plus-one/)

### Đảo danh sách liên kết đơn

Cho nút đầu `head` của danh sách liên kết đơn. Mỗi nút chứa giá trị và tham chiếu `next`.

Hãy dùng vòng lặp để đảo hướng mọi liên kết, không tạo nút mới, rồi trả về nút đầu mới.

??? tip "Gợi ý"

    1. Vẽ ba nút liên tiếp cùng hai con trỏ `prev` và `cur`.
    2. Lưu `nxt = cur.next` trước khi đổi `cur.next = prev`.
    3. Sau khi đảo liên kết, cập nhật `prev = cur`, rồi `cur = nxt` để tiếp tục theo danh sách cũ.

[LeetCode](https://leetcode.com/problems/reverse-linked-list/)
