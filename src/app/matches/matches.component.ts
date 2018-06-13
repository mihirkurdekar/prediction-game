import { Component, OnInit } from '@angular/core';

import { MatchService } from './match.service';
import { MatchResponse } from '../models/match-response';
import { Match } from '../models/match';
import { Bet } from '../models/bet';
import { SelectItem, Message } from 'primeng/api';
import { BetService } from './bet.service';
import { LoginService } from '../login/login.service';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css'],
  providers: [MatchService, BetService]
})
export class MatchesComponent implements OnInit {

  matchResponse: MatchResponse;
  isLoaded = false;
  selectedMatch: Match;
  display = false;
  results: SelectItem[];
  selectedResult: string;
  selectedGroup: string;
  msgs: Message[] = [];

  constructor(
    private matchService: MatchService,
    private betService: BetService,
    private loginService: LoginService,
    private messageService: MessageService) {
    this.results = [
      { label: 'Win', value: 'W', icon: 'pi pi-check' },
      { label: 'Draw', value: 'D' },
      { label: 'Loose', value: 'L', icon: 'pi pi-times' }
    ];
  }

  ngOnInit() {
    this.matchService.getMatches().subscribe(
      (response) => {
        this.matchResponse = response;
        this.isLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  selectMatch(match: Match, groupname: string) {
    this.selectedMatch = match;
    this.selectedGroup = groupname;
    this.display = true;
  }

  submitBet() {
    if (this.selectedResult && this.selectedResult.length > 0) {
      const bet: Bet = <Bet>{};
      bet.matchId = this.selectedGroup + this.selectedMatch.home_team + this.selectedMatch.away_team;
      bet.bet = this.selectedResult;
      bet.username = this.loginService.username;
      console.log(bet);
      this.betService.submitBet(bet).subscribe(
        (result) => {
          if (result.result && result.result === 'success') {
            this.display = false;
            this.selectedResult = '';
            this.addGrowl('success', 'Bet Submitted', '');
          } else {
            this.addGrowl('warn', 'Failed', 'Internal Server Error');
          }
        },
        (error) => {
          console.log(error);
          this.addGrowl('error', 'Something went wrong', error.statusText);
        }
      );
    } else {
      this.addGrowl('error', 'Please select result', '');
    }

  }

  addGrowl(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity: severity, summary: summary, detail: detail });
  }

}
