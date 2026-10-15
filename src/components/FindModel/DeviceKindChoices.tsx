import React from 'react';
import { MdSmartphone, MdTabletMac, MdWatch } from 'react-icons/md';
import { getFindModelHref, type DeviceKind } from '../Configurator/konfigurator-url';

const choices: { id: DeviceKind; label: string; text: string; icon: React.ReactNode }[] = [
  {
    id: 'telefon',
    label: 'Telefon',
    text: 'iPhone, Samsung, Pixel',
    icon: <MdSmartphone className="h-7 w-7" aria-hidden="true" />,
  },
  {
    id: 'tablet',
    label: 'Tablet',
    text: 'iPad',
    icon: <MdTabletMac className="h-7 w-7" aria-hidden="true" />,
  },
  {
    id: 'zegarek',
    label: 'Zegarek',
    text: 'Apple Watch',
    icon: <MdWatch className="h-7 w-7" aria-hidden="true" />,
  },
];

const cardClass =
  'group flex h-full items-center gap-4 rounded-2xl bg-white p-5 text-left shadow-contact transition hover:shadow-card-hover';

interface Props {
  onSelect?: (kind: DeviceKind) => void;
  /** Zachowuje wybraną naprawę w linku, np. ze strony wymiany szybki. */
  repairId?: string;
}

const DeviceKindChoices: React.FC<Props> = ({ onSelect, repairId }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
    {choices.map((choice) => {
      const inner = (
        <>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eeeeec] text-[#1c1d11]">
            {choice.icon}
          </span>
          <span>
            <span className="block text-base font-bold text-[#010101]">{choice.label}</span>
            <span className="mt-0.5 block text-sm text-[#64748b]">{choice.text}</span>
          </span>
        </>
      );

      if (onSelect) {
        return (
          <button key={choice.id} type="button" className={cardClass} onClick={() => onSelect(choice.id)}>
            {inner}
          </button>
        );
      }

      return (
        <a key={choice.id} href={getFindModelHref(choice.id, repairId)} className={cardClass}>
          {inner}
        </a>
      );
    })}
  </div>
);

export default DeviceKindChoices;
