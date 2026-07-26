# Bài toán hoán vị

Bài toán hoán vị là một ứng dụng kinh điển của quay lui. Bài toán yêu cầu tìm mọi cách sắp xếp có thể của các phần tử trong một tập hợp đã cho, chẳng hạn mảng hoặc chuỗi. Mỗi lời giải phải dùng đúng các phần tử đầu vào với đúng số lần xuất hiện.

Bảng dưới đây đưa ra một số mảng đầu vào và toàn bộ hoán vị tương ứng.

Bảng: Ví dụ về hoán vị

| Mảng đầu vào | Mọi hoán vị |
| :--- | :--- |
| $[1]$ | $[1]$ |
| $[1, 2]$ | $[1, 2], [2, 1]$ |
| $[1, 2, 3]$ | $[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]$ |

## Trường hợp các phần tử khác nhau

!!! question

    Cho một mảng số nguyên không có phần tử trùng, hãy trả về mọi hoán vị có thể.

Từ góc nhìn quay lui, **có thể xem quá trình tạo hoán vị là kết quả của một chuỗi lựa chọn**. Giả sử đầu vào là $[1, 2, 3]$. Nếu lần lượt chọn $1$, rồi $3$, cuối cùng $2$, chúng ta thu được hoán vị $[1, 3, 2]$. Quay lui nghĩa là hủy lựa chọn cuối để trở về tiền tố trước đó, rồi thử một phần tử khác.

Trong mã quay lui, tập ứng viên `choices` gồm mọi phần tử đầu vào, còn trạng thái `state` là dãy phần tử đã chọn. Mỗi phần tử chỉ được chọn một lần, **do đó mọi vị trí đầu vào xuất hiện trong `state` nhiều nhất một lần**. Khi độ dài trạng thái bằng độ dài đầu vào, một hoán vị hoàn chỉnh đã được tạo.

Hình dưới mở quá trình tìm kiếm thành cây đệ quy. Mỗi nút biểu diễn trạng thái hiện tại. Từ gốc rỗng, sau ba vòng lựa chọn chúng ta đến một nút lá; mỗi lá tương ứng với đúng một hoán vị.

![Cây đệ quy của bài toán hoán vị](permutations_problem.assets/permutations_i.png)

### Cắt tỉa lựa chọn đã dùng

Để bảo đảm mỗi vị trí chỉ được chọn một lần, dùng mảng boolean `selected`, trong đó `selected[i]` cho biết `choices[i]` đã nằm trong trạng thái hiện tại hay chưa.

- Sau khi chọn `choices[i]`, đặt `selected[i]` thành $\text{True}$ để đánh dấu vị trí đã dùng.
- Khi duyệt danh sách ứng viên, bỏ qua mọi vị trí đã được chọn; đây chính là thao tác cắt tỉa.
- Trước khi quay lui sang nhánh khác, đặt lại cờ của vị trí vừa bỏ khỏi `state`.

Trong hình dưới, giả sử vòng đầu chọn $1$, vòng hai chọn $3$, vòng ba chọn $2$. Ở vòng hai phải cắt nhánh của $1$; ở vòng ba phải cắt các nhánh của $1$ và $3$ vì chúng đã có trong tiền tố.

![Ví dụ cắt tỉa trong bài toán hoán vị](permutations_problem.assets/permutations_i_pruning.png)

Nếu không cắt, mỗi tầng đều có `n` lựa chọn và không gian thô có kích thước $O(n^n)$. Cờ `selected` giữ lại đúng số nhánh khả thi, giảm không gian tìm kiếm xuống $O(n!)$, bằng số hoán vị thực tế của các phần tử phân biệt.

### Triển khai mã

Sau khi xác định trạng thái, lựa chọn và điều kiện cắt tỉa, có thể điền vào khung quay lui. Để mã ngắn gọn, các thao tác kiểm tra, thử và hoàn tác được viết trực tiếp trong `backtrack()` thay vì tách thành nhiều hàm.

