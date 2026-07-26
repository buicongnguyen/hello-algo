# Tóm tắt

### Ôn tập trọng tâm

- Heap là một cây nhị phân hoàn chỉnh. Tùy tính chất thứ tự, heap được chia thành heap cực đại và heap cực tiểu. Đỉnh heap cực đại là phần tử lớn nhất, còn đỉnh heap cực tiểu là phần tử nhỏ nhất.
- Hàng đợi ưu tiên lấy phần tử ra theo mức ưu tiên và thường được cài đặt bằng heap. Vì vậy trong thực hành, giao diện hàng đợi ưu tiên và heap thường được dùng cho cùng một mục đích.
- Các thao tác phổ biến gồm chèn phần tử $O(\log n)$, xóa phần tử đỉnh $O(\log n)$ và truy cập phần tử đỉnh $O(1)$.
- Cây nhị phân hoàn chỉnh phù hợp với cách biểu diễn bằng mảng. Công thức chỉ số cho phép tìm cha và hai nút con mà không phải lưu con trỏ.
- Heapify duy trì tính chất heap. Chèn dùng heapify từ dưới lên, còn xóa đỉnh dùng heapify từ trên xuống.
- Có thể dựng heap từ $n$ phần tử đầu vào trong $O(n)$ bằng cách heapify các nút không phải lá theo thứ tự ngược.
- Top-k là bài toán kinh điển có thể giải hiệu quả bằng heap cực tiểu kích thước `k`, với độ phức tạp $O(n \log k)$ và khả năng cập nhật liên tục trên luồng dữ liệu.

### Hỏi và đáp

**Hỏi**: “Heap” trong cấu trúc dữ liệu có phải là “heap” trong quản lý bộ nhớ không?

Không. Hai khái niệm chỉ tình cờ dùng cùng một tên.

Trong hệ thống máy tính, **vùng nhớ heap** là một phần của cơ chế cấp phát bộ nhớ động. Chương trình có thể yêu cầu một lượng bộ nhớ trong vùng này để lưu các cấu trúc phức tạp như đối tượng và mảng khi đang chạy. Khi dữ liệu không còn cần thiết, bộ nhớ phải được giải phóng hoặc được bộ thu gom rác thu hồi để tránh rò rỉ bộ nhớ.

Trong chương này, **cấu trúc dữ liệu heap** là một cây nhị phân hoàn chỉnh duy trì quan hệ thứ tự giữa cha và con. Nó không mô tả nơi các phần tử được cấp phát trong bộ nhớ. Một đối tượng heap cấu trúc dữ liệu có thể nằm trong vùng nhớ heap của hệ thống, nhưng đó vẫn là hai tầng khái niệm khác nhau.

So với bộ nhớ ngăn xếp, vùng nhớ heap cần được quản lý cẩn thận hơn; sử dụng sai có thể gây rò rỉ bộ nhớ hoặc con trỏ treo. Những vấn đề đó thuộc quản lý bộ nhớ, không phải các thao tác `push`, `pop` hay heapify đã học ở đây.
