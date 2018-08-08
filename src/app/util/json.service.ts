import { BlockUIService } from 'ng-block-ui/dist/lib/services/block-ui.service';
import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Word } from './../word/word.model';
import {plainToClass} from 'class-transformer';

@Injectable()
export class JsonService {

    @BlockUI() appBlockUI: NgBlockUI;

    pronouns: Word[];
    verbs: Word[];
    nouns: Word[];
    verbTimes: Word[];
    newWords: Word[];
    urlService = '';

    constructor(private http: HttpClient, private blockUIService: BlockUIService) {
        this.urlService = environment.apiUrl;

        this.appBlockUI.start('Cargando..');
        this.http.get<Word[]>(this.urlService + 'words/wordType/pronoun').subscribe(data => {
            this.pronouns = plainToClass(Word , data);
            this.appBlockUI.stop();
        });

        this.appBlockUI.start('Cargando..');
        this.http.get<Word[]>(this.urlService + 'words/wordType/verb').subscribe(data => {
            this.verbs = plainToClass(Word , data);
            this.appBlockUI.stop();
        });

        this.appBlockUI.start('Cargando..');
        this.http.get<Word[]>(this.urlService + 'words/wordType/noun').subscribe(data => {
            this.nouns = plainToClass(Word , data);
            this.appBlockUI.stop();
        });

        this.appBlockUI.start('Cargando..');
        this.http.get<Word[]>(this.urlService + 'words/wordType/verbTime').subscribe(data => {
            this.verbTimes = plainToClass(Word , data);
            this.appBlockUI.stop();
        });

        this.appBlockUI.start('Cargando..');
        this.http.get<Word[]>(this.urlService + 'words/wordType/newWord').subscribe(data => {
            this.newWords = plainToClass(Word , data);
            this.appBlockUI.stop();
        });

    }

    public getPronouns(level) {
        if (level) {
            const list = this.getWordsFilterByParam(this.pronouns, 'level', level);
            return list;
        } else {
            return this.pronouns;
        }
    }

    public getVerbs(level) {
        if (level) {
            return this.getWordsFilterByParam(this.verbs, 'level', level);
        } else {
            return this.verbs;
        }
    }

    public getNouns(level) {
        if (level) {
            return this.getWordsFilterByParam(this.nouns, 'level', level);
        } else {
            return this.nouns;
        }
    }
    public getVerbTimes(level) {
        if (level) {
            return this.getWordsFilterByParam(this.verbTimes, 'level', level);
        } else {
            return this.verbTimes;
        }
    }
    public getNewWords(level) {
        if (level) {
            return this.getWordsFilterByParam(this.newWords, 'level', level);
        } else {
            return this.newWords;
        }
    }


     private getWordsFilterByParam(list, paramName, paramValue: string) {
        const returnList = [];
        if (list) {
            list.forEach(element => {
                if (element[paramName] === 'all' || element[paramName].indexOf(paramValue.toLowerCase()) !== -1) {
                    returnList.push(element);
                }
            });
        }
         return returnList;
     }
}
