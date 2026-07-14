package com.eduflow.auth.controller;
import com.eduflow.auth.entity.*;

import java.util.*;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eduflow.auth.service.StudentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/students")
@RequiredArgsConstructor
public class StudentController {
   private final StudentService studentService;
   
   @GetMapping
   public List<Student> getAllStudents(){
    return studentService.getAllStudents();
   }

  @PostMapping
   public Student createStudent(@RequestBody Student student) {

    System.out.println("POST /api/students reached");

    return studentService.createStudent(student);
}
     
    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Long id, @RequestBody Student student){
        return studentService.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id){
         studentService.deleteStudent(id);
    }
   
}
