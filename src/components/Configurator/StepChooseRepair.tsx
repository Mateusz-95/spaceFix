import React from 'react';
import StepHeader from './StepHeader';
import NotFoundCta from './NotFoundCta';
import { RepairCard } from './cards';
import { modelSupportsRepair, priceListRepairTypes, type RepairType } from './configurator-data';
import type { Phone } from './types';

interface Props {
  model?: Phone;
  onSelect: (repair: RepairType) => void;
}

const StepChooseRepair: React.FC<Props> = ({ model, onSelect }) => {
  const repairs = model
    ? priceListRepairTypes.filter((repair) => modelSupportsRepair(model, repair))
    : priceListRepairTypes;

  return (
  <div>
    <StepHeader title="Wybierz naprawę" />

    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
      {repairs.map((repair) => (
        <RepairCard key={repair.id} repair={repair} onClick={() => onSelect(repair)} />
      ))}
    </div>

    <NotFoundCta question="Nieznalazłeś swojego problemu?" />
  </div>
  );
};

export default StepChooseRepair;
