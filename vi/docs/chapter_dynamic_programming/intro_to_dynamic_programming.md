# Giới thiệu quy hoạch động

<u>Quy hoạch động</u> là một mô hình thuật toán quan trọng. Phương pháp này phân rã một bài toán thành chuỗi bài toán con nhỏ hơn, lưu lại lời giải của chúng để tránh tính toán lặp, nhờ đó cải thiện đáng kể hiệu suất thời gian.

Trong phần này, chúng ta bắt đầu bằng một ví dụ kinh điển. Trước tiên chúng ta xây dựng lời giải quay lui vét cạn, quan sát các bài toán con chồng lặp trong cây tìm kiếm, rồi từng bước suy ra lời giải quy hoạch động hiệu quả hơn.

!!! question "Leo cầu thang"

    Cho một cầu thang có $n$ bậc. Mỗi lần có thể bước lên $1$ hoặc $2$ bậc. Có bao nhiêu cách khác nhau để lên tới đỉnh?

Như hình dưới đây, với cầu thang có $3$ bậc, có tổng cộng $3$ cách để lên tới đỉnh.

![Số cách lên bậc thứ 3](intro_to_dynamic_programming.assets/climbing_stairs_example.png)

Mục tiêu là đếm số cách, vì vậy **chúng ta có thể dùng quay lui để liệt kê mọi khả năng**. Hãy hình dung quá trình leo cầu thang là nhiều lượt lựa chọn: bắt đầu từ mặt đất, mỗi lượt chọn đi lên $1$ hoặc $2$ bậc; khi đến đúng đỉnh thì tăng bộ đếm thêm $1$; khi vượt quá đỉnh thì cắt tỉa nhánh đó. Mã chính thức như sau:

```python
# Mã quay lui leo cầu thang 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

## Phương pháp 1: Tìm kiếm vét cạn

Thuật toán quay lui thường không biểu diễn rõ việc phân rã bài toán. Thay vào đó, nó xem quá trình giải là chuỗi bước quyết định và tìm mọi lời giải bằng thử lựa chọn rồi cắt tỉa.

Chúng ta hãy phân tích bài toán theo góc nhìn phân rã. Gọi số cách lên tới bậc thứ $i$ là $dp[i]$. Khi đó $dp[i]$ là bài toán gốc đang xét, còn các bài toán con gồm:

$$
dp[i-1], dp[i-2], \dots, dp[2], dp[1]
$$

Vì mỗi lượt chỉ có thể đi lên $1$ hoặc $2$ bậc, khi đang đứng ở bậc thứ $i$, lượt trước chỉ có thể ở bậc thứ $i-1$ hoặc $i-2$. Nói cách khác, chúng ta chỉ có thể đến bậc thứ $i$ từ một trong hai bậc đó.

Từ đây có kết luận quan trọng: **số cách lên bậc thứ $i-1$ cộng số cách lên bậc thứ $i-2$ chính là số cách lên bậc thứ $i$**. Công thức là:

$$
dp[i] = dp[i-1] + dp[i-2]
$$

Như vậy giữa các bài toán con của bài toán leo cầu thang tồn tại một quan hệ truy hồi, và **lời giải bài toán gốc có thể được xây dựng từ lời giải của các bài toán con**. Hình sau minh họa quan hệ chuyển trạng thái này.

![Quan hệ truy hồi của số cách leo cầu thang](intro_to_dynamic_programming.assets/climbing_stairs_state_transfer.png)

Từ công thức truy hồi, chúng ta có thể viết lời giải tìm kiếm vét cạn. Bắt đầu tại $dp[n]$, **đệ quy phân rã bài toán lớn thành tổng của hai bài toán nhỏ hơn** cho đến khi chạm các bài toán nhỏ nhất $dp[1]$ và $dp[2]$. Lời giải của hai bài toán cơ sở đã biết: $dp[1] = 1$ và $dp[2] = 2$, tương ứng có $1$ và $2$ cách để lên bậc thứ $1$ và thứ $2$.

Đoạn mã dưới đây cũng dùng tìm kiếm theo chiều sâu như quay lui chuẩn, nhưng biểu diễn ngắn gọn hơn.

```python
# Mã DFS leo cầu thang 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Hình dưới là cây đệ quy của tìm kiếm vét cạn. Với bài toán $dp[n]$, cây có độ sâu $n$ và độ phức tạp thời gian $O(2^n)$. Tăng trưởng hàm mũ rất nhanh; nếu $n$ tương đối lớn, chương trình có thể phải chờ rất lâu.

![Cây đệ quy của bài toán leo cầu thang](intro_to_dynamic_programming.assets/climbing_stairs_dfs_tree.png)

