# Bài tập

## Ôn tập khái niệm

### Cây hoàn chỉnh, đầy đủ và hoàn hảo

Hai mảng sau biểu diễn cây nhị phân theo thứ tự mức; `None` đánh dấu vị trí rỗng:

- Cây A: `[1, 2, 3, 4, 5, 6]`
- Cây B: `[1, 2, 3, None, None, 6, 7]`

<!-- numbered-subquestions -->

1. Cây nào là cây nhị phân hoàn chỉnh?
2. Cây nào là cây nhị phân đầy đủ, nghĩa là mọi nút không phải lá đều có đúng hai con?
3. Có cây nào là cây nhị phân hoàn hảo không? Giải thích cho từng cây.

??? success "Đáp án"

    1. Cây A là cây hoàn chỉnh: chỉ mức thấp nhất chưa đầy và các nút tại mức đó nằm liên tiếp từ trái sang phải. Cây B không hoàn chỉnh vì có vị trí rỗng ở bên trái trong khi bên phải vẫn còn nút.

    2. Cây B là cây đầy đủ: nút 1 và 3 đều có hai con, còn mọi nút khác là lá. Cây A không đầy đủ vì nút 3 chỉ có một con là nút 6.

    3. Không cây nào hoàn hảo vì mức thấp nhất của cả hai đều chưa được lấp đầy hoàn toàn.

### Ba thứ tự duyệt trên cùng một cây

Lưu mảng `[1, 2, 3, 4, 5, 6, 7]` theo thứ tự mức trong một cây nhị phân hoàn chỉnh.

<!-- numbered-subquestions -->

1. Vẽ cây.
2. Viết chuỗi duyệt tiền thứ tự, trung thứ tự và hậu thứ tự.
3. Trong chuỗi trung thứ tự, các đoạn bên trái và bên phải nút gốc 1 tương ứng với phần nào của cây?

??? success "Đáp án"

    1. Cây có dạng:

        ```text
              1
            /   \
           2     3
          / \   / \
         4   5 6   7
        ```

    2. Tiền thứ tự là `1, 2, 4, 5, 3, 6, 7`; trung thứ tự là `4, 2, 5, 1, 6, 3, 7`; hậu thứ tự là `4, 5, 2, 6, 7, 3, 1`.

    3. Đoạn `4, 2, 5` là chuỗi trung thứ tự của cây con trái; đoạn `6, 3, 7` là chuỗi trung thứ tự của cây con phải.

### So sánh hai cây tìm kiếm nhị phân

Chèn lần lượt từng chuỗi sau vào một BST rỗng:

- Chuỗi A: `[4, 2, 6, 1, 3, 5, 7]`
- Chuỗi B: `[1, 2, 3, 4, 5, 6, 7]`

<!-- numbered-subquestions -->

1. Với mỗi cây, liệt kê các nút được thăm khi tìm 7.
2. Nếu chiều cao là số cạnh từ gốc đến lá xa nhất, chiều cao mỗi cây là bao nhiêu?
3. Tìm 7 có hiệu quả như nhau không? Giải thích bằng hình dạng cây và đường tìm kiếm.

??? success "Đáp án"

    1. Cây A có đường đi `4 → 6 → 7`; cây B có đường đi `1 → 2 → 3 → 4 → 5 → 6 → 7`.

    2. Cây A có mọi mức được lấp đầy và cao 2. Cây B chỉ có con phải và cao 6.

    3. Không. Thứ tự chèn làm thay đổi hình dạng và chiều cao BST. Cây A chỉ cần thăm 3 nút, còn cây B phải thăm cả 7 nút. Cây càng cao thì đường tìm kiếm xấu nhất càng dài.

## Bài tập lập trình

### Độ sâu lớn nhất của cây nhị phân

Cho nút gốc `root` của cây nhị phân. Mỗi nút chứa một số nguyên và tham chiếu đến con trái, con phải.

Độ sâu lớn nhất trong bài này là **số nút** trên đường từ gốc đến lá xa nhất. Trả về độ sâu lớn nhất; cây rỗng có độ sâu 0. Hãy dùng đệ quy.

??? tip "Gợi ý"

    1. Vì đếm theo số nút, cây chỉ có gốc có độ sâu lớn nhất là 1.
    2. Cho hàm đệ quy trả về độ sâu lớn nhất của cây con có gốc là nút hiện tại.
    3. Nút rỗng trả 0; nút không rỗng trả `max(depth(left), depth(right)) + 1`.

[LeetCode](https://leetcode.com/problems/maximum-depth-of-binary-tree/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }

### Duyệt cây theo từng mức

Cho `root` của cây nhị phân. Dùng hàng đợi để thăm mọi nút từ trên xuống dưới và từ trái sang phải trong từng mức.

Trả về mảng hai chiều: mảng con thứ nhất chứa giá trị ở mức gốc, mảng con thứ hai chứa mức kế tiếp, v.v. Cây rỗng trả về mảng rỗng.

??? tip "Gợi ý"

    1. Duyệt theo mức xử lý nút vào hàng đợi trước, vì vậy hãy dùng hàng đợi.
    2. Ở đầu mỗi vòng, mọi nút đang có trong hàng đợi đều thuộc cùng một mức.
    3. Ghi lại độ dài hàng đợi rồi lấy đúng số nút đó; đồng thời đưa các nút con vào cuối hàng đợi cho vòng sau.

[LeetCode](https://leetcode.com/problems/binary-tree-level-order-traversal/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }

### Phần tử nhỏ thứ k trong BST

Một BST có `n` nút với giá trị phân biệt. Nếu sắp toàn bộ giá trị tăng dần, vị trí được đánh số từ 1.

Cho `root` và số nguyên `k` thỏa `1 <= k <= n`, hãy trả về giá trị ở vị trí `k`. Tìm trực tiếp trong khi duyệt trung thứ tự thay vì thu thập toàn bộ giá trị trước.

??? tip "Gợi ý"

    1. Duyệt trung thứ tự của BST thăm các giá trị từ nhỏ đến lớn.
    2. Xử lý cây con trái, nút hiện tại rồi cây con phải; tăng bộ đếm khi thăm nút hiện tại.
    3. Khi bộ đếm lần đầu bằng `k`, giá trị nút hiện tại là đáp án và có thể dừng duyệt.

[LeetCode](https://leetcode.com/problems/kth-smallest-element-in-a-bst/){ .rounded-button .exercise-button target="_blank" rel="noopener noreferrer" }
