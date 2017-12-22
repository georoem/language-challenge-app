import { Challenge } from './../challenge/challenge.model';
import { Component, OnInit } from '@angular/core';
import { ChallengeService } from '../challenge/challenge.service';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  challenges;
  constructor(private challengeService: ChallengeService) {
    challengeService.getChallenges().subscribe(result => {
      this.challenges = plainToClass(Challenge , result);
    });
  }

  ngOnInit() {
  }

}
