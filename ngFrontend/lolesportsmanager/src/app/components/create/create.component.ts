import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../entities/player/player';
import { Team } from '../../entities/team/team';
import { HttpserviceService } from '../../services/httpservice.service';
import { TeamliComponent } from '../teamli/teamli.component';
import { EventEmitter } from '@angular/core';
import { TeamcardComponent } from '../teamcard/teamcard.component';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ CommonModule, FormsModule, TeamliComponent, TeamcardComponent ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  isSearchExpanded = false;
  isActive: string = 'player';
  error: string = '';
  success: string = '';

  // Player form
  username: string = '';
  name:string = '';
  roleimg: string = 'fill';
  team: string = '';
  selectedTeam!: Team;

  // Team form
  teamname: string = '';
  league: string = '';
  country: string = '';

  teams: Team[] = [];
  filteredTeams: Team[] = [];

  constructor(private httpService: HttpserviceService) {}

  ngOnInit(): void {
    this.getTeams();
  }

  // creating a player
  createPlayer() {
    if(!this.selectedTeam || !this.username || !this.name || !this.roleimg)
    {
      this.error = 'All fields must be entered!';
      return;
    }
    this.error = '';
    let team_id = this.selectedTeam.id;
    let newPlayer = new Player(
      0,
      this.username,
      this.name,
      this.roleimg.charAt(0).toUpperCase() + this.roleimg.slice(1),
      team_id,
      null
    );

    this.httpService.createPlayer(newPlayer).subscribe(data => {
      this.success = 'Player Created!';
    });
  }

  // creating a team
  createTeam() {
    if(!this.teamname || !this.league || !this.country)
    {
      this.error = 'All fields must be entered!';
      return;
    }
    this.error = '';

    let newTeam = new Team(
      0,
      this.teamname,
      this.league,
      this.country,
      null
    );

    this.httpService.createTeam(newTeam).subscribe(data => {
      this.success = 'Team Created!';
    });
  }

  // Functionality for the team searchbar to search for teams on the Player form
  getTeams(): void {
    // Request all teams
    this.httpService.getAllTeams().subscribe(data => {
      let tempTeams: Team[] = [];
      if(data.body) {
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
        this.filterTeams();
      }
    });
  }

  expandSearch() {
    this.isSearchExpanded = true;
  }

  collapseSearch() {
    this.isSearchExpanded = false;
  }

  filterTeams() {
    this.filteredTeams = this.teams.filter(team =>
      team.teamname.toLowerCase().includes(this.team.toLowerCase())
      || team.league.toLowerCase().includes(this.team.toLowerCase())
      || team.country.toLowerCase().includes(this.team.toLowerCase())
    );
  }

  selectTeam(selectTeam: Team) {
    this.selectedTeam = selectTeam;
    this.team = selectTeam.teamname;
    this.collapseSearch();
  }
}
