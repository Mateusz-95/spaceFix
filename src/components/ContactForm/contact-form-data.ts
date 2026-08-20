export interface ContactFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  device: string;
  message: string;
  privacyAccepted: boolean;
  botcheck?: string;
}

export const emptyContactFormData = (): ContactFormData => ({
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  device: '',
  message: '',
  privacyAccepted: false,
  botcheck: '',
});

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

const namePattern = /^[\p{L}\s'-]{2,}$/u;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FIELD_LIMITS = {
  firstName: 50,
  lastName: 50,
  phone: 20,
  email: 100,
  device: 100,
  message: 1000,
} as const;

function countPhoneDigits(phone: string): number {
  return phone.replace(/\D/g, '').length;
}

function validateName(
  value: string,
  emptyMessage: string,
  invalidMessage: string,
  maxLength: number,
): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return emptyMessage;
  if (trimmed.length > maxLength) return `Maksymalnie ${maxLength} znaków`;
  if (!namePattern.test(trimmed)) return invalidMessage;
  return undefined;
}

export function validateContactField(
  field: keyof ContactFormData,
  data: ContactFormData,
): string | undefined {
  switch (field) {
    case 'firstName':
      return validateName(
        data.firstName,
        'Podaj imię',
        'Imię może zawierać tylko litery',
        FIELD_LIMITS.firstName,
      );
    case 'lastName':
      return validateName(
        data.lastName,
        'Podaj nazwisko',
        'Nazwisko może zawierać tylko litery',
        FIELD_LIMITS.lastName,
      );
    case 'phone': {
      const phone = data.phone.trim();
      if (!phone) return 'Podaj numer telefonu';
      if (countPhoneDigits(phone) < 9) return 'Numer telefonu musi mieć co najmniej 9 cyfr';
      if (countPhoneDigits(phone) > 15) return 'Numer telefonu jest za długi';
      return undefined;
    }
    case 'email': {
      const email = data.email.trim();
      if (!email) return 'Podaj adres e-mail';
      if (email.length > FIELD_LIMITS.email) return 'Adres e-mail jest za długi';
      if (!emailPattern.test(email)) return 'Podaj poprawny adres e-mail';
      return undefined;
    }
    case 'device': {
      const device = data.device.trim();
      if (device.length > FIELD_LIMITS.device) return 'Nazwa urządzenia jest za długa';
      return undefined;
    }
    case 'message': {
      const message = data.message.trim();
      if (!message) return 'Napisz treść zapytania';
      if (message.length < 5) return 'Treść zapytania jest za krótka (min. 5 znaków)';
      if (message.length > FIELD_LIMITS.message) return 'Wiadomość może mieć maksymalnie 1000 znaków';
      return undefined;
    }
    case 'privacyAccepted': {
      if (!data.privacyAccepted) {
        return 'Musisz zaakceptować politykę prywatności, aby wysłać zapytanie';
      }
      return undefined;
    }
    default:
      return undefined;
  }
}

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const fields: (keyof ContactFormData)[] = [
    'firstName',
    'lastName',
    'phone',
    'email',
    'device',
    'message',
    'privacyAccepted',
  ];
  const errors: ContactFormErrors = {};

  for (const field of fields) {
    const error = validateContactField(field, data);
    if (error) errors[field] = error;
  }

  return errors;
}

export function getContactFieldLimit(field: keyof typeof FIELD_LIMITS): number {
  return FIELD_LIMITS[field];
}


export interface SubmitResult {
  success: boolean;
  message?: string;
}

export async function sendContactInquiry(
  data: ContactFormData,
  accessKey?: string,
): Promise<SubmitResult> {
  // Honeypot anti-spam check
  if (data.botcheck) {
    return { success: false, message: 'Wykryto spam (botcheck).' };
  }

  const key = accessKey || import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY || '';

  if (!key) {
    // If no Web3Forms access key is configured yet, we inform about the missing access key or mailto fallback
    return {
      success: false,
      message:
        'Klucz Web3Forms nie został jeszcze skonfigurowany. Dodaj klucz w pliku .env lub config/site.ts.',
    };
  }

  try {
    const payload = {
      access_key: key,
      subject: `Nowe zapytanie od: ${data.firstName} ${data.lastName} (SpaceFix)`,
      from_name: 'SpaceFix Formularz',
      name: `${data.firstName} ${data.lastName}`,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      device_model: data.device || 'Nie podano',
      message: data.message,
      replyto: data.email,
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => null);

    if (response.ok && json && json.success) {
      return { success: true };
    }

    return {
      success: false,
      message:
        json?.message ||
        'Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie lub skontaktuj się z nami telefonicznie.',
    };
  } catch (err) {
    console.error('Błąd wysyłania formularza:', err);
    return {
      success: false,
      message:
        'Nie udało się połączyć z serwerem pocztowym. Sprawdź połączenie z internetem lub zadzwoń bezpośrednio.',
    };
  }
}
