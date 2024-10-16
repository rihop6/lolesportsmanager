import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HttpserviceService } from '../../services/httpservice.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(private httpService: HttpserviceService) {
    
  }
}
