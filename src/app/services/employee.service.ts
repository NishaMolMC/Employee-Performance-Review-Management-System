import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employee } from '../models/employee.model'; // Adjust the import path as necessary
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:3000'; // Use environment variable for API URL

  constructor(private http: HttpClient) {}

  // Employee Operations
  getEmployees(): Observable<Employee[]> {
    console.log('Fetching employees...');
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`).pipe(
      catchError(this.handleError)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    console.log('Adding employee:', employee);
    return this.http.post<Employee>(`${this.apiUrl}/employees`, employee).pipe(
      catchError(this.handleError)
    );
  }

  deleteEmployee(id: number): Observable<void> {
    console.log('Deleting employee with id:', id);
    return this.http.delete<void>(`${this.apiUrl}/employees/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Review Operations
  getReviews(): Observable<Review[]> {
    console.log('Fetching reviews...');
    return this.http.get<Review[]>(`${this.apiUrl}/reviews`).pipe(
      catchError(this.handleError)
    );
  }

  addReview(review: Review): Observable<Review> {
    console.log('Adding review:', review);
    return this.http.post<Review>(`${this.apiUrl}/reviews`, review).pipe(
      catchError(this.handleError)
    );
  }

  updateReview(id: number, review: Review): Observable<Review> {
    console.log('Updating review with id:', review.id);
    return this.http.put<Review>(`${this.apiUrl}/reviews/${id}`, review).pipe(
      catchError(this.handleError)
    );
  }

  deleteReview(id: number) {
    this.http.delete(`http://localhost:3000/reviews/${id}`)
        .subscribe({
            next: response => {
                console.log('Review deleted', response);
                this.getReviews(); // refresh the reviews list
            },
            error: err => {
                console.error('Error deleting review', err);
            }
        });
}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(errorMessage);
  }
}
