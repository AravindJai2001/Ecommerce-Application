package com.easyshopping.api.repo;

import com.easyshopping.api.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepo extends JpaRepository<Orders, Integer> {
    Optional<Orders> findByOrderId(String id);
}
