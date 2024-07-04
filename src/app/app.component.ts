import { Component, OnInit } from '@angular/core';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-ui';
  studentsdetails: Array<any> = [];

  constructor(private studentservices:StudentService){}
 
  ngOnInit(): void {
      this.getstudent()
  }

  getstudent(){
    this.studentservices.getStudentDetails().subscribe(val=>{
      this.studentsdetails=val;
      console.log(this.studentsdetails)
    })
  } 

  deleteStudent(studentId: any) {
    this.studentservices.deleteStudent(studentId).subscribe(
      () => {
        console.log('Student deleted successfully');
        // Optionally, perform any other actions after successful deletion
      },
      error => {
        console.error('Error occurred while deleting student:', error);
        // Handle error
      }
    );
  }
  
}
