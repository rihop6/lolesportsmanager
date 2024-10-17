import { Component, Input } from '@angular/core';
import { Team } from '../../entities/team/team';
import { HttpserviceService } from '../../services/httpservice.service';

@Component({
  selector: 'app-teamcard',
  standalone: true,
  imports: [],
  templateUrl: './teamcard.component.html',
  styleUrl: './teamcard.component.scss'
})
export class TeamcardComponent {
  @Input() team!: Team;

  constructor(private httpService: HttpserviceService) {
    
  }

}
