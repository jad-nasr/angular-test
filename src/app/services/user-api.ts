// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs'; // Important for handling async responses
import { catchError } from 'rxjs/operators';
import { User } from '../models/User.model'

@Injectable({
  providedIn: 'root' // Makes the service a singleton available app-wide
})

// Then use: getData(endpoint: string): Observable<MyDataItem[]> { ... }
export class UserApiService {
  // Define the base URL of your Spring Boot application
  // This might come from an environment file in a real app
  private springBootApiBaseUrl = 'http://localhost:9090'; // Adjust if your Spring Boot runs elsewhere

  constructor(private http: HttpClient) { }
/*
  // Example: GET request to fetch some data
  // Replace 'YourDataType' with an interface or class representing the expected response data
  getData(endpoint: string): Observable<any> { // Use a more specific type than 'any'
    return this.http.get<any>(`<span class="math-inline">\{this\.springBootApiBaseUrl\}/</span>{endpoint}`);
  }

  // Example: POST request to send some data
  // Replace 'YourRequestType' and 'YourResponseType'
  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(`<span class="math-inline">\{this\.springBootApiBaseUrl\}/</span>{endpoint}`, data);
  }

  // Example: PUT request to update data
  putData(endpoint: string, data: any): Observable<any> {
    return this.http.put<any>(`<span class="math-inline">\{this\.springBootApiBaseUrl\}/</span>{endpoint}`, data);
  }

  // Example: DELETE request
  deleteData(endpoint: string): Observable<any> {
    return this.http.delete<any>(`<span class="math-inline">\{this\.springBootApiBaseUrl\}/</span>{endpoint}`);
  }
*/
// POST a new user
  createUser(userData: User): Observable<User> { // Assuming the API returns the created user with its new ID
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        // Add other headers like Authorization if needed
      })
    };
    return this.http.post<User>(`${this.springBootApiBaseUrl}/users`, userData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
private handleError(error: any): Observable<never> {
    console.error('API Error:', error.response || error.message || error); // Log more details if available
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else if (error.status) {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message || (error.error && error.error.message) || error.statusText}`;
    }
    // You could also return a more structured error object
    return throwError(() => new Error(errorMessage));
  }
}
