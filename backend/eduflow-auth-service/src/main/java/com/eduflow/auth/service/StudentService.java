package com.eduflow.auth.service;

import java.util.*;

import org.springframework.stereotype.Service;
import com.eduflow.auth.entity.Student;
import com.eduflow.auth.repository.StudentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudentService {
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public Student createStudent(Student student){
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student student){
        Student existingStudent = studentRepository.findById(id).orElse(null);
        if(existingStudent != null){
            existingStudent.setFirstName(student.getFirstName());
            existingStudent.setLastName(student.getLastName());
            existingStudent.setPhoneNumber(student.getPhoneNumber());
            existingStudent.setGender(student.getGender());
            existingStudent.setStandard(student.getStandard());
            existingStudent.setSection(student.getSection());
        }
        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Long id){
        studentRepository.deleteById(id);
    }

}
