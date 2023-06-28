import React, { type ReactElement } from 'react';

import * as Flags from 'react-flags-select';

export default function FlagDisplay({
  countryCode,
}: {
  countryCode: string;
}): ReactElement {
  const flagName =
    countryCode.charAt(0).toUpperCase() + countryCode.slice(1).toLowerCase();

  // eslint-disable-next-line
  const FlagComponent = (Flags as any)[flagName];

  if (FlagComponent == null) {
    return <div>Flag not found</div>;
  }

  return <FlagComponent />;
}
