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

    loadStudents(){
        this.studentService.getStudents().subscribe( {
            next : students => this._students.set(students),
            error : (err: any) => console.error('Error loading students:', err)
        })
        console.log("Students loaded:", this._students());
    }
    createStudents(student : Student){
        this.studentService.createStudent(student).subscribe(createdStudents => {
            this._students.update(students => [
                ...students,
                createdStudents
            ])
        })
    }
    updateStudents(id :number , student :Student){
        this.studentService.updateStudent(id,student).subscribe(
            updatedStudent => {
                this._students.update(students => [
                    ...students.filter(s => s.id !== updatedStudent.id),
                    updatedStudent
                ])
            }
        )
    }

}