import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../entities/player/player';
import { Team } from '../entities/team/team';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(private http: HttpClient) { }

  baseURL: string = 'http://localhost:8080';

  // BACKEND ROUTES
  
  //Get All Players
  getAllPlayers(): Observable<HttpResponse<Player[]>> {
    return this.http.get<Player[]>(`${this.baseURL}/player`, { observe: 'response' });
  }

  // Get Player by ID
  getPlayer(id: number): Observable<HttpResponse<Player>> {
    return this.http.get<Player>(`${this.baseURL}/player/${id}`, { observe: 'response' });
  }
  
  // Create Player
  createPlayer(newPlayer: Player): Observable<HttpResponse<Player>> {
    return this.http.post<Player>(`${this.baseURL}/player`, newPlayer, { observe: 'response' });
  }

  // Update Player
  updatePlayer(id: number, updatedPlayer: Player): Observable<HttpResponse<Player>> {
    return this.http.put<Player>(`${this.baseURL}/player/${id}`, updatedPlayer, { observe: 'response' });
  }
  
  // Delete Player
  deletePlayer(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.baseURL}/player/${id}`, { observe: 'response' });
  }

  //Get All Teams
  getAllTeams(): Observable<HttpResponse<Team[]>> {
    return this.http.get<Team[]>(`${this.baseURL}/team`, { observe: 'response' });
  }

  // Get Team by ID
  getTeam(id: number): Observable<HttpResponse<Team>> {
    return this.http.get<Team>(`${this.baseURL}/team/${id}`, { observe: 'response' });
  }

  // Get Team by ID
  getPlayersOnTeam(id: number): Observable<HttpResponse<Player[]>> {
    return this.http.get<Player[]>(`${this.baseURL}/team/${id}/players`, { observe: 'response' });
  }

  // Create Team
  createTeam(newTeam: Team): Observable<HttpResponse<Team>> {
    return this.http.post<Team>(`${this.baseURL}/team`, newTeam, { observe: 'response' });
  }

  // Update Team
  updateTeam(id: number, updatedTeam: Team): Observable<HttpResponse<Team>> {
    return this.http.put<Team>(`${this.baseURL}/team/${id}`, updatedTeam, { observe: 'response' });
  }

  // Delete Team
  deleteTeam(id: number): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.baseURL}/team/${id}`, { observe: 'response' });
  }
  
}
