# Tóm tắt

### Ôn tập trọng tâm

- Quy hoạch động phân rã bài toán và lưu lời giải của các bài toán con để tránh tính lặp, nhờ đó cải thiện đáng kể hiệu suất.
- Nếu không xét giới hạn thời gian, mọi bài toán quy hoạch động đều có thể giải bằng quay lui, tức tìm kiếm vét cạn. Tuy nhiên, cây đệ quy chứa rất nhiều bài toán con chồng lặp nên hiệu suất rất thấp. Danh sách ghi nhớ lưu kết quả đã tính và bảo đảm mỗi bài toán con chỉ được tính một lần.
- Ghi nhớ là lời giải đệ quy từ trên xuống, còn quy hoạch động tương ứng là lời giải lặp từ dưới lên, giống quá trình “điền bảng”. Vì trạng thái hiện tại thường chỉ phụ thuộc một số trạng thái cục bộ, có thể bỏ một chiều của bảng $dp$ để giảm bộ nhớ.
- Phân rã bài toán là tư tưởng thuật toán phổ biến nhưng có tính chất khác nhau trong chia để trị, quy hoạch động và quay lui.
- Bài toán quy hoạch động có ba đặc trưng lớn: bài toán con chồng lặp, cấu trúc con tối ưu và không có hậu hiệu.
- Nếu lời giải tối ưu của bài toán gốc có thể xây dựng từ các lời giải tối ưu của bài toán con thì bài toán có cấu trúc con tối ưu.
- Không có hậu hiệu nghĩa là khi đã biết một trạng thái, sự phát triển trong tương lai chỉ liên quan đến trạng thái ấy, không phụ thuộc toàn bộ quá khứ. Nhiều bài toán tối ưu tổ hợp không thỏa đặc trưng này nên khó giải hiệu quả bằng quy hoạch động.

**Bài toán ba lô**

- Ba lô là một trong những bài toán quy hoạch động điển hình nhất, với các biến thể như ba lô 0-1, ba lô vô hạn và ba lô nhiều bản.
- Trạng thái của ba lô 0-1 là giá trị lớn nhất khi dùng $i$ vật phẩm đầu với sức chứa $c$. Từ hai quyết định không chọn và chọn vật phẩm, chúng ta xác định cấu trúc con tối ưu và lập phương trình chuyển trạng thái. Khi tối ưu không gian, vì trạng thái phụ thuộc ô phía trên và phía trên bên trái, phải duyệt mảng theo chiều ngược để không ghi đè trạng thái phía trên bên trái.
- Ba lô vô hạn không giới hạn số lần chọn mỗi loại, nên phép chuyển khi chọn vật phẩm khác ba lô 0-1. Trạng thái phụ thuộc ô phía trên và bên trái, vì vậy sau khi tối ưu không gian phải duyệt thuận.
- Đổi tiền xu là biến thể của ba lô vô hạn. Mục tiêu đổi từ “giá trị lớn nhất” thành “số xu nhỏ nhất”, nên $\max()$ trong phương trình đổi thành $\min()$. Yêu cầu cũng đổi từ “không vượt sức chứa” thành “tạo đúng số tiền”, nên dùng $amt + 1$ để biểu diễn lời giải không hợp lệ.
- Đổi tiền xu II chuyển mục tiêu từ “số xu nhỏ nhất” thành “số tổ hợp”, nên phép chuyển tương ứng đổi từ $\min()$ thành phép cộng.

**Bài toán khoảng cách chỉnh sửa**

- Khoảng cách chỉnh sửa, hay Levenshtein, đo độ tương đồng giữa hai chuỗi và được định nghĩa là số bước chỉnh sửa ít nhất để biến chuỗi này thành chuỗi kia. Các thao tác gồm chèn, xóa và thay.
- Trạng thái là số bước nhỏ nhất để biến $i$ ký tự đầu của $s$ thành $j$ ký tự đầu của $t$. Khi $s[i-1] \ne t[j-1]$, có ba quyết định chèn, xóa và thay, mỗi quyết định dẫn đến một bài toán con. Khi $s[i-1] = t[j-1]$, ký tự hiện tại không cần chỉnh sửa.
- Trạng thái khoảng cách chỉnh sửa phụ thuộc ô phía trên, bên trái và phía trên bên trái. Sau tối ưu không gian, cả duyệt thuận lẫn duyệt ngược đều không tự bảo toàn mọi giá trị cần thiết. Vì vậy dùng một biến tạm lưu trạng thái phía trên bên trái, biến bài toán thành tình huống tương tự ba lô vô hạn và cho phép duyệt thuận.
