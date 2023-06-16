import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photomodal',
  templateUrl: './photomodal.component.html',
  styleUrls: ['./photomodal.component.css']
})
export class PhotomodalComponent {
  @Input() imageUrl!: string;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
