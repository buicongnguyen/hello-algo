# Bộ nhớ truy cập ngẫu nhiên và bộ nhớ đệm *

Mảng và danh sách liên kết đại diện cho hai bố cục vật lý: lưu trữ liên tục và lưu trữ phân tán. **Bố cục vật lý ảnh hưởng lớn đến hiệu quả sử dụng RAM và bộ nhớ đệm**, từ đó tác động đến hiệu năng chương trình.

## Các thiết bị lưu trữ

Máy tính thường có ba tầng lưu trữ quan trọng: ổ đĩa, RAM và bộ nhớ đệm của CPU.

| Đặc điểm | Ổ đĩa | RAM | Bộ nhớ đệm |
| --- | --- | --- | --- |
| Mục đích | Lưu lâu dài hệ điều hành, chương trình và tệp | Giữ tạm chương trình đang chạy và dữ liệu đang xử lý | Giữ dữ liệu, chỉ dẫn được truy cập thường xuyên gần CPU |
| Khi mất điện | Dữ liệu vẫn còn | Dữ liệu mất | Dữ liệu mất |
| Dung lượng | Lớn, thường tính bằng TB | Nhỏ hơn, thường tính bằng GB | Rất nhỏ, thường tính bằng MB |
| Tốc độ | Chậm nhất | Nhanh | Nhanh nhất |
| Chi phí mỗi GB | Thấp | Cao hơn | Rất cao và thường nằm trong gói CPU |

Hệ thống lưu trữ có thể hình dung như một kim tự tháp: tầng càng gần CPU càng nhanh, càng nhỏ và càng đắt.

- Ổ đĩa không thể bị thay hoàn toàn bằng RAM vì RAM mất dữ liệu khi mất điện và đắt hơn nhiều.
- Bộ nhớ đệm không thể đồng thời rất lớn và rất nhanh. Khi dung lượng và khoảng cách vật lý tăng, độ trễ cũng tăng; nhiều tầng L1, L2 và L3 là sự cân bằng giữa tốc độ, dung lượng và chi phí.

![Kim tự tháp hệ thống lưu trữ máy tính](ram_and_cache.assets/storage_pyramid.png)

> Hệ thống lưu trữ thể hiện một sự đánh đổi điển hình giữa tốc độ, dung lượng và chi phí. Những đánh đổi tương tự xuất hiện ở hầu hết hệ thống kỹ thuật.

Ổ đĩa lưu dữ liệu dài hạn; RAM giữ dữ liệu của chương trình đang chạy; bộ nhớ đệm giữ một phần dữ liệu và chỉ dẫn được truy cập thường xuyên. Khi chương trình chạy, dữ liệu đi từ ổ đĩa vào RAM. Bộ nhớ đệm chủ động tải dữ liệu từ RAM để CPU truy cập nhanh hơn.

![Luồng dữ liệu giữa ổ đĩa, RAM, bộ nhớ đệm và CPU](ram_and_cache.assets/computer_storage_devices.png)

## Hiệu quả bộ nhớ của cấu trúc dữ liệu

Mảng và danh sách liên kết có những lợi thế khác nhau.

- Phần tử mảng nằm sát nhau và không cần lưu liên kết, nên chi phí cấu trúc thấp. Tuy nhiên, mảng cần một khối liên tục đủ lớn, có thể dư sức chứa và phải tốn thời gian lẫn không gian khi mở rộng.
- Danh sách liên kết cấp phát và giải phóng theo từng nút, linh hoạt hơn nhưng mỗi nút cần thêm liên kết.

Việc cấp phát và giải phóng lặp lại làm bộ nhớ trống ngày càng phân mảnh. Mảng lưu liên tục thường ít gây phân mảnh hơn; các nút phân tán và thay đổi thường xuyên của danh sách liên kết dễ góp phần tạo phân mảnh.

## Hiệu quả bộ nhớ đệm

Bộ nhớ đệm nhỏ hơn RAM nhưng nhanh hơn nhiều. Nếu CPU cần dữ liệu không có trong bộ nhớ đệm, **lỗi trượt bộ nhớ đệm** xảy ra và dữ liệu phải được lấy từ RAM. Tỷ lệ CPU tìm thấy dữ liệu ngay trong bộ nhớ đệm gọi là **tỷ lệ trúng bộ nhớ đệm**.

Bộ nhớ đệm khai thác một số cơ chế.

- **Dòng bộ nhớ đệm**: dữ liệu được truyền theo một khối, không phải từng byte rời rạc.
- **Nạp trước**: bộ xử lý dự đoán mẫu truy cập như tuần tự hoặc bước nhảy cố định và tải dữ liệu sớm.
- **Tính cục bộ không gian**: nếu một vị trí vừa được truy cập, dữ liệu lân cận có khả năng sớm được dùng.
- **Tính cục bộ thời gian**: dữ liệu vừa dùng có khả năng được dùng lại trong tương lai gần.

Mảng thường tận dụng bộ nhớ đệm tốt hơn danh sách liên kết.

- Nút liên kết lớn hơn vì phải giữ thêm tham chiếu, nên mỗi dòng bộ nhớ đệm chứa ít dữ liệu hữu ích hơn.
- Các nút nằm rải rác khiến một dòng tải vào có thể chứa nhiều dữ liệu không liên quan.
- Mẫu truy cập mảng dễ dự đoán hơn.
- Vùng nhớ liên tục của mảng có tính cục bộ không gian tốt.

Vì vậy mảng thường có tỷ lệ trúng bộ nhớ đệm và hiệu năng thực tế tốt hơn. Điều này không có nghĩa mảng luôn vượt trội. Nếu dữ liệu rất lớn, thay đổi mạnh và khó ước lượng sức chứa, cấu trúc dựa trên danh sách liên kết có thể tránh yêu cầu một khối liên tục lớn và chi phí mở rộng mảng.
