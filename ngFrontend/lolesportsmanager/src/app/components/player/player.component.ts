import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../entities/player/player';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpserviceService } from '../../services/httpservice.service';
import { Team } from '../../entities/team/team';
import { TeamcardComponent } from '../teamcard/teamcard.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [ TeamcardComponent ],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent implements OnInit {
  player: Player = new Player(0, '', '', '', 0, null);
  playerteam: Team = new Team(0, '', '', '', null);
  roleimg: string = '';

  constructor(private httpService: HttpserviceService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadPlayer();
        this.getPlayerTeam();
      }
    });
  }

  ngOnInit() {
    this.loadPlayer();
  }

  teamClick(t_id: number) {
    this.router.navigate(['/team', t_id]);
  }

  loadPlayer() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== null) {
      this.httpService.getPlayer(Number(id)).subscribe(data => {
        if(data.body) {
          this.player = new Player(
            data.body.id, 
            data.body.username, 
            data.body.name,
            data.body.role, 
            data.body.team_id, 
            data.body.avatar);

          // Load the players team next
          this.getPlayerTeam();
          switch(this.player.role.toLowerCase()) {
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
      });
    }
  }

  getPlayerTeam() {
    this.httpService.getTeam(this.player.team_id).subscribe(data => {
      if(data.body)
        this.playerteam = data.body;
    });
  }

  capitalizeRole(): string {
    return this.player.role.charAt(0).toUpperCase() + this.player.role.slice(1);
  }
  
}
