package com.easyshopping.api.service;

import com.easyshopping.api.model.Products;
import com.easyshopping.api.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    public List<Products> getAllProducts(){
        return repo.findAll();
    }

    public Products getProductById(int id) {
        return repo.findById(id).orElse(new Products(-1));
    }

    public Products addOrUpdateProduct(Products product, MultipartFile image) throws IOException {
        if(!product.isProductAvailable() && product.getStockQuantity() > 0) {
            product.setProductAvailable(true);
        }
        if(product.getReleaseDate() == null){
            product.setReleaseDate(LocalDate.now());
        }
        if(image != null && !image.isEmpty()){
            product.setImageName(image.getOriginalFilename());
            product.setImageType(image.getContentType());
            product.setImageData(image.getBytes());
        }

        return repo.save(product);

    }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }
}
