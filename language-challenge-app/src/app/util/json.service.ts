import { BlockUIService } from 'ng-block-ui/dist/lib/services/block-ui.service';
import { Component, Input } from '@angular/core';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class JsonService {

    @BlockUI() appBlockUI: NgBlockUI;

    pronouns;
    verbs;
    nouns;
    verbTimes;
    // urlService = 'https://language-challenge-server.azurewebsites.net/';
    urlService = 'http://localhost:1337/';

    constructor(private http: HttpClient, private blockUIService: BlockUIService) {
        this.appBlockUI.start('Cargando..');
        this.http.get(this.urlService + 'words/wordType/pronoun').subscribe(data => {
            this.pronouns = data;
            this.appBlockUI.stop();
        });

        this.appBlockUI.start('Cargando..');
        this.http.get(this.urlService + 'words/wordType/verb').subscribe(data => {
            this.verbs = data;
            this.appBlockUI.stop();
        });

        this.appBlockUI.start('Cargando..');
        this.http.get(this.urlService + 'words/wordType/noun').subscribe(data => {
            this.nouns = data;
            this.appBlockUI.stop();
        });

        this.appBlockUI.start('Cargando..');
        this.http.get(this.urlService + 'words/wordType/verbTime').subscribe(data => {
            this.verbTimes = data;
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
