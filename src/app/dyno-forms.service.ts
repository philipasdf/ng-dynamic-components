import { Injectable, Type, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextfeldComponent } from './form-components/textfeld.component';
import { UeberschriftComponent } from './form-components/ueberschrift.component';

/**
 * serialisierbar
 */
export type UeberschriftConfig = {
  componentName: 'ueberschrift-component';
  ueberschrift: string;
};

export type TextfeldConfig = {
  componentName: 'textfeld-component';
  frage: string;
  pflichtfeld: boolean;
};

export type Frage = {
  index: number;
  formConfig: UeberschriftConfig | TextfeldConfig;
  antwort?: any; // hier??
};

export type FragebogenConfig = {
  fragebogenName: string;
  fragen: Frage[];
  antworten?: any; // so? oder noch kA
};

/**
 * zum rendern
 */
export type UeberschriftComponentConfig = {
  component: Type<UeberschriftComponent>;
  // ueberschrift: FormControl<string>;
};

export type TextfeldComponentConfig = {
  component: Type<TextfeldComponent>;
  // frage: FormControl<string>;
  // antwort: FormControl<string>;
  // pflichtfeld: FormControl<boolean>;
};

export type FrageRendered = {
  index: number;
  componentConfig: UeberschriftComponentConfig | TextfeldComponentConfig;
};

export type FragebogenConfigRendered = {
  fragebogenName: string;
  fragen: FrageRendered[];
};

/**
 * serialisierbare Objekte
 */
const DEFAULT_CONFIG: FragebogenConfig = {
  fragebogenName: 'Default Fragebogen',
  fragen: [
    {
      index: 0,
      formConfig: {
        componentName: 'textfeld-component',
        frage: '',
        pflichtfeld: true,
      },
    },
  ],
};

const ANY_CONFIG: FragebogenConfig = {
  fragebogenName: 'Schon bearbeiteter Fragebogen',
  fragen: [
    {
      index: 0,
      formConfig: {
        componentName: 'ueberschrift-component',
        ueberschrift: 'Filme und Serien',
      },
    },
    {
      index: 1,
      formConfig: {
        componentName: 'textfeld-component',
        frage: 'Dein letzter Film?',
        pflichtfeld: true,
      },
    },
    {
      index: 2,
      formConfig: {
        componentName: 'textfeld-component',
        frage: 'Aktuelle Serie?',
        pflichtfeld: true,
      },
    },
    {
      index: 3,
      formConfig: {
        componentName: 'ueberschrift-component',
        ueberschrift: 'Musik',
      },
    },
    {
      index: 4,
      formConfig: {
        componentName: 'textfeld-component',
        frage: 'Den letzten Song, den du im Kopf hast?',
        pflichtfeld: true,
      },
    },
  ],
};

function componentNameToComponent(componentName: string): Type<any> {
  switch (componentName) {
    case 'ueberschrift-component':
      return UeberschriftComponent;

    case 'textfeld-component':
      return TextfeldComponent;

    default:
      return UeberschriftComponent;
  }
}

@Injectable({ providedIn: 'root' })
export class DynoFormsService {
  /**
   * aus der serialisierbaren fragebogen konfiguration brauche ich jetzt eine konfiguration mit
   * der Angabe der Komponenten, die gerendert werden sollen
   * und der Angabe der FormControls
   */
  fb = inject(FormBuilder);

  rootForm: FormGroup = new FormGroup({});

  getFragebogenConfig(): FragebogenConfigRendered {
    return this.fragebogenConfigToRenderConfig(DEFAULT_CONFIG);
  }

  addComponent() {
    // TODO
  }

  private fragebogenConfigToRenderConfig(fragebogenConfig: FragebogenConfig): FragebogenConfigRendered {
    // umwandlung....

    return {
      fragebogenName: '',
      fragen: [
        {
          index: 0,
          componentConfig: {
            component: UeberschriftComponent,
          },
        },
      ],
    };
  }
}

export type ComponentConfig = { id: string; component: Type<any>; inputs?: Record<string, unknown> };
