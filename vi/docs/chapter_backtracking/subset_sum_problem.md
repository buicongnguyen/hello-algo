# Bài toán tổng tập con

## Mảng không có phần tử trùng

!!! question

    Cho mảng số nguyên dương `nums` và số nguyên dương đích `target`, hãy tìm mọi tổ hợp có tổng phần tử bằng `target`. Mảng không có phần tử trùng và mỗi phần tử được chọn nhiều lần. Trả về các tổ hợp dưới dạng danh sách, trong đó không có hai tổ hợp trùng nhau.

Ví dụ, với tập $\{3, 4, 5\}$ và số đích $9$, các lời giải là $\{3, 3, 3\}, \{4, 5\}$. Cần lưu ý hai điểm:

- Phần tử của tập đầu vào có thể được chọn lặp lại không giới hạn.
- Tập con không phân biệt thứ tự; chẳng hạn $\{4, 5\}$ và $\{5, 4\}$ là cùng một tập con.

### Tham khảo lời giải hoán vị

Tương tự bài toán hoán vị, có thể xem quá trình sinh tập con là một chuỗi lựa chọn và cập nhật tổng hiện tại sau mỗi lần chọn. Khi tổng bằng `target`, sao chép trạng thái vào danh sách kết quả.

Khác với hoán vị, **mỗi phần tử trong bài này được chọn bao nhiêu lần cũng được**, nên không cần mảng boolean `selected` ghi phần tử đã dùng. Sửa một vài chỗ trong mã hoán vị sẽ cho chúng ta lời giải ban đầu:

```python
# Mã tổng tập con ngây thơ 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Chạy mã trên mảng $[3, 4, 5]$ với đích $9$ thu được $[3, 3, 3], [4, 5], [5, 4]$. **Dù đã tìm mọi tập con có tổng bằng $9$, kết quả chứa hai tập con trùng là $[4, 5]$ và $[5, 4]$**.

Nguyên nhân là cây tìm kiếm phân biệt thứ tự lựa chọn, còn tập con thì không. Chọn 4 rồi 5 và chọn 5 rồi 4 là hai nhánh khác nhau nhưng biểu diễn cùng một tập giá trị, như hình dưới.

![Tìm tập con và các nhánh trùng do thứ tự](subset_sum_problem.assets/subset_sum_i_naive.png)

Một ý tưởng trực tiếp là loại trùng trong danh sách kết quả sau khi tìm xong. Cách này rất kém hiệu quả vì:

- Khi mảng có nhiều phần tử, đặc biệt khi `target` lớn, tìm kiếm tạo ra rất nhiều tập con trùng.
- So sánh hai tập con dạng mảng tốn kém: thường phải sắp xếp rồi so từng phần tử, đồng thời vẫn phải lưu và tạo những kết quả cuối cùng sẽ bị bỏ.

Giải pháp tốt hơn là ngăn các nhánh trùng xuất hiện ngay trong cây tìm kiếm.

### Cắt tỉa tập con trùng

**Chúng ta loại trùng bằng cắt tỉa trong quá trình tìm kiếm.** Quan sát hình dưới, tập con trùng xuất hiện khi cùng các phần tử được chọn theo thứ tự khác nhau.

1. Khi vòng một và vòng hai lần lượt chọn $3$ và $4$, mọi tập con chứa hai phần tử này đã được sinh, ký hiệu $[3, 4, \dots]$.
2. Sau đó, khi vòng một chọn $4$, **vòng hai phải bỏ qua $3$**, vì nhánh $[4, 3, \dots]$ trùng hoàn toàn với nhánh đã sinh ở bước `1.`.

Mỗi tầng duyệt lựa chọn từ trái sang phải nên các nhánh càng về bên phải càng bị cắt nhiều.

1. Hai vòng đầu chọn $3$ và $5$, sinh nhánh $[3, 5, \dots]$.
2. Hai vòng đầu chọn $4$ và $5$, sinh nhánh $[4, 5, \dots]$.
3. Nếu vòng đầu chọn $5$, **vòng hai phải bỏ qua $3$ và $4$**, vì $[5, 3, \dots]$ và $[5, 4, \dots]$ trùng với các nhánh ở bước `1.` và `2.`.

![Các thứ tự lựa chọn khác nhau tạo tập con trùng](subset_sum_problem.assets/subset_sum_i_pruning.png)

Tổng quát, với mảng đầu vào $[x_1, x_2, \dots, x_n]$, gọi chuỗi lựa chọn là $[x_{i_1}, x_{i_2}, \dots, x_{i_m}]$. Chuỗi phải thỏa $i_1 \leq i_2 \leq \dots \leq i_m$; **mọi chuỗi không thỏa điều kiện này đều tạo trùng và cần bị cắt**. Điều kiện chỉ số không giảm chọn một thứ tự chuẩn duy nhất cho mỗi đa tập.

### Triển khai mã

Để thực hiện cắt tỉa, dùng biến `start` chỉ vị trí bắt đầu duyệt. **Sau khi chọn $x_{i}$, vòng kế tiếp bắt đầu từ chỉ số $i$**. Nhờ đó, chuỗi luôn thỏa $i_1 \leq i_2 \leq \dots \leq i_m$ và mỗi phần tử vẫn có thể được chọn lại.

Mã còn có hai tối ưu:

- Sắp xếp `nums` trước khi tìm. Khi duyệt, **nếu tổng vượt `target` thì kết thúc vòng lặp ngay**, vì các phần tử phía sau lớn hơn và chỉ làm tổng tăng thêm.
- Không lưu biến tổng `total`; thay vào đó **trừ phần tử đã chọn khỏi `target`**. Khi `target` bằng $0$, trạng thái hiện tại là một lời giải.

```python
# Mã tổng tập con không trùng 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Hình dưới là toàn bộ quá trình quay lui khi chạy trên mảng $[3, 4, 5]$ với đích $9$. Mỗi nhánh dừng vì đạt đích, vượt đích, hoặc hết lựa chọn; sau mỗi lần dừng, phần tử cuối được hoàn tác trước khi thử nhánh kế tiếp.

