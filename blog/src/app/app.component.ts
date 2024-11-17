import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { BaseService } from './services/base.service';
import {MatDialogModule } from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BaseService  // BaseService'i burada sağlayıcı olarak ekliyoruz
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'blog';

  constructor(@Inject(DOCUMENT) private document: Document) {
    // document ile işlemler burada yapılabilir
  }
}
