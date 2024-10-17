import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { HttpserviceService } from '../../services/httpservice.service';
import { Player } from '../../entities/player/player';
import { Team } from '../../entities/team/team';
import { PlayercardComponent } from '../playercard/playercard.component';
import { TeamcardComponent } from '../teamcard/teamcard.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchbarComponent, PlayercardComponent, TeamcardComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  teams: Team[] = [];
  players: Player[] = [];

  constructor(private httpService: HttpserviceService) {
    this.getAllData();
  }

  getAllData() {
    // Request all teams
    this.httpService.getAllTeams().subscribe(data => {
      let tempTeams: Team[] = [];
      if(data.body)
        for(let t of data.body) {
          tempTeams.push(new Team(
            t.id,
            t.teamname,
            t.league,
            t.country,
            t.logo
          ));
        }
      this.teams = tempTeams;
    });

    // Request all players
    this.httpService.getAllPlayers().subscribe(data => {
      let tempPlayers: Player[] = [];
      if(data.body)
        for(let p of data.body) {
          tempPlayers.push(new Player(
            p.id,
            p.username,
            p.name,
            p.role,
            p.team_id,
            p.avatar
          ));
        }
      this.players = tempPlayers;
      for(let p of this.players) {
        console.log(`Player loaded: ${p.username}`);
      }
    });
  }
}
