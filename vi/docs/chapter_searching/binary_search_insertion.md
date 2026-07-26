# Điểm chèn bằng tìm kiếm nhị phân

Tìm kiếm nhị phân không chỉ dùng để tìm phần tử mục tiêu mà còn giải được nhiều bài toán biến thể, chẳng hạn xác định vị trí chèn một giá trị sao cho mảng vẫn có thứ tự.

## Trường hợp không có phần tử trùng

!!! question

    Cho mảng tăng dần `nums` có độ dài $n$ và phần tử `target`; mảng không chứa giá trị trùng. Hãy chèn `target` vào `nums` mà vẫn giữ thứ tự. Nếu `target` đã có trong mảng, chèn giá trị mới về bên trái nó. Trả về chỉ số của `target` sau khi chèn.

![Dữ liệu ví dụ cho điểm chèn](binary_search_insertion.assets/binary_search_insertion_example.png)

Để tái sử dụng thuật toán tìm kiếm nhị phân của phần trước, cần trả lời hai câu hỏi.

**Câu hỏi 1: Khi mảng chứa `target`, chỉ số điểm chèn có bằng chỉ số của phần tử đó không?**

Đề bài yêu cầu chèn về bên trái phần tử bằng mục tiêu. Giá trị mới sẽ chiếm vị trí của `target` cũ, còn phần tử cũ và các phần tử phía sau dịch sang phải. Vì vậy khi mảng đã chứa mục tiêu, điểm chèn chính là chỉ số của lần xuất hiện đó.

**Câu hỏi 2: Khi mảng không chứa `target`, điểm chèn nằm ở đâu?**

Trong quá trình tìm kiếm, khi `nums[m] < target`, con trỏ $i$ dịch sang phải; chính $i$ ngày càng tiến gần phần tử đầu tiên lớn hơn hoặc bằng mục tiêu. Tương tự, con trỏ $j$ luôn tiến gần phần tử cuối nhỏ hơn hoặc bằng mục tiêu.

Khi vòng lặp kết thúc, $i$ trỏ đến phần tử đầu tiên lớn hơn `target`, còn $j$ trỏ đến phần tử đầu tiên nhỏ hơn `target`. Do đó, **nếu mảng không chứa mục tiêu thì chỉ số điểm chèn là $i$**.

```python
# Mã điểm chèn không có phần tử trùng được chèn từ nguồn đã khóa.
```

Kết luận này cũng xử lý đúng hai biên. Nếu mục tiêu nhỏ hơn mọi phần tử, con trỏ trái dừng ở đầu mảng; nếu lớn hơn mọi phần tử, con trỏ trái dừng ngay sau phần tử cuối, tức vị trí nối thêm.

## Trường hợp có phần tử trùng

!!! question

    Tiếp tục bài toán trước nhưng cho phép mảng chứa các phần tử trùng nhau. Những yêu cầu khác không thay đổi.

Giả sử mảng có nhiều phần tử bằng `target`. Tìm kiếm nhị phân thông thường chỉ trả về một chỉ số bất kỳ, **không cho biết còn bao nhiêu phần tử bằng mục tiêu ở bên trái và bên phải**.

Đề bài yêu cầu chèn tại vị trí ngoài cùng bên trái, vì vậy cần tìm chỉ số của `target` ngoài cùng bên trái. Một cách trực tiếp gồm hai bước:

1. Tìm nhị phân để lấy chỉ số của một `target`, ký hiệu $k$.
2. Từ chỉ số $k$, duyệt tuyến tính sang trái cho đến lần xuất hiện đầu tiên rồi trả về vị trí đó.

![Tìm tuyến tính điểm chèn khi có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_naive.png)

Cách này đúng nhưng chứa một đoạn duyệt tuyến tính nên độ phức tạp thời gian là $O(n)$. Khi mảng có rất nhiều phần tử bằng mục tiêu, lợi thế của tìm kiếm nhị phân bị mất.

Có thể mở rộng trực tiếp thuật toán nhị phân. Mỗi vòng vẫn tính chỉ số giữa $m$ rồi so sánh với mục tiêu:

- Nếu `nums[m] < target` hoặc `nums[m] > target`, chưa tìm được đáp án nên thu hẹp khoảng như bình thường, đưa $i$ và $j$ tiến gần `target`.
- Nếu `nums[m] == target`, các phần tử nhỏ hơn mục tiêu chỉ có thể nằm trong khoảng $[i, m - 1]$. Gán $j = m - 1$ để tiếp tục tìm về bên trái, tức đưa $j$ tiến gần phần tử nhỏ hơn mục tiêu.

Sau khi vòng lặp kết thúc, $i$ trỏ đến `target` ngoài cùng bên trái, còn $j$ trỏ đến phần tử đầu tiên nhỏ hơn `target`. Vì vậy chỉ số $i$ là điểm chèn.

**Bước 1**

![Bước 1 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step1.png)

**Bước 2**

![Bước 2 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step2.png)

**Bước 3**

![Bước 3 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step3.png)

**Bước 4**

![Bước 4 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step4.png)

**Bước 5**

![Bước 5 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step5.png)

**Bước 6**

![Bước 6 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step6.png)

**Bước 7**

![Bước 7 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step7.png)

**Bước 8**

![Bước 8 tìm điểm chèn có phần tử trùng](binary_search_insertion.assets/binary_search_insertion_step8.png)

Trong mã dưới đây, hai nhánh `nums[m] > target` và `nums[m] == target` thực hiện cùng phép cập nhật nên có thể gộp lại. Tuy vậy, giữ các nhánh tách biệt giúp mục tiêu của từng trường hợp rõ ràng hơn.

```python
# Mã điểm chèn có phần tử trùng được chèn từ nguồn đã khóa.
```

!!! tip

    Mã trong phần này dùng khoảng đóng. Bạn đọc có thể tự triển khai phiên bản khoảng đóng trái, mở phải và kiểm tra lại điều kiện lặp cùng các phép cập nhật biên.

Nhìn tổng quát, tìm kiếm nhị phân là quá trình đặt mục tiêu riêng cho hai con trỏ $i$ và $j$. Mục tiêu có thể là một phần tử cụ thể hoặc một miền giá trị, chẳng hạn các phần tử nhỏ hơn `target`.

Sau mỗi vòng, $i$ và $j$ tiến dần đến các mục tiêu đã định. Cuối cùng chúng tìm thấy đáp án hoặc vượt qua nhau ở đúng ranh giới cần trả về. Hiểu theo bất biến biên như vậy giúp áp dụng tìm kiếm nhị phân cho điểm chèn, biên trái, biên phải và nhiều bài toán đơn điệu khác.
