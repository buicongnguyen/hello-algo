# Sắp xếp trộn

<u>Sắp xếp trộn</u> dựa trên chia để trị và gồm hai giai đoạn đối xứng:

1. **Chia**: đệ quy tách mảng tại điểm giữa, biến bài toán sắp một mảng dài thành các bài toán sắp mảng ngắn.
2. **Trộn**: khi đoạn con chỉ còn một phần tử thì dừng chia; từ dưới lên, liên tục hợp nhất hai đoạn con đã có thứ tự thành một đoạn dài hơn.

![Hai giai đoạn chia và trộn](merge_sort.assets/merge_sort_overview.png)

## Quy trình thuật toán

Trong giai đoạn chia, tính `mid`, xử lý đệ quy đoạn trái `[left, mid]` và đoạn phải `[mid + 1, right]`, rồi lặp đến khi độ dài đoạn bằng một.

Trong giai đoạn trộn, dùng hai con trỏ ở đầu hai đoạn đã sắp xếp. Mỗi lần chọn phần tử nhỏ hơn để ghi vào mảng tạm; khi một phía hết, chép phần còn lại của phía kia. Cuối cùng ghi kết quả trở lại mảng gốc.

**Bước 1**

![Bước 1 của sắp xếp trộn](merge_sort.assets/merge_sort_step1.png)

**Bước 2**

![Bước 2 của sắp xếp trộn](merge_sort.assets/merge_sort_step2.png)

**Bước 3**

![Bước 3 của sắp xếp trộn](merge_sort.assets/merge_sort_step3.png)

**Bước 4**

![Bước 4 của sắp xếp trộn](merge_sort.assets/merge_sort_step4.png)

**Bước 5**

![Bước 5 của sắp xếp trộn](merge_sort.assets/merge_sort_step5.png)

**Bước 6**

![Bước 6 của sắp xếp trộn](merge_sort.assets/merge_sort_step6.png)

**Bước 7**

![Bước 7 của sắp xếp trộn](merge_sort.assets/merge_sort_step7.png)

**Bước 8**

![Bước 8 của sắp xếp trộn](merge_sort.assets/merge_sort_step8.png)

**Bước 9**

![Bước 9 của sắp xếp trộn](merge_sort.assets/merge_sort_step9.png)

**Bước 10**

![Bước 10 của sắp xếp trộn](merge_sort.assets/merge_sort_step10.png)

Thứ tự đệ quy của merge sort tương ứng với phép duyệt hậu tự trên cây nhị phân: xử lý nhánh trái, xử lý nhánh phải, rồi mới xử lý nút gốc. Ở đây hai nhánh là hai nửa mảng và “xử lý gốc” chính là phép trộn.

Trong triển khai dưới đây, đoạn của `nums` cần trộn là `[left, right]`, còn đoạn tương ứng trong mảng tạm `tmp` bắt đầu tại chỉ số `0`.

```python
# Mã sắp xếp trộn chính thức được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

- **Thời gian $O(n \log n)$, không thích nghi**: giai đoạn chia tạo cây đệ quy cao $\log n$; tổng số phần tử được xử lý ở mỗi tầng là $n$, nên tổng thời gian là $O(n \log n)$.
- **Không gian $O(n)$, không tại chỗ**: ngăn xếp đệ quy sâu $\log n$ dùng $O(\log n)$ bộ nhớ, còn phép trộn cần mảng phụ dài theo đầu vào và dùng $O(n)$.
- **Ổn định**: khi hai phần tử bằng nhau, chọn phần tử ở đoạn trái trước sẽ giữ nguyên thứ tự tương đối ban đầu.

## Sắp xếp danh sách liên kết

Merge sort đặc biệt phù hợp với danh sách liên kết và có thể giảm không gian phụ của thao tác sắp xếp xuống $O(1)$.

- **Giai đoạn chia** có thể dùng lặp thay cho đệ quy, loại bỏ chi phí khung ngăn xếp.
- **Giai đoạn trộn** chỉ cập nhật con trỏ giữa các nút; không cần tạo một danh sách mới để chứa kết quả.

Triển khai tối ưu cho danh sách liên kết phức tạp hơn bản mảng, nhưng nguyên lý chia thành các đoạn ngắn rồi trộn theo thứ tự không thay đổi.
