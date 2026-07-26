# Sắp xếp nhanh

<u>Sắp xếp nhanh</u> là thuật toán sắp xếp hiệu quả và được dùng rộng rãi, xây dựng trên chiến lược chia để trị.

Phép toán cốt lõi là **phân hoạch theo chốt**: chọn một phần tử làm `pivot`, đưa mọi phần tử nhỏ hơn sang trái và mọi phần tử lớn hơn sang phải.

1. Chọn phần tử ngoài cùng bên trái làm chốt, đặt hai con trỏ `i` và `j` ở hai đầu đoạn.
2. Trong mỗi vòng, `i` tìm từ trái sang phần tử đầu tiên lớn hơn chốt, còn `j` tìm từ phải sang phần tử đầu tiên nhỏ hơn chốt; sau đó đổi chỗ hai phần tử vừa tìm.
3. Lặp đến khi hai con trỏ gặp nhau rồi đổi chốt với phần tử tại biên giữa hai đoạn con.

**Bước 1**

![Bước 1 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step1.png)

**Bước 2**

![Bước 2 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step2.png)

**Bước 3**

![Bước 3 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step3.png)

**Bước 4**

![Bước 4 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step4.png)

**Bước 5**

![Bước 5 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step5.png)

**Bước 6**

![Bước 6 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step6.png)

**Bước 7**

![Bước 7 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step7.png)

**Bước 8**

![Bước 8 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step8.png)

**Bước 9**

![Bước 9 của phân hoạch theo chốt](quick_sort.assets/pivot_division_step9.png)

Sau phân hoạch, mảng ban đầu gồm đoạn trái, chốt và đoạn phải, thỏa “mọi phần tử ở trái $\leq$ chốt $\leq$ mọi phần tử ở phải”. Vì chốt đã đúng vị trí cuối cùng, chỉ hai đoạn con còn cần sắp xếp.

!!! note "Chiến lược chia để trị của sắp xếp nhanh"

    Bản chất của phân hoạch là biến bài toán sắp một đoạn dài thành hai bài toán sắp các đoạn ngắn hơn. Hai bài toán con có cùng cấu trúc với bài toán ban đầu nên có thể giải bằng đệ quy.

```python
# Mã phân hoạch chính thức được chèn từ nguồn đã khóa.
```

## Quy trình thuật toán

1. Phân hoạch mảng ban đầu để nhận đoạn con trái và đoạn con phải chưa sắp xếp.
2. Đệ quy phân hoạch hai đoạn con.
3. Tiếp tục đến khi mỗi đoạn có độ dài không quá một; khi đó toàn bộ mảng đã có thứ tự.

![Toàn bộ quy trình sắp xếp nhanh](quick_sort.assets/quick_sort_overview.png)

```python
# Mã sắp xếp nhanh đệ quy chính thức được chèn từ nguồn đã khóa.
```

## Đặc điểm thuật toán

- **Độ phức tạp thời gian trung bình $O(n \log n)$, không thích nghi**: phân hoạch cân bằng tạo khoảng $\log n$ tầng đệ quy và tổng công việc ở mỗi tầng là $n$, nên tổng thể đạt $O(n \log n)$. Trong trường hợp xấu nhất, đoạn dài $n$ luôn bị chia thành hai phần dài $0$ và $n - 1$; chiều sâu đạt $n$, mỗi tầng vẫn cần đến $n$ bước xét, vì vậy tổng thời gian là $O(n^2)$.
- **Độ phức tạp không gian xấu nhất $O(n)$, sắp xếp tại chỗ**: với đầu vào khiến phân hoạch luôn lệch, độ sâu ngăn xếp có thể đạt $n$ và dùng $O(n)$ khung gọi. Dữ liệu vẫn được hoán đổi ngay trên mảng ban đầu, không cần mảng phụ.
- **Không ổn định**: khi đưa chốt vào vị trí biên, phép đổi chỗ có thể làm đảo thứ tự tương đối của các phần tử bằng nhau.

## Vì sao sắp xếp nhanh thường nhanh

Dù cùng có độ phức tạp trung bình với merge sort và heap sort, quick sort thường nhanh hơn trong thực tế:

- **Trường hợp xấu hiếm gặp**: thời gian $O(n^2)$ có thể xảy ra nhưng đa số đầu vào và chiến lược chọn chốt tốt cho hiệu năng $O(n \log n)$.
- **Tận dụng bộ nhớ đệm tốt**: phân hoạch duyệt các phần tử liên tiếp trong một đoạn, phù hợp với cách cache tải dữ liệu. Heap sort lại thường truy cập các vị trí xa nhau.
- **Hệ số hằng nhỏ**: tổng số phép so sánh, gán và đổi chỗ thường thấp hơn nhiều thuật toán cùng bậc tiệm cận.

## Tối ưu lựa chọn chốt

Nếu mảng giảm dần hoàn toàn và luôn chọn phần tử đầu làm chốt, mỗi lượt có thể tạo đoạn trái dài $n - 1$ và đoạn phải dài $0$. Khi hiện tượng này lặp lại, một nhánh luôn có độ dài $0$, chiến lược chia để trị mất hiệu lực và thời gian tiến gần $O(n^2)$.

Có thể chọn chốt ngẫu nhiên để giảm xác suất gặp liên tiếp những phép chia xấu. Tuy nhiên số ngẫu nhiên trong chương trình thường là giả ngẫu nhiên, nên vẫn có thể xây dựng đầu vào bất lợi cho một chuỗi đã biết.

Một lựa chọn vững hơn là lấy ba ứng viên—phần tử đầu, giữa và cuối—rồi dùng trung vị của chúng làm chốt. Trung vị ba làm tăng khả năng chốt không quá nhỏ cũng không quá lớn; lấy nhiều ứng viên hơn còn có thể tăng độ bền, đổi lại thêm chi phí chọn chốt.

```python
# Mã phân hoạch dùng trung vị ba chính thức được chèn từ nguồn đã khóa.
```

## Tối ưu độ sâu đệ quy

Với đầu vào đã tăng dần, giả sử đoạn hiện tại dài $m$, phân hoạch có thể tạo một đoạn dài $0$ và một đoạn dài $m - 1$. Nếu đệ quy trực tiếp trên đoạn dài, cây gọi có thể cao $n - 1$ và tiêu thụ $O(n)$ bộ nhớ ngăn xếp.

Sau mỗi lần phân hoạch, chỉ đệ quy trên đoạn ngắn hơn và dùng vòng lặp để tiếp tục với đoạn dài hơn. Đoạn được đệ quy có độ dài tối đa $n / 2$, nên độ sâu không vượt quá $\log n$ và không gian xấu nhất giảm còn $O(\log n)$.

```python
# Mã sắp xếp nhanh tối ưu độ sâu chính thức được chèn từ nguồn đã khóa.
```
