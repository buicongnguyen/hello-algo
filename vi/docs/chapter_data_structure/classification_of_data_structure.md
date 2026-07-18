# Phân loại cấu trúc dữ liệu

Các cấu trúc dữ liệu thường gặp gồm mảng, danh sách liên kết, ngăn xếp, hàng đợi, bảng băm, cây, đống và đồ thị. Chúng ta có thể phân loại chúng theo hai góc nhìn: **cấu trúc logic** và **cấu trúc vật lý**.

## Cấu trúc logic: tuyến tính và phi tuyến

**Cấu trúc logic mô tả quan hệ logic giữa các phần tử dữ liệu.** Trong mảng và danh sách liên kết, dữ liệu được sắp theo một thứ tự nhất định, tạo quan hệ tuyến tính. Trong cây, dữ liệu được tổ chức phân cấp từ trên xuống dưới, thể hiện quan hệ cha–con. Đồ thị gồm các đỉnh và cạnh, biểu diễn những quan hệ mạng phức tạp.

Cấu trúc logic thường được chia thành hai nhóm lớn.

- **Cấu trúc tuyến tính**: mảng, danh sách liên kết, ngăn xếp và hàng đợi; các phần tử có quan hệ tuần tự một-một.
- **Cấu trúc phi tuyến**: cây, đống và đồ thị; các phần tử không nằm trên một chuỗi duy nhất. Tùy cách xử lý xung đột, bảng băm có thể kết hợp cả cấu trúc tuyến tính và phi tuyến.

Cấu trúc phi tuyến có thể tiếp tục chia thành:

- **Cấu trúc dạng cây**: cây và đống, trong đó một phần tử có thể liên hệ với nhiều phần tử con.
- **Cấu trúc dạng mạng**: đồ thị, trong đó các phần tử có quan hệ nhiều-nhiều.

![Cấu trúc dữ liệu tuyến tính và phi tuyến](classification_of_data_structure.assets/classification_logic_structure.png)

## Cấu trúc vật lý: lưu trữ liên tục và phân tán

**Khi chương trình chạy, dữ liệu đang được xử lý chủ yếu nằm trong bộ nhớ.** Có thể hình dung bộ nhớ như một bảng tính rất lớn: mỗi ô chứa một lượng dữ liệu nhất định và có một địa chỉ duy nhất.

Hệ thống dùng địa chỉ bộ nhớ để truy cập dữ liệu tại vị trí cần thiết. Nhờ địa chỉ này, chương trình có thể đọc hoặc cập nhật dữ liệu trong bộ nhớ.

![Thanh RAM, vùng nhớ và địa chỉ bộ nhớ](classification_of_data_structure.assets/computer_memory_location.png)

> So sánh bộ nhớ với bảng tính chỉ là một phép minh họa đơn giản. Hoạt động thực tế còn liên quan đến không gian địa chỉ, quản lý bộ nhớ, bộ nhớ đệm, bộ nhớ ảo và bộ nhớ vật lý.

Bộ nhớ là tài nguyên dùng chung. Khi một vùng nhớ đã được một chương trình chiếm dụng, chương trình khác thường không thể sử dụng đồng thời vùng đó. Vì vậy, **mức sử dụng bộ nhớ là một yếu tố quan trọng khi thiết kế cấu trúc dữ liệu và thuật toán**. Chẳng hạn, mức dùng bộ nhớ cực đại của thuật toán không được vượt quá phần bộ nhớ còn trống; nếu không có một khối nhớ liên tục đủ lớn, chúng ta phải chọn cấu trúc có thể lưu trên các vùng nhớ phân tán.

**Cấu trúc vật lý phản ánh cách dữ liệu được lưu trong bộ nhớ máy tính.** Hai hình thức cơ bản là lưu trữ trong không gian liên tục, tiêu biểu là mảng, và lưu trữ trong không gian phân tán, tiêu biểu là danh sách liên kết. Cách lưu trữ ở mức thấp ảnh hưởng trực tiếp đến cách truy cập, cập nhật, chèn và xóa dữ liệu. Hai hình thức này có những đặc điểm bù trừ về thời gian và không gian.

![Lưu trữ trong không gian liên tục và phân tán](classification_of_data_structure.assets/classification_phisical_structure.png)

Mọi cấu trúc dữ liệu đều được xây dựng từ mảng, danh sách liên kết hoặc sự kết hợp của cả hai.

- **Có thể triển khai dựa trên mảng**: ngăn xếp, hàng đợi, bảng băm, cây, đống, đồ thị, ma trận và tensor có từ ba chiều trở lên.
- **Có thể triển khai dựa trên danh sách liên kết**: ngăn xếp, hàng đợi, bảng băm, cây, đống và đồ thị.

Sau khi khởi tạo, danh sách liên kết vẫn có thể thay đổi độ dài trong lúc chương trình chạy nên thường được gọi là cấu trúc dữ liệu động. Độ dài của mảng cố định sau khi khởi tạo nên mảng thường được xem là cấu trúc dữ liệu tĩnh. Tuy vậy, chúng ta có thể tạo một mảng mới lớn hơn rồi sao chép dữ liệu để đạt được mức linh hoạt có giới hạn.

> Nếu phần cấu trúc vật lý còn khó hình dung, hãy đọc Chương 4 về mảng và danh sách liên kết rồi quay lại mục này.
