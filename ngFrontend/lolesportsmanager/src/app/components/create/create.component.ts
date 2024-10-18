import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Player } from '../../entities/player/player';
import { Team } from '../../entities/team/team';
import { HttpserviceService } from '../../services/httpservice.service';
import { TeamliComponent } from '../teamli/teamli.component';
import { EventEmitter } from '@angular/core';
import { TeamcardComponent } from '../teamcard/teamcard.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ CommonModule, FormsModule, TeamliComponent, TeamcardComponent ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {
  isPlayerUpdateMode: boolean = false;
  isTeamUpdateMode: boolean = false;
  isSearchExpanded = false;
  isActive: string = 'player';
  error: string = '';
  success: string = '';

  // Player form
  id: number = 0;
  username: string = '';
  name: string = '';
  roleimg: string = 'fill';
  team: string = '';
  selectedTeam!: Team;

  // Team form
  teamname: string = '';
  league: string = '';
  country: string = '';

  teams: Team[] = [];
  filteredTeams: Team[] = [];

  constructor(private httpService: HttpserviceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const playerId = Number(params['pid']);
      const teamId = Number(params['tid']);

      if (playerId) {
        this.id = playerId;
        this.isPlayerUpdateMode = true;
        this.loadPlayerData(playerId);
      }
      if(teamId) {
        this.isActive = 'team';
        this.id = teamId;
        this.isTeamUpdateMode = true;
        this.loadTeamData(teamId);
      }
    });
    this.getTeams();
  }

  loadPlayerData(id: number) {
    if(id !== null) {
      this.httpService.getPlayer(id).subscribe(data => {
        if(data.body) {
          this.username = data.body.username;
          this.name = data.body.name;
          this.roleimg = data.body.role;
          this.httpService.getTeam(data.body.team_id).subscribe(data => {
            if(data.body) {
              this.team = data.body.teamname;
              this.selectedTeam = data.body;
            }
          });
        }
      });
    }
  }

  loadTeamData(id: number) {
    if(id !== null) {
      this.httpService.getTeam(id).subscribe(data => {
        if(data.body) {
          this.teamname = data.body.teamname;
          this.league = data.body.league;
          this.country = data.body.country;
        }
      });
    }
  }

  submitPlayer() {
    if(this.isPlayerUpdateMode)
      this.updatePlayer();
    else
      this.createPlayer();
  }

  // updating a player
  updatePlayer() {
    if(!this.selectedTeam || !this.username || !this.name || !this.roleimg)
    {
      this.error = 'All fields must be entered!';
      return;
    }
    this.error = '';
    let team_id = this.selectedTeam.id;
    let updatedPlayer = new Player(
      this.id,
      this.username,
      this.name,
      this.roleimg,
      team_id,
      null
    );

    this.httpService.updatePlayer(this.id, updatedPlayer).subscribe(data => {
      this.success = 'Player Updated!';
    });
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

  submitTeam() {
    if(this.isTeamUpdateMode)
      this.updateTeam();
    else
      this.createTeam();
  }

  // updating a player
  updateTeam() {
    if(!this.teamname || !this.league || !this.country)
    {
      this.error = 'All fields must be entered!';
      return;
    }
    this.error = '';
    let updatedTeam = new Team(
      this.id,
      this.teamname,
      this.league,
      this.country,
      null
    );

    this.httpService.updateTeam(this.id, updatedTeam).subscribe(data => {
      this.success = 'Team Updated!';
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
