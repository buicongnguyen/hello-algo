# Cây nhị phân

<u>Cây nhị phân</u> là cấu trúc dữ liệu phi tuyến mô hình hóa quan hệ phân cấp giữa “tổ tiên” và “hậu duệ”, đồng thời thể hiện tư duy chia để trị khi mỗi lần phân tách tạo tối đa hai nhánh. Tương tự danh sách liên kết, đơn vị cơ bản của cây là một nút. Mỗi nút chứa giá trị, tham chiếu đến nút con trái và tham chiếu đến nút con phải.

```python
# Lớp nút cây nhị phân chính thức được chèn từ nguồn đã khóa.
```

Hai tham chiếu của một nút lần lượt chỉ đến <u>nút con trái</u> và <u>nút con phải</u>; nút hiện tại là <u>nút cha</u> của chúng. Với một nút bất kỳ, cây tạo bởi con trái và mọi nút phía dưới gọi là <u>cây con trái</u>; <u>cây con phải</u> được định nghĩa tương tự.

**Mỗi nút không phải lá có ít nhất một cây con không rỗng.** Trong hình, nếu xem nút 2 là nút cha thì nút 4 và 5 là hai nút con. Cây con trái bắt đầu ở nút 4, còn cây con phải bắt đầu ở nút 5. Cách định nghĩa đệ quy này cho phép xem mỗi cây con như một cây nhị phân độc lập.

Cấu trúc phân cấp tạo ra một đường đi duy nhất từ gốc đến mỗi nút. Khác với mảng, vị trí logic của nút không được quyết định bởi địa chỉ liền kề mà bởi chuỗi tham chiếu đã đi qua. Vì thế, khi một tham chiếu cha–con thay đổi, toàn bộ cây con phía dưới có thể chuyển sang vị trí logic mới dù bản thân các nút không bị sao chép trong bộ nhớ.

![Nút cha, nút con và cây con](binary_tree.assets/binary_tree_definition.png)

## Thuật ngữ thường dùng

- <u>Nút gốc</u>: nút ở mức cao nhất, không có nút cha.
- <u>Nút lá</u>: nút không có con; cả hai tham chiếu đều rỗng.
- <u>Cạnh</u>: đoạn nối hai nút, biểu diễn một tham chiếu giữa chúng.
- <u>Mức</u> của nút: tăng từ trên xuống, gốc nằm ở mức 1.
- <u>Bậc</u> của nút: số nút con; trong cây nhị phân chỉ có thể là 0, 1 hoặc 2.
- <u>Chiều cao</u> của cây: số cạnh từ gốc đến nút lá xa nhất.
- <u>Độ sâu</u> của nút: số cạnh từ gốc đến nút đó.
- <u>Chiều cao</u> của nút: số cạnh trên đường dài nhất từ nút đó xuống một lá.

![Thuật ngữ của cây nhị phân](binary_tree.assets/binary_tree_terminology.png)

!!! tip

    Cuốn sách đếm chiều cao và độ sâu bằng số cạnh. Một số giáo trình hoặc đề bài lại đếm số nút trên đường đi; khi đó cả hai giá trị lớn hơn 1. Luôn kiểm tra quy ước trước khi giải bài.

## Các thao tác cơ bản

### Khởi tạo cây nhị phân

Giống danh sách liên kết, việc khởi tạo gồm hai pha: tạo các nút độc lập rồi thiết lập tham chiếu giữa chúng. Một biến giữ nút gốc là điểm vào của toàn bộ cây; từ đó có thể lần theo tham chiếu để đến mọi nút còn lại.

