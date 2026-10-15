import React from 'react';
import DeviceKindChoices from '../FindModel/DeviceKindChoices';
import ModelSearchBox from '../FindModel/ModelSearchBox';
import StepHeader from './StepHeader';
import NotFoundCta from './NotFoundCta';
import { DeviceCard } from './cards';
import { getSelectableBrands, type ModelHit, type RepairType } from './configurator-data';
import type { DeviceKind } from './konfigurator-url';
import type { Brand } from './types';

interface Props {
  repair?: RepairType;
  modelFirst?: boolean;
  deviceKind?: DeviceKind | null;
  onSelect: (brand: Brand) => void;
  onKind?: (kind: DeviceKind) => void;
  onPickModel?: (hit: ModelHit) => void;
  onBack?: () => void;
}

const StepChooseDevice: React.FC<Props> = ({
  repair,
  modelFirst = false,
  deviceKind,
  onSelect,
  onKind,
  onPickModel,
  onBack,
}) => {
  const brandKind = deviceKind === 'telefon' ? 'telefon' : null;
  const title = modelFirst
    ? deviceKind === 'telefon'
      ? 'Wybierz markę telefonu'
      : 'Znajdź swój model'
    : 'Wybierz urządzenie';

  return (
    <div>
      <StepHeader title={title} onBack={onBack} />

      {onPickModel && <ModelSearchBox onSelect={onPickModel} />}

      {modelFirst && !deviceKind && onKind && (
        <div className="mx-auto mt-8 max-w-4xl">
          <DeviceKindChoices onSelect={onKind} />
        </div>
      )}

      {onPickModel && (
        <p className="mb-5 mt-10 text-center text-sm font-semibold uppercase tracking-[0.14em] text-[#64748b]">
          albo wybierz markę
        </p>
      )}
      <div className="mx-auto grid w-full max-w-[1208px] grid-cols-1 justify-items-center gap-5 sm:grid-cols-2 sm:gap-6">
        {getSelectableBrands(repair, brandKind).map((brand: any) => (
          <DeviceCard key={brand.name} name={brand.name} onClick={() => onSelect(brand)} />
        ))}
      </div>

      <NotFoundCta question="Nieznalazłeś swojego producenta?" />
    </div>
  );
};

export default StepChooseDevice;
