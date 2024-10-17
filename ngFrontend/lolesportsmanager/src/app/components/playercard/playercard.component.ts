import { Component, Input } from '@angular/core';
import { Player } from '../../entities/player/player';
import { HttpserviceService } from '../../services/httpservice.service';

@Component({
  selector: 'app-playercard',
  standalone: true,
  imports: [],
  templateUrl: './playercard.component.html',
  styleUrl: './playercard.component.scss'
})
export class PlayercardComponent {
  @Input() player!: Player;
  playerteam: string = '';

  constructor(private httpService: HttpserviceService) {
    
  }

  ngOnInit() {
    this.getPlayerTeam();
  }

  getPlayerTeam() {
    this.httpService.getTeam(this.player.team_id).subscribe(data => {
      if(data.body)
        this.playerteam = data.body.teamname;
    });
  }
}
