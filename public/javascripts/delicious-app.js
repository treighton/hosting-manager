import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import typeAhead from './modules/typeAhead';
import dropdown from './modules/dropdown'

typeAhead($('.search'));
dropdown($('.add-toggle'))