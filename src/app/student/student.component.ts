import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  myForm!: FormGroup;
  studentsdetails: Array<any> = [];
  singlestudentsdetails: any = null;
  formStatus = 'Add'; // Initialize form status as 'Add'
  imgSrc: any = `https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=`;
   selectedimg:any;

  constructor(private fb: FormBuilder, private studentService: StudentService) { }

  ngOnInit() {
    this.getStudent();

    this.myForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      image: [null, Validators.required]
    });
  }


  onSubmit() {
    if (this.myForm.valid) {
      const formData = new FormData();
      formData.append('name', this.myForm.get('name')?.value);
      formData.append('age', this.myForm.get('age')?.value);
      formData.append('phone', this.myForm.get('phone')?.value);
      formData.append('image', this.myForm.get('image')?.value);     
      
      if (this.singlestudentsdetails) {
        this.updateStudent(formData);
      } else {

        this.addStudent(formData);
      }
    } else {
      console.error('Form is invalid');
    }
  }
  

  addStudent(details: any) {
    this.studentService.addStudent(details).subscribe(() => {
      this.myForm.reset(); 
      this.getStudent();
    });
  }


  getStudent() {
    this.studentService.getStudentDetails().subscribe(val => {
      this.studentsdetails = val;
    });
  }

  deleteStudent(studentId: any) {
    this.studentService.deleteStudent(studentId).subscribe(() => {
      console.log('Student deleted successfully');
      this.getStudent();
    });
  }
  getStudentById(id: any) {
    this.studentService.getStudentById(id).subscribe(val => {
      this.singlestudentsdetails = val;
      console.log(this.singlestudentsdetails)
      this.formStatus = 'Update';
      this.myForm.patchValue({ 
        name: this.singlestudentsdetails.name,
        age: this.singlestudentsdetails.age,
        phone: this.singlestudentsdetails.phone,
        // image: this.singlestudentsdetails.imagepath,
        
      });
     
    });
  }

  updateStudent(formData: any) {
    console.log("reached")
    if (this.singlestudentsdetails) {
      const studentId = this.singlestudentsdetails._id;
      console.log("reached")

      this.studentService.updateStudent(studentId, formData).subscribe(() => {
        console.log('Student updated successfully');
        this.myForm.reset();
        this.formStatus = 'Add';
        this.singlestudentsdetails = null; 
        this.getStudent();
      });
    }
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('image')?.setValue(file);

       };
}

}




 
  


























// // Import necessary modules
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { StudentService } from '../services/student.service';

// @Component({
//   selector: 'app-student',
//   templateUrl: './student.component.html',
//   styleUrls: ['./student.component.css']
// })
// export class StudentComponent implements OnInit {
//   myForm!: FormGroup;
//   studentsdetails: Array<any> = [];
//   singlestudentsdetails: Array<any> = [];
//   formstatus='Add';



//   constructor(private fb: FormBuilder, private studentService: StudentService) {

    


//   } 

//   ngOnInit() {

//     this.getstudent()

//   this.myForm = this.fb.group({
//     name: ['', Validators.required],
//     age: ['', Validators.required],
//     phone: ['', Validators.required]
//   });

    
//   }

//   onSubmit() {
//     if (this.myForm.valid) {
//       const formData = this.myForm.value;

//       this.poststudent(formData)

//     } else {
//       console.error('Form is invalid');
//     }
//   }

// poststudent(details:any){
//   this.studentService.addStudent(details).subscribe((val=>{

//   }))
//   this.myForm.reset(); 
//   this.getstudent();

// }

// getstudent(){
//   this.studentService.getStudentDetails().subscribe(val=>{
//     this.studentsdetails=val;
//     console.log(this.studentsdetails)
//   })
// } 

// deleteStudent(studentId: any) {
//   this.studentService.deleteStudent(studentId).subscribe(
//     () => {
//       console.log('Student deleted successfully');
//       // Optionally, perform any other actions after successful deletion
//     },
//     error => {
//       console.error('Error occurred while deleting student:', error);
//       // Handle error
//     }
//   );
//   this.getstudent();
// }

// getstudentbyid(id:any){
//    this.studentService.getStudentById(id).subscribe((val=>{
//          this.singlestudentsdetails=val
//          console.log(this.singlestudentsdetails)
//    }))
//    this.formstatus="update"
// }

// }