```python
# Mã khởi tạo cây nhị phân chính thức được chèn từ nguồn đã khóa.
```

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ khởi tạo cây nhị phân trong Python Tutor](https://pythontutor.com/render.html#code=class%20TreeNode%3A%0A%20%20%20%20def%20__init__%28self%2C%20val%29%3A%0A%20%20%20%20%20%20%20%20self.val%20%3D%20val%0A%20%20%20%20%20%20%20%20self.left%20%3D%20None%0A%20%20%20%20%20%20%20%20self.right%20%3D%20None%0A%0An1%20%3D%20TreeNode%281%29%0An2%20%3D%20TreeNode%282%29%0An3%20%3D%20TreeNode%283%29%0An4%20%3D%20TreeNode%284%29%0An5%20%3D%20TreeNode%285%29%0An1.left%20%3D%20n2%0An1.right%20%3D%20n3%0An2.left%20%3D%20n4%0An2.right%20%3D%20n5&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

Khi gắn `n1.left = n2`, chương trình không sao chép nút `n2`; nó chỉ lưu một tham chiếu. Vì vậy, nhiều thao tác trên cây thực chất là thay đổi các quan hệ tham chiếu, và cần giữ lại nút cha trước khi sửa liên kết nếu còn phải truy cập cấu trúc cũ.

Một cây được xem là rỗng khi tham chiếu gốc là `None`. Việc khởi tạo từng nút trước khi nối giúp tách rõ hai trách nhiệm: tạo dữ liệu nút và tạo cấu trúc cây. Trong chương trình lớn, quy tắc sở hữu hoặc bộ gom rác của ngôn ngữ sẽ quyết định thời điểm giải phóng một nút không còn được tham chiếu.

### Chèn và xóa nút

Có thể chèn hoặc loại bỏ nút bằng cách đổi tham chiếu. Hình dưới chèn nút `P` giữa `n1` và `n2`: trước hết cho `n1` trỏ tới `P`, sau đó cho `P` trỏ tới `n2`. Muốn bỏ `P`, nối trực tiếp `n1` trở lại `n2`.

![Chèn và xóa nút trong cây nhị phân](binary_tree.assets/binary_tree_add_remove.png)

```python
# Mã chèn và xóa nút chính thức được chèn từ nguồn đã khóa.
```

??? pythontutor "Trực quan hóa mã"

    [Mở ví dụ thay đổi liên kết cây trong Python Tutor](https://pythontutor.com/render.html#code=class%20TreeNode%3A%0A%20%20%20%20def%20__init__%28self%2C%20val%29%3A%0A%20%20%20%20%20%20%20%20self.val%20%3D%20val%0A%20%20%20%20%20%20%20%20self.left%20%3D%20None%0A%20%20%20%20%20%20%20%20self.right%20%3D%20None%0A%0An1%20%3D%20TreeNode%281%29%0An2%20%3D%20TreeNode%282%29%0An3%20%3D%20TreeNode%283%29%0An4%20%3D%20TreeNode%284%29%0An5%20%3D%20TreeNode%285%29%0An1.left%20%3D%20n2%0An1.right%20%3D%20n3%0An2.left%20%3D%20n4%0An2.right%20%3D%20n5%0Ap%20%3D%20TreeNode%280%29%0An1.left%20%3D%20p%0Ap.left%20%3D%20n2%0An1.left%20%3D%20n2&cumulative=false&curInstr=0&heapPrimitives=nevernest&mode=display&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false)

!!! tip

    Chèn một nút có thể thay đổi ý nghĩa logic của cấu trúc ban đầu. Xóa một nút theo cách ngắt tham chiếu thường làm cả cây con dưới nút đó không còn thuộc cây. Trong thuật toán thực tế, chèn và xóa vì thế là một chuỗi thao tác phối hợp—tìm vị trí, lưu tham chiếu cần thiết, đổi liên kết và có thể cập nhật dữ liệu phụ trợ.

## Các loại cây nhị phân thường gặp

### Cây nhị phân hoàn hảo

<u>Cây nhị phân hoàn hảo</u> có mọi mức được lấp đầy. Nút lá có bậc $0$, còn mọi nút khác có bậc $2$. Nếu chiều cao là $h$, tổng số nút bằng $2^{h+1} - 1$, tạo quy luật tăng theo hàm mũ.

!!! tip

    Trong một số tài liệu tiếng Trung, thuật ngữ tương ứng với “perfect binary tree” thường được gọi là “full binary tree”. Bản tiếng Việt này dùng “hoàn hảo” cho cây đầy mọi mức và “đầy đủ” cho cây mà mỗi nút có 0 hoặc 2 con.

![Cây nhị phân hoàn hảo](binary_tree.assets/perfect_binary_tree.png)

### Cây nhị phân hoàn chỉnh

<u>Cây nhị phân hoàn chỉnh</u> chỉ cho phép mức cuối chưa đầy, và các nút ở mức cuối phải nằm liên tiếp từ trái sang phải. Mọi cây hoàn hảo đều là cây hoàn chỉnh, nhưng chiều ngược lại không nhất thiết đúng. Tính chất lấp trái giúp cây hoàn chỉnh được biểu diễn bằng mảng rất gọn.

Do không có “lỗ” trước nút cuối cùng, chỉ số cha–con trong mảng luôn hợp lệ cho mọi nút đang tồn tại. Đây là lý do heap nhị phân thường chọn cây hoàn chỉnh thay vì một hình dạng cây tùy ý.

![Cây nhị phân hoàn chỉnh](binary_tree.assets/complete_binary_tree.png)

### Cây nhị phân đầy đủ

Trong <u>cây nhị phân đầy đủ</u>, mọi nút không phải lá đều có đúng hai nút con. Các lá không bắt buộc nằm cùng mức, nên cây đầy đủ chưa chắc hoàn chỉnh hoặc hoàn hảo.

![Cây nhị phân đầy đủ](binary_tree.assets/full_binary_tree.png)

### Cây nhị phân cân bằng

Trong <u>cây nhị phân cân bằng</u>, trị tuyệt đối của độ chênh chiều cao giữa cây con trái và phải của mọi nút không vượt quá 1. Điều kiện này giới hạn chiều cao và giúp các thao tác đi từ gốc xuống lá không trở thành tuyến tính.

Cân bằng không yêu cầu mọi mức phải đầy. Mục tiêu là ngăn một nhánh dài vượt trội so với nhánh kia tại bất kỳ nút nào, từ đó giữ số cạnh trên đường từ gốc đến lá trong giới hạn nhỏ.

![Cây nhị phân cân bằng](binary_tree.assets/balanced_binary_tree.png)

## Sự suy biến của cây nhị phân

Hình dưới so sánh hai cực. Khi mọi mức được lấp đầy, cây hoàn hảo tận dụng tốt nhất khả năng chia đôi. Khi mỗi nút chỉ có một con cùng phía, cây suy biến thành danh sách liên kết.

- Cây hoàn hảo là trường hợp lý tưởng, chiều cao tăng chậm so với số nút.
- Danh sách liên kết là trường hợp cực đoan; đường đi có thể qua mọi nút nên thao tác giảm xuống $O(n)$.

![Cấu trúc tốt nhất và xấu nhất của cây nhị phân](binary_tree.assets/binary_tree_best_worst_cases.png)

Bảng: Cấu trúc tốt nhất và xấu nhất của cây nhị phân

| Đại lượng | Cây nhị phân hoàn hảo | Danh sách liên kết |
| --- | --- | --- |
| Số nút ở mức $i$ | $2^{i-1}$ | $1$ |
| Số lá của cây cao $h$ | $2^h$ | $1$ |
| Tổng số nút của cây cao $h$ | $2^{h+1} - 1$ | $h + 1$ |
| Chiều cao của cây có $n$ nút | $\log_2 (n+1) - 1$ | $n - 1$ |

Bảng cho thấy hình dạng không chỉ là vấn đề trực quan: với cùng số nút, chiều cao quyết định số bước tối đa trên một đường đi. Vì vậy, các cấu trúc như cây AVL sẽ chủ động khôi phục cân bằng sau khi cập nhật.

Đây là mối liên hệ trực tiếp giữa cấu trúc và hiệu suất.
