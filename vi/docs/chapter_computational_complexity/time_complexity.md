# Độ phức tạp thời gian

Thời gian chạy phản ánh trực quan hiệu quả của thuật toán. Muốn ước lượng chính xác thời gian chạy của một đoạn mã, về lý thuyết chúng ta phải xác định nền tảng thực thi, đo thời gian của từng phép toán, đếm toàn bộ phép toán rồi cộng chúng lại.

Nếu kích thước đầu vào là $n$, quy trình chính xác còn phải gắn số lần thực hiện của từng câu lệnh với $n$. Kết quả thu được là một hàm thời gian cụ thể cho đúng nền tảng đang đo.

Ví dụ, giả sử phép cộng mất 1 ns, phép nhân mất 10 ns và lệnh in mất 5 ns:

```python
def algorithm(n: int):
    a = 2      # 1 ns
    a = a + 1  # 1 ns
    a = a * 2  # 10 ns
    for _ in range(n):  # 1 ns mỗi lượt
        print(0)        # 5 ns mỗi lượt
```

Thời gian ước lượng là:

$$
1 + 1 + 10 + (1 + 5) \times n = 6n + 12
$$

Tuy nhiên, việc đếm thời gian tuyệt đối như vậy vừa khó vừa không thực tế: thuật toán chạy trên nhiều nền tảng, còn thời gian của từng thao tác phụ thuộc phần cứng, ngôn ngữ và môi trường.

## Đếm xu hướng tăng của thời gian

Phân tích độ phức tạp thời gian không cố đo số giây chính xác. **Nó đo xu hướng thời gian chạy tăng khi kích thước dữ liệu tăng.**

Giả sử kích thước đầu vào là $n$. Một thuật toán thực hiện đúng $1$ thao tác không tăng theo dữ liệu, thuật toán thực hiện $n$ thao tác tăng tuyến tính, còn thuật toán luôn thực hiện $1000000$ thao tác vẫn độc lập với $n$. Vì vậy số tuyệt đối lớn chưa chắc tạo bậc tăng trưởng lớn.

Giả sử kích thước đầu vào là $n$ và có ba thuật toán:

```python
def algorithm_A(n: int):       # Hằng số
    print(0)

def algorithm_B(n: int):       # Tuyến tính
    for _ in range(n):
        print(0)

def algorithm_C(n: int):       # Hằng số lớn
    for _ in range(1_000_000):
        print(0)
```

- `A` luôn thực hiện một lệnh in nên thời gian không tăng theo $n$.
- `B` thực hiện $n$ lệnh in nên thời gian tăng tuyến tính.
- `C` chạy rất lâu nhưng số lần lặp không phụ thuộc $n$, nên vẫn thuộc bậc hằng số như `A`.

![Xu hướng tăng thời gian của ba thuật toán](time_complexity.assets/time_complexity_simple_example.png)

Phân tích độ phức tạp có ba đặc điểm quan trọng.

- **Đánh giá được khả năng mở rộng**: Khi $n$ đủ lớn, bậc tăng trưởng quan trọng hơn chênh lệch hằng số.
- **Dễ suy ra hơn thời gian tuyệt đối**: Có thể coi mọi phép toán là một đơn vị và chỉ đếm số lần thực hiện.
- **Không cho biết mọi chi tiết**: Hai thuật toán cùng độ phức tạp vẫn có thể khác xa về thời gian thực; khi $n$ nhỏ, thuật toán có bậc cao hơn đôi khi vẫn nhanh hơn.

Chẳng hạn, khi `n > 1`, `A` đã thực hiện ít thao tác hơn `B`; khi `n > 1000000`, cả `A` lẫn `C` đều có bậc tốt hơn `B`, dù `C` có hằng số rất lớn. Kết luận tiệm cận chỉ trở nên chi phối khi `n` đủ lớn.

## Cận trên tiệm cận

Xét hàm:

```python
def algorithm(n: int):
    a = 1
    a = a + 1
    a = a * 2
    for _ in range(n):
        print(0)
```

Gọi số phép toán là $T(n)$, chúng ta có $T(n) = 3 + 2n$. Đây là hàm tuyến tính, nên độ phức tạp thời gian là $O(n)$.

$$
T(n) = 3 + 2n
$$

Ký hiệu Big $O$ biểu diễn **cận trên tiệm cận** của $T(n)$.

