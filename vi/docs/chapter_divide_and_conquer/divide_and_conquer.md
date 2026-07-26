# Thuật toán chia để trị

<u>Chia để trị</u> là một chiến lược thuật toán rất quan trọng và phổ biến. Chiến lược này thường được triển khai bằng đệ quy, gồm hai bước là “chia” và “trị”.

1. **Chia (giai đoạn phân rã)**: Đệ quy chia bài toán ban đầu thành hai hoặc nhiều bài toán con cho đến khi đạt tới bài toán con nhỏ nhất.
2. **Trị (giai đoạn hợp nhất)**: Bắt đầu từ các bài toán con nhỏ nhất đã biết lời giải, hợp nhất lời giải từ dưới lên để xây dựng lời giải cho bài toán ban đầu.

Như hình dưới đây, “sắp xếp trộn” là một ứng dụng điển hình của chiến lược chia để trị.

1. **Chia**: Đệ quy chia mảng ban đầu (bài toán gốc) thành hai mảng con (các bài toán con) cho đến khi mỗi mảng con chỉ còn một phần tử (bài toán con nhỏ nhất).
2. **Trị**: Từ dưới lên, hợp nhất các mảng con đã sắp xếp (lời giải bài toán con) để thu được mảng ban đầu đã sắp xếp (lời giải bài toán gốc).

![Chiến lược chia để trị trong sắp xếp trộn](divide_and_conquer.assets/divide_and_conquer_merge_sort.png)

## Cách nhận biết bài toán chia để trị

Thông thường, có thể xác định một bài toán có phù hợp với chia để trị hay không dựa trên các tiêu chí sau.

1. **Bài toán có thể phân rã**: Bài toán ban đầu có thể chia thành các bài toán con nhỏ hơn, tương tự nhau; các bài toán con lại tiếp tục được chia theo cùng một cách.
2. **Các bài toán con độc lập**: Chúng không chồng lấp, không phụ thuộc lẫn nhau và có thể được giải riêng rẽ.
3. **Có thể hợp nhất lời giải bài toán con**: Lời giải của bài toán ban đầu nhận được bằng cách hợp nhất lời giải của các bài toán con.

Rõ ràng sắp xếp trộn thỏa mãn cả ba tiêu chí.

1. **Bài toán có thể phân rã**: Đệ quy chia mảng (bài toán gốc) thành hai mảng con (các bài toán con).
2. **Các bài toán con độc lập**: Mỗi mảng con có thể được sắp xếp riêng (mỗi bài toán con được giải độc lập).
3. **Có thể hợp nhất lời giải bài toán con**: Hai mảng con đã sắp xếp (các lời giải con) có thể được trộn thành một mảng đã sắp xếp (lời giải bài toán gốc).

## Nâng cao hiệu quả bằng chia để trị

**Chia để trị không chỉ giải quyết bài toán hiệu quả mà thường còn nâng cao hiệu suất thuật toán**. Trong các thuật toán sắp xếp, quick sort, merge sort và heap sort nhanh hơn selection sort, bubble sort và insertion sort vì chúng vận dụng tư tưởng chia để trị.

Điều này dẫn đến một câu hỏi: **Vì sao chia để trị có thể nâng cao hiệu suất thuật toán, và logic phía sau là gì**? Nói cách khác, tại sao chia một bài toán lớn thành nhiều bài toán con, giải từng bài toán con rồi hợp nhất lời giải lại hiệu quả hơn giải trực tiếp bài toán ban đầu? Chúng ta có thể xem xét từ hai khía cạnh: số phép toán và tính toán song song.

### Tối ưu số phép toán

Lấy “sắp xếp nổi bọt” làm ví dụ, xử lý một mảng dài $n$ cần thời gian $O(n^2)$. Giả sử chúng ta chia mảng tại điểm giữa thành hai mảng con như hình dưới. Phép chia cần thời gian $O(n)$, sắp xếp mỗi mảng con cần $O((n / 2)^2)$, còn hợp nhất hai mảng con cần $O(n)$. Vì vậy, độ phức tạp thời gian tổng thể là:

$$
O(n + (\frac{n}{2})^2 \times 2 + n) = O(\frac{n^2}{2} + 2n)
$$

![Sắp xếp nổi bọt trước và sau khi chia mảng](divide_and_conquer.assets/divide_and_conquer_bubble_sort.png)

Tiếp theo, xét bất đẳng thức dưới đây; vế trái và vế phải lần lượt biểu diễn tổng số phép toán trước và sau khi chia:

$$
\begin{aligned}
n^2 & > \frac{n^2}{2} + 2n \newline
n^2 - \frac{n^2}{2} - 2n & > 0 \newline
n(n - 4) & > 0
\end{aligned}
$$

**Điều này có nghĩa là khi $n > 4$, số phép toán sau khi chia nhỏ hơn và hiệu suất sắp xếp sẽ cao hơn**. Lưu ý rằng độ phức tạp thời gian sau khi chia vẫn là bậc hai $O(n^2)$, nhưng hệ số hằng trong biểu thức đã nhỏ đi.

