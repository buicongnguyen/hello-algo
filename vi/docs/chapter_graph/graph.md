# Đồ thị

<u>Đồ thị</u> là một cấu trúc dữ liệu phi tuyến gồm các <u>đỉnh</u> và <u>cạnh</u>. Có thể biểu diễn trừu tượng đồ thị $G$ bằng tập đỉnh $V$ và tập cạnh $E$. Ví dụ sau chứa 5 đỉnh và 7 cạnh.

$$
\begin{aligned}
V & = \{ 1, 2, 3, 4, 5 \} \newline
E & = \{ (1,2), (1,3), (1,5), (2,3), (2,4), (2,5), (4,5) \} \newline
G & = \{ V, E \} \newline
\end{aligned}
$$

Nếu xem đỉnh là nút và cạnh là tham chiếu nối giữa các nút, đồ thị có thể được coi là phần mở rộng của danh sách liên kết. **So với quan hệ tuyến tính của danh sách liên kết và quan hệ phân cấp của cây, quan hệ mạng trong đồ thị có độ tự do cao hơn và vì thế cũng phức tạp hơn.**

![Quan hệ giữa danh sách liên kết, cây và đồ thị](graph.assets/linkedlist_tree_graph.png)

## Các loại đồ thị và thuật ngữ thường gặp

Dựa vào việc cạnh có hướng hay không, đồ thị được chia thành <u>đồ thị vô hướng</u> và <u>đồ thị có hướng</u>.

- Trong đồ thị vô hướng, cạnh biểu thị kết nối hai chiều giữa hai đỉnh, chẳng hạn quan hệ bạn bè.
- Trong đồ thị có hướng, cạnh có chiều; cạnh $A \rightarrow B$ và cạnh $A \leftarrow B$ độc lập với nhau, chẳng hạn quan hệ theo dõi và người theo dõi trên mạng xã hội.

![Đồ thị có hướng và vô hướng](graph.assets/directed_graph.png)

Dựa vào khả năng đi đến mọi đỉnh, đồ thị được chia thành <u>đồ thị liên thông</u> và <u>đồ thị không liên thông</u>.

- Trong đồ thị liên thông, bắt đầu từ bất kỳ đỉnh nào cũng có thể đi đến mọi đỉnh khác.
- Trong đồ thị không liên thông, tồn tại ít nhất một đỉnh xuất phát không thể đi đến một đỉnh khác.

![Đồ thị liên thông và không liên thông](graph.assets/connected_graph.png)

Có thể gắn thêm một biến “trọng số” cho mỗi cạnh để tạo thành <u>đồ thị có trọng số</u>. Ví dụ, hệ thống trò chơi có thể tính mức độ thân thiết giữa người chơi từ thời gian chơi cùng nhau; mạng lưới này được biểu diễn bằng đồ thị có trọng số.

![Đồ thị có trọng số và không có trọng số](graph.assets/weighted_graph.png)

Các thuật ngữ quan trọng gồm:

- <u>Kề nhau</u>: Hai đỉnh được nối bởi một cạnh được gọi là kề nhau. Trong hình, các đỉnh kề với đỉnh 1 là 2, 3 và 5.
- <u>Đường đi</u>: Chuỗi cạnh nối từ đỉnh A đến đỉnh B được gọi là đường đi từ A đến B. Chuỗi cạnh 1-5-2-4 là một đường đi từ đỉnh 1 đến đỉnh 4.
- <u>Bậc</u>: Số cạnh gắn với một đỉnh. Trong đồ thị có hướng, <u>bậc vào</u> là số cạnh hướng đến đỉnh, còn <u>bậc ra</u> là số cạnh rời khỏi đỉnh.

## Biểu diễn đồ thị

Hai cách biểu diễn phổ biến là ma trận kề và danh sách kề. Các ví dụ sau dùng đồ thị vô hướng.

### Ma trận kề

Với đồ thị có $n$ đỉnh, <u>ma trận kề</u> dùng một ma trận $n \times n$. Mỗi hàng và cột đại diện cho một đỉnh; phần tử ma trận dùng $1$ hoặc $0$ để cho biết có cạnh giữa hai đỉnh hay không.

Gọi ma trận kề là $M$ và danh sách đỉnh là $V$. Phần tử $M[i, j] = 1$ nghĩa là có cạnh giữa $V[i]$ và $V[j]$, còn $M[i, j] = 0$ nghĩa là không có cạnh.

![Biểu diễn đồ thị bằng ma trận kề](graph.assets/adjacency_matrix.png)

Ma trận kề có các tính chất sau.

- Trong đồ thị đơn, đỉnh không nối với chính nó nên các phần tử trên đường chéo chính không mang thông tin cạnh.
- Với đồ thị vô hướng, hai chiều của cạnh tương đương nên ma trận đối xứng qua đường chéo chính.
- Thay các phần tử $1$ và $0$ bằng trọng số sẽ cho phép ma trận biểu diễn đồ thị có trọng số.

Ma trận cho phép truy cập trực tiếp phần tử để đọc hoặc cập nhật cạnh. Các thao tác thêm, xóa, tra cứu và sửa cạnh đều có độ phức tạp $O(1)$. Đổi lại, ma trận luôn cần $O(n^2)$ không gian, kể cả khi đồ thị có rất ít cạnh.

### Danh sách kề

<u>Danh sách kề</u> dùng $n$ danh sách liên kết để biểu diễn đồ thị. Danh sách thứ $i$ ứng với đỉnh $i$ và lưu mọi đỉnh kề với đỉnh đó.

![Biểu diễn đồ thị bằng danh sách kề](graph.assets/adjacency_list.png)

Danh sách kề chỉ lưu những cạnh thực sự tồn tại. Tổng số cạnh thường nhỏ hơn nhiều so với $n^2$, nên cách này tiết kiệm không gian. Tuy nhiên, muốn tìm một cạnh phải duyệt danh sách tương ứng, vì vậy tra cứu chậm hơn ma trận kề.

**Cấu trúc danh sách kề rất giống phương pháp xâu chuỗi riêng trong bảng băm, nên có thể dùng các kỹ thuật tương tự để cải thiện hiệu suất.** Khi một danh sách trở nên dài, có thể chuyển nó thành cây AVL hoặc cây đỏ–đen để cải thiện từ $O(n)$ xuống $O(\log n)$; cũng có thể dùng bảng băm để giảm xuống $O(1)$.

## Ứng dụng phổ biến của đồ thị

Nhiều hệ thống trong thế giới thực có thể được mô hình hóa bằng đồ thị, từ đó chuyển vấn đề thực tế thành bài toán tính toán trên đồ thị.

| Hệ thống | Đỉnh | Cạnh | Bài toán tính toán |
| --- | --- | --- | --- |
| Mạng xã hội | Người dùng | Quan hệ bạn bè | Gợi ý bạn bè tiềm năng |
| Tuyến tàu điện | Nhà ga | Quan hệ kết nối | Gợi ý tuyến đường ngắn nhất |
| Hệ Mặt Trời | Thiên thể | Lực hấp dẫn giữa các thiên thể | Tính quỹ đạo hành tinh |
