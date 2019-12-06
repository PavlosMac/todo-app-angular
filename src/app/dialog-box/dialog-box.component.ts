import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.sass']
})
export class DialogBoxComponent {

  dialogueTitle: string;
  dynamicContent: string;

  constructor(private dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) data: {title: string; content?: string}) {

    this.dialogueTitle = data.title;
    this.dynamicContent = data.content;
    this.handleDialogueData(data);
  }

  handleDialogueData(data) {

    // if(data.newPlaylistName) {
    //   this.newPlaylistName = true;
    // }
    //
    // if(data.deleteTrack|| data.addTrack) {
    //   data.addTrack ? this.addTrack = true:null;
    //   this.displayConfirmation = true;
    // }
  }

  close() {
    this.dialogRef.close();
  }

  // confirmPlaylistName() {
  //   this.dialogRef.close(this.playlistNewName);
  // }

}
