import * as moment from 'moment';

export class ChallengeResult {

    constructor(private _user: string, private _totalTime: number, private _level: string) {
    }

    get user() {
        return this._user;
    }

    set user(user: string) {
        this._user = user;
    }

    get totalTime() {
        return this._totalTime;
    }

    set totalTime(totalTime: number) {
        this._totalTime = totalTime;
    }

    get totalTimeFormatted() {
        return this._totalTime / 1000 + ' Secs';
    }

    get level() {
        return this._level;
    }

    set level(level: string) {
        this._level = level;
    }

}
