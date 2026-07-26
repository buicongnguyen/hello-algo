# Chiến lược tìm kiếm chia để trị

Chúng ta đã biết thuật toán tìm kiếm được chia thành hai nhóm lớn.

- **Tìm kiếm vét cạn**: Duyệt qua cấu trúc dữ liệu, có độ phức tạp thời gian $O(n)$.
- **Tìm kiếm thích nghi**: Tận dụng cách tổ chức dữ liệu hoặc thông tin biết trước, nhờ đó độ phức tạp thời gian có thể đạt $O(\log n)$, thậm chí $O(1)$.

Thực tế, **các thuật toán tìm kiếm có độ phức tạp thời gian $O(\log n)$ thường được triển khai dựa trên chiến lược chia để trị**, chẳng hạn tìm kiếm nhị phân và cây.

- Mỗi bước tìm kiếm nhị phân chia bài toán “tìm phần tử đích trong mảng” thành một bài toán nhỏ hơn là “tìm phần tử đích trong một nửa mảng”, tiếp tục cho đến khi mảng rỗng hoặc tìm thấy phần tử đích.
- Cây là đại diện tiêu biểu của tư tưởng chia để trị. Trong cây tìm kiếm nhị phân, cây AVL, heap và các cấu trúc tương tự, độ phức tạp thời gian của nhiều thao tác là $O(\log n)$.

Chiến lược chia để trị của tìm kiếm nhị phân được phân tích như sau.

- **Bài toán có thể phân rã**: Tìm kiếm nhị phân đệ quy phân rã bài toán gốc (tìm trong một mảng) thành bài toán con (tìm trong một nửa mảng) bằng cách so sánh phần tử giữa với phần tử đích.
- **Các bài toán con độc lập**: Mỗi vòng chỉ xử lý một bài toán con và bài toán này không bị ảnh hưởng bởi các bài toán con còn lại.
- **Không cần hợp nhất lời giải bài toán con**: Mục tiêu là tìm một phần tử cụ thể, nên không cần hợp nhất các lời giải con. Khi một bài toán con được giải, bài toán ban đầu cũng đã được giải.

Chia để trị nâng cao hiệu quả tìm kiếm vì tìm kiếm vét cạn chỉ loại được một lựa chọn ở mỗi vòng, **trong khi tìm kiếm chia để trị có thể loại một nửa số lựa chọn ở mỗi vòng**.

### Triển khai tìm kiếm nhị phân bằng chia để trị

Ở phần trước, tìm kiếm nhị phân được triển khai bằng vòng lặp. Bây giờ chúng ta triển khai nó bằng chia để trị, tức đệ quy.

!!! question

    Cho mảng đã sắp xếp `nums` có độ dài $n$, trong đó mọi phần tử đều khác nhau, hãy tìm `target`.

Từ góc nhìn chia để trị, ký hiệu bài toán con ứng với khoảng tìm kiếm $[i, j]$ là $f(i, j)$.

Bắt đầu từ bài toán ban đầu $f(0, n-1)$, thực hiện tìm kiếm nhị phân theo các bước sau.

1. Tính điểm giữa $m$ của khoảng tìm kiếm $[i, j]$ và dùng nó để loại bỏ một nửa khoảng tìm kiếm.
2. Giải đệ quy bài toán con đã giảm một nửa kích thước, có thể là $f(i, m-1)$ hoặc $f(m+1, j)$.
3. Lặp các bước `1.` và `2.` cho đến khi tìm thấy `target`, hoặc trả về khi khoảng tìm kiếm rỗng.

Hình dưới minh họa quá trình chia để trị khi tìm phần tử $6$ trong một mảng.

![Quá trình chia để trị của tìm kiếm nhị phân](binary_search_recur.assets/binary_search_recur.png)

Trong mã triển khai, chúng ta khai báo hàm đệ quy `dfs()` để giải bài toán $f(i, j)$:

```python
# Mã tìm kiếm nhị phân đệ quy chính thức được chèn từ nguồn đã khóa.
```
