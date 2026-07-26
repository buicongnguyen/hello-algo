# Thuật toán quay lui

<u>Thuật toán quay lui</u> là một phương pháp giải bài toán bằng tìm kiếm vét cạn. Ý tưởng cốt lõi là bắt đầu từ trạng thái ban đầu rồi lần lượt khám phá mọi lời giải có thể. Khi gặp một lời giải đúng, thuật toán ghi nhận nó; quá trình tiếp tục cho đến khi tìm được lời giải cần thiết hoặc đã thử hết mọi lựa chọn mà vẫn không có kết quả.

Quay lui thường dùng “tìm kiếm theo chiều sâu” để duyệt không gian lời giải. Trong chương Cây nhị phân, duyệt tiền tự, trung tự và hậu tự đều thuộc DFS. Tiếp theo, chúng ta xây dựng dần một bài toán quay lui từ phép duyệt tiền tự để thấy rõ trạng thái, lựa chọn, thử, hoàn tác và cắt tỉa phối hợp với nhau như thế nào.

!!! question "Ví dụ 1"

    Cho một cây nhị phân, hãy tìm và ghi lại mọi nút có giá trị $7$, rồi trả về danh sách các nút đó.

Với bài toán này, chúng ta duyệt tiền tự và kiểm tra giá trị của nút hiện tại. Nếu giá trị bằng $7$, thêm nút vào danh sách kết quả `res`. Mỗi nút được thăm đúng một lần và mọi nhánh đều được khám phá, như hình và mã dưới đây.

```python
# Mã duyệt tiền tự tìm nút chính thức được chèn từ nguồn đã khóa.
```

![Tìm nút bằng duyệt tiền tự](backtracking_algorithm.assets/preorder_find_nodes.png)

## Thử và quay lui

**Tên gọi “quay lui” bắt nguồn từ hai chiến lược “thử” và “quay lui” khi tìm kiếm không gian lời giải.** Thuật toán chọn một phương án để tiến tới trạng thái mới. Nếu không thể đi tiếp hoặc trạng thái đó không thể tạo ra lời giải thỏa ràng buộc, nó hủy lựa chọn vừa thực hiện, trở về trạng thái trước và thử một lựa chọn khác.

Trong Ví dụ 1, thăm mỗi nút là một lần “thử”. Khi đi qua nút lá hoặc khi lệnh `return` đưa lời gọi đệ quy trở về nút cha, thuật toán đang “quay lui”. Ngăn xếp lời gọi ghi nhớ đường đã đi, nhờ đó sau khi hoàn thành một cây con, quá trình có thể tiếp tục tại cây con còn lại.

Điều quan trọng là **quay lui không chỉ là việc hàm đệ quy trả về**. Trạng thái do thuật toán chủ động thay đổi cũng phải được khôi phục. Hãy mở rộng Ví dụ 1 để thấy yêu cầu này.

!!! question "Ví dụ 2"

    Trong cây nhị phân, hãy tìm mọi nút có giá trị $7$ và **trả về các đường đi từ nút gốc đến những nút đó**.

Dựa trên Ví dụ 1, chúng ta dùng danh sách `path` để lưu đường đang thăm. Khi đến một nút có giá trị $7$, phải sao chép `path` rồi thêm bản sao vào `res`. Nếu chỉ thêm chính đối tượng `path`, các lần hoàn tác sau sẽ sửa cả kết quả đã ghi. Khi duyệt hoàn tất, `res` chứa mọi đường đi hợp lệ.

```python
# Mã duyệt tiền tự ghi đường đi chính thức được chèn từ nguồn đã khóa.
```

Trong mỗi lần “thử”, nút hiện tại được thêm vào `path`. Trước khi quay lui, nút đó phải được xóa khỏi `path` **để khôi phục đúng trạng thái trước lần thử**. Nhờ bất biến này, khi chuyển từ nhánh trái sang nhánh phải, đường đi không còn chứa các nút chỉ thuộc nhánh trái.

Quan sát chuỗi hình sau, có thể hiểu **thử và quay lui là “tiến” và “hoàn tác”**, hai thao tác đảo ngược nhau. Mỗi bước đi xuống làm trạng thái cụ thể hơn; mỗi bước đi lên loại bỏ đúng thay đổi của bước đi xuống tương ứng.