!!! note "Cận trên tiệm cận của hàm"

    Nếu tồn tại các số dương $c$ và $n_0$ sao cho với mọi $n > n_0$, chúng ta có $T(n) \le c \cdot f(n)$, thì $f(n)$ là một cận trên tiệm cận của $T(n)$ và viết $T(n) = O(f(n))$.

Khi $n$ tiến tới vô hạn, $T(n)$ và $f(n)$ có cùng mức tăng trưởng, chỉ khác nhau bởi một hệ số hằng.

Nói cách khác, chúng ta tìm $f(n)$ sao cho từ một ngưỡng đủ lớn trở đi, $T(n)$ không vượt quá một bội số cố định của $f(n)$. Hệ số $c$ và ngưỡng $n_0$ có thể thay đổi, nhưng bậc tăng trưởng của hai hàm vẫn cùng cấp.

![Cận trên tiệm cận của một hàm](time_complexity.assets/asymptotic_upper_bound.png)

## Cách suy ra độ phức tạp

Chúng ta thực hiện hai bước: đếm số phép toán, sau đó giữ lại bậc tăng trưởng chi phối.

Sau khi viết số phép toán thành $T(n)$, chúng ta chọn một hàm $f(n)$ biểu diễn hạng chi phối rồi ghi kết quả dưới dạng $O(f(n))$. Cách làm này biến định nghĩa toán học thành một quy trình có thể áp dụng trực tiếp cho mã.

### Bước 1: Đếm số phép toán

Khi đếm, có thể đơn giản hóa như sau.

1. Bỏ các hằng số không phụ thuộc $n$.
2. Bỏ hệ số nhân, chẳng hạn $2n$ hoặc $5n + 1$ đều xem như $n$.
3. Nhân số lần lặp của các vòng lặp lồng nhau.

```python
def algorithm(n: int):
    a = 1                  # Bỏ qua hằng số
    a = a + n              # Bỏ qua thao tác đơn
    for _ in range(5 * n + 1):
        print(0)           # n
    for _ in range(2 * n):
        for _ in range(n + 1):
            print(0)       # n × n
```

Đếm đầy đủ cho $T(n) = 2n^2 + 7n + 3$; đếm rút gọn cho $T(n) = n^2 + n$. Cả hai đều dẫn tới $O(n^2)$.

$$
\begin{aligned}
T(n) & = 2n(n + 1) + (5n + 1) + 2 \\
& = 2n^2 + 7n + 3 \\
T(n) & = n^2 + n
\end{aligned}
$$

Hạng hằng trong $T(n)$ không phụ thuộc đầu vào. Hệ số đứng trước $n$ chỉ co giãn đường cong theo một tỉ lệ cố định, còn hai vòng lặp lồng nhau tạo tích $n \times n$. Vì vậy cả phép đếm đầy đủ lẫn rút gọn đều giữ đúng bậc.

### Bước 2: Xác định hạng chi phối

**Độ phức tạp được quyết định bởi hạng bậc cao nhất của $T(n)$**, vì ảnh hưởng của các hạng thấp và hệ số trở nên không đáng kể khi $n$ rất lớn.

Ví dụ, với $T(n)=2n^2+3n+2$, hạng $n^2$ tăng nhanh hơn `n` và hằng số. Tương tự, trong `2^n+10000n^10000`, hàm `2^n` cuối cùng vượt mọi đa thức khi `n` đủ lớn.

| Số phép toán $T(n)$ | Độ phức tạp |
| --- | --- |
| $100000$ | $O(1)$ |
| $3n + 2$ | $O(n)$ |
| $2n^2 + 3n + 2$ | $O(n^2)$ |
| $n^3 + 10000n^2$ | $O(n^3)$ |
| $2^n + 10000n^{10000}$ | $O(2^n)$ |

## Các dạng thường gặp

Theo thứ tự tăng dần:

Với kích thước đầu vào $n$, các bậc dưới đây cho biết tài nguyên tăng nhanh ra sao chứ không phải số nanô-giây tuyệt đối.

$$
O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)
$$

![Các dạng độ phức tạp thời gian phổ biến](time_complexity.assets/time_complexity_common_types.png)

### Bậc hằng số $O(1)$

Số phép toán không phụ thuộc kích thước đầu vào.

Nếu số lần thực hiện luôn là `100000` hoặc bất kỳ hằng số cố định nào, nó vẫn được viết là $O(1)$ vì không đổi theo $n$.

```python
def constant(n: int) -> int:
    count = 0
    size = 100_000
    for _ in range(size):
        count += 1
    return count
```

Dù `size` lớn, nó không thay đổi theo $n$, nên độ phức tạp vẫn là $O(1)$.

