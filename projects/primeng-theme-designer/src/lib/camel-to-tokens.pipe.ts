import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'camelToTokens', standalone: true })
export class CamelToTokensPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) {
      return '';
    }
    const words = value.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ').toLowerCase();
    return words.charAt(0).toUpperCase() + words.slice(1);
  }
}
