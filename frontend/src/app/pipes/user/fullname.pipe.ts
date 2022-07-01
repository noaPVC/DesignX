import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  // pipe can be used to combine first and lastname in
  // any given order
  transform(before: string, after: string): unknown {
    return `${before} ${after}`;
  }
}
