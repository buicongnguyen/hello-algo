# Bài toán Top-k

!!! question

    Cho một mảng không có thứ tự `nums` dài $n$, hãy trả về $k$ phần tử lớn nhất trong mảng.

Trước tiên hãy xem xét hai lời giải trực tiếp, sau đó dùng heap để đạt hiệu suất tốt hơn.

## Phương pháp 1: chọn lặp

Chúng ta có thể thực hiện $k$ lượt duyệt. Ở từng lượt, lần lượt tìm phần tử lớn thứ $1^{st}$, $2^{nd}$, $\dots$, đến $k^{th}$. Tổng độ phức tạp thời gian là $O(nk)$.

Cách này chỉ phù hợp khi $k \ll n$. Khi $k$ tiến gần $n$, độ phức tạp tiến đến $O(n^2)$ nên rất kém hiệu quả, đồng thời nhiều phần tử bị so sánh lặp lại qua các lượt.

![Duyệt để tìm k phần tử lớn nhất](top_k.assets/top_k_traversal.png)

!!! tip

    Khi $k = n$, kết quả là toàn bộ dãy đã sắp xếp; quá trình này tương đương thuật toán sắp xếp chọn.

## Phương pháp 2: sắp xếp

Chúng ta có thể sắp xếp mảng `nums`, sau đó trả về $k$ phần tử ngoài cùng bên phải. Độ phức tạp thời gian của cách này là $O(n \log n)$.

Phương pháp này làm nhiều việc hơn mức cần thiết, vì bài toán chỉ yêu cầu $k$ phần tử lớn nhất chứ không cần xác định thứ tự chính xác của mọi phần tử còn lại.

![Sắp xếp để tìm k phần tử lớn nhất](top_k.assets/top_k_sorting.png)

## Phương pháp 3: dùng heap

Chúng ta có thể giải bài toán Top-k hiệu quả hơn bằng một heap cực tiểu.

1. Khởi tạo một heap cực tiểu, trong đó phần tử đỉnh là nhỏ nhất.
2. Lần lượt chèn $k$ phần tử đầu tiên của mảng vào heap.
3. Bắt đầu từ phần tử thứ $(k + 1)^{th}$, nếu phần tử hiện tại lớn hơn đỉnh heap thì xóa đỉnh và chèn phần tử hiện tại.
4. Sau khi duyệt xong, heap chứa đúng $k$ phần tử lớn nhất.

Ý tưởng cốt lõi là đỉnh heap luôn là phần tử nhỏ nhất trong nhóm đang được giữ lại. Mọi phần tử mới không lớn hơn đỉnh chắc chắn không thể thuộc nhóm Top-k, nên có thể bỏ qua ngay.

**Bước 1**

![Tìm k phần tử lớn nhất bằng heap, bước 1](top_k.assets/top_k_heap_step1.png)

**Bước 2**

![Tìm k phần tử lớn nhất bằng heap, bước 2](top_k.assets/top_k_heap_step2.png)

**Bước 3**

![Tìm k phần tử lớn nhất bằng heap, bước 3](top_k.assets/top_k_heap_step3.png)

**Bước 4**

![Tìm k phần tử lớn nhất bằng heap, bước 4](top_k.assets/top_k_heap_step4.png)

**Bước 5**

![Tìm k phần tử lớn nhất bằng heap, bước 5](top_k.assets/top_k_heap_step5.png)

**Bước 6**

![Tìm k phần tử lớn nhất bằng heap, bước 6](top_k.assets/top_k_heap_step6.png)

**Bước 7**

![Tìm k phần tử lớn nhất bằng heap, bước 7](top_k.assets/top_k_heap_step7.png)

**Bước 8**

![Tìm k phần tử lớn nhất bằng heap, bước 8](top_k.assets/top_k_heap_step8.png)

**Bước 9**

![Tìm k phần tử lớn nhất bằng heap, bước 9](top_k.assets/top_k_heap_step9.png)

Mã chính thức đa ngôn ngữ như sau.

```python
# Mã giải bài toán Top-k chính thức được chèn từ nguồn đã khóa.
```

Tổng cộng có $n$ lượt xem xét và kích thước tối đa của heap là $k$, nên độ phức tạp thời gian là $O(n \log k)$. Khi $k$ nhỏ, độ phức tạp tiến gần $O(n)$; khi $k$ lớn, độ phức tạp vẫn không vượt quá $O(n \log n)$.

Phương pháp này cũng đặc biệt phù hợp với luồng dữ liệu động. Khi dữ liệu mới liên tục đến, chỉ cần cập nhật các phần tử trong heap thay vì sắp xếp lại toàn bộ lịch sử, nhờ đó luôn duy trì được $k$ phần tử lớn nhất tại thời điểm hiện tại.
