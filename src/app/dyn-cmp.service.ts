import { Injectable, Type } from '@angular/core';
import { TextfeldComponent } from './form-components/textfeld.component';
import { UeberschriftComponent } from './form-components/ueberschrift.component';

@Injectable({ providedIn: 'root' })
export class DynCmpService {
  configs: ComponentConfig[] = [
    {
      id: '1',
      component: UeberschriftComponent,
      inputs: { modus: 'wysiwyg' },
    },
    {
      id: '2',
      component: TextfeldComponent,
      inputs: { modus: 'wysiwyg' },
    },
    {
      id: '3',
      component: TextfeldComponent,
      inputs: {
        modus: 'formular',
        config: {
          _tag: 'Textfeld',
          frage: 'Was für ein Pokemon bist du?',
          pflichtfeld: true,
        },
      },
    },
  ];

  getComponents(): ComponentConfig[] {
    return this.configs;
  }

  addComponent(cmp: ComponentConfig) {
    this.configs.push(cmp);
  }
}

export type ComponentConfig = { id: string; component: Type<any>; inputs?: Record<string, unknown> };

// export type Modus = 'wysiwyg' | 'formular';
export type Modus = {
  modus: 'wysiwyg' | 'formular';
};

export type TextfeldConfig = Modus & {
  frage: string;
  pflichtfeld: boolean;
};

export type MehrfachauswahlConfig = {
  frage: string;
  auswahlMoeglichkeiten: string[];
};
