import { Component, OnInit } from '@angular/core';
import { HttpserviceService } from '../../services/httpservice.service';
import { Player } from '../../entities/player/player';
import { Team } from '../../entities/team/team';
import { PlayercardComponent } from '../playercard/playercard.component';
import { TeamcardComponent } from '../teamcard/teamcard.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ PlayercardComponent, TeamcardComponent, FormsModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  teams: Team[] = [];
  players: Player[] = [];

  constructor(private httpService: HttpserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getAllData();
  }

  playerClick(pl_id: number) {
    this.router.navigate(['/player', pl_id]);
  }

  teamClick(t_id: number) {
    this.router.navigate(['/team', t_id]);
  }

  get filteredPlayers() {
    return this.players.filter(player => 
      player.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      player.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      player.role.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get filteredTeams() {
    return this.teams.filter(team => 
      team.teamname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      team.league.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      team.country.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getAllData(): void {
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
    });
  }
}
