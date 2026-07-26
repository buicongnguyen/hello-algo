# Sắp xếp theo cơ số

Counting sort phù hợp khi số phần tử $n$ lớn nhưng miền giá trị $m$ nhỏ. Nếu cần sắp $n = 10^6$ mã sinh viên, mỗi mã gồm tám chữ số, thì miền giá trị có thể đạt $m = 10^8$; một mảng đếm cho toàn bộ miền sẽ rất tốn bộ nhớ.

<u>Sắp xếp theo cơ số</u> vẫn dùng ý tưởng đếm tần suất nhưng khai thác cấu trúc vị trí của chữ số. Thay vì đếm cả số, thuật toán sắp ổn định từng chữ số để dần tạo ra thứ tự cuối cùng.

## Quy trình thuật toán

Với mã sinh viên tám chữ số, coi hàng thấp nhất là chữ số thứ $1$ và hàng cao nhất là chữ số thứ $8$.

1. Khởi tạo vị trí chữ số $k = 1$.
2. Dùng counting sort ổn định theo chữ số thứ $k$. Sau lượt này, dữ liệu có thứ tự theo riêng chữ số đó.
3. Tăng $k$ thêm một, quay lại bước 2 và tiếp tục đến khi đã xử lý mọi chữ số $k$; khi đó toàn bộ số có thứ tự.

![Quy trình sắp xếp theo cơ số](radix_sort.assets/radix_sort_overview.png)

Với số $x$ biểu diễn trong cơ số $d$, chữ số thứ $k$, ký hiệu $x_k$, được tính bởi:

$$
x_k = \left\lfloor\frac{x}{d^{k-1}}\right\rfloor \bmod d
$$

Trong đó $\lfloor a \rfloor$ là làm tròn số thực $a$ xuống dưới, còn $\bmod \: d$ là lấy phần dư theo $d$. Với mã sinh viên thập phân, $d = 10$ và $k \in [1, 8]$.

Cần sửa counting sort để khóa dùng trong từng lượt là chữ số thứ $k$:

```python
# Mã radix sort chính thức được chèn từ nguồn đã khóa.
```

!!! question "Vì sao phải bắt đầu từ chữ số thấp nhất?"

    Kết quả của lượt sau có thể ghi đè thứ tự do lượt trước tạo ra. Chẳng hạn lượt đầu cho $a < b$ nhưng lượt sau cho $a > b$, thì lượt sau phải được ưu tiên. Vì chữ số cao có mức ưu tiên lớn hơn, cần sắp chữ số thấp trước rồi mới đến chữ số cao. Điều này chỉ đúng khi phép sắp theo từng chữ số là ổn định.

## Đặc điểm thuật toán

So với counting sort, radix sort xử lý được miền giá trị lớn hơn, nhưng dữ liệu phải biểu diễn bằng số chữ số cố định và số chữ số $k$ không được quá lớn. Số thực có thể không phù hợp vì số chữ số cần xét khiến $O(nk) \gg O(n^2)$.

- **Thời gian $O(nk)$, không thích nghi**: gọi số phần tử là $n$, cơ số là $d$ và số chữ số tối đa là $k$. Counting sort cho một chữ số tốn $O(n + d)$; thực hiện đủ $k$ lượt tốn $O((n + d)k)$. Trong thực tế $d$ và $k$ thường nhỏ nên tổng chi phí tiến gần $O(n)$.
- **Không gian $O(n + d)$, không tại chỗ**: giống counting sort, cần mảng kết quả dài $n$ và mảng đếm dài $d$.
- **Ổn định**: nếu counting sort ở mỗi lượt ổn định thì radix sort ổn định và đúng. Nếu phép sắp con không ổn định, thứ tự do chữ số thấp tạo ra có thể bị phá hỏng.
