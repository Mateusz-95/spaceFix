import React, { useState } from 'react';
import { FiCheckCircle, FiAlertCircle, FiSend, FiPhone, FiMail } from 'react-icons/fi';
import {
  emptyContactFormData,
  validateContactField,
  validateContactForm,
  sendContactInquiry,
  type ContactFormData,
  type ContactFormErrors,
  getContactFieldLimit,
} from './contact-form-data';
import { contact } from '../../config/site';
import { withBase } from '../../utils/withBase';

interface ContactFormProps {
  accessKey?: string;
  className?: string;
}

const baseInputClass =
  'w-full rounded-xl border bg-white px-4 py-3 text-base text-[#010101] shadow-contact outline-none transition placeholder:text-[#94a3b8] focus:ring-2';

const labelClass = 'mb-1.5 block text-sm font-semibold text-[#010101]';

function inputClassName(hasError: boolean): string {
  return hasError
    ? `${baseInputClass} border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/15`
    : `${baseInputClass} border-[#e2e8f0] focus:border-[#1c1d11] focus:ring-[#1c1d11]/10`;
}

export default function ContactForm({ accessKey, className = '' }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>(emptyContactFormData());
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    field: keyof ContactFormData,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleBlur = (field: keyof ContactFormData) => {
    const error = validateContactField(field, formData);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) next[field] = error;
      else delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus('idle');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const key = accessKey || contact.web3FormsAccessKey || '';
    const result = await sendContactInquiry(formData, key);

    if (result.success) {
      setStatus('success');
      setFormData(emptyContactFormData());
    } else {
      setStatus('error');
      setErrorMessage(result.message || 'Wystąpił nieoczekiwany błąd podczas wysyłki.');
    }
  };

  const handleReset = () => {
    setFormData(emptyContactFormData());
    setErrors({});
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className={`rounded-2xl bg-white p-7 shadow-contact sm:p-9 text-center ${className}`}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ecfdf5] text-[#059669]">
          <FiCheckCircle className="h-9 w-9" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-[#010101]">Wiadomość została wysłana!</h3>
        <p className="mt-3 text-base leading-relaxed text-[#64748b]">
          Dziękujemy za kontakt. Twoje zapytanie trafiło do naszego zespołu serwisowego.
          Odpowiemy najszybciej jak to możliwe (zazwyczaj w ciągu 30 minut w godzinach pracy).
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex w-full items-center justify-center rounded-[14px] bg-[#1c1d11] px-6 py-3.5 text-base font-bold text-white transition hover:bg-[#2a2b1a] sm:w-auto"
          >
            Wyślij kolejne zapytanie
          </button>
          <a
            href={contact.phoneHref}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] border border-[#1c1d11]/15 bg-white px-6 py-3.5 text-base font-bold text-[#1c1d11] transition hover:bg-[#f4f4f1] sm:w-auto"
          >
            <FiPhone className="h-4 w-4" aria-hidden="true" />
            Zadzwoń: {contact.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-2xl bg-white p-7 shadow-contact sm:p-9 ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-[#010101] sm:text-2xl">
          Napisz do nas
        </h3>
        <p className="mt-2 text-sm text-[#64748b]">
          Uzupełnij formularz, aby otrzymać bezpłatną wycenę naprawy lub odpowiedź na Twoje pytanie.
        </p>
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-[#fecaca] bg-[#fef2f2] p-4 text-sm text-[#dc2626]"
        >
          <div className="flex items-start gap-3">
            <FiAlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Nie udało się wysłać formularza</p>
              <p>{errorMessage}</p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href={contact.phoneHref}
                  className="inline-flex items-center gap-1 font-bold underline hover:text-[#b91c1c]"
                >
                  <FiPhone /> Zadzwoń: {contact.phoneDisplay}
                </a>
                <span>•</span>
                <a
                  href={contact.emailHref}
                  className="inline-flex items-center gap-1 font-bold underline hover:text-[#b91c1c]"
                >
                  <FiMail /> Napisz bezpośrednio na: {contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Honeypot field for bot spam */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        checked={Boolean(formData.botcheck)}
        onChange={(e) => handleChange('botcheck', e.target.checked ? 'spam' : '')}
      />

      <div className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-firstName" className={labelClass}>
              Imię <span className="text-[#dc2626]">*</span>
            </label>
            <input
              id="contact-firstName"
              type="text"
              name="firstName"
              autoComplete="given-name"
              placeholder="Jan"
              maxLength={getContactFieldLimit('firstName')}
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              className={inputClassName(Boolean(errors.firstName))}
              disabled={status === 'submitting'}
              aria-invalid={Boolean(errors.firstName)}
            />
            {errors.firstName && (
              <p className="mt-1.5 text-sm text-[#dc2626]">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-lastName" className={labelClass}>
              Nazwisko <span className="text-[#dc2626]">*</span>
            </label>
            <input
              id="contact-lastName"
              type="text"
              name="lastName"
              autoComplete="family-name"
              placeholder="Kowalski"
              maxLength={getContactFieldLimit('lastName')}
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              className={inputClassName(Boolean(errors.lastName))}
              disabled={status === 'submitting'}
              aria-invalid={Boolean(errors.lastName)}
            />
            {errors.lastName && (
              <p className="mt-1.5 text-sm text-[#dc2626]">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-email" className={labelClass}>
              Adres e-mail <span className="text-[#dc2626]">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              inputMode="email"
              autoComplete="email"
              placeholder="jan@example.com"
              maxLength={getContactFieldLimit('email')}
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={inputClassName(Boolean(errors.email))}
              disabled={status === 'submitting'}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && (
              <p className="mt-1.5 text-sm text-[#dc2626]">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className={labelClass}>
              Numer telefonu <span className="text-[#dc2626]">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              name="phone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="730 000 000"
              maxLength={getContactFieldLimit('phone')}
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              className={inputClassName(Boolean(errors.phone))}
              disabled={status === 'submitting'}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && (
              <p className="mt-1.5 text-sm text-[#dc2626]">{errors.phone}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="contact-device" className={labelClass}>
            Model urządzenia / Usterka <span className="text-[#64748b] font-normal">(opcjonalnie)</span>
          </label>
          <input
            id="contact-device"
            type="text"
            name="device"
            placeholder="np. iPhone 14 Pro — wymiana szybki"
            maxLength={getContactFieldLimit('device')}
            value={formData.device}
            onChange={(e) => handleChange('device', e.target.value)}
            onBlur={() => handleBlur('device')}
            className={inputClassName(Boolean(errors.device))}
            disabled={status === 'submitting'}
          />
          {errors.device && (
            <p className="mt-1.5 text-sm text-[#dc2626]">{errors.device}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className={labelClass}>
            Treść zapytania / opis problemu <span className="text-[#dc2626]">*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={4}
            placeholder="Opisz problem ze swoim urządzeniem lub zadaj pytanie serwisowi..."
            maxLength={getContactFieldLimit('message')}
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            onBlur={() => handleBlur('message')}
            className={`${inputClassName(Boolean(errors.message))} resize-y min-h-[110px]`}
            disabled={status === 'submitting'}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && (
            <p className="mt-1.5 text-sm text-[#dc2626]">{errors.message}</p>
          )}
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              name="privacyAccepted"
              checked={formData.privacyAccepted}
              onChange={(e) => handleChange('privacyAccepted', e.target.checked)}
              disabled={status === 'submitting'}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#1c1d11] focus:ring-[#1c1d11]"
            />
            <span className="text-xs leading-relaxed text-[#64748b]">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi na
              zapytanie zgodnie z{' '}
              <a
                href={withBase('/politics/')}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#1c1d11]"
              >
                polityką prywatności
              </a>
              . <span className="text-[#dc2626]">*</span>
            </span>
          </label>
          {errors.privacyAccepted && (
            <p className="mt-1.5 text-sm text-[#dc2626]">{errors.privacyAccepted}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#1c1d11] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2a2b1a] focus:outline-none focus:ring-2 focus:ring-[#1c1d11] focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <svg
                className="h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Wysyłanie zapytania...</span>
            </>
          ) : (
            <>
              <FiSend className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>Wyślij zapytanie</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
