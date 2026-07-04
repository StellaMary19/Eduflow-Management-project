package com.eduflow.auth.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column(nullable = false)
    String firstName;
    String lastName;
    @Column(nullable = false)
    String phoneNumber;
    @Column(nullable = false)
    String gender;
    @Column(nullable = false)
    String standard;
    @Column(nullable = false)
    String section;
}
