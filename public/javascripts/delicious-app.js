import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import typeAhead from './modules/typeAhead';
import dropdown from './modules/dropdown'
import totaler from './modules/addTotals'

typeAhead($('.search'));
dropdown($('.add-toggle'));
totaler($$('.siteTotal'), $('.grandTotal'));