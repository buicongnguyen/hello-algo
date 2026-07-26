# Bài toán dựng cây nhị phân

!!! question

    Cho kết quả duyệt tiền tự `preorder` và duyệt trung tự `inorder` của một cây nhị phân, hãy dựng lại cây và trả về nút gốc. Giả sử cây không có hai nút cùng giá trị, như minh họa dưới đây.

![Dữ liệu ví dụ để dựng cây nhị phân](build_binary_tree_problem.assets/build_tree_example.png)

### Xác định đây có phải bài toán chia để trị hay không

Bài toán ban đầu là dựng một cây nhị phân từ `preorder` và `inorder`; đây là một bài toán chia để trị điển hình.

- **Bài toán có thể phân rã**: Từ góc nhìn chia để trị, chúng ta chia bài toán gốc thành hai bài toán con là dựng cây con trái và cây con phải, cộng với một thao tác khởi tạo nút gốc. Với mỗi cây con, tiếp tục dùng cùng cách phân rã thành các cây nhỏ hơn cho đến bài toán con nhỏ nhất là cây rỗng.
- **Các bài toán con độc lập**: Cây con trái và cây con phải không chồng lấp và độc lập với nhau. Khi dựng cây trái, chúng ta chỉ cần những phần của hai thứ tự duyệt thuộc cây trái; cây phải cũng tương tự.
- **Có thể hợp nhất lời giải bài toán con**: Sau khi có cây con trái và phải, nối chúng vào nút gốc là thu được lời giải của bài toán ban đầu.

### Cách phân chia cây con

Phân tích trên cho thấy có thể dùng chia để trị, **nhưng làm thế nào phân chia cây con trái và phải từ thứ tự duyệt tiền tự `preorder` và trung tự `inorder`**?

Theo định nghĩa, cả `preorder` và `inorder` đều có thể chia thành ba phần.

- Duyệt tiền tự: `[ Nút gốc | Cây con trái | Cây con phải ]`; chẳng hạn cây trong hình trên tương ứng với `[ 3 | 9 | 2 1 7 ]`.
- Duyệt trung tự: `[ Cây con trái | Nút gốc ｜ Cây con phải ]`; chẳng hạn cây trong hình trên tương ứng với `[ 9 | 3 | 1 2 7 ]`.

Với dữ liệu trong hình làm ví dụ, chúng ta thực hiện các bước sau để thu được kết quả phân chia.

1. Phần tử đầu tiên 3 trong thứ tự tiền tự là giá trị của nút gốc.
2. Tìm chỉ số của nút gốc 3 trong `inorder`, rồi dùng chỉ số này chia `inorder` thành `[ 9 | 3 ｜ 1 2 7 ]`.
3. Từ kết quả chia `inorder`, dễ thấy cây trái và cây phải lần lượt có 1 và 3 nút; nhờ đó chia được `preorder` thành `[ 3 | 9 | 2 1 7 ]`.

![Phân chia cây con trong thứ tự tiền tự và trung tự](build_binary_tree_problem.assets/build_tree_preorder_inorder_division.png)

### Mô tả khoảng cây con bằng biến

Theo cách phân chia trên, **chúng ta đã có khoảng chỉ số của nút gốc, cây con trái và cây con phải trong `preorder` và `inorder`**. Để mô tả các khoảng này, chúng ta dùng một số biến chỉ số.

- Ký hiệu chỉ số của nút gốc cây hiện tại trong `preorder` là $i$.
- Ký hiệu chỉ số của nút gốc cây hiện tại trong `inorder` là $m$.
- Ký hiệu khoảng chỉ số của cây hiện tại trong `inorder` là $[l, r]$.

Như bảng dưới đây, các biến này biểu diễn được chỉ số nút gốc trong `preorder` và khoảng chỉ số cây con trong `inorder`.

Bảng: Chỉ số nút gốc và cây con trong thứ tự tiền tự, trung tự

|              | Chỉ số nút gốc trong `preorder` | Khoảng chỉ số cây con trong `inorder` |
| ------------ | -------------------------------- | ------------------------------------- |
| Cây hiện tại | $i$                              | $[l, r]$                              |
| Cây con trái | $i + 1$                          | $[l, m-1]$                            |
| Cây con phải | $i + 1 + (m - l)$                | $[m+1, r]$                            |

Lưu ý rằng $(m-l)$ trong chỉ số nút gốc của cây con phải có nghĩa là “số nút trong cây con trái”. Nên kết hợp bảng với hình dưới để hiểu trực quan hơn.

![Biểu diễn khoảng chỉ số của nút gốc và hai cây con](build_binary_tree_problem.assets/build_tree_division_pointers.png)

### Triển khai mã

Để truy vấn $m$ hiệu quả hơn, chúng ta dùng bảng băm `hmap` lưu ánh xạ từ mỗi phần tử của mảng `inorder` tới chỉ số của nó:

```python
# Mã dựng cây chính thức được chèn từ nguồn đã khóa.
```

Hình dưới minh họa quá trình đệ quy dựng cây nhị phân. Mỗi nút được tạo trong quá trình “đệ quy” đi xuống, còn mỗi cạnh (tham chiếu) được nối trong quá trình “trả về” đi lên.

**Bước 1**

![Bước 1 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step1.png)

**Bước 2**

![Bước 2 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step2.png)

**Bước 3**

![Bước 3 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step3.png)

**Bước 4**

![Bước 4 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step4.png)

**Bước 5**

![Bước 5 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step5.png)

**Bước 6**

![Bước 6 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step6.png)

**Bước 7**

![Bước 7 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step7.png)

**Bước 8**

![Bước 8 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step8.png)

**Bước 9**

![Bước 9 của quá trình đệ quy dựng cây nhị phân](build_binary_tree_problem.assets/built_tree_step9.png)

Kết quả chia thứ tự duyệt tiền tự `preorder` và trung tự `inorder` trong từng lời gọi đệ quy được thể hiện ở hình dưới.

![Kết quả phân chia trong từng lời gọi đệ quy](build_binary_tree_problem.assets/built_tree_overall.png)

Gọi số nút của cây là $n$. Khởi tạo mỗi nút, tức thực thi một lần hàm đệ quy `dfs()`, cần thời gian $O(1)$. **Vì vậy, độ phức tạp thời gian tổng thể là $O(n)$**.

Bảng băm lưu ánh xạ từ phần tử `inorder` tới chỉ số, dùng không gian $O(n)$. Trong trường hợp xấu nhất, khi cây nhị phân suy biến thành danh sách liên kết, độ sâu đệ quy đạt $n$ và các khung ngăn xếp dùng $O(n)$ không gian. **Vì vậy, độ phức tạp không gian tổng thể là $O(n)$**.
