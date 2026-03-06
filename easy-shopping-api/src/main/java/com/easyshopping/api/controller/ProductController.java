package com.easyshopping.api.controller;

import com.easyshopping.api.model.Products;
import com.easyshopping.api.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping("/products")
    public ResponseEntity<List<Products>> getAllProducts(){
        return new ResponseEntity<>(service.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("product/{id}")
    public ResponseEntity<Products> getProductById(@PathVariable int id){
        Products product = service.getProductById(id);
        if(product.getId() > 0){
            return new ResponseEntity<>(product, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("product/{id}/image")
    public ResponseEntity<byte[]> getProductImageById(@PathVariable int id){
        Products product = service.getProductById(id);
        if(product.getId() > 0){
            return new ResponseEntity<>(product.getImageData(), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("product")
    public ResponseEntity<?> addProduct(@RequestPart Products product, @RequestPart MultipartFile image){
        try {
            return new ResponseEntity<>(service.addOrUpdateProduct(product, image), HttpStatus.CREATED);
        } catch (IOException e) {
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestPart Products product, @RequestPart(value = "image", required = false) MultipartFile image){
        try {
            return new ResponseEntity<>(service.addOrUpdateProduct(product, image), HttpStatus.CREATED);
        } catch (IOException e) {
            return  new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        service.deleteProduct(id);
        return new ResponseEntity<>("Product deleted!", HttpStatus.OK);
    }

}
