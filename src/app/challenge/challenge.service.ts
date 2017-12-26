import { Challenge } from './challenge.model';
import { ChallengeResult } from './../challenge/challenge-result.model';
import { HttpClient } from '@angular/common/http';
import { BlockUI, BlockUIService, NgBlockUI } from 'ng-block-ui';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { environment } from '../../environments/environment';


@Injectable()
export class ChallengeService {

    @BlockUI() appBlockUI: NgBlockUI;

    urlService = '';

    challenges;

    constructor(private http: HttpClient, private blockUIService: BlockUIService) {
        this.urlService = environment.apiUrl;
    }

    public saveChallenge(challenge: Challenge) {
        this.appBlockUI.start('Cargando..');
        this.http.post(this.urlService + 'challenge', challenge).subscribe(data => {
            this.appBlockUI.stop();
        });
    }

    public getChallengeForId(id): Observable<Challenge> {
        let challenge;
        this.appBlockUI.start('Cargando..');
        challenge = this.http.get(this.urlService + 'challenge/' + id);
        this.appBlockUI.stop();
        return challenge;
    }

    public getChallengeForType(type): Observable<Challenge> {
        let challenge;
        this.appBlockUI.start('Cargando..');
        challenge = this.http.get(this.urlService + 'challenge/type/' + type);
        this.appBlockUI.stop();
        return challenge;
    }

    public getChallenges(): Observable<Challenge []> {
        let challenges;
        this.appBlockUI.start('Cargando..');
        challenges =  this.http.get<Challenge[]>(this.urlService + 'challenge');
        this.appBlockUI.stop();
        return challenges;
    }
}
