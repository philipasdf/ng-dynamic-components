import { Type } from "@angular/core";
import { TextfeldComponent } from "../form-components/textfeld.component";
import { UeberschriftComponent } from "../form-components/ueberschrift.component";

/**
 * Statt Typen könnte ich Classen verwenden, dann kann ich immer per new XYZ Sachen initialisieren
 */
export type UeberschriftComponentConfig = {
    component: Type<UeberschriftComponent>;
    formConfig: any; // todo
    // /ueberschrift: FormControl<string>;
  };
  
  export type TextfeldComponentConfig = {
    component: Type<TextfeldComponent>;
    formConfig: any; // todo
    // frage: FormControl<string>;
    // antwort: FormControl<string>;
    // pflichtfeld: FormControl<boolean>;
  };
  
  export type Frage = {
    order: number;
    componentConfig: UeberschriftComponentConfig | TextfeldComponentConfig;
  };
  
  export type Fragebogen = {
    fragebogenName: string;
    fragen: Frage[];
  };