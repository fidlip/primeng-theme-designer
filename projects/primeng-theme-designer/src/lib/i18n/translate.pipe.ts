import { inject, Pipe, PipeTransform } from '@angular/core';
import { PtdTranslateService } from './translate.service';
import { PtdTranslateParams } from './translate.types';

/** Impure so it re-evaluates when the language changes at runtime. */
@Pipe({ name: 'ptdTranslate', standalone: true, pure: false })
export class PtdTranslatePipe implements PipeTransform {
  private readonly translateService = inject(PtdTranslateService);

  transform(key: string, params?: PtdTranslateParams): string {
    return this.translateService.translate(key, params);
  }
}
