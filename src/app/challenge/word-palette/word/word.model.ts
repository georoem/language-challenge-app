export class Word {

    constructor (public _word: string, public _wordTranslate: string, public _wordType: string, public _level: string) {}

    set word(word: string) {
        this._word = word;
    }

    get word() {
        return this._word;
    }

    set wordTranslate(wordTranslate: string) {
        this._wordTranslate = wordTranslate;
    }

    get wordTranslate() {
        return this._wordTranslate;
    }

    set wordType(wordType: string) {
        this._wordType = wordType;
    }

    get wordType() {
        return this._wordType;
    }

    set level(level: string) {
        this._level = level;
    }

    get level() {
        return this._level;
    }
}
