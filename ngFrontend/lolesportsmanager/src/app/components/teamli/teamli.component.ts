import { Component, Input, Output } from '@angular/core';
import { Team } from '../../entities/team/team';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teamli',
  standalone: true,
  imports: [],
  templateUrl: './teamli.component.html',
  styleUrl: './teamli.component.scss'
})
export class TeamliComponent {
  @Input() team!: Team;
  @Output() selectTeamEvent = new EventEmitter<Team>();

  selectTeam() {
    this.selectTeamEvent.emit(this.team);
  }
}
