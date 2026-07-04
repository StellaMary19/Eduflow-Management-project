import { Routes } from "@angular/router";
import { StudentList } from "./pages/student-list/student-list";
import { StudentForm } from "./components/student-form/student-form";

export const studentRoutes : Routes = [
    {
        path : '',
        component : StudentList
    },
    {
        path : 'add',
        component : StudentForm
    }
]