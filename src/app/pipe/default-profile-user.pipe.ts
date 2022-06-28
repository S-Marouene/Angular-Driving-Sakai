import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTES } from '../constantes/constantes';

@Pipe({
  name: 'defaultProfileUser'
})
export class DefaultProfileUserPipe implements PipeTransform {

    transform(path: string): string {
        if (!path.trim().length) {
          return CONSTANTES.defaultImage;
        }
        return path;
      }

}