**Bước 1**

![Thử và quay lui, bước 1](backtracking_algorithm.assets/preorder_find_paths_step1.png)

**Bước 2**

![Thử và quay lui, bước 2](backtracking_algorithm.assets/preorder_find_paths_step2.png)

**Bước 3**

![Thử và quay lui, bước 3](backtracking_algorithm.assets/preorder_find_paths_step3.png)

**Bước 4**

![Thử và quay lui, bước 4](backtracking_algorithm.assets/preorder_find_paths_step4.png)

**Bước 5**

![Thử và quay lui, bước 5](backtracking_algorithm.assets/preorder_find_paths_step5.png)

**Bước 6**

![Thử và quay lui, bước 6](backtracking_algorithm.assets/preorder_find_paths_step6.png)

**Bước 7**

![Thử và quay lui, bước 7](backtracking_algorithm.assets/preorder_find_paths_step7.png)

**Bước 8**

![Thử và quay lui, bước 8](backtracking_algorithm.assets/preorder_find_paths_step8.png)

**Bước 9**

![Thử và quay lui, bước 9](backtracking_algorithm.assets/preorder_find_paths_step9.png)

**Bước 10**

![Thử và quay lui, bước 10](backtracking_algorithm.assets/preorder_find_paths_step10.png)

**Bước 11**

![Thử và quay lui, bước 11](backtracking_algorithm.assets/preorder_find_paths_step11.png)

## Cắt tỉa

Bài toán quay lui phức tạp thường có một hoặc nhiều ràng buộc. **Ràng buộc thường có thể được dùng để “cắt tỉa”**: loại bỏ sớm một nhánh ngay khi đã chứng minh nhánh đó không thể chứa lời giải, thay vì tiếp tục khám phá vô ích.

!!! question "Ví dụ 3"

    Trong cây nhị phân, hãy tìm mọi nút có giá trị $7$ và trả về đường đi từ gốc đến chúng, **nhưng yêu cầu đường đi không chứa nút có giá trị $3$**.

Để thỏa ràng buộc, chúng ta thêm thao tác cắt tỉa. Trong lúc tìm kiếm, nếu gặp nút có giá trị $3$, hàm trả về ngay và không thăm các nút bên dưới. Điều này đúng vì mọi đường qua cây con đó đều chứa nút vi phạm, nên không thể trở thành lời giải.

```python
# Mã duyệt tiền tự có cắt tỉa chính thức được chèn từ nguồn đã khóa.
```

“Cắt tỉa” là một hình ảnh trực quan. Trong hình dưới, **các nhánh tìm kiếm không thỏa ràng buộc bị cắt bỏ**, giúp tránh nhiều lần thử vô nghĩa. Cắt tỉa chỉ được thực hiện khi điều kiện loại bỏ là chắc chắn; một quy tắc quá mạnh có thể bỏ sót lời giải hợp lệ.

![Cắt tỉa theo ràng buộc](backtracking_algorithm.assets/preorder_find_constrained_paths.png)

## Khung mã

Từ ba ví dụ, có thể rút ra một khung tổng quát xoay quanh “thử, quay lui và cắt tỉa”. Trong khung dưới đây, `state` là trạng thái hiện tại của bài toán, `choices` là các lựa chọn có thể thực hiện từ trạng thái đó, còn `res` lưu các lời giải.

Quy trình của một lời gọi gồm: kiểm tra trạng thái đã là lời giải hay chưa; duyệt từng lựa chọn; loại lựa chọn không hợp lệ; thực hiện lựa chọn để cập nhật trạng thái; đệ quy; cuối cùng hoàn tác đúng thay đổi vừa thực hiện. Thứ tự “thực hiện → đệ quy → hoàn tác” phải đối xứng để các nhánh anh em bắt đầu từ cùng một trạng thái cha.

