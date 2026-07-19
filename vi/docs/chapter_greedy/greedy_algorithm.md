# Thuật toán tham lam

Tham lam thường dùng cho bài toán tối ưu. Mỗi bước chọn phương án có vẻ tốt nhất, thu nhỏ bài toán rồi tiếp tục mà không quay lại quyết định cũ.

![Chiến lược tham lam khi đổi tiền](greedy_algorithm.assets/coin_change_greedy_strategy.png)

```python
def greedy_coin_change(coins, amount):
    result = []
    for coin in sorted(coins, reverse=True):
        count, amount = divmod(amount, coin)
        result.extend([coin] * count)
    return result if amount == 0 else []
```

## Điều kiện và giới hạn

Một chiến lược tham lam cần **tính lựa chọn tham lam** và **cấu trúc con tối ưu**. Chọn đồng xu lớn nhất đúng với một số hệ tiền nhưng không đúng cho mọi tập mệnh giá.

![So sánh tham lam và quy hoạch động](greedy_algorithm.assets/coin_change_greedy_vs_dp.png)

Trước khi dùng tham lam, cần nêu chiến lược, tìm phản ví dụ và chứng minh rằng lựa chọn cục bộ luôn có thể thuộc một nghiệm tối ưu. Khi đúng, thuật toán thường đơn giản, ít bộ nhớ và nhanh hơn quy hoạch động.
