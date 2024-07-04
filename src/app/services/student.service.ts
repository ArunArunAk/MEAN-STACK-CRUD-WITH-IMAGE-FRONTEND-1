// Import required modules
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the service
@Injectable({
  providedIn: 'root'
}) 
export class StudentService {

  private apiUrl = 'http://localhost:5000/students/';
  private postUrl = 'http://localhost:5000/students/post'; // Specific URL for POST request


  constructor(private http: HttpClient) { }

  getStudentDetails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  
  deleteStudent(studentId: string): Observable<any> {
    const deleteUrl = `${this.apiUrl}${studentId}`; // Remove the extra slash here
    console.log("Deleted successfully");
    return this.http.delete<any>(deleteUrl);
  }

  addStudent(studentData: any): Observable<any> {
    
    return this.http.post<any>(this.postUrl, studentData); // Use the specific URL for POST
  }

  getStudentById(studentId: string): Observable<any> {
    const getByIdUrl = `${this.apiUrl}${studentId}`;
    return this.http.get<any>(getByIdUrl);
  }

  updateStudent(studentId: string, studentData: any): Observable<any> {
    const updateUrl = `${this.apiUrl}${studentId}`; // Construct URL for updating student
    return this.http.put<any>(updateUrl, studentData);
  }
  
}
