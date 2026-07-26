# Chiến lược tối ưu bằng bảng băm

Trong bài toán thuật toán, **một chiến lược thường gặp để giảm độ phức tạp thời gian là thay tìm kiếm tuyến tính bằng tra cứu bảng băm**. Bài toán tổng hai số minh họa rõ sự đánh đổi giữa thời gian và không gian.

!!! question

    Cho mảng số nguyên `nums` và giá trị đích `target`. Hãy tìm hai phần tử trong mảng có tổng bằng `target` rồi trả về chỉ số của chúng. Chỉ cần trả về một nghiệm bất kỳ.

## Tìm tuyến tính: tiết kiệm không gian, tốn thời gian

Cách trực tiếp là duyệt mọi cặp chỉ số. Hai vòng lặp lồng nhau kiểm tra tổng của từng cặp; khi tổng bằng `target`, thuật toán trả về ngay hai chỉ số.

![Giải bài toán tổng hai số bằng tìm tuyến tính](replace_linear_by_hashing.assets/two_sum_brute_force.png)

```python
# Mã vét cạn bài toán tổng hai số được chèn từ nguồn đã khóa.
```

Phương pháp này có độ phức tạp thời gian $O(n^2)$ vì số cặp tăng theo bình phương số phần tử, còn độ phức tạp không gian là $O(1)$ vì chỉ dùng một vài biến. Với đầu vào lớn, việc lặp lại phép tìm phần bù trong phần còn lại của mảng làm thời gian chạy tăng nhanh.

## Tra cứu băm: dùng không gian để đổi lấy thời gian

Thay vì tìm lại nhiều lần, duy trì một bảng băm có khóa là giá trị đã gặp và giá trị đi kèm là chỉ số của nó. Khi duyệt đến `nums[i]`, thực hiện:

1. Kiểm tra `target - nums[i]` đã có trong bảng băm hay chưa. Nếu có, trả về chỉ số đã lưu và `i`.
2. Nếu chưa tìm thấy, thêm cặp khóa–giá trị `nums[i]` và chỉ số `i` vào bảng.

Kiểm tra phần bù trước khi thêm phần tử hiện tại giúp tránh dùng cùng một chỉ số hai lần.

**Bước 1**

![Bước 1 giải tổng hai số bằng bảng băm](replace_linear_by_hashing.assets/two_sum_hashtable_step1.png)

**Bước 2**

![Bước 2 giải tổng hai số bằng bảng băm](replace_linear_by_hashing.assets/two_sum_hashtable_step2.png)

**Bước 3**

![Bước 3 giải tổng hai số bằng bảng băm](replace_linear_by_hashing.assets/two_sum_hashtable_step3.png)

Phiên bản này chỉ cần một vòng lặp:

```python
# Mã bảng băm bài toán tổng hai số được chèn từ nguồn đã khóa.
```

Tra cứu băm giảm độ phức tạp thời gian từ $O(n^2)$ xuống trung bình $O(n)$, cải thiện đáng kể hiệu quả trên dữ liệu lớn.

Đổi lại, bảng phải lưu tối đa một mục cho mỗi phần tử đã duyệt nên độ phức tạp không gian là $O(n)$. **Đây là sự cân bằng thời gian–không gian hợp lý và là lời giải tối ưu thông dụng cho bài toán này**. Kết luận về thời gian dựa trên giả định hàm băm phân bố khóa tốt và xử lý xung đột hiệu quả.
