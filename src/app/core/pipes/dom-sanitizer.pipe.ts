import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  /**
   *
   */
  constructor(private domSatitizer: DomSanitizer) {
    
  }
  transform(img: string): any {
    img = `${environment.urlAvatar}${img}`
    this.domSatitizer.bypassSecurityTrustUrl(img);
    return img;
  }

}