### Bậc tuyến tính $O(n)$

Số phép toán tăng tỉ lệ thuận với $n$, thường xuất hiện trong một vòng lặp hoặc khi duyệt mảng, danh sách liên kết.

```python
def linear(n: int):
    for _ in range(n):
        print(0)

def array_traversal(nums: list[int]):
    for num in nums:
        print(num)
```

Kích thước dữ liệu phải được xác định theo loại đầu vào: có thể là giá trị $n$, độ dài mảng hoặc số nút.

Một vòng lặp duyệt đúng `n` phần tử có số thao tác tỉ lệ với $n$, nên thuộc $O(n)$. Với mảng `nums`, nếu độ dài là $n$, phép duyệt toàn bộ cũng có $O(n)$ dù biến đầu vào không mang tên `n`.

```python
# Nhóm mã chính thức về duyệt mảng được chèn tại đây.
```

### Bậc hai $O(n^2)$

Bậc hai thường xuất hiện trong hai vòng lặp lồng nhau, mỗi vòng có $O(n)$.

```python
def quadratic(n: int):
    for _ in range(n):
        for _ in range(n):
            print(0)
```

![So sánh bậc hằng, tuyến tính và bậc hai](time_complexity.assets/time_complexity_constant_linear_quadratic.png)

Sắp xếp nổi bọt cũng có tổng số lượt so sánh xấp xỉ $(n - 1)n/2$, nên thuộc $O(n^2)$.

Trong hai vòng lặp có độ dài $n$, tổng số cặp chỉ số là $n \times n = n^2$. Với sắp xếp nổi bọt, số lượt là $(n-1)+(n-2)+\dots+1=(n-1)n/2$; bỏ hệ số và hạng thấp vẫn cho $O(n^2)$. Vì vậy khi $n$ tăng gấp đôi, lượng việc bậc hai tăng xấp xỉ bốn lần.

Tổng tam giác $1+2+\dots+n$ bằng $n(n+1)/2$, nên sau khi bỏ hệ số, hạng chi phối vẫn là $n^2$.

```python
# Nhóm mã chính thức về sắp xếp nổi bọt được chèn tại đây.
```

### Bậc hàm mũ $O(2^n)$

Phân chia tế bào là ví dụ trực quan: bắt đầu từ một tế bào, sau $n$ vòng có $2^n$ tế bào. Trong thuật toán, bậc hàm mũ thường xuất hiện khi một lời gọi đệ quy tách thành hai nhánh.

Ở vòng đầu có `1` tế bào, sau một lần thành $2$, sau hai lần thành $4$, và sau $n$ lần thành $2^n$. Nếu mỗi lời gọi sinh hai lời gọi mới và cây có độ sâu $n$, tổng số nút cũng cùng bậc $O(2^n)$.

```python
def exp_recur(n: int) -> int:
    if n == 1:
        return 1
    return exp_recur(n - 1) + exp_recur(n - 1) + 1
```

![Độ phức tạp thời gian bậc hàm mũ](time_complexity.assets/time_complexity_exponential.png)

Bậc này tăng rất nhanh, thường gặp trong vét cạn và quay lui. Phiên bản đệ quy dưới đây tạo hai nhánh giống nhau ở mỗi lớp.

```python
# Nhóm mã chính thức về đệ quy hàm mũ được chèn tại đây.
```

Với dữ liệu lớn, chúng ta thường cần quy hoạch động, tham lam hoặc kỹ thuật cắt tỉa.

### Bậc logarit $O(\log n)$

Bậc logarit xuất hiện khi kích thước bài toán giảm còn một nửa sau mỗi bước.

Nếu bắt đầu từ `n` và mỗi lượt chia cho $2$, sau $k$ lượt kích thước còn $n/2^k$. Quá trình dừng khi giá trị gần $1$, tức $2^k \approx n$ và $k \approx \log_2 n$.

```python
def logarithmic(n: int):
    while n > 1:
        n //= 2
```

![Độ phức tạp thời gian bậc logarit](time_complexity.assets/time_complexity_logarithmic.png)

Chia đôi liên tục cần khoảng $\log_2 n$ bước. Logarit tăng chậm, chỉ kém lý tưởng hơn bậc hằng số.

```python
# Nhóm mã chính thức về đệ quy logarit được chèn tại đây.
```

