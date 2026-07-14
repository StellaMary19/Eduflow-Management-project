import { inject, Injectable, signal } from "@angular/core";
import { StudentService } from "../services/student.service";
import { Student } from "../models/student.model";

@Injectable({
    providedIn:'root'
})

export class StudentStateService {
    private studentService = inject(StudentService);

    private readonly _students = signal<Student[]>([]);

    readonly students = this._students.asReadonly();

    private readonly _loading = signal<boolean>(false);
    readonly loading = this._loading.asReadonly();

    loadStudents(){
        this._loading.set(true);
        this.studentService.getStudents().subscribe( {
            next : students => {this._students.set(students);this._loading.set(false);},
            error : (err: any) => {console.error('Error loading students:', err); this._loading.set(false);}
        })
        console.log("Students loaded:", this._students());
    }
    createStudents(student : Student){
        this.studentService.createStudent(student).subscribe(
            {
                next : createdStudents => {
                    this._students.update(students => [
                        ...students,
                        createdStudents
                    ])
                },
                error : (err :any) => {
                    console.error('Error creating student:', err);
                }
                    
                });
    }
    updateStudents(id :number , student :Student){
        this.studentService.updateStudent(id,student).subscribe(
            updatedStudent => {
                this._students.update(students => 
                    students.map(s => s.id === updatedStudent.id ? updatedStudent : s)
                )
            }
        )
    }

    deleteStudent(id:number){
        this.studentService.deleteStudent(id).subscribe(
            () => {
                this._students.update(students => students.filter(s => s.id !== id));
            }
        )
    }

}