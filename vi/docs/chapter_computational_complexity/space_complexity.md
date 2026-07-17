# Độ phức tạp không gian

**Độ phức tạp không gian** đo xu hướng tăng của lượng bộ nhớ thuật toán chiếm dụng khi kích thước dữ liệu tăng. Khái niệm này tương tự độ phức tạp thời gian, chỉ thay “thời gian chạy” bằng “bộ nhớ sử dụng”.

## Không gian liên quan đến thuật toán

Bộ nhớ được dùng khi thuật toán chạy gồm ba nhóm chính.

- **Không gian đầu vào** lưu dữ liệu đầu vào.
- **Không gian tạm thời** lưu biến, đối tượng, ngữ cảnh hàm và dữ liệu trung gian.
- **Không gian đầu ra** lưu kết quả.

Thông thường, độ phức tạp không gian tính **không gian tạm thời cộng với không gian đầu ra**, không tính chính dữ liệu đầu vào.

Không gian tạm thời có thể chia tiếp thành:

- **Dữ liệu tạm**: hằng, biến, đối tượng và cấu trúc trung gian.
- **Khung ngăn xếp**: ngữ cảnh của lời gọi hàm. Mỗi lần gọi hàm tạo một khung mới và khung được giải phóng khi hàm trả về.
- **Không gian chỉ thị**: mã máy hoặc bytecode của chương trình, thường được bỏ qua khi phân tích.

![Các loại không gian liên quan đến thuật toán](space_complexity.assets/space_types.png)

```python
class Node:
    def __init__(self, value: int):
        self.value = value       # Dữ liệu tạm
        self.next = None

def function() -> int:
    return 0

def algorithm(n: int) -> int:  # n thuộc không gian đầu vào
    constant = 0               # Dữ liệu tạm
    variable = 0               # Dữ liệu tạm
    node = Node(0)             # Đối tượng tạm
    result = function()        # Tạo khung ngăn xếp khi gọi hàm
    return constant + variable + result  # Không gian đầu ra
```

## Cách tính

Cách tính gần giống độ phức tạp thời gian, nhưng đại lượng cần theo dõi là lượng không gian thay vì số phép toán.

**Ta thường chỉ quan tâm đến độ phức tạp không gian trong trường hợp xấu nhất**, vì bộ nhớ là yêu cầu cứng và chương trình phải đủ chỗ cho mọi đầu vào hợp lệ.

“Xấu nhất” có hai nghĩa.

1. **Đầu vào xấu nhất**: Nếu $n \le 10$, hàm dưới dùng $O(1)$; nếu $n > 10$, mảng `nums` dùng $O(n)$. Vì vậy kết quả chung là $O(n)$.
2. **Đỉnh sử dụng bộ nhớ**: Ta xét thời điểm chương trình chiếm nhiều bộ nhớ nhất, không cộng tuần tự bộ nhớ đã được giải phóng.

```python
def algorithm(n: int):
    a = 0               # O(1)
    b = [0] * 10_000    # O(1), vì không phụ thuộc n
    if n > 10:
        nums = [0] * n  # O(n)
```

Với hàm đệ quy, phải tính cả khung ngăn xếp.

```python
def function() -> int:
    return 0

def loop(n: int):       # Không gian O(1)
    for _ in range(n):
        function()

def recur(n: int):      # Không gian O(n)
    if n == 1:
        return
    return recur(n - 1)
```

Cả `loop()` và `recur()` đều chạy $O(n)$ bước. Tuy nhiên, mỗi lượt lặp giải phóng khung của `function()` trước lượt tiếp theo, nên `loop()` chỉ dùng $O(1)$ không gian. Trong `recur()`, có thể tồn tại đồng thời $n$ lời gọi chưa trả về, nên dùng $O(n)$ khung ngăn xếp.

## Các dạng thường gặp

Theo thứ tự tăng dần:

$$
O(1) < O(\log n) < O(n) < O(n^2) < O(2^n)
$$

