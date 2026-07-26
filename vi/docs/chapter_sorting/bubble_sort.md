# Sắp xếp nổi bọt

<u>Sắp xếp nổi bọt</u> liên tục so sánh và hoán đổi hai phần tử kề nhau. Chuyển động của phần tử lớn dần về cuối mảng giống một bong bóng nổi lên mặt nước nên thuật toán có tên như vậy.

Bắt đầu từ đầu trái, lần lượt so sánh từng cặp liền kề. Nếu “phần tử trái lớn hơn phần tử phải”, đổi chỗ chúng. Khi đi hết một lượt, phần tử lớn nhất đã được đẩy đến đầu phải.

**Bước 1**

![Mô phỏng phép nổi bọt bằng hoán đổi](bubble_sort.assets/bubble_operation_step1.png)

**Bước 2**

![Bước 2 của phép nổi bọt](bubble_sort.assets/bubble_operation_step2.png)

**Bước 3**

![Bước 3 của phép nổi bọt](bubble_sort.assets/bubble_operation_step3.png)

**Bước 4**

![Bước 4 của phép nổi bọt](bubble_sort.assets/bubble_operation_step4.png)

**Bước 5**

![Bước 5 của phép nổi bọt](bubble_sort.assets/bubble_operation_step5.png)

**Bước 6**

![Bước 6 của phép nổi bọt](bubble_sort.assets/bubble_operation_step6.png)

**Bước 7**

![Bước 7 của phép nổi bọt](bubble_sort.assets/bubble_operation_step7.png)

## Quy trình thuật toán

Giả sử mảng có độ dài $n$.

1. Thực hiện một lượt “nổi bọt” trên $n$ phần tử để đưa phần tử lớn nhất về đúng vị trí.
2. Tiếp theo, thực hiện trên $n - 1$ phần tử còn lại để đưa phần tử lớn thứ hai về đúng vị trí.
3. Lặp lại. Sau $n - 1$ lượt, $n - 1$ phần tử lớn nhất đều đã được cố định.
4. Phần tử còn lại chắc chắn là nhỏ nhất nên mảng đã được sắp xếp hoàn toàn.

![Toàn bộ quy trình sắp xếp nổi bọt](bubble_sort.assets/bubble_sort_overview.png)

Mã triển khai cơ bản:

```python
# Mã sắp xếp nổi bọt chính thức được chèn từ nguồn đã khóa.
```

## Tối ưu hiệu quả

Nếu một lượt đi qua mảng không tạo ra bất kỳ phép đổi chỗ nào thì mảng đã có thứ tự và thuật toán có thể kết thúc ngay. Có thể dùng cờ `flag` để ghi nhận việc này.

Sau tối ưu, độ phức tạp trung bình và xấu nhất vẫn là $O(n^2)$; nhưng khi đầu vào đã có thứ tự, trường hợp tốt nhất giảm còn $O(n)$.

```python
# Mã sắp xếp nổi bọt có cờ dừng sớm được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

- **Độ phức tạp thời gian $O(n^2)$, có tính thích nghi**: các lượt lần lượt duyệt $n - 1$, $n - 2$, $\dots$, $2$ và $1$ cặp, tổng cộng $(n - 1) n / 2$. Nhờ cờ dừng sớm, trường hợp tốt nhất đạt $O(n)$.
- **Độ phức tạp không gian $O(1)$, sắp xếp tại chỗ**: hai con trỏ $i$ và $j$ dùng bộ nhớ cố định.
- **Ổn định**: hai phần tử bằng nhau không bị đổi chỗ nên thứ tự tương đối của chúng được giữ nguyên.
