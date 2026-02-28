package com.easyshopping.api.service;

import com.easyshopping.api.model.OrderItem;
import com.easyshopping.api.model.Orders;
import com.easyshopping.api.model.Products;
import com.easyshopping.api.model.dto.OrderItemRequest;
import com.easyshopping.api.model.dto.OrderItemResponse;
import com.easyshopping.api.model.dto.OrderRequest;
import com.easyshopping.api.model.dto.OrderResponse;
import com.easyshopping.api.repo.OrderRepo;
import com.easyshopping.api.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    @Autowired
    private ProductRepo productRepo;
    @Autowired
    private OrderRepo orderRepo;

    public OrderResponse placeOrder(OrderRequest request) {

        Orders order = new Orders();
        String orderId = "ORD" + UUID.randomUUID().toString().substring(0,8).toUpperCase();
        order.setOrderId(orderId);
        order.setCustomerName(request.customerName());
        order.setEmail(request.email());
        order.setStatus("PLACED");
        order.setOrderDate(LocalDate.now());

        BigDecimal total = BigDecimal.ZERO;

        List<OrderItem> orderItems = new ArrayList<>();
        for(OrderItemRequest item : request.items()){
            Products product = productRepo.findById(item.productId()).orElseThrow(() -> new RuntimeException("Product not Found!"));
            product.setStockQuantity(product.getStockQuantity() - item.quantity());
            productRepo.save(product);

            OrderItem orderItem = OrderItem.builder()
                    .product(product)
                    .quantity(item.quantity())
                    .totalPrice(product.getPrice().multiply(BigDecimal.valueOf(item.quantity())))
                    .order(order)
                    .build();
            orderItems.add(orderItem);
            total = total.add(orderItem.getTotalPrice());
        }
        order.setTotalAmount(total);
        order.setOrderItems(orderItems);
        Orders savedOrder = orderRepo.save(order);

        List<OrderItemResponse> itemsResponses = new ArrayList<>();
        for(OrderItem item : order.getOrderItems()){
            OrderItemResponse response = new OrderItemResponse(
                    item.getId(),
                    item.getProduct().getId(),
                    item.getProduct().getName(),
                    item.getQuantity(),
                    item.getTotalPrice()
            );
            itemsResponses.add(response);
        }

        return new OrderResponse(
                savedOrder.getOrderId(),
                savedOrder.getCustomerName(),
                savedOrder.getEmail(),
                savedOrder.getStatus(),
                savedOrder.getOrderDate(),
                savedOrder.getTotalAmount(),
                itemsResponses
        );
    }

    @Transactional
    public List<OrderResponse> getAllOrderResponses() {
        List<Orders> orders = orderRepo.findAll();
        List<OrderResponse> orderResponses = new ArrayList<>();

        for (Orders order : orders) {

            List<OrderItemResponse> itemResponses = new ArrayList<>();
            for (OrderItem item : order.getOrderItems()) {
                OrderItemResponse orderItem = new OrderItemResponse(
                        item.getId(),
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getQuantity(),
                        item.getTotalPrice()
                );

                itemResponses.add(orderItem);
            }

            OrderResponse response = new OrderResponse(
                    order.getOrderId(),
                    order.getCustomerName(),
                    order.getEmail(),
                    order.getStatus(),
                    order.getOrderDate(),
                    order.getTotalAmount(),
                    itemResponses
            );
            orderResponses.add(response);
        }
        return orderResponses;
    }
}
