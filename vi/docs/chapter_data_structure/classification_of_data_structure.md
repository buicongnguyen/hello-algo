# Phân loại cấu trúc dữ liệu

Các cấu trúc dữ liệu thường gặp gồm mảng, danh sách liên kết, ngăn xếp, hàng đợi, bảng băm, cây, heap và đồ thị. Có thể phân loại chúng theo hai góc nhìn: **cấu trúc logic** và **cấu trúc vật lý**.

## Cấu trúc logic: tuyến tính và phi tuyến

**Cấu trúc logic mô tả quan hệ logic giữa các phần tử dữ liệu.** Trong mảng và danh sách liên kết, dữ liệu được sắp theo một thứ tự nhất định và tạo quan hệ tuyến tính. Cây tổ chức dữ liệu theo tầng từ trên xuống để biểu diễn quan hệ cha–con. Đồ thị gồm các đỉnh và cạnh, qua đó biểu diễn những quan hệ mạng phức tạp.

Như hình dưới đây, cấu trúc logic thường được chia thành hai nhóm lớn là tuyến tính và phi tuyến. Cấu trúc tuyến tính trực quan hơn vì các phần tử nối tiếp nhau theo một đường; cấu trúc phi tuyến có thể phân nhánh hoặc nối theo nhiều hướng.

- **Cấu trúc dữ liệu tuyến tính**: mảng, danh sách liên kết, ngăn xếp, hàng đợi và bảng băm, trong đó các phần tử có quan hệ tuần tự một–một.
- **Cấu trúc dữ liệu phi tuyến**: cây, heap, đồ thị và bảng băm.

Cấu trúc phi tuyến có thể tiếp tục chia thành cấu trúc cây và cấu trúc mạng.

- **Cấu trúc dạng cây**: cây, heap và bảng băm, trong đó một phần tử có thể liên hệ một–nhiều với các phần tử khác.
- **Cấu trúc dạng mạng**: đồ thị, trong đó các phần tử có quan hệ nhiều–nhiều.

Trong quan hệ tuyến tính, thường có thể lần theo phần tử trước và sau để duyệt toàn bộ dữ liệu. Trong quan hệ cây, một nút cha phân nhánh đến nhiều nút con. Trong quan hệ mạng, có thể tồn tại nhiều đường đi và chu trình, nên chỉ quan hệ trước–sau hoặc cha–con không đủ để mô tả toàn bộ kết nối. Khác biệt này ảnh hưởng trực tiếp đến thuật toán duyệt và tìm kiếm được chọn về sau.

![Cấu trúc dữ liệu tuyến tính và phi tuyến](classification_of_data_structure.assets/classification_logic_structure.png)

## Cấu trúc vật lý: lưu trữ liên tiếp và phân tán

**Khi chương trình chạy, dữ liệu đang được xử lý chủ yếu nằm trong bộ nhớ.** Có thể hình dung bộ nhớ như một bảng tính rất lớn: mỗi ô chứa một lượng dữ liệu nhất định và có một địa chỉ duy nhất.

**Hệ thống truy cập dữ liệu tại vị trí đích thông qua địa chỉ bộ nhớ.** Máy tính đánh số các vùng nhớ theo quy tắc xác định, nhờ đó chương trình có thể đọc hoặc cập nhật đúng dữ liệu cần thiết.

![Thanh RAM, không gian bộ nhớ và địa chỉ bộ nhớ](classification_of_data_structure.assets/computer_memory_location.png)

!!! tip

    So sánh bộ nhớ với bảng tính chỉ là phép ẩn dụ đơn giản để hỗ trợ hình dung. Hoạt động thực tế còn liên quan đến không gian địa chỉ, quản lý bộ nhớ, cơ chế bộ nhớ đệm, bộ nhớ ảo và bộ nhớ vật lý.

Bộ nhớ là tài nguyên được nhiều chương trình chia sẻ. Khi một vùng nhớ đã bị một chương trình chiếm dụng, chương trình khác thường không thể đồng thời dùng chính vùng đó. Vì vậy, **mức sử dụng bộ nhớ là điều kiện quan trọng khi thiết kế cấu trúc dữ liệu và thuật toán**. Chẳng hạn, mức dùng bộ nhớ cực đại của thuật toán không được vượt quá dung lượng còn trống; nếu không có một khối liên tiếp đủ lớn, phải chọn cấu trúc có thể phân bố trên nhiều vùng nhớ rời nhau.

Như hình dưới đây, **cấu trúc vật lý phản ánh cách dữ liệu được lưu trong bộ nhớ máy tính**. Hai kiểu cơ bản là lưu trữ trong không gian liên tiếp, đại diện bởi mảng, và lưu trữ trong không gian phân tán, đại diện bởi danh sách liên kết. Ở mức thấp, cách lưu quyết định phương thức truy cập, cập nhật, chèn và xóa dữ liệu. Hai kiểu này có các ưu điểm bổ sung cho nhau về thời gian và không gian.

Trong vùng liên tiếp, nếu biết địa chỉ bắt đầu và kích thước phần tử thì có thể tính ngay vị trí đích, nên truy cập ngẫu nhiên rất nhanh. Đổi lại, chèn hoặc xóa ở giữa thường phải dịch chuyển các phần tử phía sau và có thể khó cấp phát một khối liên tiếp lớn. Trong vùng phân tán, mỗi nút giữ tham chiếu đến nút kế tiếp, nhờ đó có thể tận dụng các mảnh bộ nhớ trống và thay đổi liên kết linh hoạt. Tuy nhiên, để tìm phần tử ở một thứ tự cụ thể phải lần theo liên kết từ đầu, đồng thời mỗi tham chiếu cũng chiếm thêm không gian.

![Lưu trữ trong không gian liên tiếp và phân tán](classification_of_data_structure.assets/classification_phisical_structure.png)

Điểm đáng chú ý là **mọi cấu trúc dữ liệu đều được hiện thực dựa trên mảng, danh sách liên kết hoặc sự kết hợp của cả hai**. Ngăn xếp và hàng đợi có thể dùng mảng hoặc danh sách liên kết; bảng băm thường kết hợp mảng với danh sách liên kết hoặc một cấu trúc xử lý xung đột khác.

- **Có thể hiện thực dựa trên mảng**: ngăn xếp, hàng đợi, bảng băm, cây, heap, đồ thị, ma trận và tensor có số chiều $\geq 3$.
- **Có thể hiện thực dựa trên danh sách liên kết**: ngăn xếp, hàng đợi, bảng băm, cây, heap và đồ thị.

Danh sách liên kết có thể điều chỉnh độ dài trong lúc chương trình chạy nên còn được gọi là cấu trúc dữ liệu động. Độ dài mảng không đổi sau khi khởi tạo nên mảng thường được xem là cấu trúc dữ liệu tĩnh. Dẫu vậy, có thể tạo một mảng lớn hơn rồi sao chép dữ liệu cũ để đạt mức linh hoạt giới hạn; thao tác này thực chất là cấp phát lại một vùng liên tiếp và di chuyển các phần tử.

Hiểu nền tảng này giúp dự đoán đặc tính của một cấu trúc mới. Cần xem bên trong nó tính địa chỉ liên tiếp hay lần theo tham chiếu nút, thay vì chỉ nhìn tên các phép toán công khai. Cách triển khai vật lý mới là nguyên nhân trực tiếp của nhiều khác biệt về hiệu năng.

!!! tip

    Nếu cấu trúc vật lý vẫn khó hình dung, có thể đọc trước chương tiếp theo về mảng và danh sách liên kết rồi quay lại ôn phần này.
