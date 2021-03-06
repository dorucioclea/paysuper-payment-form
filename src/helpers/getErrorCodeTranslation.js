
import { get } from 'lodash-es';
import i18n from '@/i18n';

function getErrorCodeTranslationByLocale(code, locale) {
  return get(i18n.messages[locale], `errorCodes.${code}`)
    || get(i18n.messages[locale], `errorCodes.${code.slice(0, 2)}*`);
}

export default function getErrorCodeTranslation(code, locale = i18n.locale) {
  const noTranslationMessage = get(i18n.messages[locale], 'ActionResult.unknownError.description');
  if (!code) {
    return noTranslationMessage;
  }
  return getErrorCodeTranslationByLocale(code, locale)
    || getErrorCodeTranslationByLocale(code, i18n.fallbackLocale)
    || noTranslationMessage;
}
