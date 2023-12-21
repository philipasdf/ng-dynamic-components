import { Injectable, Type } from '@angular/core';
import { FRAGEBOGEN_BASIC } from './testdata';
import { TextfeldComponent } from '../form-components/textfeld.component';
import { UeberschriftComponent } from '../form-components/ueberschrift.component';
import { Frage, Fragebogen } from '../model/fragebogen';

@Injectable({ providedIn: 'root' })
export class FragebogenApiService {
  fetchFragebogen(): Fragebogen {
    return dtoToFragebogen(FRAGEBOGEN_BASIC);
  }
}

/**
 * 
 * @param dto   any, da BE nicht feststeht
 */
function dtoToFragebogen(dto: any): Fragebogen {
  /**
   * was muss hier umgewandelt werden?
   * 
   * 1. frageTyp in zugehörige Component
   * 2. formGroup und Controls? ne zu viel magic - außerdem werden die Fragen dynamisch
   *    erweitert und entfernt
   */

return {
  fragebogenName: dto.fragebogenName,
  fragen: dto.fragen.map((frageDto: any) => dtoToFrage(frageDto))
}
}

/**
 * 
 * {
        index: 2,
        frageTyp: 'textfeld',
        formConfig: {
          frage: 'Aktuelle Serie?',
          antwort: '',
          pflichtfeld: true,
        },
      },
 */
function dtoToFrage(dto: any): Frage {
  return {
    order: dto.index,
    componentConfig: {
      component: componentNameToComponent(dto.frageTyp),
      formConfig: dto.formConfig
    }
  }
}

function componentNameToComponent(componentName: string): Type<any> {
  switch (componentName) {
    case 'ueberschrift':
      return UeberschriftComponent;

    case 'textfeld':
      return TextfeldComponent;

    default:
      return UeberschriftComponent;
  }
}