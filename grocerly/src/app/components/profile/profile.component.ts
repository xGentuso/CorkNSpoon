import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      bio: [''],
      preferences: ['']
    });
  }

  ngOnInit() {
    // TODO: Load user data from service
    this.profileForm.patchValue({
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Food enthusiast and home cook',
      preferences: 'Vegetarian, Italian cuisine'
    });
    this.profileForm.disable();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.profileForm.enable();
    } else {
      this.profileForm.disable();
    }
  }

  onSubmit() {
    if (this.profileForm.valid) {
      // TODO: Implement save functionality with your user service
      console.log(this.profileForm.value);
      this.snackBar.open('Profile updated successfully', 'Close', {
        duration: 3000
      });
      this.toggleEdit();
    }
  }
}
