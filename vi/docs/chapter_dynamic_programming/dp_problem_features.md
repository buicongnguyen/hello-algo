# Đặc trưng của bài toán quy hoạch động

Ở phần trước, chúng ta đã thấy quy hoạch động giải bài toán gốc bằng cách phân rã thành các bài toán con. Thực ra phân rã bài toán là tư tưởng thuật toán phổ biến, nhưng chia để trị, quy hoạch động và quay lui nhấn mạnh những khía cạnh khác nhau.

- Chia để trị đệ quy tách bài toán gốc thành nhiều bài toán con độc lập cho đến khi đạt những bài toán nhỏ nhất, rồi hợp nhất lời giải trong quá trình quay lui để thu được đáp án bài toán gốc.
- Quy hoạch động cũng phân rã bài toán, nhưng khác biệt chính là các bài toán con phụ thuộc lẫn nhau và nhiều bài toán con chồng lặp xuất hiện trong quá trình phân rã.
- Quay lui liệt kê mọi lời giải có thể bằng thử và sai, đồng thời dùng cắt tỉa để tránh các nhánh tìm kiếm không cần thiết. Lời giải bài toán gốc gồm một chuỗi bước quyết định; tiền tố trước mỗi quyết định có thể được xem như một bài toán con.

Quy hoạch động thường được dùng cho bài toán tối ưu. Ngoài các bài toán con chồng lặp, loại bài toán này còn có hai đặc trưng quan trọng: cấu trúc con tối ưu và không có hậu hiệu.

## Cấu trúc con tối ưu

Hãy sửa nhẹ bài toán leo cầu thang để minh họa rõ hơn khái niệm cấu trúc con tối ưu.

!!! question "Leo cầu thang với chi phí nhỏ nhất"

    Cho một cầu thang, mỗi lần có thể đi lên $1$ hoặc $2$ bậc. Mỗi bậc ghi một số nguyên không âm là chi phí khi đặt chân lên đó. Cho mảng số nguyên không âm $cost$, trong đó $cost[i]$ là chi phí của bậc thứ $i$ và $cost[0]$ là mặt đất, tức điểm xuất phát. Chi phí nhỏ nhất để lên tới đỉnh là bao nhiêu?

Như hình dưới, nếu chi phí của bậc thứ $1$, thứ $2$ và thứ $3$ lần lượt là $1$, $10$ và $1$, chi phí nhỏ nhất để đi từ mặt đất lên bậc thứ $3$ là $2$.

![Chi phí nhỏ nhất để lên bậc thứ 3](dp_problem_features.assets/min_cost_cs_example.png)

Gọi $dp[i]$ là tổng chi phí để lên bậc thứ $i$. Vì chỉ có thể đến bậc thứ $i$ từ bậc thứ $i-1$ hoặc $i-2$, nên $dp[i]$ chỉ có thể bằng $dp[i-1] + cost[i]$ hoặc $dp[i-2] + cost[i]$. Để chi phí nhỏ nhất, chúng ta chọn giá trị nhỏ hơn:

$$
dp[i] = \min(dp[i-1], dp[i-2]) + cost[i]
$$

Từ đây có thể hiểu <u>cấu trúc con tối ưu</u>: **lời giải tối ưu của bài toán gốc được xây dựng từ lời giải tối ưu của các bài toán con**.

Bài toán này thể hiện cấu trúc con tối ưu rất rõ. Chúng ta chọn kết quả tốt hơn trong hai lời giải tối ưu $dp[i-1]$ và $dp[i-2]$, rồi dùng nó để xây dựng lời giải tối ưu $dp[i]$.

Vậy bài toán leo cầu thang ở phần trước có cấu trúc con tối ưu không? Mục tiêu của nó là đếm số cách, có vẻ không phải bài toán tối ưu. Tuy nhiên, nếu đổi cách hỏi thành “tìm số cách lớn nhất”, chúng ta nhận ra **bài toán trước và sau khi đổi vẫn tương đương, nhưng cấu trúc con tối ưu đã hiện rõ**: số cách lớn nhất đến bậc thứ $n$ bằng tổng số cách lớn nhất đến bậc thứ $n-1$ và $n-2$. Vì vậy, cách diễn giải cấu trúc con tối ưu khá linh hoạt và mang ý nghĩa khác nhau trong từng bài toán.

Từ phương trình chuyển trạng thái và các trạng thái khởi tạo $dp[1] = cost[1]$, $dp[2] = cost[2]$, chúng ta viết được mã quy hoạch động:

```python
# Mã chi phí leo cầu thang nhỏ nhất 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Hình dưới mô phỏng quá trình quy hoạch động của mã trên.

![Quá trình quy hoạch động cho chi phí leo cầu thang nhỏ nhất](dp_problem_features.assets/min_cost_cs_dp.png)

Bài toán cũng có thể được tối ưu không gian, nén từ một chiều xuống không chiều và giảm độ phức tạp không gian từ $O(n)$ xuống $O(1)$:

```python
# Mã chi phí leo cầu thang tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

## Không có hậu hiệu

Không có hậu hiệu là một đặc trưng quan trọng giúp quy hoạch động giải bài toán hiệu quả. Khái niệm này được định nghĩa như sau: **khi đã biết một trạng thái, sự phát triển trong tương lai chỉ liên quan đến trạng thái hiện tại và không phụ thuộc vào toàn bộ trạng thái trong quá khứ**.

