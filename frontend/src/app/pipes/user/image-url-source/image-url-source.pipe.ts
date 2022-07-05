import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageUrlSource'
})
export class ImageUrlSourcePipe implements PipeTransform {

  transform(relativeSource: string): string {
    return environment.baseUrl.concat(relativeSource);
  }

}
