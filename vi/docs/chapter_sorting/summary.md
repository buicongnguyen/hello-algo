# Tổng kết

### Ôn tập trọng tâm

- Sắp xếp nổi bọt tạo thứ tự bằng cách đổi các phần tử kề nhau. Thêm cờ phát hiện một lượt không có hoán đổi giúp trường hợp tốt nhất kết thúc trong $O(n)$.
- Mỗi lượt của sắp xếp chèn lấy một phần tử chưa sắp xếp và chèn vào đúng vị trí trong tiền tố đã có thứ tự. Dù có độ phức tạp $O(n^2)$, thuật toán rất hữu ích với đoạn ngắn vì thao tác nhẹ và tận dụng được thứ tự sẵn có.
- Sắp xếp nhanh dựa vào phân hoạch theo chốt. Nếu liên tục chọn chốt xấu, thời gian có thể suy giảm thành $O(n^2)$. Chọn trung vị ba hoặc chốt ngẫu nhiên làm giảm xác suất suy giảm; chỉ đệ quy trên đoạn ngắn hơn giúp giới hạn ngăn xếp ở $O(\log n)$.
- Sắp xếp trộn gồm giai đoạn chia và trộn, thể hiện rõ chiến lược chia để trị. Bản mảng cần bộ nhớ phụ $O(n)$, còn bản danh sách liên kết có thể tối ưu không gian sắp xếp xuống $O(1)$ bằng cách nối lại các nút.
- Sắp xếp theo thùng phân phối dữ liệu vào các thùng, sắp riêng từng thùng rồi ghép kết quả. Nó phù hợp với lượng dữ liệu rất lớn; điều kiện quan trọng là phân phối phần tử đủ đều.
- Sắp xếp đếm xem mỗi giá trị nguyên như một thùng và tạo thứ tự từ tần suất. Thuật toán thích hợp khi số phần tử lớn nhưng miền giá trị nhỏ, đồng thời dữ liệu phải ánh xạ được sang số nguyên không âm mà không đổi quan hệ thứ tự.
- Sắp xếp theo cơ số xử lý từng chữ số bằng một phép sắp ổn định, từ chữ số thấp lên chữ số cao. Dữ liệu phải có biểu diễn số chữ số hữu hạn và không quá lớn.
- Không có thuật toán nào đồng thời luôn nhanh, ổn định, tại chỗ, thích nghi và áp dụng cho mọi kiểu dữ liệu. Lựa chọn thực tế phải dựa vào quy mô, bộ nhớ, phân bố khóa, tính ổn định và trạng thái có thứ tự sẵn của đầu vào.
- Hình dưới so sánh các thuật toán chính theo hiệu quả, tính ổn định, tính tại chỗ và tính thích nghi.

![So sánh các thuật toán sắp xếp](summary.assets/sorting_algorithms_comparison.png)

### Hỏi đáp

**Hỏi**: Khi nào tính ổn định của thuật toán sắp xếp là cần thiết?

Trong sắp xếp nhiều tầng, một đối tượng có nhiều thuộc tính được xét lần lượt. Ví dụ, danh sách sinh viên đã sắp theo tên là `(A, 180) (B, 185) (C, 170) (D, 170)`, sau đó được sắp theo chiều cao. Nếu thuật toán không ổn định, kết quả có thể là `(D, 170) (C, 170) (A, 180) (B, 185)`. Hai sinh viên C và D cùng chiều cao đã đảo chỗ, làm mất thứ tự tên từ lượt trước. Thuật toán ổn định giữ C trước D.

**Hỏi**: Trong phân hoạch với phần tử trái làm chốt, có thể đổi thứ tự “tìm từ phải sang trái” và “tìm từ trái sang phải” không?

Không. Bước cuối của `partition()` đổi `nums[left]` với `nums[i]`, nên trước phép đổi phải bảo đảm giá trị tại `i` không lớn hơn chốt. Nếu tìm từ trái trước và không gặp phần tử lớn hơn chốt, vòng lặp có thể kết thúc khi `i == j` ở một phần tử vẫn lớn hơn `nums[left]`. Đổi chúng sẽ đưa phần tử lớn sang bên trái chốt và phá bất biến phân hoạch.

Với `[0, 0, 0, 0, 1]`, tìm từ trái trước có thể tạo `[1, 0, 0, 0, 0]`, rõ ràng sai. Khi chốt là phần tử phải, lập luận đối xứng: phải tìm từ trái sang phải trước.

**Hỏi**: Vì sao chỉ đệ quy trên đoạn ngắn hơn có thể bảo đảm độ sâu không vượt $\log n$?

Độ sâu là số lời gọi chưa trả về. Sau mỗi lần phân hoạch, đoạn ngắn hơn dài không quá một nửa đoạn hiện tại. Nếu trường hợp xấu nhất luôn đúng bằng một nửa, số lần tiếp tục chia là $\log n$.

Trong bản chưa tối ưu, thuật toán có thể đệ quy liên tục trên đoạn dài hơn với kích thước $n$, $n - 1$, $\dots$, $2$, $1$, khiến độ sâu đạt $n$. Chuyển nhánh dài thành vòng lặp loại bỏ sự tích lũy đó.

**Hỏi**: Khi mọi phần tử bằng nhau, quick sort có tốn $O(n^2)$ không?

Có thể có nếu dùng phân hoạch hai phía thông thường. Một cách xử lý là phân hoạch ba đường: nhỏ hơn, bằng và lớn hơn chốt. Chỉ đệ quy vào phần nhỏ hơn và lớn hơn; khi toàn bộ phần tử bằng nhau, một lượt phân hoạch đã hoàn tất, tránh trường hợp $O(n^2)$.

**Hỏi**: Vì sao trường hợp xấu nhất của bucket sort là $O(n^2)$?

Nếu toàn bộ phần tử bị phân phối vào cùng một thùng, lợi ích chia nhỏ biến mất. Khi thuật toán sắp bên trong thùng đó có thời gian bậc hai, toàn bộ bucket sort cũng tốn $O(n^2)$.
