package com.easyshopping.api.model.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public record OrderResponse(
        String orderId,
        String customerName,
        String email,
        String status,
        LocalDate orderDate,
        BigDecimal total,
        List<OrderItemResponse> items
) {
}
