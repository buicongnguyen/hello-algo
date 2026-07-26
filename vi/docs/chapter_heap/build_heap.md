# Thao tác dựng heap

Trong một số trường hợp, cần dùng toàn bộ phần tử của một danh sách để tạo thành heap. Quá trình này được gọi là <u>thao tác dựng heap</u>.

## Dựng heap bằng cách chèn từng phần tử

Trước tiên hãy tạo một heap rỗng, sau đó duyệt danh sách và lần lượt thực hiện thao tác chèn với từng phần tử. Mỗi phần tử được nối vào cuối heap rồi được heapify từ dưới lên.

Mỗi lần chèn, chiều dài heap tăng thêm một. Vì các nút được thêm tuần tự vào cây nhị phân hoàn chỉnh theo thứ tự từ trên xuống và từ trái sang phải, heap cũng được dựng “từ trên xuống”.

Với $n$ phần tử, mỗi lần chèn tốn $O(\log{n})$, nên độ phức tạp thời gian của cách dựng heap này là $O(n \log n)$.

## Dựng heap bằng cách duyệt heapify

Chúng ta có thể dựng heap hiệu quả hơn chỉ với hai bước.

1. Đưa nguyên trạng mọi phần tử của danh sách vào mảng heap; tại thời điểm này tính chất heap chưa được bảo đảm.
2. Duyệt heap theo thứ tự ngược của duyệt theo mức và lần lượt heapify từ trên xuống với từng nút không phải lá.

**Sau khi heapify một nút, cây con có gốc tại nút đó trở thành một heap con hợp lệ.** Vì duyệt theo thứ tự ngược, các cây con ở phía dưới đã hợp lệ trước khi xử lý nút cha, nên heap được dựng “từ dưới lên”.

Chọn thứ tự ngược là điều kiện quan trọng: nó bảo đảm hai cây con của nút hiện tại đã là các heap con. Khi đó việc đẩy nút hiện tại xuống vị trí thích hợp mới tạo ra một cây con hợp lệ hoàn chỉnh.

**Nút lá không có con nên tự nhiên đã là một heap con hợp lệ và không cần heapify.** Nút không phải lá cuối cùng chính là nút cha của phần tử cuối mảng. Chúng ta bắt đầu tại nút này rồi duyệt ngược về gốc.

```python
# Mã dựng heap từ dưới lên chính thức được chèn từ nguồn đã khóa.
```

## Phân tích độ phức tạp

Tiếp theo là phần suy ra độ phức tạp thời gian của phương pháp thứ hai.

- Giả sử cây nhị phân hoàn chỉnh có $n$ nút. Số nút lá là $(n + 1) / 2$, trong đó $/$ là phép chia lấy phần nguyên. Vì vậy số nút cần heapify là $(n - 1) / 2$.
- Trong quá trình heapify từ trên xuống, mỗi nút có thể chìm nhiều nhất đến một nút lá, nên số vòng lặp tối đa bằng chiều cao cây, tức $\log n$.

Nếu chỉ nhân hai đại lượng trên, kết quả là $O(n \log n)$. **Ước lượng này chưa chính xác vì không tính đến đặc điểm cây nhị phân có rất nhiều nút ở tầng thấp và rất ít nút ở tầng cao.** Phần lớn nút chỉ có thể di chuyển một hoặc hai tầng, không phải toàn bộ chiều cao cây.

Để tính chính xác hơn, giả sử có một cây nhị phân hoàn hảo gồm $n$ nút và có chiều cao $h$. Giả định này giúp biểu thức gọn hơn nhưng không làm thay đổi bậc độ phức tạp.

![Số nút ở mỗi tầng của cây nhị phân hoàn hảo](build_heap.assets/heapify_operations_count.png)

Trong hình, số vòng lặp heapify từ trên xuống tối đa của một nút bằng khoảng cách từ nút đó đến lá, tức chính là chiều cao của nút. Vì vậy, cộng “số nút $\times$ chiều cao nút” ở từng tầng sẽ **thu được tổng số vòng lặp heapify của mọi nút**.

$$
T(h) = 2^0h + 2^1(h-1) + 2^2(h-2) + \dots + 2^{(h-1)}\times1
$$

Để rút gọn, trước tiên nhân $T(h)$ với $2$:

$$
\begin{aligned}
T(h) & = 2^0h + 2^1(h-1) + 2^2(h-2) + \dots + 2^{h-1}\times1 \newline
2 T(h) & = 2^1h + 2^2(h-1) + 2^3(h-2) + \dots + 2^{h}\times1 \newline
\end{aligned}
$$

Trừ phương trình thứ nhất $T(h)$ khỏi phương trình thứ hai $2T(h)$:

$$
2T(h) - T(h) = T(h) = -2^0h + 2^1 + 2^2 + \dots + 2^{h-1} + 2^h
$$

Quan sát biểu thức còn lại, có thể thấy $T(h)$ là một cấp số nhân. Dùng công thức tổng sẽ thu được:

$$
\begin{aligned}
T(h) & = 2 \frac{1 - 2^h}{1 - 2} - h \newline
& = 2^{h+1} - h - 2 \newline
& = O(2^h)
\end{aligned}
$$

Cây nhị phân hoàn hảo cao $h$ có $n = 2^{h+1} - 1$ nút, vì vậy $O(2^h) = O(n)$. Kết quả này chứng minh **dựng heap trực tiếp từ danh sách đầu vào có độ phức tạp $O(n)$**, hiệu quả hơn cách chèn từng phần tử.
