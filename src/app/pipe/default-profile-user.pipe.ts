import { isNull } from '@angular/compiler/src/output/output_ast';
import { Pipe, PipeTransform } from '@angular/core';
import { CONSTANTES } from 'src/environments/environment';


@Pipe({
  name: 'defaultProfileUser'
})
export class DefaultProfileUserPipe implements PipeTransform {

    transform(path: string): string {
        if ( path === null || path ==="") {
          return CONSTANTES.defaultImage;
        }
        return path;
      }

}
