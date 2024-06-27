import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

import 'dayjs/locale/ko'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)
dayjs.locale('ko')

function timeFromNow(date: string | Date): string {
  if (Math.abs(dayjs(date).diff(dayjs(), 'month')) > 1) {
    return dayjs(date).format('LLL')
  } else {
    return dayjs(date).fromNow()
  }
}

function timeFormat(date: string | Date): string {
  return dayjs(date).format('LLL')
}

function timeFormatShort(date: string | Date): string {
  return dayjs(date).format('LL')
}

function timeFormatNumeric(date: string | Date): string {
  return dayjs(date).format('YYYY.MM.DD HH:mm')
}

export default {
  timeFromNow,
  timeFormat,
  timeFormatShort,
  timeFormatNumeric,
}
