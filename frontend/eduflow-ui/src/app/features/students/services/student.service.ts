import { HttpClient } from '@angular/common/http';
import { Injectable, Service ,inject} from '@angular/core';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private http = inject(HttpClient);
  private apiUrl : string = "http://localhost:8081/api/students";

  getStudents(){
    return this.http.get<Student[]>(this.apiUrl);
  }
  createStudent(student : Student){
    return this.http.post<Student>(this.apiUrl,student);
  }
  updateStudent(id : number , student : Student){
    return this.http.put<Student>(`${this.apiUrl}/${id}`,student);
  }
  deleteStudent(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
