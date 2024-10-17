import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isActive: number = 1;

  setActive(buttonIndex: number): void {
    console.log("Function Called")
    this.isActive = buttonIndex;
  };
}
