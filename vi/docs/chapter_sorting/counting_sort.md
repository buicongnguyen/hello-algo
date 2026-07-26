# Sắp xếp đếm

<u>Sắp xếp đếm</u> tạo thứ tự bằng cách đếm số lần xuất hiện của từng giá trị và thường được áp dụng cho mảng số nguyên.

## Triển khai đơn giản

Cho mảng `nums` dài $n$, mọi phần tử là số nguyên không âm.

1. Duyệt mảng để tìm giá trị lớn nhất $m$, rồi tạo mảng phụ `counter` dài $m + 1$.
2. Dùng `counter` để đếm tần suất: `counter[num]` lưu số lần `num` xuất hiện. Mỗi khi gặp `num`, tăng ô tương ứng thêm $1$.
3. Chỉ số của `counter` vốn đã tăng dần. Duyệt mảng đếm và ghi mỗi chỉ số trở lại `nums` theo đúng số lần xuất hiện; kết quả tự nhiên có thứ tự.

![Quy trình sắp xếp đếm đơn giản](counting_sort.assets/counting_sort_overview.png)

```python
# Mã sắp xếp đếm đơn giản chính thức được chèn từ nguồn đã khóa.
```

!!! note "Quan hệ giữa sắp xếp đếm và sắp xếp theo thùng"

    Có thể xem mỗi chỉ số của `counter` là một thùng dành riêng cho một giá trị nguyên. Quá trình đếm tương đương với phân phối phần tử vào thùng. Vì vậy counting sort là trường hợp đặc biệt của bucket sort.

## Triển khai hoàn chỉnh

Nếu phần tử đầu vào là đối tượng, cách ghi lại chỉ số ở bước 3 chỉ sắp được khóa chứ không tạo ra thứ tự của các đối tượng gốc. Ví dụ, khi sắp sản phẩm theo giá, cần giữ cả bản ghi sản phẩm chứ không chỉ dãy giá.

Để giải quyết, trước hết tính tổng tiền tố của `counter`. Tổng tiền tố tại chỉ số `i` là tổng các bộ đếm từ `0` đến `i`:

$$
\text{prefix}[i] = \sum_{j=0}^i \text{counter}[j]
$$

Giá trị `prefix[num] - 1` chính là chỉ số của lần xuất hiện cuối cùng của `num` trong mảng kết quả `res`. Nhờ thông tin vị trí này, duyệt `nums` từ phải sang trái và với mỗi `num`:

1. Đặt `num` vào `res[prefix[num] - 1]`.
2. Giảm `prefix[num]` đi $1$ để lần xuất hiện tiếp theo của cùng giá trị được đặt vào ô ngay trước đó.

Sau khi duyệt xong, `res` chứa kết quả đã sắp xếp; cuối cùng sao chép nó trở lại `nums`.

**Bước 1**

![Bước 1 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step1.png)

**Bước 2**

![Bước 2 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step2.png)

**Bước 3**

![Bước 3 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step3.png)

**Bước 4**

![Bước 4 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step4.png)

**Bước 5**

![Bước 5 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step5.png)

**Bước 6**

![Bước 6 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step6.png)

**Bước 7**

![Bước 7 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step7.png)

**Bước 8**

![Bước 8 của counting sort hoàn chỉnh](counting_sort.assets/counting_sort_step8.png)

```python
# Mã sắp xếp đếm ổn định chính thức được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

- **Thời gian $O(n + m)$, không thích nghi**: duyệt `nums` và `counter` đều tuyến tính. Khi $n \gg m$, chi phí tiến gần $O(n)$.
- **Không gian $O(n + m)$, không tại chỗ**: cần `res` dài $n$ và `counter` có kích thước tỷ lệ với $m$.
- **Ổn định**: đi qua `nums` từ phải sang trái khiến các phần tử bằng nhau đi vào `res` theo thứ tự tương đối ban đầu. Duyệt theo chiều thuận vẫn cho giá trị đã sắp nhưng có thể làm mất tính ổn định.

## Giới hạn

**Counting sort chỉ áp dụng trực tiếp cho số nguyên không âm.** Với dữ liệu khác, phải có phép ánh xạ sang số nguyên không âm mà không thay đổi thứ tự. Chẳng hạn, có thể cộng cùng một hằng vào mọi số âm trước khi sắp rồi trừ lại sau đó.

Thuật toán phù hợp khi số phần tử lớn nhưng miền giá trị nhỏ. Nếu $m$ quá lớn, mảng đếm tiêu thụ nhiều bộ nhớ; khi $n \ll m$, riêng việc duyệt `counter` đã tốn $O(m)$ và có thể chậm hơn thuật toán $O(n \log n)$.
