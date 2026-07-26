# Sắp xếp chèn

<u>Sắp xếp chèn</u> là một thuật toán đơn giản, hoạt động gần giống cách con người sắp một bộ bài trên tay.

Mỗi lượt chọn một phần tử cơ sở `base` trong vùng chưa sắp xếp, so sánh ngược với các phần tử thuộc vùng đã sắp xếp ở bên trái, rồi chèn nó vào vị trí thích hợp.

Hình dưới minh họa một phép chèn. Các phần tử nằm giữa vị trí đích và `base` được dịch sang phải một ô, sau đó giá trị `base` được ghi vào vị trí trống vừa tạo.

![Một phép chèn vào mảng](insertion_sort.assets/insertion_operation.png)

## Quy trình thuật toán

1. Ban đầu, phần tử đầu tiên được xem là vùng đã sắp xếp.
2. Chọn phần tử thứ hai làm `base` và chèn vào vị trí phù hợp; hai phần tử đầu tiên trở nên có thứ tự.
3. Chọn phần tử thứ ba làm `base`; sau khi chèn, ba phần tử đầu tiên có thứ tự.
4. Tiếp tục như vậy đến phần tử cuối. Sau lượt cuối, toàn bộ mảng đã được sắp xếp.

Với mảng dài $n$, thuật toán thực hiện tối đa $n - 1$ lượt chèn và luôn duy trì tiền tố bên trái ở trạng thái đã sắp xếp.

![Toàn bộ quy trình sắp xếp chèn](insertion_sort.assets/insertion_sort_overview.png)

Mã triển khai chính thức:

```python
# Mã sắp xếp chèn chính thức được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

- **Độ phức tạp thời gian $O(n^2)$, có tính thích nghi**: trong trường hợp xấu nhất, các phép chèn cần lần lượt $n - 1$, $n-2$, $\dots$, $2$ và $1$ lần dịch chuyển, tổng là $(n - 1) n / 2$, nên độ phức tạp đạt $O(n^2)$. Khi dữ liệu đã có thứ tự, mỗi lượt dừng ngay và trường hợp tốt nhất là $O(n)$.
- **Độ phức tạp không gian $O(1)$, sắp xếp tại chỗ**: các con trỏ $i$ và $j$ chỉ dùng bộ nhớ cố định.
- **Ổn định**: phần tử mới được đặt sau các phần tử bằng nó, vì vậy thứ tự tương đối của các khóa bằng nhau không thay đổi.

## Ưu điểm của sắp xếp chèn

Sắp xếp chèn có độ phức tạp $O(n^2)$, còn sắp xếp nhanh sẽ học ở phần sau có độ phức tạp trung bình $O(n \log n)$. Dù vậy, **sắp xếp chèn thường nhanh hơn trên tập dữ liệu nhỏ**.

Những thuật toán chia để trị như sắp xếp nhanh phải thực hiện thêm phép chia đoạn, gọi hàm và quản lý ngăn xếp. Khi dữ liệu nhỏ, giá trị $n^2$ chưa cách xa $n \log n$ đủ nhiều để độ phức tạp tiệm cận quyết định kết quả; số thao tác cơ bản trong mỗi lượt mới là yếu tố nổi trội.

Vì lý do đó, nhiều thư viện sắp xếp tích hợp dùng chiến lược lai: áp dụng thuật toán chia để trị cho mảng lớn rồi chuyển sang sắp xếp chèn khi đoạn con đủ ngắn.

Mặc dù nổi bọt, chọn và chèn đều có độ phức tạp $O(n^2)$, sắp xếp chèn xuất hiện thường xuyên hơn trong thực tế:

- Nổi bọt dựa vào phép hoán đổi, thường cần một biến tạm và ba phép gán; chèn chủ yếu dịch bằng phép gán đơn nên có hệ số chi phí thấp hơn.
- Sắp xếp chọn luôn làm cùng số phép so sánh. Với dữ liệu đã có một phần thứ tự, tính thích nghi của sắp xếp chèn tạo lợi thế rõ rệt.
- Sắp xếp chọn không ổn định nên không phù hợp với sắp xếp nhiều tầng, còn sắp xếp chèn giữ được thứ tự của các khóa bằng nhau.