Trong bài toán leo cầu thang, từ trạng thái $i$ có thể phát triển thành $i+1$ và $i+2$, tương ứng bước lên $1$ hoặc $2$ bậc. Khi đưa ra hai lựa chọn này, chúng ta không cần xét các trạng thái trước $i$ vì chúng không ảnh hưởng đến tương lai của trạng thái $i$.

Tuy nhiên, nếu thêm một ràng buộc, tình huống sẽ thay đổi.

!!! question "Leo cầu thang có ràng buộc"

    Cho cầu thang có $n$ bậc, mỗi lần có thể đi lên $1$ hoặc $2$ bậc, **nhưng không được nhảy $1$ bậc trong hai lượt liên tiếp**. Có bao nhiêu cách để lên tới đỉnh?

Như hình dưới, chỉ có $2$ cách hợp lệ để lên bậc thứ $3$. Đường đi gồm ba lần liên tiếp nhảy $1$ bậc không thỏa ràng buộc nên bị loại.

![Số cách lên bậc thứ 3 khi có ràng buộc](dp_problem_features.assets/climbing_stairs_constraint_example.png)

Nếu lượt trước nhảy $1$ bậc thì lượt tiếp theo bắt buộc phải nhảy $2$ bậc. Điều đó có nghĩa **lựa chọn tiếp theo không thể chỉ được xác định từ trạng thái hiện tại, tức số bậc đang đứng, mà còn phụ thuộc trạng thái trước đó, tức số bậc ở lượt trước**.

Bài toán không còn thỏa tính không có hậu hiệu. Phương trình $dp[i] = dp[i-1] + dp[i-2]$ cũng không còn đúng, vì $dp[i-1]$ tương ứng lượt này nhảy $1$ bậc nhưng bên trong nó chứa nhiều lời giải mà lượt trước cũng nhảy $1$ bậc; các lời giải ấy không thể được tính trực tiếp vào $dp[i]$.

Vì vậy cần mở rộng định nghĩa trạng thái: **trạng thái $[i, j]$ biểu diễn đang ở bậc thứ $i$ và lượt trước đã nhảy $j$ bậc**, với $j \in \{1, 2\}$. Cách định nghĩa này phân biệt rõ lượt trước nhảy $1$ hay $2$ bậc, nhờ đó xác định được trạng thái hiện tại đến từ đâu.

- Khi lượt trước nhảy $1$ bậc, lượt liền trước đó chỉ có thể nhảy $2$ bậc; vì vậy $dp[i, 1]$ chỉ có thể chuyển từ $dp[i-1, 2]$.
- Khi lượt trước nhảy $2$ bậc, lượt liền trước đó có thể nhảy $1$ hoặc $2$ bậc; vì vậy $dp[i, 2]$ có thể chuyển từ $dp[i-2, 1]$ hoặc $dp[i-2, 2]$.

Trong hình dưới, $dp[i, j]$ là số cách ứng với trạng thái $[i, j]$. Phương trình chuyển trạng thái trở thành:

$$
\begin{cases}
dp[i, 1] = dp[i-1, 2] \\
dp[i, 2] = dp[i-2, 1] + dp[i-2, 2]
\end{cases}
$$

![Quan hệ truy hồi khi xét ràng buộc](dp_problem_features.assets/climbing_stairs_constraint_state_transfer.png)

Cuối cùng, trả về $dp[n, 1] + dp[n, 2]$; tổng hai giá trị chính là toàn bộ số cách để lên bậc thứ $n$:

```python
# Mã leo cầu thang có ràng buộc 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Trong ví dụ trên, vì chỉ cần xét thêm một trạng thái trước đó, chúng ta vẫn có thể làm bài toán thỏa tính không có hậu hiệu bằng cách mở rộng định nghĩa trạng thái. Tuy nhiên, một số bài toán có “hậu hiệu” rất nghiêm trọng.

!!! question "Leo cầu thang sinh chướng ngại vật"

    Cho cầu thang có $n$ bậc, mỗi lần có thể đi lên $1$ hoặc $2$ bậc. **Mỗi khi đến bậc thứ $i$, hệ thống tự đặt một chướng ngại ở bậc thứ $2i$, và các lượt sau không được nhảy tới bậc thứ $2i$**. Ví dụ, nếu hai lượt đầu lần lượt tới bậc thứ $2$ và thứ $3$, về sau không được nhảy tới bậc thứ $4$ và thứ $6$. Có bao nhiêu cách để lên tới đỉnh?

Trong bài toán này, bước nhảy tiếp theo phụ thuộc vào mọi trạng thái trước đó vì mỗi lần nhảy đều đặt thêm chướng ngại trên các bậc cao hơn và ảnh hưởng đến tương lai. Quy hoạch động thường khó giải loại bài toán như vậy.

Nhiều bài toán tối ưu tổ hợp phức tạp, chẳng hạn bài toán người bán hàng, cũng không thỏa tính không có hậu hiệu. Với chúng, chúng ta thường dùng phương pháp khác như tìm kiếm heuristic, thuật toán di truyền hoặc học tăng cường để tìm lời giải tối ưu cục bộ có thể sử dụng trong thời gian giới hạn.
