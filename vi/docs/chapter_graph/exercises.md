# Bài tập

## Ôn tập khái niệm

### Biểu diễn cùng một đồ thị theo hai cách

Đồ thị vô hướng có các đỉnh `A, B, C, D` và cạnh `A-B`, `A-C`, `B-D`, `C-D`. Hãy viết danh sách kề và mô tả ma trận kề.

??? success "Đáp án"

    Danh sách kề là `A:{B,C}`, `B:{A,D}`, `C:{A,D}`, `D:{B,C}`. Ma trận có hàng và cột theo `A,B,C,D`; ô bằng 1 khi hai đỉnh có cạnh. Vì đồ thị vô hướng, ma trận đối xứng qua đường chéo chính.

### Thứ tự duyệt theo chiều rộng và chiều sâu

Bắt đầu từ `A`, giả sử luôn xét đỉnh kề theo thứ tự chữ cái. Hãy nêu một thứ tự BFS và DFS của đồ thị trên.

??? success "Đáp án"

    BFS là `A, B, C, D`. Một DFS là `A, B, D, C`. Thứ tự có thể khác nếu quy tắc xét đỉnh kề khác, nhưng tập đỉnh được thăm không đổi.

### Một lần BFS có thể thăm toàn bộ đồ thị không?

Nếu đồ thị có nhiều thành phần liên thông, BFS bắt đầu từ một đỉnh có thăm mọi đỉnh không?

??? success "Đáp án"

    Không. Một lần BFS chỉ thăm thành phần liên thông chứa đỉnh bắt đầu. Muốn thăm toàn bộ đồ thị, duyệt qua mọi đỉnh và bắt đầu BFS mới tại mỗi đỉnh chưa được thăm.

## Bài tập lập trình

### Xác định đường đi trong đồ thị vô hướng

Cho `n` đỉnh, danh sách cạnh, đỉnh `source` và `destination`, hãy trả về liệu có đường đi giữa hai đỉnh hay không.

??? tip "Gợi ý"

    Tạo danh sách kề rồi dùng BFS hoặc DFS cùng tập `visited`. Có thể dừng ngay khi gặp đích.

[LeetCode](https://leetcode.com/problems/find-if-path-exists-in-graph/)
