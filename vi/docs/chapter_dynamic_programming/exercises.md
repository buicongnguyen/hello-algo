# Bài tập

## Ôn tập khái niệm

### Khi nào quy hoạch động phù hợp?

Một học viên nói: “Hễ viết được công thức truy hồi thì nên dùng quy hoạch động.”
Với mỗi nhiệm vụ dưới đây, hãy quyết định nên dùng quy hoạch động, quay lui, hay chỉ cần vòng lặp hoặc công thức toán học không có bảng `dp`. Nêu một lý do chính.

<!-- numbered-subquestions -->

1. Với các mệnh giá `[1, 3, 4]`, hãy tạo số tiền 6 bằng ít đồng xu nhất. Mỗi mệnh giá được dùng nhiều lần.
2. Liệt kê mọi hoán vị của `[1, 2, 3]`.
3. Tính $1 + 2 + \dots + n$.

    Với nhiệm vụ phù hợp với quy hoạch động, hãy nêu thêm ý nghĩa của `dp[i]`.

??? success "Đáp án"

    1. Quy hoạch động phù hợp. Đặt `dp[i]` là số đồng xu ít nhất cần để tạo số tiền `i`.
        Với mỗi đồng xu `c` không lớn hơn `i`, `dp[i-c] + 1` là một phương án; giá trị nhỏ nhất được chọn.
        Các lựa chọn khác nhau liên tục gặp lại cùng một số tiền, và nghiệm tối ưu của số tiền lớn được xây từ nghiệm tối ưu của số tiền nhỏ hơn.
        Đáp án cho số tiền 6 là 2, dùng `3 + 3`.

    2. Quay lui phù hợp. Bài toán cần sinh lần lượt cả 6 hoán vị. Quay lui có thể chọn một phần tử, tiếp tục tìm,
        hoàn tác lựa chọn rồi thử nhánh khác. Dù dùng phương pháp nào, việc xuất mọi hoán vị vẫn đòi hỏi liệt kê chúng.

    3. Một vòng lặp hoặc công thức tổng cấp số cộng là đủ. Dù có thể viết truy hồi `S(i) = S(i-1) + i`, việc tính `S(i)` chỉ phụ thuộc vào một giá trị nhỏ hơn là `S(i-1)`.
        Mỗi tổng trung gian chỉ cần tính một lần, nên không có bài toán con chồng lặp và không cần bảng `dp`. “Viết được truy hồi” không có nghĩa là “cần quy hoạch động”.

### Tính một ô trong bảng ba lô

Xét bài toán ba lô 0-1 có trọng lượng `wgt = [1, 2, 3]`, giá trị `val = [5, 11, 15]` và sức chứa 4.
`dp[i][c]` là giá trị lớn nhất đạt được khi chỉ dùng $i$ vật đầu tiên với giới hạn sức chứa $c$;
ba lô không bắt buộc phải đầy hoàn toàn.

Chỉ tính trạng thái `dp[3][4]`. Biết `dp[2][4] = 16` và `dp[2][1] = 5`:

<!-- numbered-subquestions -->

1. Nếu không chọn vật thứ ba, giá trị ứng viên là bao nhiêu?
2. Nếu chọn vật thứ ba, còn lại bao nhiêu sức chứa và giá trị ứng viên là bao nhiêu?
3. `dp[3][4]` phải bằng bao nhiêu? Giá trị này tương ứng với việc chọn những vật nào?

??? success "Đáp án"

    1. Nếu không chọn vật thứ ba, giữ kết quả từ hai vật đầu. Giá trị ứng viên là `dp[2][4] = 16`.

    2. Vật thứ ba nặng 3, nên sau khi đưa vào ba lô còn sức chứa $4-3=1$. Giá trị ứng viên là
        `dp[2][1] + 15 = 5 + 15 = 20`.

    3. So sánh 16 và 20, suy ra `dp[3][4] = 20`. Giá trị này tương ứng với việc chọn vật thứ nhất và thứ ba,
        có tổng trọng lượng $1+3=4$ và tổng giá trị $5+15=20$.

        Phép tính trạng thái này minh họa một lần so sánh “chọn hoặc không chọn” trong bài toán ba lô 0-1.

