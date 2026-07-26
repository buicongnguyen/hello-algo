# Bộ nhớ truy cập ngẫu nhiên và bộ nhớ đệm *

Mảng và danh sách liên kết đại diện cho hai bố cục vật lý: lưu trữ liên tục và lưu trữ phân tán. **Bố cục vật lý ảnh hưởng lớn đến hiệu quả sử dụng RAM và bộ nhớ đệm**, từ đó tác động đến hiệu năng chương trình.

## Các thiết bị lưu trữ

Máy tính thường có ba tầng lưu trữ quan trọng: ổ đĩa, RAM và bộ nhớ đệm của CPU.

Ổ đĩa là thiết bị không mất dữ liệu khi tắt nguồn, dùng để lưu lâu dài hệ điều hành, chương trình và tài liệu. RAM là không gian làm việc tạm thời chứa mã và dữ liệu của chương trình đang chạy. Bộ nhớ đệm CPU sao chép một phần dữ liệu và chỉ dẫn thường dùng từ RAM để đặt gần bộ xử lý. Ba tầng có thể chứa cùng dữ liệu ở những thời điểm khác nhau, nhưng mục đích và đặc tính hiệu năng rất khác nhau.

| Đặc điểm | Ổ đĩa | RAM | Bộ nhớ đệm |
| --- | --- | --- | --- |
| Mục đích | Lưu lâu dài hệ điều hành, chương trình và tệp | Giữ tạm chương trình đang chạy và dữ liệu đang xử lý | Giữ dữ liệu, chỉ dẫn được truy cập thường xuyên gần CPU |
| Khi mất điện | Dữ liệu vẫn còn | Dữ liệu mất | Dữ liệu mất |
| Dung lượng | Lớn, thường tính bằng TB | Nhỏ hơn, thường tính bằng GB | Rất nhỏ, thường tính bằng MB |
| Tốc độ | Chậm nhất | Nhanh | Nhanh nhất |
| Chi phí mỗi GB | Thấp | Cao hơn | Rất cao và thường nằm trong gói CPU |

Hệ thống lưu trữ có thể hình dung như một kim tự tháp: tầng càng gần CPU càng nhanh, càng nhỏ và càng đắt.

Không một thiết bị kinh tế nào đồng thời cung cấp dung lượng rất lớn, lưu giữ vĩnh viễn và thời gian truy cập cực ngắn. Hệ thống đặt phần nhỏ được dùng thường xuyên ở tầng nhanh, còn phần còn lại ở tầng lớn và chậm hơn để cân bằng chi phí với tốc độ. Dữ liệu càng được lặp lại, khả năng nó còn ở tầng gần CPU càng cao và thời gian truy cập trung bình càng giảm.

Nếu CPU phải đợi ổ đĩa cho mỗi phép tính, phần lớn thời gian bộ xử lý sẽ nhàn rỗi. RAM tạo tầng trung gian nhanh hơn nhiều so với ổ đĩa, còn bộ nhớ đệm tiếp tục thu hẹp khoảng cách tốc độ giữa RAM và CPU. Dù chương trình không trực tiếp điều khiển toàn bộ hệ thống phân tầng, cách bố trí dữ liệu và thứ tự truy cập vẫn ảnh hưởng mạnh tới hiệu quả sử dụng.

- Ổ đĩa không thể bị thay hoàn toàn bằng RAM vì RAM mất dữ liệu khi mất điện và đắt hơn nhiều.
- Bộ nhớ đệm không thể đồng thời rất lớn và rất nhanh. Khi dung lượng và khoảng cách vật lý tăng, độ trễ cũng tăng; nhiều tầng L1, L2 và L3 là sự cân bằng giữa tốc độ, dung lượng và chi phí.

![Kim tự tháp hệ thống lưu trữ máy tính](ram_and_cache.assets/storage_pyramid.png)

!!! tip

    Hệ thống lưu trữ thể hiện một sự đánh đổi điển hình giữa tốc độ, dung lượng và chi phí. Những đánh đổi tương tự xuất hiện ở hầu hết hệ thống kỹ thuật: cực đại một đặc tính thường làm tăng chi phí ở đặc tính khác, nên cần chọn điểm cân bằng phù hợp với mục đích.

Ổ đĩa lưu dữ liệu dài hạn; RAM giữ dữ liệu của chương trình đang chạy; bộ nhớ đệm giữ một phần dữ liệu và chỉ dẫn được truy cập thường xuyên. Khi chương trình chạy, dữ liệu đi từ ổ đĩa vào RAM. Bộ nhớ đệm chủ động tải dữ liệu từ RAM để CPU truy cập nhanh hơn.

