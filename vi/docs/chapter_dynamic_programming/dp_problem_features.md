# Đặc trưng của bài toán quy hoạch động

Một bài toán phù hợp với quy hoạch động thường có ba đặc trưng.

## Bài toán con chồng lặp

Nhiều nhánh đệ quy yêu cầu cùng một trạng thái. Lưu trạng thái giúp mỗi bài toán con chỉ được giải một lần.

## Cấu trúc con tối ưu

Nghiệm tối ưu của bài toán lớn có thể xây từ nghiệm tối ưu của các bài toán con.

![Chi phí nhỏ nhất để leo cầu thang](dp_problem_features.assets/min_cost_cs_example.png)

$$
dp[i] = \min(dp[i-1], dp[i-2]) + cost[i]
$$

## Không có hậu hiệu

Tương lai chỉ phụ thuộc vào trạng thái hiện tại, không phụ thuộc toàn bộ lịch sử đã đi đến trạng thái đó. Nếu lịch sử còn ảnh hưởng, cần đưa thông tin ấy vào định nghĩa trạng thái.

![Chuyển trạng thái có ràng buộc](dp_problem_features.assets/climbing_stairs_constraint_state_transfer.png)
