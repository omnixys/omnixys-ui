import 'dayjs/locale/en';
import 'dayjs/locale/fr';

export function getDayjsLocale(language: string | undefined): 'de' | 'en' | 'fr' {
    switch (language?.toLowerCase()) {
        case 'en':
            return 'en';
        case 'fr':
            return 'fr';
        default:
            return 'de';
    }
}