```python
# Khung thuật toán quay lui 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Áp dụng khung cho Ví dụ 3: `state` là đường nút đang duyệt; `choices` là nút con trái và phải của nút hiện tại; `res` là danh sách các đường lời giải. Hàm kiểm tra hợp lệ loại nút rỗng và nút có giá trị `3`; thao tác thử thêm nút vào đường, còn thao tác quay lui xóa nút cuối.

```python
# Mã Ví dụ 3 theo khung quay lui chính thức được chèn từ nguồn đã khóa.
```

Theo đề bài, sau khi gặp một nút có giá trị $7$, thuật toán vẫn phải tiếp tục tìm phía dưới vì có thể còn nút đích khác. **Do đó cần bỏ lệnh `return` ngay sau khi ghi lời giải.** Hình dưới so sánh cây tìm kiếm khi giữ và khi bỏ lệnh này. Một khung tổng quát phải cho phép bài toán quyết định dừng ở lời giải đầu tiên hay tiếp tục liệt kê tất cả.

![So sánh tìm kiếm khi có và không có return](backtracking_algorithm.assets/backtrack_remove_return_or_not.png)

Mã theo khung dài hơn bản duyệt tiền tự chuyên biệt, nhưng có tính khái quát cao. **Nhiều bài toán quay lui có thể giải trong cùng khung này**; phần thay đổi chỉ là cách định nghĩa trạng thái, tập lựa chọn, điều kiện lời giải, điều kiện hợp lệ, thao tác thực hiện và thao tác hoàn tác.

## Thuật ngữ thường dùng

Để phân tích bài toán rõ ràng, bảng dưới tổng hợp các thuật ngữ quay lui và đối chiếu với Ví dụ 3.

Bảng: Thuật ngữ thường dùng trong thuật toán quay lui

| Thuật ngữ | Định nghĩa | Ví dụ 3 |
| --- | --- | --- |
| Lời giải | Đáp án thỏa các điều kiện cụ thể của bài toán; một bài toán có thể có một hoặc nhiều lời giải | Mọi đường từ gốc đến nút có giá trị $7$ và thỏa ràng buộc |
| Ràng buộc | Điều kiện giới hạn tính khả thi của lời giải, thường được dùng để cắt tỉa | Đường đi không chứa nút có giá trị $3$ |
| Trạng thái | Tình huống của bài toán tại một thời điểm, gồm các lựa chọn đã thực hiện | Đường nút đang thăm, tức danh sách `path` |
| Thử | Khám phá không gian lời giải theo các lựa chọn: thực hiện lựa chọn, cập nhật trạng thái và kiểm tra lời giải | Thăm đệ quy con trái hoặc phải, thêm nút vào `path`, kiểm tra giá trị bằng $7$ |
| Quay lui | Hủy lựa chọn trước và trở về trạng thái cũ khi nhánh kết thúc hoặc vi phạm ràng buộc | Dừng ở nút lá, kết thúc lượt thăm hoặc gặp nút giá trị $3$ rồi trả về |
| Cắt tỉa | Tránh những đường tìm kiếm chắc chắn vô ích dựa trên đặc điểm và ràng buộc của bài toán | Gặp nút giá trị $3$ thì không tìm tiếp |

!!! tip

    Các khái niệm bài toán, lời giải, trạng thái và lựa chọn mang tính phổ quát; chúng cũng xuất hiện trong chia để trị, quy hoạch động, thuật toán tham lam và nhiều phương pháp khác.

## Ưu điểm và hạn chế

Về bản chất, quay lui là DFS thử các khả năng cho đến khi tìm được những lời giải thỏa điều kiện. Ưu điểm là có thể liệt kê đầy đủ lời giải; nếu cắt tỉa hợp lý, nhiều nhánh lớn sẽ bị loại trước khi mở rộng và hiệu suất được cải thiện đáng kể.

Tuy nhiên, với bài toán quy mô lớn hoặc phức tạp, **thời gian chạy của quay lui có thể không chấp nhận được**.

- **Thời gian**: Thuật toán thường phải duyệt phần lớn không gian trạng thái; độ phức tạp có thể đạt bậc hàm mũ hoặc giai thừa.
- **Không gian**: Lời gọi đệ quy phải lưu trạng thái hiện tại, đường đi và các biến hỗ trợ cắt tỉa. Khi độ sâu lớn, nhu cầu bộ nhớ cũng tăng mạnh.

Dù vậy, **quay lui vẫn là lựa chọn tốt nhất cho nhiều bài toán tìm kiếm và thỏa mãn ràng buộc**. Khi không thể dự đoán lựa chọn nào tạo ra lời giải hợp lệ, chúng ta phải xem xét các khả năng. Trọng tâm khi đó là tối ưu hiệu suất mà không phá vỡ tính đầy đủ.

- **Cắt tỉa**: Bỏ các đường chắc chắn không thể tạo lời giải, tiết kiệm thời gian và không gian.
- **Tìm kiếm heuristic**: Dùng chiến lược hoặc giá trị ước lượng để ưu tiên những lựa chọn có khả năng dẫn đến lời giải sớm hơn. Thứ tự này có thể giảm thời gian tìm lời giải đầu tiên nhưng không thay thế điều kiện đúng đắn của cắt tỉa.

Ngoài ra, có thể dùng cấu trúc dữ liệu chuyên dụng để kiểm tra ràng buộc trong thời gian ngắn, cập nhật trạng thái tại chỗ thay vì sao chép toàn bộ, và dừng sớm khi bài toán chỉ yêu cầu một lời giải. Mỗi tối ưu phải giữ bất biến rằng sau khi quay lui, trạng thái giống hệt trước lần thử.

## Ví dụ quay lui điển hình

Quay lui giải được nhiều bài toán tìm kiếm, thỏa mãn ràng buộc và tối ưu tổ hợp.

**Bài toán tìm kiếm** có mục tiêu tìm lời giải thỏa điều kiện cụ thể.

- Bài toán hoán vị: Cho một tập hợp, tìm mọi cách sắp xếp hoặc tổ hợp có thể.
- Bài toán tổng tập con: Cho một tập hợp và tổng đích, tìm những tập con có tổng bằng đích.
- Tháp Hà Nội: Cho ba cọc và các đĩa khác kích thước, chuyển toàn bộ đĩa sang cọc khác, mỗi lần một đĩa và không đặt đĩa lớn lên đĩa nhỏ.

**Bài toán thỏa mãn ràng buộc** có mục tiêu tìm lời giải đồng thời thỏa mọi ràng buộc.

- N quân hậu: Đặt $n$ quân hậu trên bàn cờ $n \times n$ sao cho chúng không tấn công nhau.
- Sudoku: Điền các số từ $1$ đến $9$ vào lưới $9 \times 9$ sao cho mỗi hàng, cột và ô vuông $3 \times 3$ không có chữ số lặp.
- Tô màu đồ thị: Cho một đồ thị vô hướng, tô mỗi đỉnh bằng số màu ít nhất sao cho hai đỉnh kề nhau có màu khác nhau.

**Bài toán tối ưu tổ hợp** tìm lời giải tối ưu trong một không gian tổ hợp và dưới các điều kiện đã cho.

- Ba lô 0-1: Mỗi vật có giá trị và trọng lượng; chọn vật sao cho tổng giá trị lớn nhất mà không vượt sức chứa.
- Người bán hàng: Xuất phát từ một điểm, thăm mỗi điểm khác đúng một lần rồi trở về điểm đầu, đồng thời tìm đường ngắn nhất.
- Clique cực đại: Trong đồ thị vô hướng, tìm đồ thị con đầy đủ lớn nhất, nơi mọi cặp đỉnh đều nối với nhau.

Với nhiều bài toán tối ưu tổ hợp, quay lui không phải phương pháp hiệu quả nhất.

- Ba lô 0-1 thường dùng quy hoạch động để đạt hiệu suất thời gian tốt hơn.
- Người bán hàng là bài toán NP-Hard nổi tiếng; các cách thực tế gồm thuật toán di truyền và đàn kiến.
- Clique cực đại có thể dùng các thuật toán heuristic như tham lam.

Quay lui vẫn hữu ích làm lời giải chính xác cho đầu vào nhỏ, làm chuẩn đối chiếu cho thuật toán tối ưu, hoặc kết hợp với nhánh cận và heuristic. Muốn chọn đúng công cụ, cần ước lượng kích thước không gian trạng thái, khả năng cắt tỉa và yêu cầu phải tìm một hay tất cả lời giải.
