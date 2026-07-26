# Tóm tắt

### Ôn tập trọng tâm

- Quay lui về bản chất là tìm kiếm vét cạn. Thuật toán duyệt theo chiều sâu trong không gian lời giải để tìm trạng thái thỏa điều kiện, ghi lại lời giải rồi tiếp tục hoặc dừng tùy yêu cầu. Quá trình kết thúc khi đã tìm đủ lời giải hoặc đã duyệt hết mọi nhánh.
- Tìm kiếm quay lui gồm hai phần đối xứng là thử và quay lui. Thuật toán thực hiện một lựa chọn để cập nhật trạng thái, khám phá sâu hơn, rồi hủy đúng thay đổi đó trước khi thử nhánh khác. Khi gặp trạng thái vi phạm ràng buộc, nó trở về trạng thái trước thay vì tiếp tục mở rộng.
- Bài toán quay lui thường có nhiều ràng buộc. Có thể dùng chúng để cắt tỉa, kết thúc sớm những nhánh chắc chắn không sinh lời giải và nhờ đó giảm đáng kể số trạng thái cần thăm. Điều kiện cắt phải đúng để không bỏ sót đáp án.
- Quay lui chủ yếu giải bài toán tìm kiếm và thỏa mãn ràng buộc. Nó cũng giải được bài toán tối ưu tổ hợp, nhưng với nhiều bài toán loại này, quy hoạch động, nhánh cận hoặc heuristic có thể hiệu quả hơn.
- Bài toán hoán vị tìm mọi thứ tự có thể của một tập phần tử. Mảng `selected` ghi vị trí nào đang nằm trong trạng thái hiện tại, cắt các nhánh chọn lại cùng một phần tử và bảo đảm mỗi vị trí xuất hiện đúng một lần trên mỗi đường.
- Nếu đầu vào hoán vị chứa giá trị trùng, kết quả có thể có hoán vị trùng. Cần thêm ràng buộc để các giá trị bằng nhau chỉ tạo một lựa chọn trong mỗi vòng, thường bằng tập băm `duplicated` có phạm vi trong một lời gọi đệ quy.
- Bài toán tổng tập con tìm mọi tập con có tổng bằng giá trị đích. Vì tập con không phân biệt thứ tự nhưng cây tìm kiếm có phân biệt, các thứ tự khác nhau có thể tạo đáp án trùng. Sắp xếp dữ liệu và dùng `start` làm chỉ số bắt đầu của mỗi vòng giúp chỉ sinh chuỗi chỉ số không giảm.
- Khi mảng của bài toán tổng tập con chứa phần tử bằng nhau, các phần tử kề nhau có thể tạo nhánh trùng trong cùng một vòng. Do mảng đã sắp xếp, so sánh với phần tử bên trái cho phép bỏ những bản sao đã được thử ở cùng mức mà vẫn giữ bản sao cần thiết ở tầng sâu hơn.
- Bài toán $n$ quân hậu đặt $n$ quân hậu trên bàn cờ $n \times n$ sao cho không có hai quân tấn công nhau. Ràng buộc gồm hàng, cột, đường chéo chính và đường chéo phụ. Chiến lược đặt từng hàng bảo đảm mỗi hàng có đúng một hậu và loại cả một lớp nhánh vô ích.
- Ràng buộc cột và đường chéo được xử lý tương tự bằng các mảng boolean. Cột dùng trực tiếp chỉ số cột; đường chéo chính dùng hiệu hàng–cột, còn đường chéo phụ dùng tổng hàng+cột. Các ánh xạ này giúp kiểm tra và cập nhật xung đột trong thời gian hằng số.

Để thiết kế lời giải quay lui, trước hết cần định nghĩa rõ trạng thái, lựa chọn, điều kiện lời giải và ràng buộc. Sau đó xác định thao tác làm thay đổi trạng thái và thao tác hoàn tác chính xác của nó. Nếu trạng thái gồm nhiều cấu trúc như đường đi, cờ đã chọn và tổng còn lại, mọi phần phải được phục hồi đồng bộ trước khi nhánh anh em bắt đầu.

Cắt tỉa thường quyết định một lời giải quay lui có thực tế hay không. Sắp xếp đầu vào có thể tạo tính đơn điệu để dừng vòng sớm; mảng đánh dấu biến phép quét ràng buộc thành truy cập trực tiếp; quy tắc thứ tự chuẩn loại các hoán vị của cùng một tập con. Những tối ưu này giảm cây tìm kiếm nhưng không thay đổi tập lời giải hợp lệ.

### Hỏi đáp

**Hỏi:** Có thể hiểu quan hệ giữa quay lui và đệ quy như thế nào?

Nhìn tổng thể, quay lui là một chiến lược thuật toán, còn đệ quy là một công cụ triển khai.

- Quay lui thường được viết bằng đệ quy vì ngăn xếp lời gọi tự nhiên ghi nhớ đường lựa chọn và vị trí cần trở về. Tuy nhiên, quay lui chỉ là một ứng dụng của đệ quy trong các bài toán tìm kiếm.
- Cấu trúc đệ quy phản ánh mô hình phân rã bài toán thành bài toán con, nên còn xuất hiện trong chia để trị và quy hoạch động dạng đệ quy có ghi nhớ.
- Quay lui cũng có thể triển khai bằng vòng lặp và một ngăn xếp tường minh. Khi đó chương trình phải tự lưu trạng thái, lựa chọn tiếp theo và thao tác hoàn tác mà ngăn xếp đệ quy vốn quản lý.

Điểm phân biệt không phải cú pháp gọi hàm mà là hành vi khám phá lựa chọn rồi khôi phục trạng thái. Một hàm đệ quy chỉ tính kết quả từ các bài toán con chưa chắc là quay lui; ngược lại, một chương trình dùng ngăn xếp tường minh vẫn là quay lui nếu nó thử, cắt tỉa và hoàn tác các lựa chọn trong không gian trạng thái.
