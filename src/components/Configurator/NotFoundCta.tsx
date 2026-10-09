import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import { contact } from '../../config/site';

const NotFoundCta: React.FC<{ question: string }> = ({ question }) => (
  <div className="mt-12 flex flex-col items-center gap-5 text-center md:mt-16">
    <p className="text-xl text-[#64748b] sm:text-2xl">{question}</p>
    <div className="flex w-full max-w-xl flex-col items-stretch justify-center gap-3 sm:flex-row">
      <a
        href={contact.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-[#1c1d11] px-8 py-4 text-base font-bold text-white transition hover:bg-[#2a2b1a] focus:outline-none focus:ring-2 focus:ring-[#1c1d11] focus:ring-offset-2"
      >
        <FiPhone className="h-5 w-5 shrink-0" aria-hidden="true" />
        Zadzwoń {contact.phoneDisplay}
      </a>
      <a
        href="#kontakt"
        className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#EBEBEB] bg-white px-8 py-4 text-base font-bold text-[#1c1d11] transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
      >
        <FiMail className="h-5 w-5 shrink-0" aria-hidden="true" />
        Napisz do nas
      </a>
    </div>
  </div>
);

export default NotFoundCta;
