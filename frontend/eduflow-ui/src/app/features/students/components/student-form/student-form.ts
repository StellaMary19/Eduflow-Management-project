
import { Component, Inject, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { StudentStateService } from '../../state/student-state-service';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule,
    MatDialogModule
  ],
  templateUrl:'./student-form.html',
  styleUrls: ['./student-form.scss'],
})
export class StudentForm implements OnInit {
  private studentState  = inject(StudentStateService);
  private fb  = inject(NonNullableFormBuilder);
  private router = inject(Router)
  private dialogRef = inject(MatDialogRef<StudentForm>);
  standards = Array.from({length : 10},(_,i) => String(i+1));
  sections = Array.from({length:3},(_,i) => String.fromCharCode(65+i));
  studentForm = this.fb.group({
    firstName : ['',[Validators.required]],
    lastName : [''],
    phoneNumber : ['',[Validators.required,Validators.pattern(/^[0-9]{10}$/)]],
    gender :['',[Validators.required]],
    standard :['',[Validators.required]],
    section:['',[Validators.required]]
  })

  constructor(    @Inject(MAT_DIALOG_DATA)
    public data : {
      mode : 'create' | 'edit';
      student? : Student | null;
    }){

  }
  ngOnInit(): void {
    const student = this.data.student;

  if (this.data.mode !== 'edit' || !student) {
    return;
  }

    this.studentForm.patchValue(student);

}
  saveStudent(){
    if(this.studentForm.invalid){
      this.studentForm.markAllAsTouched();
      return;
    }
    if(this.data.mode === 'create'){
      this.studentState.createStudents(this.studentForm?.getRawValue());
    }else{
      if(this.data.student && this.data.student.id !== undefined){
        this.studentState.updateStudents(this.data.student!.id,this.studentForm.getRawValue());
      }
   
    }
    this.dialogRef.close(true);
  }
  cancel(){
    this.dialogRef.close();
  }

  
}
