# Bài toán N quân hậu

!!! question

    Theo luật cờ vua, quân hậu có thể tấn công mọi quân nằm cùng hàng, cùng cột hoặc cùng đường chéo. Cho $n$ quân hậu và bàn cờ $n \times n$, hãy tìm cách sắp xếp sao cho không có hai quân hậu nào tấn công nhau.

Như hình dưới, khi $n = 4$ có hai lời giải. Từ góc nhìn quay lui, bàn cờ $n \times n$ có $n^2$ ô, tạo nên toàn bộ tập lựa chọn `choices`. Khi đặt từng quân hậu, cấu hình bàn cờ thay đổi liên tục; bàn cờ tại mỗi thời điểm chính là trạng thái `state`.

![Lời giải bài toán 4 quân hậu](n_queens_problem.assets/solution_4_queens.png)

Hình tiếp theo minh họa ba ràng buộc: **nhiều quân hậu không được cùng hàng, cùng cột hoặc cùng đường chéo**. Đường chéo có hai loại là đường chéo chính `\` và đường chéo phụ `/`. Một lựa chọn chỉ hợp lệ khi đồng thời không xung đột ở cả ba hướng.

![Các ràng buộc của bài toán N quân hậu](n_queens_problem.assets/n_queens_constraints.png)

### Chiến lược đặt theo từng hàng

Vì số quân hậu và số hàng trên bàn cờ đều bằng $n$, có thể rút ra kết luận: **mỗi hàng phải có đúng một quân hậu**. Nếu một hàng không có hậu thì một hàng khác buộc phải có hai hậu, vi phạm ràng buộc cùng hàng.

Do đó, chúng ta đặt theo từng hàng: bắt đầu từ hàng đầu, chọn một cột hợp lệ cho đúng một quân hậu rồi chuyển sang hàng kế tiếp, cho đến khi hoàn thành hàng cuối. Trạng thái đệ quy chỉ cần biết hàng hiện tại và các cột, đường chéo đã bị chiếm.

Hình dưới thể hiện quá trình đặt theo hàng cho bài toán 4 quân hậu. Vì giới hạn không gian, hình chỉ mở rộng một nhánh tìm kiếm bắt đầu từ hàng đầu; mọi phương án vi phạm ràng buộc cột hoặc đường chéo đều bị cắt tỉa ngay.

![Chiến lược đặt quân hậu theo từng hàng](n_queens_problem.assets/n_queens_placing.png)

Về bản chất, **đặt theo từng hàng cũng là một hình thức cắt tỉa**, vì nó loại ngay mọi nhánh có nhiều quân hậu trên cùng một hàng. So với việc chọn tự do trong mọi ô, chiến lược này giảm mạnh số mức và số lựa chọn cần xét.

### Cắt tỉa theo cột và đường chéo

Để thỏa ràng buộc cột, dùng mảng boolean `cols` dài $n$ ghi cột nào đã có hậu. Trước mỗi lần đặt, `cols` loại các cột bị chiếm; khi thử một cột, đánh dấu nó, và khi quay lui phải bỏ đánh dấu để trạng thái của nhánh kế tiếp chính xác.

!!! tip

    Gốc tọa độ của ma trận nằm ở góc trên bên trái. Chỉ số hàng tăng từ trên xuống và chỉ số cột tăng từ trái sang phải.

Đối với đường chéo, xét ô có tọa độ $(row, col)$. Trên một đường chéo chính cụ thể, mọi ô có cùng hiệu hàng trừ cột; tức **$row - col$ là hằng số trên cùng đường chéo chính**.

Nói cách khác, nếu hai ô thỏa $row_1 - col_1 = row_2 - col_2$ thì chúng nằm trên cùng một đường chéo chính. Dựa vào quy luật này, mảng `diags1` trong hình ghi đường chéo chính nào đã có hậu.

Tương tự, **trên một đường chéo phụ, tổng $row + col$ là hằng số**. Mảng `diags2` dùng tổng này để ghi và kiểm tra các đường chéo phụ. Nhờ ba mảng boolean, mỗi phép kiểm tra cột hoặc đường chéo được thực hiện trong thời gian hằng số thay vì quét lại bàn cờ.

![Xử lý ràng buộc cột và đường chéo](n_queens_problem.assets/n_queens_cols_diagonals.png)

### Triển khai mã

Trong ma trận vuông $n \times n$, giá trị $row - col$ nằm trong khoảng $[-n + 1, n - 1]$, còn $row + col$ nằm trong khoảng $[0, 2n - 2]$. Vì vậy, số đường chéo chính và số đường chéo phụ đều là $2n - 1$, nên hai mảng `diags1`, `diags2` đều có độ dài $2n - 1$. Khi dùng hiệu làm chỉ số, cần cộng độ lệch để biến giá trị âm thành chỉ số không âm.

```python
# Mã N quân hậu 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Khi đặt $n$ quân hậu theo từng hàng và xét ràng buộc cột, số lựa chọn từ hàng đầu đến hàng cuối lần lượt là $n$, $n-1$, $\dots$, $2$, $1$, cho thời gian tìm kiếm $O(n!)$. Mỗi khi ghi một lời giải, phải sao chép ma trận `state` vào `res`, tốn $O(n^2)$. Vì vậy, **độ phức tạp thời gian tổng thể là $O(n! \cdot n^2)$**. Trên thực tế, cắt tỉa đường chéo loại nhiều nhánh nên tốc độ thường tốt hơn cận trên này.

Mảng `state` dùng $O(n^2)$ không gian; các mảng `cols`, `diags1`, `diags2` mỗi mảng dùng $O(n)$. Độ sâu đệ quy tối đa là $n$, nên ngăn xếp dùng $O(n)$. Vì vậy, **độ phức tạp không gian là $O(n^2)$**. Nếu chỉ cần đếm lời giải, có thể thay ma trận bằng vị trí cột của hậu ở từng hàng để giảm bộ nhớ trạng thái, nhưng cách trình bày bằng ma trận trực quan hơn.
