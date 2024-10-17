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
  roleimg: string = '';

  constructor(private httpService: HttpserviceService) {
    
  }

  ngOnInit() {
    this.getPlayerTeam();
    switch(this.player.role.toLocaleLowerCase()) {
      case 'top':
      case 'jungle':
      case 'mid':
      case 'adc':
      case 'support':
      case 'fill':
      case 'coach':
        this.roleimg = `${this.player.role.toLowerCase()}.png`;
        break;
      default:
        this.roleimg = "fill.png";
        break;
    }
  }

  getPlayerTeam() {
    this.httpService.getTeam(this.player.team_id).subscribe(data => {
      if(data.body)
        this.playerteam = data.body.teamname;
    });
  }
}
