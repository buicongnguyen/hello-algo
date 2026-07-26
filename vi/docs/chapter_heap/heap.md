# Heap

<u>Heap</u> là một cây nhị phân hoàn chỉnh thỏa mãn một điều kiện thứ tự nhất định. Heap chủ yếu được chia thành hai loại như hình dưới đây.

- <u>Heap cực tiểu</u>: giá trị của mọi nút $\leq$ giá trị của các nút con.
- <u>Heap cực đại</u>: giá trị của mọi nút $\geq$ giá trị của các nút con.

![Heap cực tiểu và heap cực đại](heap.assets/min_heap_and_max_heap.png)

Vì là một trường hợp đặc biệt của cây nhị phân hoàn chỉnh, heap có các đặc điểm sau.

- Các nút ở tầng cuối được điền từ trái sang phải, còn mọi tầng phía trên đều được điền đầy.
- Nút gốc được gọi là “đỉnh heap”, còn nút dưới cùng bên phải được gọi là “đáy heap”.
- Trong heap cực đại (cực tiểu), phần tử ở đỉnh heap là phần tử lớn nhất (nhỏ nhất).

Tính chất heap chỉ ràng buộc quan hệ giữa cha và con, không yêu cầu toàn bộ cây được sắp xếp. Hai nút anh em có thể xuất hiện theo bất kỳ thứ tự nào. Chính ràng buộc cục bộ vừa đủ này giúp heap luôn đưa phần tử ưu tiên cao nhất lên gốc mà không phải trả chi phí sắp xếp toàn bộ dữ liệu sau mỗi lần cập nhật.

## Các thao tác heap thường dùng

Nhiều ngôn ngữ lập trình cung cấp <u>hàng đợi ưu tiên</u>, một cấu trúc dữ liệu trừu tượng trong đó phần tử được lấy ra theo độ ưu tiên thay vì chỉ theo thời điểm được thêm vào.

**Heap thường được dùng để cài đặt hàng đợi ưu tiên; heap cực đại tương ứng với hàng đợi ưu tiên lấy phần tử theo thứ tự giảm dần.** Xét từ góc độ sử dụng, có thể xem hàng đợi ưu tiên và heap là hai giao diện cho cùng một cấu trúc. Vì vậy cuốn sách này không tách riêng hai tên gọi và dùng thống nhất từ “heap”.

Bảng dưới đây liệt kê các thao tác thông dụng. Tên phương thức cụ thể phụ thuộc vào ngôn ngữ lập trình.

| Tên phương thức | Mô tả | Độ phức tạp thời gian |
| --- | --- | --- |
| `push()` | Chèn một phần tử vào heap | $O(\log n)$ |
| `pop()` | Xóa phần tử ở đỉnh heap | $O(\log n)$ |
| `peek()` | Truy cập phần tử đỉnh (lớn nhất/nhỏ nhất trong heap cực đại/cực tiểu) | $O(1)$ |
| `size()` | Lấy số phần tử trong heap | $O(1)$ |
| `isEmpty()` | Kiểm tra heap có rỗng hay không | $O(1)$ |

Trong ứng dụng thực tế, có thể dùng trực tiếp lớp heap hoặc lớp hàng đợi ưu tiên do ngôn ngữ cung cấp.

Tương tự thứ tự tăng và giảm trong thuật toán sắp xếp, có thể chuyển giữa heap cực tiểu và heap cực đại bằng một `flag` hoặc bằng cách đổi `Comparator`. Ví dụ chính thức đa ngôn ngữ dưới đây minh họa các thao tác khởi tạo, chèn, đọc đỉnh, lấy đỉnh và dựng heap.

