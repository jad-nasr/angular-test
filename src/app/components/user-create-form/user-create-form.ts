// src/app/components/user-create-form/user-create-form.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { UserApiService } from '../../services/user-api'; // Adjust path if needed
import { User } from '../../models/User.model';   // Adjust path if needed

@Component({
  selector: 'app-user-create-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-create-form.html',
  styleUrls: ['./user-create-form.css']
})
export class UserCreateFormComponent implements OnInit {
  userForm!: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userApiService: UserApiService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      // Form controls now match the simpler User model
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      description: ['']
      // Removed username, email, password controls
    });
  }

  // Helper getters for form controls
  get name() { return this.userForm.get('name'); }
  get lastname() { return this.userForm.get('lastname'); }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    this.isLoading = true;

    // Construct the User payload based on the simpler model.
    // We do NOT send an 'id' for creation.
    const userData: Omit<User, 'id'> = {
          name: this.userForm.value.name,
          lastname: this.userForm.value.lastname,
          description: this.userForm.value.description || undefined, // Send undefined if empty and optional
        };

        this.userApiService.createUser(userData as User).subscribe({ // Cast to User if createUser strictly expects the User type
          next: (createdUser) => {
            this.isLoading = false;
            this.successMessage = `User "${createdUser.name} ${createdUser.lastname}" (ID: ${createdUser.id}) created successfully!`;
            console.log('User created:', createdUser);
            this.userForm.reset(); // Optionally reset the form
          },
          error: (err) => {
            this.isLoading = false;
            // 'err' is the Error object from the handleError method in your service
            this.errorMessage = err.message || 'An unexpected error occurred while creating the user.';
            console.error('Error creating user:', err);
          }
        });
      }
    }
