# Bài tập

## Ôn tập khái niệm

### Biểu diễn cùng một đồ thị theo hai cách

Một đồ thị vô hướng có bốn đỉnh `A, B, C, D` và các cạnh `A-B, A-C, B-C, C-D`.

<!-- numbered-subquestions -->

1. Viết danh sách kề của đồ thị.
2. Điền ma trận kề chỉ dùng 0 và 1.
3. Để kiểm tra `A` và `D` có nối trực tiếp hay không, cách biểu diễn nào chỉ cần xem một vị trí lưu trữ?
4. Nếu đồ thị có nhiều đỉnh nhưng ít cạnh, cách biểu diễn nào thường dùng ít không gian hơn?

??? success "Đáp án"

    1. Danh sách kề là:

        ```text
        A: B, C
        B: A, C
        C: A, B, D
        D: C
        ```

    2. Ma trận kề là:

        | | A | B | C | D |
        | --- | --- | --- | --- | --- |
        | A | 0 | 1 | 1 | 0 |
        | B | 1 | 0 | 1 | 0 |
        | C | 1 | 1 | 0 | 1 |
        | D | 0 | 0 | 1 | 0 |

    3. Với ma trận kề, chỉ cần kiểm tra hàng `A`, cột `D`, nên rất phù hợp để xác định hai đỉnh có nối trực tiếp hay không.

    4. Khi đồ thị có nhiều đỉnh nhưng ít cạnh, danh sách kề chỉ ghi những cạnh thực sự tồn tại. Nó thường dùng ít không gian hơn ma trận kề, vốn dành một vị trí cho mọi cặp đỉnh.

### Thứ tự duyệt theo chiều rộng và chiều sâu

Một đồ thị vô hướng có các đỉnh `A, B, C, D, E` và cạnh `A-B, A-C, B-D, C-D, D-E`.

Bắt đầu ở A. Khi có nhiều đỉnh kề chưa thăm, luôn chọn theo thứ tự chữ cái.

<!-- numbered-subquestions -->

1. Viết thứ tự thăm của BFS.
2. Viết thứ tự thăm của DFS đệ quy.
3. Vì sao cả hai phép duyệt đều phải ghi lại các đỉnh đã thăm?

??? success "Đáp án"

    1. Thứ tự BFS là `A, B, C, D, E`. Trước tiên nó thăm B và C cách A một cạnh, sau đó mới thăm D và E ở xa hơn.

    2. Thứ tự DFS là `A, B, D, C, E`. Nó liên tục đi vào một đỉnh kề chưa thăm, trước hết theo đường `A → B → D → C`. Khi C không còn đỉnh kề mới, nó quay lại D rồi thăm E.

    3. Đồ thị chứa chu trình, chẳng hạn `A-B-D-C-A`. Nếu không ghi đỉnh đã thăm, thuật toán có thể liên tục đi vòng quanh chu trình và không kết thúc bình thường.

### Một lượt BFS có thể thăm toàn bộ đồ thị không?

Một đồ thị vô hướng có các đỉnh `A, B, C, D, E, F` và chỉ có các cạnh `A-B, B-C, D-E`.

<!-- numbered-subquestions -->

1. Một lượt BFS bắt đầu tại A có thể thăm những đỉnh nào?
2. BFS này đã thăm mọi đỉnh chưa? Vì sao?
3. Giả sử quét mọi đỉnh theo thứ tự chữ cái và bắt đầu một BFS mới mỗi khi gặp đỉnh chưa thăm. Đỉnh bắt đầu của từng lượt là gì? Đồ thị được chia thành bao nhiêu thành phần liên thông?

??? success "Đáp án"

    1. Bắt đầu từ A, phép duyệt chỉ có thể thăm `A, B, C`.

    2. Chưa. `D, E` tạo thành một phần liên thông khác, còn F là đỉnh cô lập. Không đỉnh nào trong số đó có đường đi đến A nên không thể đạt tới từ A.

    3. Ba lượt BFS bắt đầu tại `A, D, F`, lần lượt thăm `{A, B, C}`, `{D, E}` và `{F}`. Vì vậy đồ thị có 3 thành phần liên thông.

## Bài tập lập trình

### Xác định có đường đi trong đồ thị vô hướng hay không

Cho một đồ thị vô hướng có $n$ đỉnh được đánh số từ $0$ đến $n-1$. Mỗi phần tử `[u, v]` trong mảng `edges` biểu diễn một cạnh vô hướng giữa đỉnh `u` và `v`.

Cho thêm đỉnh bắt đầu `source` và đỉnh đích `destination`. Trước tiên hãy dựng danh sách kề từ `edges`, sau đó dùng BFS hoặc DFS để xác định có đường đi từ `source` đến `destination` hay không. Trả về `true` nếu có và `false` nếu không. Đồ thị có thể chứa chu trình và có thể không liên thông.

??? tip "Gợi ý"

    1. Thêm mỗi cạnh vô hướng theo cả hai chiều.
    2. Đồ thị có thể có chu trình, vì vậy phải ghi lại các đỉnh đã thăm.
    3. Bắt đầu từ `source`; trả về `true` nếu gặp `destination`. Nếu phép duyệt kết thúc mà không gặp đích, trả về `false`.

[LeetCode](https://leetcode.com/problems/find-if-path-exists-in-graph/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