![Quá trình quay lui tổng tập con I](subset_sum_problem.assets/subset_sum_i.png)

## Mảng có phần tử trùng

!!! question

    Cho mảng số nguyên dương `nums` và số nguyên dương đích `target`, hãy tìm mọi tổ hợp có tổng bằng `target`. **Mảng có thể chứa phần tử trùng và mỗi vị trí đầu vào chỉ được chọn tối đa một lần.** Trả về danh sách không có tổ hợp trùng.

So với bài trước, **mảng đầu vào có thể chứa giá trị bằng nhau**, tạo ra một kiểu trùng mới. Ví dụ, với mảng $[4, \hat{4}, 5]$ và đích $9$, mã cũ trả về $[4, 5], [\hat{4}, 5]$, tức hai tập con có cùng dãy giá trị.

**Nguyên nhân là các phần tử bằng nhau được chọn nhiều lần trong cùng một vòng.** Trong hình dưới, vòng đầu có ba lựa chọn, trong đó hai lựa chọn mang giá trị $4$, tạo hai nhánh trùng và hai kết quả trùng. Hai phần tử $4$ ở vòng hai cũng gây vấn đề tương tự.

![Tập con trùng do các phần tử bằng nhau](subset_sum_problem.assets/subset_sum_ii_repeat.png)

### Cắt tỉa phần tử bằng nhau

Để giải quyết, **mỗi giá trị bằng nhau chỉ được chọn một lần trong một vòng lựa chọn**. Vì mảng đã sắp xếp, các phần tử bằng nhau nằm liền kề. Trong một vòng, nếu phần tử hiện tại bằng phần tử bên trái và cả hai đều thuộc phạm vi lựa chọn của vòng đó, giá trị này đã được thử nên bỏ qua phần tử hiện tại.

Đồng thời, **mỗi vị trí mảng chỉ được chọn một lần**. Biến `start` cũng xử lý được ràng buộc này: sau khi chọn $x_{i}$, vòng kế tiếp bắt đầu từ chỉ số $i + 1$. Khác với bài trước bắt đầu lại tại `i`, bước tăng một đơn vị ngăn tái sử dụng đúng vị trí vừa chọn.

Điều kiện bỏ phần tử bằng bên trái chỉ áp dụng khi phần tử đó là lựa chọn anh em trong cùng vòng. Nếu phần tử bằng nhau nằm ở tầng sâu hơn sau khi một bản sao đã được chọn ở tầng cha, nó vẫn có thể cần thiết để tạo tổ hợp chứa nhiều bản sao.

### Triển khai mã

```python
# Mã tổng tập con có phần tử trùng 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Hình dưới thể hiện quá trình quay lui với mảng $[4, 4, 5]$ và đích $9$, gồm bốn kiểu cắt tỉa. Kết hợp hình với chú thích trong mã để theo dõi: bỏ phần tử bằng nhau trong cùng vòng, không dùng lại vị trí, dừng khi vượt đích và dừng khi ghi lời giải.

![Quá trình quay lui tổng tập con II](subset_sum_problem.assets/subset_sum_ii.png)
