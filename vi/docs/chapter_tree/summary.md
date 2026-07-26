# Tóm tắt

### Nội dung chính

- Cây nhị phân là cấu trúc dữ liệu phi tuyến thể hiện tư duy chia đôi. Mỗi nút chứa một giá trị và hai tham chiếu đến con trái, con phải.
- Với một nút, cây tạo bởi con trái và mọi nút phía dưới gọi là cây con trái; cây con phải được định nghĩa tương tự.
- Các thuật ngữ quan trọng gồm nút gốc, nút lá, mức, bậc, cạnh, chiều cao và độ sâu.
- Khởi tạo, chèn và xóa nút bằng biểu diễn liên kết đều dựa trên việc tạo nút rồi thay đổi tham chiếu.
- Các dạng thường gặp gồm cây nhị phân hoàn hảo, hoàn chỉnh, đầy đủ và cân bằng. Cây hoàn hảo là dạng lý tưởng; danh sách liên kết là trường hợp suy biến tệ nhất.
- Có thể biểu diễn cây bằng mảng theo thứ tự mức, ghi cả vị trí rỗng và dùng công thức chỉ số để thay cho tham chiếu cha–con.
- Duyệt theo mức là BFS và thường dùng hàng đợi. Duyệt tiền thứ tự, trung thứ tự và hậu thứ tự là DFS và thường dùng đệ quy.
- BST hỗ trợ tìm, chèn, xóa trong $O(\log n)$ khi cân bằng; khi suy biến thành danh sách liên kết, các thao tác giảm xuống $O(n)$.
- Cây AVL là BST cân bằng, dùng phép xoay để khôi phục cân bằng sau khi chèn hoặc xóa.
- Bốn trường hợp xoay gồm xoay phải, xoay trái, xoay trái rồi phải và xoay phải rồi trái; quá trình sửa cân bằng đi từ nút thay đổi lên gốc.

Khi chọn cách biểu diễn hoặc một loại cây, cần xét thao tác nào xuất hiện thường xuyên nhất. Mảng tận dụng bộ nhớ liên tục và phù hợp với cây hoàn chỉnh; nút liên kết linh hoạt hơn cho cây thưa. BST khai thác thứ tự để rút ngắn đường tìm kiếm, còn AVL bổ sung chiều cao và chi phí xoay để bảo đảm cây không bị lệch sau nhiều lần cập nhật. Cùng một tập giá trị có thể tạo ra hình dạng và hiệu suất rất khác nhau tùy thứ tự chèn.

### Hỏi đáp

**Hỏi:** Với cây chỉ có một nút, chiều cao cây và độ sâu của gốc đều là $0$ phải không?

Đúng, nếu chiều cao và độ sâu được định nghĩa bằng số cạnh trên đường đi. Một số tài liệu đếm số nút nên cần đọc kỹ quy ước.

**Hỏi:** “Một chuỗi thao tác” khi chèn hoặc xóa cây nhị phân có nghĩa là gì?

Một thao tác có ý nghĩa thường cần nhiều thay đổi tham chiếu phối hợp. Chẳng hạn, xóa một nút BST phải tìm nút, chọn trường hợp theo số con, nối lại nút cha và đôi khi tìm nút kế tiếp trung thứ tự. Việc giải phóng tài nguyên phụ thuộc cơ chế quản lý bộ nhớ của ngôn ngữ.

Trước khi đổi liên kết, mã cần giữ lại những tham chiếu sẽ còn được dùng. Sau khi đổi, các thông tin phụ như chiều cao cũng phải được cập nhật theo đúng thứ tự. Vì vậy, một thao tác ở mức giao diện thường bao gồm nhiều bước nguyên tử ở mức nút.

**Hỏi:** Vì sao DFS có tiền thứ tự, trung thứ tự và hậu thứ tự?

Mỗi thứ tự chọn một thời điểm khác nhau để xử lý gốc so với hai cây con. Trong BST, quan hệ `trái < gốc < phải` kết hợp với ưu tiên “trái $\rightarrow$ gốc $\rightarrow$ phải” tạo ra chuỗi giá trị tăng dần.

**Hỏi:** Sau xoay phải, liên kết giữa `node` và nút cha có bị mất không?

Không. Hàm xoay nhận gốc của một cây con và trả lại gốc mới. Lời gọi ở tầng trên gắn giá trị trả về vào tham chiếu con thích hợp của nút cha; việc nối cây con với phần còn lại của cây nằm ở tầng gọi.

**Hỏi:** Vì sao một số hàm C++ là `private`, còn `height()` có thể là `public`?

Phạm vi truy cập phản ánh hợp đồng của lớp. `updateHeight()` chỉ là bước nội bộ của chèn, xóa và xoay nên không nên để người dùng gọi riêng. `height()` là thao tác truy vấn hợp lệ tương tự `vector.size()`, vì vậy có thể công khai.

**Hỏi:** Làm sao dựng BST cân bằng từ một tập dữ liệu? Chọn gốc có quan trọng không?

Có. Có thể sắp xếp dữ liệu, chọn phần tử giữa làm gốc rồi đệ quy dựng hai nửa. Cách chọn này giảm chiều cao và giúp cây gần cân bằng.

**Hỏi:** Trong Java, so sánh chuỗi có luôn dùng `equals()` không?

`==` trên kiểu tham chiếu kiểm tra hai biến có trỏ cùng đối tượng; `equals()` kiểm tra nội dung theo hợp đồng của lớp. Vì mục tiêu thường là so sánh nội dung chuỗi nên nên dùng `equals()`, ngay cả khi một số literal tình cờ cùng nằm trong string pool.

**Hỏi:** Trước mức cuối, hàng đợi BFS có thể chứa $2^h$ nút không?

Có trong cây đầy đủ. Ví dụ cây cao $h = 2$ có $n = 7$ nút và mức cuối chứa $4 = 2^h = (n + 1) / 2$ nút.
