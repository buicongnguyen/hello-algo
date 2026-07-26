# Tóm tắt

### Ôn tập trọng tâm

- Đồ thị gồm các đỉnh và cạnh, có thể biểu diễn bằng một tập đỉnh và một tập cạnh.
- So với quan hệ tuyến tính của danh sách liên kết và quan hệ phân cấp của cây, quan hệ mạng do đồ thị mô hình hóa có độ tự do cao hơn nhiều và vì vậy phức tạp hơn.
- Trong đồ thị có hướng, cạnh có chiều; trong đồ thị liên thông, mọi đỉnh đều đi đến được từ bất kỳ đỉnh khác; trong đồ thị có trọng số, mỗi cạnh mang một trọng số.
- Ma trận kề dùng ma trận để biểu diễn đồ thị. Mỗi hàng và cột ứng với một đỉnh, còn phần tử $1$ hoặc $0$ cho biết hai đỉnh có cạnh hay không. Ma trận kề thao tác cạnh rất nhanh nhưng tiêu tốn nhiều không gian.
- Danh sách kề dùng nhiều danh sách liên kết: danh sách thứ $i$ ứng với đỉnh $i$ và lưu mọi đỉnh kề. Cách này dùng ít không gian hơn nhưng phải duyệt danh sách khi tìm cạnh.
- Khi danh sách liên kết trong danh sách kề quá dài, có thể chuyển nó thành cây đỏ–đen hoặc bảng băm để cải thiện hiệu suất tra cứu.
- Xét về thuật toán, ma trận kề đổi không gian lấy thời gian, còn danh sách kề đổi thời gian lấy không gian.
- Đồ thị mô hình hóa nhiều hệ thống thực như mạng xã hội, tuyến tàu điện và mạng giao thông.
- Cây là trường hợp đặc biệt của đồ thị; phép duyệt cây là trường hợp đặc biệt của phép duyệt đồ thị.
- Tìm kiếm theo chiều rộng đi từ gần đến xa theo từng lớp và thường dùng hàng đợi.
- Tìm kiếm theo chiều sâu đi xa nhất trên một đường rồi quay lui, thường được cài đặt bằng đệ quy.

### Hỏi và đáp

**Hỏi**: Đường đi được định nghĩa là chuỗi đỉnh hay chuỗi cạnh?

Các phiên bản ngôn ngữ khác nhau của Wikipedia từng diễn đạt không hoàn toàn giống nhau: phiên bản tiếng Anh mô tả đường đi là chuỗi cạnh nối một chuỗi đỉnh, trong khi một số bản dịch mô tả trực tiếp là chuỗi đỉnh.

Trong cuốn sách này, đường đi được xem là chuỗi cạnh chứ không chỉ là chuỗi đỉnh. Lý do là giữa hai đỉnh có thể tồn tại nhiều cạnh khác nhau; khi đó mỗi lựa chọn cạnh tạo thành một đường đi khác dù chuỗi đỉnh giống nhau. Khi làm bài, cần đọc rõ giả định đồ thị đơn hay đa đồ thị để dùng định nghĩa phù hợp.

**Hỏi**: Trong đồ thị không liên thông có đỉnh không thể đi đến được không?

Có. Nếu bắt đầu từ một đỉnh trong đồ thị không liên thông, sẽ có ít nhất một đỉnh khác không thể đi đến. Những đỉnh đi đến được lẫn nhau tạo thành một thành phần liên thông.

Để duyệt toàn bộ đồ thị không liên thông, cần lần lượt kiểm tra mọi đỉnh. Mỗi khi gặp một đỉnh chưa được thăm, hãy dùng nó làm điểm bắt đầu của một lượt BFS hoặc DFS mới. Lặp như vậy sẽ bao phủ mọi thành phần liên thông.

**Hỏi**: Các đỉnh kề trong một danh sách kề có bắt buộc theo thứ tự nào không?

Không. Chúng có thể xuất hiện theo bất kỳ thứ tự nào mà vẫn biểu diễn cùng tập cạnh. Vì BFS và DFS xử lý các đỉnh kề theo thứ tự lưu trữ, thay đổi thứ tự này có thể làm thay đổi thứ tự duyệt nhưng không làm thay đổi tập đỉnh đi đến được.

Trong thực tế, danh sách kề đôi khi được sắp xếp theo quy tắc cụ thể, chẳng hạn theo thời điểm thêm đỉnh hoặc theo giá trị đỉnh. Thứ tự có thể giúp kết quả duyệt ổn định và hỗ trợ tìm nhanh đỉnh có giá trị cực trị, nhưng việc duy trì sắp xếp cũng phát sinh chi phí cập nhật.
