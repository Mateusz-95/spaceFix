import React from 'react';
import DeviceKindChoices from './DeviceKindChoices';
import ModelSearchBox from './ModelSearchBox';

interface Props {
  repairId?: string;
  title?: string;
  subtitle?: string;
  compact?: boolean;
}

const FindModelSection: React.FC<Props> = ({
  repairId,
  title = 'Znasz swój model?',
  subtitle = 'Wpisz telefon, tablet albo zegarek. Potem wybierzesz naprawę i zobaczysz cenę.',
  compact = false,
}) => (
  <section
    id="znajdz-model"
    className={
      compact
        ? 'scroll-mt-[var(--header-height)] bg-[#fbfcfe] pb-8 pt-8 sm:pb-10 sm:pt-10'
        : 'scroll-mt-[var(--header-height)] bg-[#fbfcfe] pb-4 pt-16 md:pt-20'
    }
  >
    <div className="section-container">
      <div className={compact ? 'mx-auto mb-6 max-w-3xl text-center' : 'mx-auto mb-8 max-w-3xl text-center md:mb-10'}>
        <h2 className="section-title mb-4">{title}</h2>
        <p className="section-subtitle mx-auto">{subtitle}</p>
      </div>
      <ModelSearchBox repairId={repairId} />
      <div className="mx-auto mt-8 max-w-4xl">
        <DeviceKindChoices repairId={repairId} />
      </div>
    </div>
  </section>
);

export default FindModelSection;
