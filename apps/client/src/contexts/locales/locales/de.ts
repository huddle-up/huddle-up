import { de as dateLocale } from 'date-fns/locale';
import { deDE as uiLocale } from '@material-ui/core/locale';

import { Locales } from './locales.interface';

const deLocale: Locales = {
  dateLocale,
  uiLocale,
};

export default deLocale;
