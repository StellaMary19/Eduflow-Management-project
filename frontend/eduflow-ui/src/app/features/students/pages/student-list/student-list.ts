import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentStateService } from '../../state/student-state-service';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentForm } from '../../components/student-form/student-form';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule,
    CommonModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatProgressSpinnerModule
  ],
  templateUrl: './student-list.html',
  styleUrl: './student-list.scss',
})
export class StudentList implements OnInit {
  displayedColumns = [
    'firstName',
    'lastName',
    'phoneNumber',
    'gender',
    'standard',
    'section',
    'actions'
  ];

  private studentStateService = inject(StudentStateService);
  private dialog = inject(MatDialog);
  students = this.studentStateService.students;
  loading = this.studentStateService.loading;

  ngOnInit(): void {
    this.studentStateService.loadStudents();
  }

  openStudentFormDialog():void {
    const dialogRef = this.dialog.open(StudentForm,{
      width : '700px',
      data : {
        mode : 'create'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){

        this.studentStateService.loadStudents();
      }
    })
  }

  editStudent(id: number, student: Student): void {
    const dialogRef = this.dialog.open(StudentForm,{
      width : '700px',
      data : {
        mode : 'edit',
        student : student
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.studentStateService.loadStudents();
      }
    })
  }

  trackByColumn(index: number, column: string): string {
    return column;
  }

  getStudentValue(student: Student, column: string): string {
    return (student as any)[column] ?? '';
  }

  deleteStudent(id : number):void{
    this.studentStateService.deleteStudent(id);
  }
}
