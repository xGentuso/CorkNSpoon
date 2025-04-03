import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './confirm-dialog/confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog/confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(public authService: AuthService) {}
}
