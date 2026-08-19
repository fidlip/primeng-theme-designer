import { Pipe, PipeTransform } from '@angular/core';
import {Json, isJson, isJsonProperty} from './json.model';


@Pipe({ name: 'isJson', pure: true })
export class IsJsonPipe implements PipeTransform {
  transform(value: unknown): value is Json {
    return isJson(value);
  }
}

@Pipe({ name: 'isJsonProperty', pure: true })
export class IsJsonPropertyPipe implements PipeTransform {
  transform(value: unknown): value is Json {
    return isJsonProperty(value);
  }
}
