import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  filteredUsers: User[] = [];
  isLoading = false;
  searchQuery = '';
  deleteConfirmId: number | null = null;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getAll().subscribe({
      next: (data) => {
        this.users = data;
        this.filteredUsers = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    const q = query.toLowerCase();
    this.filteredUsers = this.users.filter(u =>
      u.first_name.toLowerCase().includes(q) ||
      u.last_name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q)
    );
  }

  getInitials(user: User): string {
    return ((user.first_name?.[0] || '') + (user.last_name?.[0] || '')).toUpperCase() || '?';
  }

  onEdit(id: number): void {
    this.router.navigate(['/user/update/', id]);
  }

  onAdd(): void {
    this.router.navigate(['/user/add']);
  }

  confirmDelete(id: number): void {
    console.log(" this delete ",id)
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  onDelete(id: number): void {

    this.userService.delete(id).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.id !== id);
        this.filteredUsers = this.filteredUsers.filter(u => u.id !== id);
        this.deleteConfirmId = null;
      }
    });
  }
}