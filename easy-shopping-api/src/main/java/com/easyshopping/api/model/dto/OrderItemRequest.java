package com.easyshopping.api.model.dto;

public record OrderItemRequest(
        int productId,
        int quantity
) {
}
