import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html'
})
export class PdfViewerComponent {
  @Input('pdfSrc') pdfSrc:string
  constructor() { 
    // this.pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
  }
}
