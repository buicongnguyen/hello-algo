# Sắp xếp theo thùng

Các thuật toán trước đều dựa trên so sánh thứ tự tương đối giữa phần tử, nên trong mô hình tổng quát không thể vượt qua cận $O(n \log n)$. Những thuật toán không dựa trên so sánh có thể đạt thời gian tuyến tính bằng cách khai thác miền giá trị của dữ liệu.

<u>Sắp xếp theo thùng</u> là một ứng dụng điển hình của chia để trị. Thuật toán tạo một dãy thùng đã có thứ tự, mỗi thùng phụ trách một khoảng giá trị; phân phối dữ liệu vào các thùng, sắp xếp độc lập bên trong từng thùng, rồi nối các thùng theo thứ tự.

## Quy trình thuật toán

Xét mảng dài $n$, gồm các số thực trong khoảng $[0, 1)$.

1. Khởi tạo $k$ thùng và phân phối $n$ phần tử vào $k$ thùng theo giá trị.
2. Sắp xếp riêng từng thùng; có thể dùng hàm sắp xếp tích hợp của ngôn ngữ.
3. Duyệt các thùng từ nhỏ đến lớn và ghép kết quả trở lại mảng.

![Quy trình sắp xếp theo thùng](bucket_sort.assets/bucket_sort_overview.png)

```python
# Mã sắp xếp theo thùng chính thức được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

Bucket sort phù hợp với tập dữ liệu rất lớn. Chẳng hạn, nếu có một triệu bản ghi nhưng bộ nhớ không thể nạp toàn bộ cùng lúc, có thể chia chúng thành nhiều thùng, sắp từng thùng vừa bộ nhớ rồi ghép kết quả.

- **Thời gian $O(n + k)$ trong điều kiện phân phối đều**: mỗi thùng chứa khoảng $\frac{n}{k}$ phần tử. Nếu sắp một thùng tốn $O(\frac{n}{k} \log\frac{n}{k})$, sắp tất cả thùng tốn $O(n \log\frac{n}{k})$. Khi số thùng $k$ đủ lớn, chi phí này tiến gần $O(n)$. Giai đoạn ghép phải duyệt mọi thùng và phần tử nên tốn $O(n + k)$. Trường hợp xấu nhất, toàn bộ dữ liệu rơi vào một thùng và thuật toán sắp bên trong có thể tốn $O(n^2)$.
- **Không gian $O(n + k)$, không tại chỗ**: cần thêm $k$ thùng với tổng cộng $n$ phần tử.
- Tính ổn định phụ thuộc vào thuật toán dùng để sắp bên trong từng thùng và cách ghép dữ liệu.

## Làm thế nào để phân phối đều

Về lý thuyết, bucket sort có thể đạt $O(n)$, nhưng điều kiện quyết định là các phần tử phải phân bố tương đối đều. Dữ liệu thực tế thường lệch: ví dụ giá hàng hóa tập trung dày ở vùng giá thấp và rất thưa ở vùng giá cao. Nếu chia miền giá thành các khoảng bằng nhau, một vài thùng sẽ quá tải trong khi nhiều thùng gần như rỗng.

Có thể bắt đầu bằng những biên thô, rồi tiếp tục chia nhỏ các thùng chứa quá nhiều phần tử cho đến khi kích thước các thùng gần cân bằng. Cách làm này hình thành một cây phân chia; mục tiêu là làm các nút lá cân bằng, còn số nhánh ở mỗi mức có thể chọn theo đặc điểm dữ liệu.

![Chia đệ quy các thùng đông phần tử](bucket_sort.assets/scatter_in_buckets_recursively.png)

Nếu biết trước phân bố xác suất của dữ liệu, có thể đặt biên thùng theo các phân vị thay vì theo khoảng cách số học. Không cần đo chính xác tuyệt đối; một mô hình xác suất phù hợp đã đủ cải thiện độ cân bằng.

Ví dụ, nếu giá sản phẩm gần với phân bố chuẩn, các khoảng ở vùng trung tâm nên hẹp hơn vùng đuôi để mỗi thùng nhận số phần tử tương đương.

![Chia thùng dựa trên phân bố xác suất](bucket_sort.assets/scatter_in_buckets_distribution.png)