Nếu dữ liệu CPU yêu cầu đã có trong bộ nhớ đệm, nó được đọc rất nhanh. Nếu chưa có, hệ thống phải lấy từ RAM; nếu trang dữ liệu cũng chưa ở RAM, hệ điều hành có thể phải đọc từ ổ đĩa, chậm hơn rất nhiều. Vì thế, hai chương trình có cùng số phép tính vẫn có thời gian chạy khác biệt lớn chỉ vì mẫu truy cập bộ nhớ.

Khi khởi động chương trình, tệp thực thi và dữ liệu cần thiết được nạp từ ổ đĩa vào RAM. Khi CPU yêu cầu chỉ dẫn hoặc giá trị, phần cứng sao chép một phần sang bộ nhớ đệm. Mỗi tầng tạm giữ một phần của tầng ngay bên dưới; nếu dữ liệu không có ở tầng gần, độ trễ phát sinh trong lúc lấy từ tầng chậm hơn. Chỉ đếm phép toán tính toán vì vậy chưa đủ để dự đoán chính xác thời gian thực thi.

![Luồng dữ liệu giữa ổ đĩa, RAM, bộ nhớ đệm và CPU](ram_and_cache.assets/computer_storage_devices.png)

## Hiệu quả bộ nhớ của cấu trúc dữ liệu

Mảng và danh sách liên kết có những lợi thế khác nhau.

- Phần tử mảng nằm sát nhau và không cần lưu liên kết, nên chi phí cấu trúc thấp. Tuy nhiên, mảng cần một khối liên tục đủ lớn, có thể dư sức chứa và phải tốn thời gian lẫn không gian khi mở rộng.
- Danh sách liên kết cấp phát và giải phóng theo từng nút, linh hoạt hơn nhưng mỗi nút cần thêm liên kết.

Mảng chỉ cần quản lý địa chỉ đầu và số phần tử, nên gần như không thêm thông tin cấu trúc cho từng giá trị. Danh sách liên kết phải lưu tham chiếu đến nút tiếp theo và đôi khi cả nút trước. Giá trị càng nhỏ, tỉ lệ chi phí của các tham chiếu càng lớn; bộ cấp phát còn có thể bổ sung thông tin căn chỉnh và quản lý cho mỗi nút.

Mảng có thể dành sức chứa nhiều hơn số phần tử thực tế, nhưng danh sách liên kết cũng không luôn tiết kiệm hơn. Trường tham chiếu, tiêu đề đối tượng và đơn vị cấp phát khiến tổng bộ nhớ của nó có thể lớn hơn mảng. Lãng phí nào đáng kể hơn phụ thuộc kích thước giá trị, chiến lược mở rộng, bộ cấp phát và môi trường chạy.

Trong lúc mở rộng mảng, mảng cũ và mảng mới có thể cùng tồn tại tạm thời nên mức sử dụng đỉnh tăng lên. Danh sách liên kết tạo từng nút nhưng mỗi lần cấp phát có chi phí quản lý. Vì vậy cần xét không chỉ mức trung bình mà cả mức đỉnh, số lần cấp phát và vòng đời đối tượng.

Việc cấp phát và giải phóng lặp lại làm bộ nhớ trống ngày càng phân mảnh. Mảng lưu liên tục thường ít gây phân mảnh hơn; các nút phân tán và thay đổi thường xuyên của danh sách liên kết dễ góp phần tạo phân mảnh.

Khi phân mảnh nghiêm trọng, tổng bộ nhớ trống có thể đủ nhưng không tồn tại một khối liên tục lớn. Mở rộng mảng cần một khối mới lớn nên chịu ảnh hưởng trực tiếp. Danh sách liên kết tận dụng được các khối nhỏ, đổi lại có nhiều lần cấp phát riêng và chi phí quản lý cao hơn. Tính linh hoạt và chi phí cấp phát luôn phải được cân nhắc cùng nhau.

## Hiệu quả bộ nhớ đệm

Bộ nhớ đệm nhỏ hơn RAM nhưng nhanh hơn nhiều. Nếu CPU cần dữ liệu không có trong bộ nhớ đệm, **lỗi trượt bộ nhớ đệm** xảy ra và dữ liệu phải được lấy từ RAM. Tỷ lệ CPU tìm thấy dữ liệu ngay trong bộ nhớ đệm gọi là **tỷ lệ trúng bộ nhớ đệm**.

