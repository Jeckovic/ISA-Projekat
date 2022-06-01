package com.example.isaprojekat.controller;

import com.example.isaprojekat.dto.ReservationDTO;
import com.example.isaprojekat.dto.mapper.DTOToReservation;
import com.example.isaprojekat.dto.mapper.ReservationToDTO;
import com.example.isaprojekat.model.Reservation;
import com.example.isaprojekat.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/reservations", produces = MediaType.APPLICATION_JSON_VALUE)
public class ReservationController {

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private DTOToReservation toReservation;
    @Autowired
    private ReservationToDTO toDTO;

    //@PreAuthorize("hasAuthority('KORISNIK')")
    @PostMapping(path = "/book")
    public ResponseEntity<ReservationDTO> create(@RequestBody ReservationDTO dto){
        Reservation reservation = reservationService.save(toReservation.convert(dto));
        return new ResponseEntity<>(toDTO.convert(reservation), HttpStatus.OK);
    }


    //@PreAuthorize("hasAuthority('KORISNIK')")
    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> cancel(@PathVariable Long id) {
        if(reservationService.cancel(id))
            return new ResponseEntity<>(true, HttpStatus.OK);
        return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
    }

    //@PreAuthorize("hasAuthority('KORISNIK')")
    @GetMapping(path = "/{id}")
    public ResponseEntity<?> getOne(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationService.findOne(id);
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    //@PreAuthorize("hasAuthority('KORISNIK')")
    @GetMapping(path = "/upcoming")
    public ResponseEntity< List<ReservationDTO>> getMyUpcomingReservations() {
        List<Reservation> reservations = reservationService.getMyUpcomingReservations();
        return new ResponseEntity<>(toDTO.convert(reservations), HttpStatus.OK);
    }
}