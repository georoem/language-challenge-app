import { Component, OnInit, Input } from '@angular/core';
import { WordPaletteService } from './word-palette.service';

@Component({
  selector: 'app-word-palette',
  templateUrl: './word-palette.component.html',
  styleUrls: ['./word-palette.component.css']
})
export class WordPaletteComponent implements OnInit {

  @Input() wordTypes: string[];
  @Input() level: string;
  constructor(private wordPaletteService: WordPaletteService) {
    wordPaletteService.changeWords$.subscribe(
      change => {
        this.changeWords();
      });
  }

  ngOnInit() {
  }

  changeWords() {
    this.wordPaletteService.changeWord(true);
  }

}
