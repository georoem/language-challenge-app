import * as moment from 'moment';

export class ChallengeResult {

    constructor(private _user: string, private _totalTime: number, private _level: string,
        private _totalCorrectAnswers: number, private _totalAnswers: number) {
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

    get totalCorrectAnswers() {
        return this._totalCorrectAnswers;
    }

    set totalCorrectAnswers(totaCorrectAnswers: number) {
        this._totalCorrectAnswers = totaCorrectAnswers;
    }

    get totalAnswers() {
        return this._totalAnswers;
    }

    set totalAnswers(totaAnswers: number) {
        this._totalAnswers = totaAnswers;
    }

}
