import { isNull } from '@angular/compiler/src/output/output_ast';
import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTES } from '../constantes/constantes';

@Pipe({
  name: 'defaultProfileUser'
})
export class DefaultProfileUserPipe implements PipeTransform {

    transform(path: string): string {
        if ( path === null ) {
          return CONSTANTES.defaultImage;
        }
        return path;
      }

}