### Nên cập nhật sức chứa của ba lô theo thứ tự nào?

Bài toán ba lô 0-1 chỉ có một vật, trọng lượng 2, giá trị 5 và sức chứa ba lô là 4.
Vật chỉ được chọn tối đa một lần. Mảng một chiều ban đầu là `dp = [0, 0, 0, 0, 0]`.

Một học viên xử lý vật bằng cách cập nhật sức chứa từ 2 đến 4:

- Sau khi cập nhật `dp[2]`, giá trị của nó là 5.
- Sau khi cập nhật `dp[3]`, giá trị cũng là 5.
- Khi cập nhật `dp[4]`, học viên dùng `dp[2]` vừa nhận được, tạo ra `dp[4] = 10`.

<!-- numbered-subquestions -->

1. `dp[4] = 10` có đúng không? Vì sao?
2. Vì mỗi vật chỉ được chọn tối đa một lần, `dp[4]` phải bằng bao nhiêu?
3. Khi xử lý mỗi vật, nên cập nhật sức chứa từ lớn xuống nhỏ hay từ nhỏ lên lớn? Cách này tránh vấn đề gì?

??? success "Đáp án"

    1. Kết quả không đúng. Giá trị 10 tương đương với việc đưa vật có giá trị 5 vào ba lô hai lần,
        vi phạm điều kiện mỗi vật chỉ được chọn tối đa một lần.

    2. Ba lô chỉ có thể chứa nhiều nhất một vật này, nên giá trị đúng của `dp[4]` là 5.

    3. Nên cập nhật sức chứa từ lớn xuống nhỏ, theo thứ tự 4, 3, 2.
        Khi đó, lúc tính `dp[c]`, giá trị đọc từ `dp[c-2]` vẫn là giá trị trước khi xử lý vật hiện tại,
        nhờ vậy vật không bị dùng lại trong cùng một lượt.

## Bài tập lập trình

### Số cách leo cầu thang

Một cầu thang có `n` bậc. Mỗi bước đi lên 1 hoặc 2 bậc và bạn phải dừng đúng ở bậc `n`.
Hãy tính số cách khác nhau để lên tới đỉnh. Giả sử `n >= 1`; các cách được phân biệt theo chuỗi bước 1 bậc và 2 bậc.
Hãy dùng mảng quy hoạch động một chiều. Trước mắt, chưa dùng tối ưu không gian chỉ giữ hai trạng thái.

??? tip "Gợi ý"

    1. Bước cuối cùng để đến bậc i chỉ có thể dài 1 hoặc 2 bậc
    2. Do đó, dp[i] = dp[i-1] + dp[i-2]
    3. Xử lý trước trường hợp n bằng 1 hoặc 2, rồi điền bảng từ bậc 3

[LeetCode](https://leetcode.com/problems/climbing-stairs/)

### Ba lô 0-1

Cho hai mảng cùng độ dài `wgt` và `val`. Vật `i` có trọng lượng nguyên dương `wgt[i]` và giá trị nguyên không âm `val[i]`.
Sức chứa `cap` là một số nguyên không âm. Mỗi vật chỉ được chọn tối đa một lần. Hãy tìm tổng giá trị lớn nhất có thể đặt vào ba lô
mà không vượt quá `cap`, sử dụng quy hoạch động một chiều.

??? tip "Gợi ý"

    1. Khởi tạo mảng dp dài cap + 1, trong đó dp[c] là giá trị lớn nhất với giới hạn sức chứa c
    2. Khi xử lý vật i, so sánh dp[c] khi không chọn vật với dp[c-wgt[i]] + val[i] khi chọn vật
    3. Cập nhật sức chứa từ lớn xuống nhỏ để tránh chọn lặp vật hiện tại trong cùng một lượt
