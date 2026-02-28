package com.easyshopping.api.model.dto;

import java.math.BigDecimal;

public record OrderItemResponse(
        int id,
        int productId,
        String productName,
        int quantity,
        BigDecimal totalPrice
) {
}
