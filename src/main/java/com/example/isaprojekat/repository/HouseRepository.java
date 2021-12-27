package com.example.isaprojekat.repository;

import com.example.isaprojekat.model.House;
import com.example.isaprojekat.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface HouseRepository extends JpaRepository<House, Long> {
    List<House> findByNameContainingAndPriceLessThanEqual(String name, Double price);
    List<House> findByPriceLessThanEqual(Double price);
    List<House> findByNameAndAddressContainingAndPriceLessThanEqual(String name, String address, Double price);
    List<House> findByAddressContainingAndPriceLessThanEqual(String address, Double price);
}
