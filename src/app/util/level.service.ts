import { ChallengeResult } from './../challenge/challenge-result.model';
import { HttpClient } from '@angular/common/http';
import { BlockUI, BlockUIService, NgBlockUI } from 'ng-block-ui';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LevelService {

    @BlockUI() appBlockUI: NgBlockUI;

    levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

    constructor(private blockUIService: BlockUIService) {

    }

    public getLevels(): string[] {
        let levels;
        this.appBlockUI.start('Cargando..');
        levels = this.levels;
        this.appBlockUI.stop();
        return levels;
    }
}