!!! tip "Cơ số của độ phức tạp logarit là gì?"

    Với ký hiệu $O(\log n)$, chia thành $m$ phần tạo $O(\log_m n)$. Theo công thức đổi cơ số, $O(\log_m n)=O(\log_k n/\log_k m)=O(\log_k n)$. Các cơ số chỉ khác nhau bởi hệ số hằng, nên thường viết gọn là $O(\log n)$.

### Bậc tuyến tính-logarit $O(n \log n)$

Bậc này thường xuất hiện khi mỗi tầng của một cây đệ quy thực hiện tổng cộng $n$ phép toán và cây có khoảng $\log n$ tầng.

Nếu cây có $\log_2 n + 1$ tầng và tổng công việc trên mỗi tầng là `n`, toàn bộ công việc là $n(\log_2 n+1)$, rút gọn thành $O(n\log n)$.

```python
def linear_log_recur(n: int):
    if n <= 1:
        return
    for _ in range(n):
        print(0)
    linear_log_recur(n // 2)
    linear_log_recur(n // 2)
```

![Độ phức tạp tuyến tính-logarit](time_complexity.assets/time_complexity_logarithmic_linear.png)

Sắp xếp nhanh, sắp xếp trộn và sắp xếp đống thường đạt $O(n \log n)$.

### Bậc giai thừa $O(n!)$

Với $n$ phần tử khác nhau, số hoán vị là:

$$
n! = n \times (n - 1) \times \dots \times 2 \times 1
$$

Mỗi tầng của cây hoán vị lần lượt có $n$, $n - 1$, rồi $n - 2$ lựa chọn.

```python
def permutations(items: list[int], path: list[int]):
    if not items:
        print(path)
        return
    for i, item in enumerate(items):
        permutations(items[:i] + items[i + 1:], path + [item])
```

![Độ phức tạp thời gian bậc giai thừa](time_complexity.assets/time_complexity_factorial.png)

Khi $n \ge 4$, $n! > 2^n$, nên giai thừa còn tăng nhanh hơn bậc hàm mũ và không phù hợp với dữ liệu lớn.

Tại tầng đầu có $n$ lựa chọn, tầng sau còn `n-1` lựa chọn, rồi tiếp tục giảm cho tới `1`; tích các số nhánh chính là số hoán vị.

## Trường hợp xấu nhất, tốt nhất và trung bình

Hiệu quả của thuật toán có thể phụ thuộc vào phân bố đầu vào. Xét việc tìm số `1` trong một mảng xáo trộn chứa các số từ $1$ đến $n$.

```python
def find_one(nums: list[int]) -> int:
    for i, num in enumerate(nums):
        if num == 1:
            return i
    return -1
```

- Nếu `1` nằm cuối mảng, phải duyệt toàn bộ: **trường hợp xấu nhất $O(n)$**.
- Nếu `1` nằm đầu mảng, chỉ cần một bước: **trường hợp tốt nhất $\Omega(1)$**.
- Nếu mọi vị trí có xác suất như nhau, số lượt trung bình xấp xỉ $n/2$: **trường hợp trung bình $\Theta(n)$**.

Với `nums = [?, ?, ..., 1]`, số `1` ở vị trí cuối nên thuật toán thực hiện $n$ phép kiểm tra. Với `nums = [1, ?, ?, ...]`, nó dừng sau $1$ phép kiểm tra. Nếu mỗi vị trí có xác suất như nhau, số lượt kỳ vọng là $n/2$, và $\Theta(n/2)=\Theta(n)$ sau khi bỏ hệ số.

Vì thế, phân tích trung bình phải gắn với phân bố xác suất của đầu vào, không chỉ với một giá trị $n$ riêng lẻ.

Chúng ta ít dùng trường hợp tốt nhất vì nó thường hiếm và dễ gây hiểu nhầm. Trường hợp xấu nhất hữu ích hơn vì cho một giới hạn an toàn. Trường hợp trung bình gần thực tế hơn nhưng có thể khó tính do phải biết phân bố dữ liệu và kỳ vọng toán học.

!!! question "Vì sao ít gặp ký hiệu cận khít?"

    Ký hiệu $\Theta$ biểu diễn cận khít, nhưng $O$ quá phổ biến nên nhiều tài liệu dùng nó cả khi nói về độ phức tạp trung bình. Cách viết ấy không hoàn toàn chặt chẽ: $\Omega$ biểu diễn cận dưới, $O$ biểu diễn cận trên, còn $\Theta$ biểu diễn cận khít. Khi gặp “trung bình $O(n)$”, hãy hiểu ý định là $\Theta(n)$ nếu tác giả đang nói về bậc tăng trưởng kỳ vọng.