![Các dạng độ phức tạp không gian phổ biến](space_complexity.assets/space_complexity_common_types.png)

### Bậc hằng số $O(1)$

Bậc hằng số xuất hiện khi số lượng biến và đối tượng không phụ thuộc $n$. Bộ nhớ tạo trong một vòng lặp có thể được tái sử dụng nên không nhất thiết tích lũy.

```python
def constant(n: int):
    a = 0
    nums = [0] * 1_000
    for _ in range(n):
        value = 1
```

Mảng có kích thước cố định và biến `value` được tái sử dụng, nên không gian là $O(1)$.

### Bậc tuyến tính $O(n)$

Bậc tuyến tính thường gặp ở mảng, danh sách liên kết, ngăn xếp và hàng đợi có số phần tử tỉ lệ với $n$.

```python
def linear(n: int) -> list[int]:
    return [0] * n

def linear_recur(n: int):
    if n == 1:
        return
    linear_recur(n - 1)
```

`linear_recur()` có độ sâu $n$, nên dùng $O(n)$ không gian khung ngăn xếp.

![Không gian tuyến tính do hàm đệ quy tạo ra](space_complexity.assets/space_complexity_recursive_linear.png)

### Bậc hai $O(n^2)$

Bậc hai thường gặp ở ma trận và biểu diễn đồ thị bằng ma trận kề.

```python
def quadratic(n: int) -> list[list[int]]:
    return [[0] * n for _ in range(n)]

def quadratic_recur(n: int):
    if n == 0:
        return
    nums = [0] * n
    quadratic_recur(n - 1)
```

Trong `quadratic_recur()`, các lời gọi chưa trả về đồng thời giữ mảng có độ dài $n, n - 1, \dots, 1$. Tổng không gian thuộc $O(n^2)$.

![Không gian bậc hai do hàm đệ quy tạo ra](space_complexity.assets/space_complexity_recursive_quadratic.png)

### Bậc hàm mũ $O(2^n)$

Bậc hàm mũ thường xuất hiện khi xây một cây nhị phân đầy đủ. Cây có $n$ tầng chứa $2^n - 1$ nút.

```python
class TreeNode:
    def __init__(self, value: int):
        self.value = value
        self.left = None
        self.right = None

def build_tree(n: int) -> TreeNode | None:
    if n == 0:
        return None
    root = TreeNode(0)
    root.left = build_tree(n - 1)
    root.right = build_tree(n - 1)
    return root
```

![Không gian bậc hàm mũ của cây nhị phân đầy đủ](space_complexity.assets/space_complexity_exponential.png)

### Bậc logarit $O(\log n)$

Bậc logarit thường gặp trong chia để trị. Chẳng hạn, nếu mỗi lời gọi chia kích thước mảng làm đôi, cây đệ quy có chiều cao khoảng $\log n$ và dùng $O(\log n)$ khung ngăn xếp.

Một ví dụ khác là chuyển số nguyên dương $n$ thành chuỗi. Số chữ số là $\lfloor \log_{10} n \rfloor + 1$, nên chuỗi kết quả dùng $O(\log n)$ không gian.

## Đánh đổi thời gian và không gian

Trong thực tế, rất khó đồng thời tối ưu cả thời gian lẫn bộ nhớ.

**Giảm độ phức tạp thời gian thường phải trả giá bằng việc tăng độ phức tạp không gian và ngược lại.** Dùng thêm bộ nhớ để chạy nhanh hơn gọi là “đổi không gian lấy thời gian”; dùng thêm thời gian để tiết kiệm bộ nhớ gọi là “đổi thời gian lấy không gian”.

Phần lớn ứng dụng ưu tiên tốc độ nên thường đổi không gian lấy thời gian, chẳng hạn dùng bảng băm hoặc bộ nhớ đệm. Khi dữ liệu rất lớn hoặc thiết bị có ít bộ nhớ, kiểm soát độ phức tạp không gian lại trở thành ưu tiên.