Quan sát hình, **độ phức tạp hàm mũ xuất phát từ các “bài toán con chồng lặp”**. Chẳng hạn $dp[9]$ được phân rã thành $dp[8]$ và $dp[7]$, trong khi $dp[8]$ lại được phân rã thành $dp[7]$ và $dp[6]$; cả hai nhánh cùng chứa bài toán con $dp[7]$.

Tương tự, các bài toán con ấy tiếp tục chứa những bài toán nhỏ hơn bị lặp lại. Phần lớn tài nguyên tính toán bị lãng phí vì cùng một kết quả được tính nhiều lần.

## Phương pháp 2: Ghi nhớ

Để cải thiện hiệu suất, **chúng ta muốn mỗi bài toán con chồng lặp chỉ được tính đúng một lần**. Vì vậy, hãy khai báo mảng `mem` để ghi lời giải của từng bài toán con và cắt tỉa các phép tính lặp trong quá trình tìm kiếm.

1. Khi tính $dp[i]$ lần đầu, ghi kết quả vào `mem[i]` để dùng lại.
2. Khi cần tính lại $dp[i]$, đọc trực tiếp kết quả từ `mem[i]` thay vì tiếp tục phân rã bài toán con đó.

Mã chính thức như sau:

```python
# Mã DFS có ghi nhớ 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Quan sát hình dưới, **sau khi ghi nhớ, mỗi bài toán con chồng lặp chỉ cần tính một lần, làm độ phức tạp thời gian giảm xuống $O(n)$**. Đây là một cải thiện rất lớn.

![Cây đệ quy sau khi ghi nhớ](intro_to_dynamic_programming.assets/climbing_stairs_dfs_memo_tree.png)

## Phương pháp 3: Quy hoạch động

**Ghi nhớ là phương pháp “từ trên xuống”**: bắt đầu từ bài toán gốc ở nút rễ, đệ quy phân rã bài toán lớn thành bài toán nhỏ hơn cho đến khi chạm những bài toán cơ sở đã biết ở nút lá. Sau đó quá trình quay lui thu thập lời giải từng tầng để dựng nên lời giải bài toán gốc.

Ngược lại, **quy hoạch động là phương pháp “từ dưới lên”**: bắt đầu từ lời giải của những bài toán con nhỏ nhất, lặp để xây dựng lời giải của các bài toán lớn dần cho đến khi thu được đáp án của bài toán gốc.

Quy hoạch động không có quá trình quay lui nên chỉ cần vòng lặp, không cần đệ quy. Trong mã sau, mảng `dp` lưu lời giải của các bài toán con và giữ vai trò tương tự mảng `mem` trong phương pháp ghi nhớ.

```python
# Mã quy hoạch động leo cầu thang 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Hình dưới mô phỏng quá trình thực thi mã.

![Quá trình quy hoạch động cho bài toán leo cầu thang](intro_to_dynamic_programming.assets/climbing_stairs_dp.png)

Giống quay lui, quy hoạch động dùng khái niệm “trạng thái” để biểu diễn một giai đoạn cụ thể của quá trình giải. Mỗi trạng thái tương ứng với một bài toán con và lời giải tối ưu cục bộ của nó. Trong bài toán leo cầu thang, trạng thái được xác định bởi số bậc hiện tại $i$.

Khi tính trạng thái này, hai chỉ số đứng trước là $i-1$ và $i-2$; chúng biểu diễn đúng hai vị trí có thể chuyển tới bậc hiện tại.

Từ nội dung trên, có thể tóm tắt các thuật ngữ thường dùng như sau.

- Mảng `dp` được gọi là <u>bảng DP</u>; $dp[i]$ biểu diễn lời giải của bài toán con ứng với trạng thái $i$.
- Các trạng thái của những bài toán nhỏ nhất, tức bậc thứ $1$ và thứ $2$, được gọi là <u>trạng thái khởi tạo</u>.
- Công thức truy hồi $dp[i] = dp[i-1] + dp[i-2]$ được gọi là <u>phương trình chuyển trạng thái</u>.

## Tối ưu không gian

Bạn đọc tinh ý có thể nhận thấy **vì $dp[i]$ chỉ phụ thuộc vào $dp[i-1]$ và $dp[i-2]$, chúng ta không cần mảng `dp` để lưu lời giải của mọi bài toán con**. Chỉ cần dùng hai biến cuộn tiến theo vòng lặp:

```python
# Mã quy hoạch động tối ưu không gian 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Sau khi bỏ mảng `dp`, độ phức tạp không gian giảm từ $O(n)$ xuống $O(1)$.

Trong nhiều bài toán quy hoạch động, trạng thái hiện tại chỉ phụ thuộc vào một số hữu hạn trạng thái trước đó. Chúng ta có thể chỉ giữ lại các trạng thái cần thiết để tiết kiệm bộ nhớ bằng cách “giảm chiều”. **Kỹ thuật tối ưu không gian này được gọi là “biến cuộn” hoặc “mảng cuộn”**.
