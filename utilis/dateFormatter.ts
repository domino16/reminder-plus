import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

export const formatterDate = (date: Date) => format(new Date(date), 'd MMMM yyyy HH:mm', {
  locale: pl,
});