// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // If you're using routing
import { UserCreateFormComponent } from './components/user-create-form/user-create-form'; // <<< 1. IMPORT your form component

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,                 // If you're using routing
    UserCreateFormComponent       // <<< 2. ADD your form component to the imports array
    // CommonModule might also be here if AppComponent uses *ngIf, *ngFor, etc.
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'my-angular-app'; // Or your actual app title
  currentYear = new Date().getFullYear();
  // ... any other logic for AppComponent
}