Tiến thêm một bước, **nếu chúng ta liên tục chia đôi từng mảng con tại điểm giữa** cho đến khi mỗi mảng chỉ còn một phần tử thì sao? Cách làm này chính là “sắp xếp trộn”, có độ phức tạp thời gian $O(n \log n)$.

Suy nghĩ rộng hơn, **nếu đặt nhiều điểm chia** và phân phối đều mảng ban đầu thành $k$ mảng con thì sao? Trường hợp này rất giống “sắp xếp thùng”, một thuật toán phù hợp để sắp xếp lượng dữ liệu rất lớn, với độ phức tạp thời gian lý thuyết $O(n + k)$.

### Tối ưu tính toán song song

Chúng ta biết các bài toán con do chia để trị tạo ra độc lập với nhau, **vì vậy thường có thể giải chúng song song**. Như vậy, chia để trị không chỉ có khả năng giảm độ phức tạp thời gian mà **còn thuận lợi cho hệ điều hành thực hiện tối ưu song song**.

Tối ưu song song đặc biệt hiệu quả trong môi trường nhiều lõi hoặc nhiều bộ xử lý, bởi hệ thống có thể xử lý đồng thời nhiều bài toán con, khai thác tài nguyên tính toán đầy đủ hơn và giảm đáng kể tổng thời gian chạy.

Ví dụ, trong “sắp xếp thùng” ở hình dưới, chúng ta phân phối đều một lượng dữ liệu rất lớn vào các thùng. Công việc sắp xếp từng thùng có thể giao cho các đơn vị tính toán khác nhau, rồi kết quả được hợp nhất sau khi hoàn tất.

![Tính toán song song trong sắp xếp thùng](divide_and_conquer.assets/divide_and_conquer_parallel_computing.png)

## Các ứng dụng phổ biến của chia để trị

Một mặt, chia để trị có thể giải nhiều bài toán thuật toán kinh điển.

- **Tìm cặp điểm gần nhau nhất**: Trước hết chia tập điểm thành hai phần, tìm riêng cặp điểm gần nhất trong mỗi phần, rồi tìm cặp gần nhất nằm vắt qua hai phần.
- **Nhân số nguyên lớn**: Chẳng hạn thuật toán Karatsuba phân rã phép nhân số nguyên lớn thành một số phép nhân và phép cộng trên các số nguyên nhỏ hơn.
- **Nhân ma trận**: Chẳng hạn thuật toán Strassen phân rã phép nhân ma trận lớn thành nhiều phép nhân và phép cộng ma trận nhỏ.
- **Bài toán Tháp Hà Nội**: Có thể giải bằng đệ quy; đây là một ứng dụng điển hình của chiến lược chia để trị.
- **Đếm cặp nghịch thế**: Trong một dãy, nếu số đứng trước lớn hơn số đứng sau thì chúng tạo thành một cặp nghịch thế. Có thể kết hợp chia để trị với sắp xếp trộn để giải bài toán này.

Mặt khác, chia để trị được dùng rộng rãi khi thiết kế thuật toán và cấu trúc dữ liệu.

- **Tìm kiếm nhị phân**: Chia mảng đã sắp xếp thành hai phần tại chỉ số giữa, dựa vào kết quả so sánh giữa giá trị đích và phần tử giữa để loại bỏ một nửa, rồi lặp lại bước tìm kiếm nhị phân trên khoảng còn lại.
- **Sắp xếp trộn**: Đã được giới thiệu ở đầu mục này nên không nhắc lại.
- **Sắp xếp nhanh**: Chọn một giá trị chốt, chia mảng thành hai mảng con — một phía chứa phần tử nhỏ hơn chốt, phía kia chứa phần tử lớn hơn — rồi tiếp tục chia hai phần cho đến khi mỗi mảng con chỉ còn một phần tử.
- **Sắp xếp thùng**: Phân tán dữ liệu vào nhiều thùng, sắp xếp các phần tử trong từng thùng, rồi lấy phần tử lần lượt từ các thùng để thu được mảng đã sắp xếp.
- **Cây**: Các cấu trúc như cây tìm kiếm nhị phân, cây AVL, cây đỏ-đen, cây B và cây B+ đều có thể xem các thao tác tìm kiếm, thêm và xóa là ứng dụng của chia để trị.
- **Heap**: Heap là một cây nhị phân hoàn chỉnh đặc biệt; các thao tác thêm, xóa và heapify đều hàm chứa tư tưởng chia để trị.
- **Bảng băm**: Dù không trực tiếp áp dụng chia để trị, một số cách giải quyết xung đột băm sử dụng tư tưởng này gián tiếp. Ví dụ, danh sách liên kết dài trong phương pháp nối riêng có thể được chuyển thành cây đỏ-đen để tăng hiệu suất tra cứu.

Có thể thấy **chia để trị là một tư tưởng thuật toán “hiện diện khắp nơi nhưng ít gây chú ý”**, được lồng vào nhiều thuật toán và cấu trúc dữ liệu.
