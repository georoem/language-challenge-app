import { Injectable } from '@angular/core';
import { Word } from './word.model';
import { Subject } from 'rxjs/Subject';
import { BlockUIService } from 'ng-block-ui/dist/lib/services/block-ui.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { plainToClass } from 'class-transformer';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WordTypeChallenge } from '../challenge/challenge.model';

@Injectable()
export class WordService {

    @BlockUI() appBlockUI: NgBlockUI;

    words = {};
    pronouns: Word[];
    verbs: Word[];
    nouns: Word[];
    verbTimes: Word[];
    newWords: Word[];
    wordTypes: WordTypeChallenge[]
    urlService = '';
    maxLength = 0;

    constructor(private http: HttpClient, private blockUIService: BlockUIService) {
        this.urlService = environment.apiUrl;
    }

    public initWordTypes(wordTypes: WordTypeChallenge[]) {
        this.wordTypes = wordTypes; 
        if(wordTypes) {
            wordTypes.forEach(element => {
                this.appBlockUI.start('Cargando..');
                if(element.type == 'talk') {
                    this.http.get<string[]>(this.urlService + 'words/distinct/_wordGroupId/'+element.type).subscribe(data => {
                        if(data) {
                            let randomGroup = data[Math.floor(Math.random() * data.length)];
                            this.http.get<Word[]>(this.urlService + 'words/wordTypeGroup/'+element.type+'/'+randomGroup).subscribe(data => {
                                this.words[element.type] = plainToClass(Word, data);
                                this.words[element.type].random = element.random;
                                this.words[element.type].lastWordIndex = 0;
                                if(this.words[element.type].length>this.maxLength) {
                                    this.maxLength = this.words[element.type].length;
                                }
                                this.appBlockUI.stop();
                            });
                        }
                        this.appBlockUI.stop();
                    });
                } else {
                    this.http.get<Word[]>(this.urlService + 'words/wordType/'+element.type).subscribe(data => {
                        this.words[element.type] = plainToClass(Word, data);
                        this.words[element.type].random = element.random;
                        this.words[element.type].lastWordIndex = 0;
                        this.appBlockUI.stop();
                    });
                }
            });
        }
    }

    private checkWordCallbackSource = new Subject<boolean>();

    checkWordCallback$ = this.checkWordCallbackSource.asObservable();

    public checkwordCallback(check: boolean) {
        this.checkWordCallbackSource.next(check);
    }

    public getWord(type: string, level: string): Word {
        let words = this.getWords(type, level);
        let random = this.words[type].random;
        let word: Word;
        if(random) {
            word = words[Math.floor(Math.random() * words.length)];
        } else {
            word = words[this.words[type].lastWordIndex];
            this.words[type].lastWordIndex ++;
        }
        return word;
    }

    public getMaxLength() {
        return this.maxLength;
    }

    public getWords(type, level) {
        if (level) {
            const list = this.getWordsFilterByParam(this.words[type], 'level', level);
            return list;
        } else {
            return this.words[type];
        }
    }

    public restartWords() {
        this.wordTypes.forEach(element => {
            this.words[element.type].lastWordIndex = 0;
        });
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
