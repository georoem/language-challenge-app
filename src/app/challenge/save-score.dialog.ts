import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-save-score-dialog',
    templateUrl: 'save-score.dialog.html',
  })
  export class SaveScoreDialogComponent {

    user: string;
    userFormControl = new FormControl('', [Validators.required]);

    constructor(private dialogRef: MatDialogRef<SaveScoreDialogComponent>) {}

    saveScore() {
        this.dialogRef.close({ user: this.user });
    }

    getErrorMessage() {
      return this.userFormControl.hasError('required') ? 'You must enter a user name' :
              '';
    }

    nextWord() {

    }
  }
