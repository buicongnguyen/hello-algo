# Bài tập

## Ôn tập khái niệm

### Cây nhị phân hoàn chỉnh, đầy đủ và hoàn hảo

Hãy phân biệt ba khái niệm và xác định quan hệ bao hàm giữa chúng.

??? success "Đáp án"

    Cây hoàn hảo có mọi tầng được lấp đầy. Cây hoàn chỉnh chỉ cho phép tầng cuối chưa đầy và các nút ở tầng đó phải nằm liên tục từ trái sang phải. Cây đầy đủ yêu cầu mỗi nút có 0 hoặc 2 nút con. Mọi cây hoàn hảo đều vừa hoàn chỉnh vừa đầy đủ, nhưng chiều ngược lại không luôn đúng.

### Ba thứ tự duyệt cùng một cây

Cho cây có gốc `A`, cây con trái gồm `B` với hai con `D`, `E`, và cây con phải là `C`. Hãy viết thứ tự tiền tự, trung tự và hậu tự.

??? success "Đáp án"

    Tiền tự: `A, B, D, E, C`. Trung tự: `D, B, E, A, C`. Hậu tự: `D, E, B, C, A`. Điểm khác nhau là thời điểm thăm nút gốc so với hai cây con.

### So sánh hai cây tìm kiếm nhị phân

Cùng các khóa có thể tạo nhiều cây tìm kiếm nhị phân khác nhau. Hãy so sánh cây cân bằng với cây suy biến thành chuỗi.

??? success "Đáp án"

    Cả hai giữ quy tắc khóa nhỏ hơn ở bên trái và khóa lớn hơn ở bên phải. Cây cân bằng có chiều cao $O(\log n)$ nên tìm kiếm trung bình theo chiều cao; cây suy biến có chiều cao $O(n)$ và tìm kiếm có thể trở thành tuyến tính.

## Bài tập lập trình

### Độ sâu lớn nhất của cây nhị phân

Trả về số nút trên đường dài nhất từ gốc tới một nút lá.

??? tip "Gợi ý"

    Với cây rỗng trả về 0. Với mỗi nút, kết quả là `1 + max(depth(left), depth(right))`.

[LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

### Duyệt cây nhị phân theo từng mức

Trả về giá trị các nút theo từng mức từ trái sang phải.

??? tip "Gợi ý"

    Dùng hàng đợi. Trước mỗi mức, ghi lại kích thước hàng đợi để biết chính xác bao nhiêu nút thuộc mức hiện tại.

[LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/)

### Phần tử nhỏ thứ k trong cây tìm kiếm nhị phân

Cho cây tìm kiếm nhị phân và số `k`, hãy trả về khóa nhỏ thứ `k`.

??? tip "Gợi ý"

    Phép duyệt trung tự của cây tìm kiếm nhị phân tạo dãy tăng dần. Có thể dừng ngay khi thăm phần tử thứ `k`.

[LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)
