# Bài tập

## Ôn tập khái niệm

### Những nhiệm vụ nào phù hợp với chia để trị?

Một học viên muốn giải từng nhiệm vụ dưới đây bằng cách “chia thành hai nửa, giải riêng từng nửa, rồi kết hợp kết quả”.
Hãy phân loại mỗi nhiệm vụ vào một trong ba nhóm: “phù hợp với chia để trị”, “có thể dùng chia để trị nhưng không giảm tổng công việc”, hoặc “hai nửa không thể giải độc lập”; đồng thời giải thích lý do.

<!-- numbered-subquestions -->

1. Sắp xếp một mảng chưa có thứ tự.
2. Tìm giá trị lớn nhất trong một mảng.
3. Thực hiện theo thứ tự một chuỗi thao tác ngăn xếp `push(x)` và `pop()`, rồi xuất phần tử mà mỗi lần `pop()` trả về.

??? success "Đáp án"

    1. Phù hợp: chia đôi mảng, sắp xếp độc lập từng nửa và hợp nhất trong thời gian $O(n)$. Đây chính là sắp xếp trộn.
    2. Có thể dùng chia để trị nhưng không giảm tổng công việc. Hai nửa vẫn phải kiểm tra đủ $n$ phần tử,
        nên độ phức tạp thời gian vẫn là $O(n)$ như cách quét trực tiếp.
    3. Hai nửa không thể giải độc lập. Nội dung ngăn xếp ở đầu nửa thứ hai phụ thuộc vào kết quả thực thi nửa thứ nhất,
        nên không thể hoàn thành mỗi nửa khi chưa biết kết quả của nửa kia.

### Bình phương nhanh giảm lượng tính toán như thế nào?

Hàm đệ quy dưới đây dùng chia để trị để tính $x^n$:

```python
def fast_pow(x, n):
    if n == 0:
        return 1
    half = fast_pow(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x
```

Hãy dùng nó để tính `fast_pow(3, 5)`:

<!-- numbered-subquestions -->

1. Khi các lời gọi đệ quy diễn ra, đối số `n` lần lượt nhận những giá trị nào?
2. Từ lời gọi sâu nhất đi lên, mỗi tầng trả về giá trị nào?
3. Vì sao nên lưu kết quả vào `half` thay vì viết `fast_pow(x, n // 2)` hai lần?

??? success "Đáp án"

    1. Đối số lần lượt nhận `5 → 2 → 1 → 0`. Số mũ giảm một nửa ở mỗi bước cho đến trường hợp cơ sở.

    2. Khi `n = 0`, hàm trả về 1. Khi `n = 1`, nó trả về $1×1×3=3$.
        Khi `n = 2`, nó trả về $3×3=9$. Khi `n = 5`, nó trả về $9×9×3=243$.

    3. Nếu viết `fast_pow(x, n // 2)` ở cả hai vế của phép nhân, hai lời gọi đệ quy sẽ tính lại đúng cùng một bài toán con.
        Lưu kết quả vào `half` giúp mỗi tầng chỉ gọi đệ quy một lần, nên độ sâu đệ quy xấp xỉ $\log n$.
        Gọi hai lần sẽ tạo ra rất nhiều phép tính lặp.

### Chia thứ tự duyệt thành cây con trái và phải

Một cây nhị phân không có hai nút trùng nhau. Thứ tự duyệt tiền tự và trung tự là:

- Tiền tự: `[A, B, D, E, C]`
- Trung tự: `[D, B, E, A, C]`

Chỉ chia các dãy một lần tại nút gốc; không cần tiếp tục đệ quy hay vẽ toàn bộ cây.

<!-- numbered-subquestions -->

1. Nút nào là gốc?
2. Những dãy con nào của thứ tự trung tự thuộc cây con trái và cây con phải?
3. Những dãy con nào của thứ tự tiền tự thuộc cây con trái và cây con phải? Các nút con trực tiếp của gốc là gì?

??? success "Đáp án"

    1. Nút đầu tiên trong thứ tự tiền tự là gốc, vì vậy gốc là `A`.

    2. `A` chia thứ tự trung tự thành hai phần: `[D, B, E]` cho cây con trái và `[C]` cho cây con phải.

    3. Cây con trái có 3 nút, nên 3 phần tử tiền tự ngay sau gốc `A` thuộc cây trái,
        cho kết quả `[B, D, E]`. Phần còn lại `[C]` thuộc cây phải.
        Vì vậy, con trái trực tiếp của gốc là `B`, còn con phải là `C`.

## Bài tập lập trình

### Bình phương nhanh

Cho một số thực `x` và một số nguyên `n`, hãy tính $x^n$ mà không gọi hàm lũy thừa có sẵn của ngôn ngữ.
Dùng chia để trị đệ quy: giảm số mũ một nửa ở mỗi bước và tái sử dụng kết quả bài toán con đã tính.
Bài tập quy ước $x^0=1$, kể cả khi `x = 0`. Khi `n < 0`, bảo đảm `x != 0`; có thể đổi bài toán thành $(1/x)^{-n}$.

??? tip "Gợi ý"

    1. Khi n bằng 0, kết quả là 1.
    2. Sau khi tính x mũ n // 2, hãy lưu kết quả vào half thay vì gọi đệ quy lần thứ hai.
    3. Khi n < 0, trước hết đổi x thành 1 / x rồi đổi n thành -n; trong C++ hoặc Java, hãy chuyển n sang số nguyên 64 bit trước để tránh tràn khi đổi dấu số nguyên 32 bit nhỏ nhất.

[LeetCode](https://leetcode.com/problems/powx-n/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