```python
# Mã hoán vị phần tử phân biệt 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Điểm dễ sai là chỉ thêm phần tử nhưng không bỏ nó khi quay lui, hoặc bỏ phần tử mà quên đặt lại `selected`. Hai cấu trúc này phải luôn mô tả cùng một trạng thái: một vị trí được đánh dấu khi và chỉ khi giá trị ở vị trí đó đang nằm trong đường lựa chọn hiện tại.

## Trường hợp có phần tử trùng

!!! question

    Cho một mảng số nguyên **có thể chứa phần tử trùng**, hãy trả về mọi hoán vị khác nhau.

Giả sử đầu vào là $[1, 1, 2]$. Để phân biệt hai phần tử cùng giá trị $1$, ký hiệu phần tử $1$ thứ hai là $\hat{1}$ trong phần phân tích. Hai vị trí vẫn là hai ứng viên khác nhau đối với `selected`, nhưng đổi chỗ chúng không tạo ra một dãy giá trị mới.

Như hình dưới, một nửa số hoán vị do phương pháp trước tạo ra bị trùng. Ví dụ, chọn `1` trước rồi bản sao thứ hai và đổi ngược thứ tự hai vị trí đó dẫn đến các nhánh có kết quả giá trị giống nhau.

![Các hoán vị bị trùng](permutations_problem.assets/permutations_ii.png)

Cách trực tiếp là dùng tập băm để loại kết quả trùng sau khi tạo. Tuy nhiên, cách đó vẫn tốn thời gian khám phá và sao chép các nhánh vô ích. **Các nhánh sinh hoán vị trùng nên được nhận diện và cắt sớm**, vừa bảo đảm kết quả duy nhất vừa cải thiện hiệu suất.

### Cắt tỉa phần tử bằng nhau

Quan sát hình dưới. Ở vòng đầu, chọn $1$ hoặc chọn $\hat{1}$ là tương đương; mọi hoán vị bên dưới hai lựa chọn đều trùng nhau, nên phải cắt nhánh $\hat{1}$ thứ hai trong cùng vòng.

Tương tự, sau khi vòng đầu chọn $2$, hai lựa chọn $1$ và $\hat{1}$ ở vòng hai lại tạo các nhánh trùng, nên $\hat{1}$ thứ hai của vòng đó cũng bị cắt.

Về bản chất, **mục tiêu là để nhiều phần tử bằng nhau chỉ được chọn một lần trong cùng một vòng lựa chọn**. Ở vòng sâu hơn, giá trị đó vẫn có thể được chọn nếu trạng thái cần thêm một bản sao, vì mỗi bản sao đầu vào phải xuất hiện trong hoán vị cuối.

![Cắt tỉa hoán vị trùng](permutations_problem.assets/permutations_ii_pruning.png)

### Triển khai mã

Dựa trên mã của trường hợp trước, trong mỗi vòng lựa chọn khởi tạo một tập băm `duplicated` để ghi những giá trị đã thử trong chính vòng đó. Nếu giá trị đã có trong tập, bỏ qua ứng viên; nếu chưa, thêm vào tập rồi mới thực hiện lựa chọn.

```python
# Mã hoán vị có phần tử trùng 13 ngôn ngữ được chèn từ nguồn đã khóa.
```

Giả sử các phần tử đôi một khác nhau, $n$ phần tử có $n!$ hoán vị. Khi ghi kết quả, phải sao chép danh sách dài $n$, tốn $O(n)$. **Vì vậy, độ phức tạp thời gian là $O(n! \cdot n)$**.

Độ sâu đệ quy tối đa là $n$, dùng $O(n)$ khung ngăn xếp. `selected` dùng $O(n)$. Có tối đa $n$ tập `duplicated` tồn tại đồng thời, tổng cộng dùng $O(n^2)$. **Vì vậy, độ phức tạp không gian là $O(n^2)$**. Không tính danh sách kết quả, vì riêng đầu ra đã có kích thước theo số hoán vị.

### So sánh hai cách cắt tỉa

Dù `selected` và `duplicated` đều phục vụ cắt tỉa, chúng giải quyết hai loại trùng lặp khác nhau.

- **Cắt lựa chọn đã dùng**: Chỉ có một mảng `selected` trong toàn bộ quá trình. Nó ghi vị trí nào đang nằm trong trạng thái hiện tại và ngăn cùng một phần tử đầu vào xuất hiện lặp trên một đường từ gốc đến lá.
- **Cắt phần tử bằng nhau**: Mỗi vòng lựa chọn, tức mỗi lời gọi `backtrack`, có một tập `duplicated`. Nó ghi giá trị nào đã được thử trong vòng `for` hiện tại và bảo đảm các giá trị bằng nhau chỉ tạo một nhánh tại cùng một nút cha.

Phạm vi của `selected` là một đường dọc trong cây đệ quy, còn phạm vi của `duplicated` là các lựa chọn ngang cùng tầng dưới một trạng thái. Nhầm hai phạm vi có thể khiến thuật toán bỏ thiếu phần tử trùng cần thiết hoặc vẫn tạo kết quả lặp.

Hình dưới minh họa phạm vi tác dụng của hai điều kiện. Mỗi nút cây là một lựa chọn; chuỗi nút từ gốc đến lá tạo thành một hoán vị.

![Phạm vi tác dụng của hai điều kiện cắt tỉa](permutations_problem.assets/permutations_ii_pruning_summary.png)