```python
# Mã sử dụng heap chính thức được chèn từ nguồn đã khóa.
```

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ heap cực đại trong Python Tutor](https://pythontutor.com/render.html#code=import%20heapq%0Aheap%20%3D%20%5B%5D%0Afor%20value%20in%20%5B1%2C3%2C2%2C5%2C4%5D%3A%0A%20%20%20%20heapq.heappush%28heap%2C%20-value%29%0Atop%20%3D%20-heap%5B0%5D%0Aremoved%20%3D%20-heapq.heappop%28heap%29&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

## Cài đặt heap

Phần cài đặt sau dùng heap cực đại. Để chuyển thành heap cực tiểu, chỉ cần đảo mọi phép so sánh liên quan đến thứ tự, chẳng hạn thay $\geq$ bằng $\leq$. Bạn đọc nên thử tự thực hiện biến thể này để kiểm tra mình đã hiểu quy tắc heap.

### Lưu trữ và biểu diễn heap

Như đã trình bày trong chương “Cây nhị phân”, cây nhị phân hoàn chỉnh rất phù hợp với cách biểu diễn bằng mảng. Heap là cây nhị phân hoàn chỉnh, do đó **mảng được dùng để lưu heap**.

Khi biểu diễn cây bằng mảng, phần tử mảng chứa giá trị nút và chỉ số mảng biểu thị vị trí của nút trong cây. **Quan hệ cha–con được thể hiện bằng công thức ánh xạ chỉ số**, nên không cần lưu riêng các con trỏ trái và phải.

Với một nút có chỉ số $i$, con trái nằm ở $2i + 1$, con phải nằm ở $2i + 2$, còn nút cha nằm ở $(i - 1) / 2$ với phép chia lấy phần nguyên. Chỉ số vượt khỏi phạm vi mảng cho biết nút tương ứng không tồn tại.

![Biểu diễn và lưu trữ heap](heap.assets/representation_of_heap.png)

Chúng ta đóng gói các công thức ánh xạ chỉ số thành hàm để những thao tác phía sau dùng lại một cách rõ ràng.

```python
# Mã ánh xạ chỉ số cha và con chính thức được chèn từ nguồn đã khóa.
```

### Truy cập phần tử đỉnh heap

Đỉnh heap là nút gốc của cây nhị phân, đồng thời là phần tử đầu tiên của danh sách. Vì vậy thao tác đọc đỉnh chỉ cần truy cập chỉ số đầu tiên và không làm thay đổi cấu trúc heap.

```python
# Mã truy cập phần tử đỉnh chính thức được chèn từ nguồn đã khóa.
```

### Chèn một phần tử vào heap

Với phần tử `val`, trước tiên hãy thêm nó vào cuối heap, tức vị trí trống tiếp theo của cây nhị phân hoàn chỉnh. Sau khi chèn, `val` có thể lớn hơn nút cha nên tính chất heap bị phá vỡ. **Tính chất heap phải được khôi phục dọc theo đường từ nút mới lên nút gốc.** Thao tác này gọi là <u>heapify</u>.

Bắt đầu từ nút vừa chèn, hãy **heapify từ dưới lên**: so sánh nút mới với nút cha; nếu nút mới lớn hơn thì đổi chỗ hai nút. Tiếp tục đi lên cho đến khi vượt qua gốc hoặc gặp một nút không còn cần đổi chỗ. Mỗi bước dưới đây thể hiện một trạng thái liên tiếp.

**Bước 1**

![Bước chèn phần tử vào heap 1](heap.assets/heap_push_step1.png)

**Bước 2**

![Bước chèn phần tử vào heap 2](heap.assets/heap_push_step2.png)

**Bước 3**

![Bước chèn phần tử vào heap 3](heap.assets/heap_push_step3.png)

**Bước 4**

![Bước chèn phần tử vào heap 4](heap.assets/heap_push_step4.png)

**Bước 5**

![Bước chèn phần tử vào heap 5](heap.assets/heap_push_step5.png)

**Bước 6**

![Bước chèn phần tử vào heap 6](heap.assets/heap_push_step6.png)

**Bước 7**

![Bước chèn phần tử vào heap 7](heap.assets/heap_push_step7.png)

**Bước 8**

![Bước chèn phần tử vào heap 8](heap.assets/heap_push_step8.png)

**Bước 9**

![Bước chèn phần tử vào heap 9](heap.assets/heap_push_step9.png)

Với tổng cộng $n$ nút, chiều cao cây là $O(\log n)$. Số vòng lặp heapify nhiều nhất cũng là $O(\log n)$, vì mỗi vòng đưa nút lên đúng một tầng. **Do đó thao tác chèn phần tử có độ phức tạp $O(\log n)$.**

```python
# Mã chèn và heapify từ dưới lên chính thức được chèn từ nguồn đã khóa.
```

### Xóa phần tử đỉnh heap

Đỉnh heap là nút gốc và là phần tử đầu tiên của danh sách. Nếu xóa trực tiếp phần tử đầu, chỉ số của mọi nút khác sẽ thay đổi và rất khó sửa lại heap. Để giảm số chỉ số bị thay đổi, hãy làm theo ba bước.

1. Đổi chỗ phần tử đỉnh heap với phần tử đáy heap, tức đổi nút gốc với lá ngoài cùng bên phải.
2. Xóa phần tử cuối danh sách. Vì đã đổi chỗ, phần tử bị xóa chính là đỉnh heap ban đầu.
3. Từ nút gốc, **heapify từ trên xuống** để phục hồi thứ tự.

Hướng của heapify từ trên xuống ngược với heapify từ dưới lên. Chúng ta so sánh nút hiện tại với hai nút con và đổi nó với nút con lớn hơn. Lặp lại cho đến khi đi qua nút lá hoặc gặp vị trí đã thỏa mãn tính chất heap.

**Bước 1**

![Bước xóa đỉnh heap 1](heap.assets/heap_pop_step1.png)

**Bước 2**

![Bước xóa đỉnh heap 2](heap.assets/heap_pop_step2.png)

**Bước 3**

![Bước xóa đỉnh heap 3](heap.assets/heap_pop_step3.png)

**Bước 4**

![Bước xóa đỉnh heap 4](heap.assets/heap_pop_step4.png)

**Bước 5**

![Bước xóa đỉnh heap 5](heap.assets/heap_pop_step5.png)

**Bước 6**

![Bước xóa đỉnh heap 6](heap.assets/heap_pop_step6.png)

**Bước 7**

![Bước xóa đỉnh heap 7](heap.assets/heap_pop_step7.png)

**Bước 8**

![Bước xóa đỉnh heap 8](heap.assets/heap_pop_step8.png)

**Bước 9**

![Bước xóa đỉnh heap 9](heap.assets/heap_pop_step9.png)

**Bước 10**

![Bước xóa đỉnh heap 10](heap.assets/heap_pop_step10.png)

Tương tự thao tác chèn, thao tác xóa đỉnh heap có độ phức tạp thời gian $O(\log n)$ vì một nút chỉ có thể đi xuống theo chiều cao của cây.

```python
# Mã xóa đỉnh và heapify từ trên xuống chính thức được chèn từ nguồn đã khóa.
```

## Các ứng dụng thường gặp của heap

- **Hàng đợi ưu tiên**: Heap là lựa chọn phổ biến để cài đặt hàng đợi ưu tiên. Chèn và lấy phần tử đều có độ phức tạp $O(\log n)$, còn dựng heap có độ phức tạp $O(n)$, nên toàn bộ các thao tác đều hiệu quả.
- **Sắp xếp heap**: Có thể dựng heap từ một tập dữ liệu rồi liên tục lấy phần tử đỉnh để thu được dãy đã sắp xếp. Trong thực tế thường dùng một cách cài đặt tinh gọn hơn, được trình bày ở chương “Sắp xếp heap”.
- **Lấy $k$ phần tử lớn nhất**: Đây là bài toán kinh điển và cũng là ứng dụng tiêu biểu, chẳng hạn chọn 10 tin đang thịnh hành nhất hoặc 10 sản phẩm bán chạy nhất.
