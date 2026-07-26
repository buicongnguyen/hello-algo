# Sắp xếp vun đống

!!! tip

    Trước khi đọc phần này, nên hoàn thành chương “Heap” để nắm cấu trúc heap, thao tác xây heap và sift-down.

<u>Sắp xếp vun đống</u> là thuật toán hiệu quả dựa trên heap. Một cách trực tiếp là xây min-heap, liên tục lấy phần tử nhỏ nhất ở đỉnh rồi ghi vào mảng kết quả. Cách đó đúng nhưng cần thêm mảng phụ.

Phiên bản tại chỗ dùng max-heap: phần tử lớn nhất ở đỉnh được đổi với phần tử cuối của vùng heap, nhờ vậy chính mảng đầu vào dần trở thành kết quả tăng dần.

## Quy trình thuật toán

Giả sử mảng dài $n$.

1. Xây max-heap từ mảng; phần tử lớn nhất nằm ở đỉnh.
2. Đổi phần tử đỉnh với phần tử đáy, giảm độ dài heap đi $1$ và tăng số phần tử đã sắp xếp thêm $1$.
3. Từ đỉnh, thực hiện sift-down để khôi phục tính chất max-heap.
4. Lặp bước 2 và 3. Sau $n - 1$ lượt, mảng được sắp xếp.

!!! tip

    Thao tác lấy phần tử khỏi heap cũng gồm phép đổi đỉnh với đáy và sift-down, chỉ khác là nó còn loại bỏ phần tử vừa đưa ra ngoài vùng heap.

**Bước 1**

![Bước 1 của heap sort](heap_sort.assets/heap_sort_step1.png)

**Bước 2**

![Bước 2 của heap sort](heap_sort.assets/heap_sort_step2.png)

**Bước 3**

![Bước 3 của heap sort](heap_sort.assets/heap_sort_step3.png)

**Bước 4**

![Bước 4 của heap sort](heap_sort.assets/heap_sort_step4.png)

**Bước 5**

![Bước 5 của heap sort](heap_sort.assets/heap_sort_step5.png)

**Bước 6**

![Bước 6 của heap sort](heap_sort.assets/heap_sort_step6.png)

**Bước 7**

![Bước 7 của heap sort](heap_sort.assets/heap_sort_step7.png)

**Bước 8**

![Bước 8 của heap sort](heap_sort.assets/heap_sort_step8.png)

**Bước 9**

![Bước 9 của heap sort](heap_sort.assets/heap_sort_step9.png)

**Bước 10**

![Bước 10 của heap sort](heap_sort.assets/heap_sort_step10.png)

**Bước 11**

![Bước 11 của heap sort](heap_sort.assets/heap_sort_step11.png)

**Bước 12**

![Bước 12 của heap sort](heap_sort.assets/heap_sort_step12.png)

Hàm `sift_down()` giống hàm đã dùng trong chương Heap, nhưng cần nhận thêm tham số độ dài hiệu lực $n$ vì vùng heap thu hẹp sau mỗi lượt.

```python
# Mã heap sort chính thức được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

- **Thời gian $O(n \log n)$, không thích nghi**: xây heap tốn $O(n)$; mỗi lần lấy phần tử lớn nhất và sift-down tốn $O(\log n)$, lặp tổng cộng $n - 1$ lượt.
- **Không gian $O(1)$, tại chỗ**: một số biến chỉ số dùng $O(1)$ bộ nhớ; đổi chỗ và vun đống đều thực hiện trên mảng gốc.
- **Không ổn định**: đổi phần tử đỉnh với phần tử đáy có thể thay đổi thứ tự tương đối của các khóa bằng nhau.
