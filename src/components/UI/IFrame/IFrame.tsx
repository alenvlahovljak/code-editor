import React, { LegacyRef, PropsWithChildren } from 'react';

import type { IFrame } from 'types/components/UI/types';

const Frame = React.forwardRef(
  (props: PropsWithChildren<IFrame>, ref: LegacyRef<HTMLIFrameElement>) => (
    <iframe
      ref={ref}
      title={props.title}
      sandbox={props.sandbox}
      srcDoc={props.srcDoc}
      width="100%"
      height="100%"
      loading="lazy"
    />
  )
);

export default Frame;
