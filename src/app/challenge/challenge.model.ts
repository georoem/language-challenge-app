export class Challenge {

    public constructor(private _id?: string, private _type?: string, private _typeTitle?: string , private _description?: string,
                        private _color?: string, private _icon?: string, private _wordsTypeChallenge?: WordTypeChallenge[]) {}

    get id() {
        return this._id;
    }

    set type(type: string) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    set typeTitle(typeTitle: string) {
        this._typeTitle = typeTitle;
    }

    get typeTitle() {
        return this._typeTitle;
    }

    set description(description: string) {
        this._description = description;
    }

    get description() {
        return this._description;
    }

    set color(color: string) {
        this._color = color;
    }

    get color() {
        return this._color;
    }

    set icon(icon: string) {
        this._icon = icon;
    }

    get icon() {
        return this._icon;
    }

    set wordsTypeChallenge(wordsTypeChallenge: WordTypeChallenge[]) {
        this._wordsTypeChallenge = wordsTypeChallenge;
    }

    get wordsTypeChallenge() {
        return this._wordsTypeChallenge;
    }
}

export class WordTypeChallenge {
    public constructor(private _type: string, private _typeTitle: string ,
        private _color: string, private _icon: string, private _random: boolean) {}

    set type(type: string) {
        this._type = type;
    }

    get type() {
        return this._type;
    }

    set typeTitle(typeTitle: string) {
        this._typeTitle = typeTitle;
    }

    get typeTitle() {
        return this._typeTitle;
    }

    set color(color: string) {
        this._color = color;
    }

    get color() {
        return this._color;
    }

    set icon(icon: string) {
        this._icon = icon;
    }

    get icon() {
        return this._icon;
    }

    set random(random: boolean) {
        this._random = random;
    }

    get random() {
        return this._random;
    }

}
