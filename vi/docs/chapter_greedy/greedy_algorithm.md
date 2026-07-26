# Thuật toán tham lam

<u>Thuật toán tham lam</u> là phương pháp phổ biến để giải bài toán tối ưu. Ý tưởng cơ bản là ở mỗi giai đoạn quyết định, chọn phương án có vẻ tốt nhất tại thời điểm đó, tức tham lam đưa ra lựa chọn tối ưu cục bộ với hy vọng thu được lời giải tối ưu toàn cục. Thuật toán tham lam thường đơn giản, hiệu quả và được dùng rộng rãi trong thực tế.

Tham lam và quy hoạch động đều thường dùng cho bài toán tối ưu. Chúng cùng dựa vào một số tính chất như cấu trúc con tối ưu, nhưng cách hoạt động khác nhau.

- Quy hoạch động xét mọi quyết định trước đó khi đưa ra quyết định hiện tại và dùng lời giải của các bài toán con đã qua để xây dựng lời giải hiện tại.
- Tham lam không xét lại quyết định quá khứ mà liên tục chọn phương án tốt nhất trước mắt, từng bước thu nhỏ quy mô cho đến khi giải xong bài toán.

Trước tiên, hãy tìm hiểu cách hoạt động qua bài toán “đổi tiền xu” đã được giới thiệu trong phần ba lô vô hạn.

!!! question

    Cho $n$ loại tiền xu, mệnh giá loại thứ $i$ là $coins[i - 1]$, số tiền mục tiêu là $amt$, và mỗi loại có số lượng không giới hạn. Cần ít nhất bao nhiêu đồng xu để tạo đúng số tiền mục tiêu? Nếu không thể tạo được, trả về $-1$.

Chiến lược tham lam được minh họa dưới đây. Với số tiền mục tiêu, **mỗi lần chọn đồng xu không vượt quá số tiền còn lại và có mệnh giá gần nó nhất**, rồi lặp cho đến khi tạo đủ số tiền.

![Chiến lược tham lam cho bài toán đổi tiền xu](greedy_algorithm.assets/coin_change_greedy_strategy.png)

Mã triển khai chính thức:

