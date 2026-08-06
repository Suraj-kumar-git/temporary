import { CommonModule, DecimalPipe, registerLocaleData } from '@angular/common';
import localeTr from '@angular/common/locales/tr';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ChoosePlanComponent } from './choose-plan.component';

// Needed by the DecimalPipe to group Turkish prices as 18.900 rather than 18,900.
// Harmless if your AppModule already registers it — the last call simply wins.
registerLocaleData(localeTr, 'tr');

@NgModule({
  declarations: [ChoosePlanComponent],
  imports: [CommonModule, TranslateModule],
  providers: [DecimalPipe],
  exports: [ChoosePlanComponent]
})
export class ChoosePlanModule {}