Tỷ lệ trúng càng cao, CPU càng ít phải chờ bộ nhớ chậm. Hiệu ứng này không hiện trong ký hiệu độ phức tạp nhưng rất quan trọng đối với hiệu năng thật. Cùng xử lý một số phần tử như nhau, việc truy cập địa chỉ liên tục hay ngẫu nhiên có thể tạo số lỗi trượt hoàn toàn khác.

Bộ nhớ đệm khai thác một số cơ chế.

- **Dòng bộ nhớ đệm**: dữ liệu được truyền theo một khối, không phải từng byte rời rạc.
- **Nạp trước**: bộ xử lý dự đoán mẫu truy cập như tuần tự hoặc bước nhảy cố định và tải dữ liệu sớm.
- **Tính cục bộ không gian**: nếu một vị trí vừa được truy cập, dữ liệu lân cận có khả năng sớm được dùng.
- **Tính cục bộ thời gian**: dữ liệu vừa dùng có khả năng được dùng lại trong tương lai gần.

Dòng bộ nhớ đệm lấy cả vùng xung quanh byte được yêu cầu để tận dụng tính cục bộ không gian. Bộ nạp trước nhận biết truy cập tuần tự hoặc có bước nhảy cố định rồi yêu cầu dòng kế tiếp sớm. Dữ liệu có tính cục bộ thời gian cao được dùng lặp lại trước khi bị dữ liệu khác đẩy khỏi bộ nhớ đệm.

Ví dụ, khi đọc mảng từ đầu tới cuối, yêu cầu phần tử đầu cũng mang theo nhiều phần tử kế tiếp trong cùng dòng. Các lần đọc sau có khả năng trúng bộ nhớ đệm, và phần cứng có thể nhận ra địa chỉ tăng đều để nạp trước. Nếu nhảy với khoảng lớn hoặc theo thứ tự ngẫu nhiên, phần lớn dữ liệu đã tải không được dùng và lợi thế giảm đi.

Mảng thường tận dụng bộ nhớ đệm tốt hơn danh sách liên kết.

- Nút liên kết lớn hơn vì phải giữ thêm tham chiếu, nên mỗi dòng bộ nhớ đệm chứa ít dữ liệu hữu ích hơn.
- Các nút nằm rải rác khiến một dòng tải vào có thể chứa nhiều dữ liệu không liên quan.
- Mẫu truy cập mảng dễ dự đoán hơn.
- Vùng nhớ liên tục của mảng có tính cục bộ không gian tốt.

Với danh sách liên kết, địa chỉ nút tiếp theo chỉ được biết sau khi đọc nút hiện tại, khiến phần cứng khó chuẩn bị song song nhiều yêu cầu. Nếu các nút nằm ở các dòng bộ nhớ đệm khác nhau, gần như mỗi lần thăm đều phải nạp dòng mới. Ngược lại, địa chỉ mảng tăng đều nên dễ dự đoán.

Sự khác biệt này không thể hiện qua nhận xét rằng cả hai phép duyệt đều tuyến tính. Ký hiệu tiệm cận mô tả tốc độ tăng của số phép toán nhưng che giấu thời gian chờ bộ nhớ và số byte truyền mỗi lần. Trên phần cứng thật, các thuật toán cùng bậc vẫn có thể khác nhau đáng kể do tỷ lệ trúng bộ nhớ đệm, dự đoán nhánh và cách cấp phát.

Vì vậy mảng thường có tỷ lệ trúng bộ nhớ đệm và hiệu năng thực tế tốt hơn. Điều này không có nghĩa mảng luôn vượt trội. Nếu dữ liệu rất lớn, thay đổi mạnh và khó ước lượng sức chứa, cấu trúc dựa trên danh sách liên kết có thể tránh yêu cầu một khối liên tục lớn và chi phí mở rộng mảng.

Quyết định cuối cùng cần kết hợp số phép toán lý thuyết, kích thước giá trị, cách dữ liệu tăng, tần suất duyệt và đặc tính phần cứng. Với đoạn mã quan trọng về hiệu năng, phép đo bằng dữ liệu đầu vào thật là cách an toàn nhất để kiểm chứng giả định.

Khi đo, hãy dùng kích thước và thứ tự truy cập thực tế, đồng thời tách thời gian chuẩn bị khỏi thao tác cốt lõi. Ví dụ quá nhỏ có thể nằm trọn trong bộ nhớ đệm nên che giấu khác biệt; thử nghiệm quá nhân tạo lại không phản ánh mẫu cấp phát của ứng dụng. Quy trình tốt là dùng phân tích lý thuyết để thu hẹp lựa chọn rồi xác nhận bằng thí nghiệm có thể tái lập.
