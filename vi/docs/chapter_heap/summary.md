# Tóm tắt Chương 8

## Điểm chính

- Heap là cây nhị phân hoàn chỉnh có tính chất thứ tự cục bộ.
- Mảng lưu heap gọn và cho phép tính chỉ mục cha, con trong thời gian hằng số.
- `peek` tốn $O(1)$; `push` và `pop` tốn $O(\log n)$.
- Xây heap từ dưới lên tốn $O(n)$.
- Heap kích thước $k$ giải top-k trong $O(n \log k)$ và hỗ trợ dữ liệu dạng luồng.

## Câu hỏi ôn tập

1. Vì sao heap chỉ bảo đảm thứ tự giữa cha và con thay vì sắp xếp toàn bộ?
2. Vì sao xây heap từ dưới lên nhanh hơn chèn từng phần tử?
3. Nên dùng heap cực tiểu hay cực đại để tìm $k$ phần tử lớn nhất?
