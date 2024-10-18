import { Component } from '@angular/core';
import { Player } from '../../entities/player/player';
import { Team } from '../../entities/team/team';
import { HttpserviceService } from '../../services/httpservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayercardComponent } from '../playercard/playercard.component';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [ PlayercardComponent ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss'
})
export class TeamComponent {
  team: Team = new Team(0, '', '', '', null);
  players: Player[] = [];

  constructor(private httpService: HttpserviceService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.loadTeam();
  }

  playerClick(p_id: number) {
    this.router.navigate(['/player', p_id]);
  }

  updateRoute() {
    this.router.navigate(['/create/team', this.team.id]);
  }

  loadTeam() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id !== null) {
      this.httpService.getTeam(Number(id)).subscribe(data => {
        if(data.body) {
          this.team = new Team(
            data.body.id, 
            data.body.teamname, 
            data.body.league,
            data.body.country, 
            data.body.logo);
          this.loadPlayers();
        }
      });
    }
  }

  loadPlayers() {
    this.httpService.getPlayersOnTeam(this.team.id).subscribe(data => {
      if(data.body)
        this.players = data.body;
    });
  }

  deleteTeam() {
    this.httpService.deleteTeam(this.team.id).subscribe(data => {
      this.router.navigate(['']);
    });
  }
}