```python
# Mã đổi tiền xu tham lam 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Thuật toán chỉ cần khoảng mười dòng mã, rất ngắn gọn.

## Ưu điểm và hạn chế của thuật toán tham lam

**Thuật toán tham lam không chỉ trực quan, dễ triển khai mà thường còn rất hiệu quả**. Trong mã trên, nếu mệnh giá nhỏ nhất là $\min(coins)$, vòng lặp chọn chạy nhiều nhất $amt / \min(coins)$ lần, nên độ phức tạp thời gian là $O(amt / \min(coins))$. Đây là một bậc thấp hơn đáng kể so với quy hoạch động $O(n \times amt)$.

Tuy nhiên, **với một số tập mệnh giá, tham lam không tìm được lời giải tối ưu**. Hình dưới cho thấy các ví dụ.

- **Ví dụ đúng $coins = [1, 5, 10, 20, 50, 100]$**: Với tập này, tham lam tìm được lời giải tối ưu cho mọi $amt$.
- **Phản ví dụ $coins = [1, 20, 50]$**: Khi $amt = 60$, tham lam chỉ tìm được $50 + 1 \times 10$, dùng tổng cộng $11$ đồng xu; quy hoạch động tìm được $20 + 20 + 20$ với chỉ $3$ đồng xu.
- **Phản ví dụ $coins = [1, 49, 50]$**: Khi $amt = 98$, tham lam chỉ tìm được $50 + 1 \times 48$, dùng $49$ đồng xu; quy hoạch động tìm được $49 + 49$ với chỉ $2$ đồng xu.

![Ví dụ tham lam không tìm được lời giải tối ưu](greedy_algorithm.assets/coin_change_greedy_vs_dp.png)

Như vậy, với đổi tiền xu nói chung, tham lam không bảo đảm tối ưu toàn cục và thậm chí có thể cho kết quả rất kém. Bài toán này phù hợp hơn với quy hoạch động.

Thông thường, thuật toán tham lam được dùng trong hai tình huống:

1. **Bảo đảm được lời giải tối ưu**: Tham lam thường là lựa chọn tốt nhất vì có xu hướng hiệu quả hơn quay lui và quy hoạch động.
2. **Tìm được lời giải gần tối ưu**: Tham lam vẫn hữu ích. Với nhiều bài toán phức tạp, tìm tối ưu toàn cục rất khó; nhanh chóng tìm được lời giải đủ tốt đã là kết quả có giá trị.

## Đặc trưng của thuật toán tham lam

Loại bài toán nào phù hợp với tham lam? Nói cách khác, trong điều kiện nào lựa chọn tham lam bảo đảm tìm được lời giải tối ưu?

So với quy hoạch động, điều kiện dùng tham lam chặt chẽ hơn và tập trung vào hai tính chất:

- **Tính lựa chọn tham lam**: Chỉ khi lựa chọn tối ưu cục bộ luôn dẫn tới lời giải tối ưu toàn cục, thuật toán mới bảo đảm tối ưu.
- **Cấu trúc con tối ưu**: Lời giải tối ưu của bài toán gốc chứa lời giải tối ưu của các bài toán con.

Cấu trúc con tối ưu đã được giới thiệu ở chương Quy hoạch động. Cần lưu ý rằng ở một số bài toán, tính chất này không rõ ràng nhưng tham lam vẫn giải được.

Trọng tâm là xác định tính lựa chọn tham lam. Mô tả có vẻ đơn giản nhưng **trong thực tế, chứng minh tính chất này cho nhiều bài toán không hề dễ**.

Trong đổi tiền xu, chúng ta dễ đưa ra phản ví dụ để bác bỏ tính lựa chọn tham lam, nhưng chứng minh nó đúng lại khó hơn nhiều. Nếu hỏi **tập mệnh giá nào luôn giải tối ưu được bằng tham lam**, thường chỉ có thể dựa vào trực giác hoặc ví dụ để trả lời sơ bộ, còn chứng minh toán học nghiêm ngặt khó hơn.

!!! quote

    Một bài báo trình bày thuật toán $O(n^3)$ để xác định một tập tiền xu có thể được tham lam giải tối ưu cho mọi số tiền hay không.

    Pearson, D. A polynomial-time algorithm for the change-making problem[J]. Operations Research Letters, 2005, 33(3): 231-234.

## Các bước giải bài toán tham lam

Quy trình chung gồm ba bước:

1. **Phân tích bài toán**: Làm rõ đặc trưng, gồm định nghĩa trạng thái, mục tiêu tối ưu và ràng buộc. Bước này cũng xuất hiện trong quay lui và quy hoạch động.
2. **Xác định chiến lược tham lam**: Quyết định cách đưa ra lựa chọn tham lam ở mỗi bước. Chiến lược phải từng bước giảm quy mô và cuối cùng giải toàn bộ bài toán.
3. **Chứng minh tính đúng**: Thường cần chứng minh cả tính lựa chọn tham lam và cấu trúc con tối ưu, có thể dùng quy nạp hoặc phản chứng.

Xác định chiến lược là bước cốt lõi nhưng có thể khó vì:

- **Chiến lược thay đổi rất nhiều giữa các bài toán**. Với nhiều bài, chiến lược khá trực quan và có thể suy ra bằng lập luận cùng thử nghiệm. Với bài phức tạp, nó có thể ẩn sâu và đòi hỏi kinh nghiệm giải thuật.
- **Một số chiến lược rất dễ gây nhầm lẫn**. Chúng ta có thể tự tin viết mã rồi phát hiện một số ca kiểm thử thất bại, vì chiến lược chỉ “đúng một phần”, như bài đổi tiền xu ở trên.

Để bảo đảm tính đúng, nên đưa ra chứng minh toán học nghiêm ngặt, **thường bằng phản chứng hoặc quy nạp toán học**.

Tuy nhiên, chứng minh cũng có thể khó. Khi chưa tìm ra hướng, chúng ta thường phải đối chiếu với các ca kiểm thử, rồi từng bước sửa và kiểm chứng chiến lược.

## Các bài toán tham lam điển hình

Tham lam thường áp dụng cho bài toán tối ưu có tính lựa chọn tham lam và cấu trúc con tối ưu. Một số ví dụ:

- **Đổi tiền xu**: Với một số hệ mệnh giá nhất định, tham lam luôn thu được lời giải tối ưu.
- **Lập lịch khoảng**: Có nhiều công việc, mỗi việc diễn ra trong một khoảng thời gian, mục tiêu hoàn thành nhiều việc nhất. Luôn chọn công việc kết thúc sớm nhất sẽ cho lời giải tối ưu.
- **Ba lô phân số**: Chọn vật phẩm sao cho tổng khối lượng không vượt sức chứa và tổng giá trị lớn nhất. Luôn ưu tiên tỷ lệ giá trị trên khối lượng cao nhất có thể cho lời giải tối ưu.
- **Giao dịch cổ phiếu**: Cho lịch sử giá, được giao dịch nhiều lần nhưng khi đang nắm giữ không thể mua thêm trước khi bán; mục tiêu tối đa hóa lợi nhuận.
- **Mã Huffman**: Thuật toán tham lam nén dữ liệu không mất mát bằng cách luôn hợp nhất hai nút có tần suất thấp nhất, tạo cây Huffman có tổng độ dài đường đi có trọng số nhỏ nhất.
- **Thuật toán Dijkstra**: Thuật toán tham lam tìm đường ngắn nhất từ một đỉnh nguồn tới mọi đỉnh khác.
