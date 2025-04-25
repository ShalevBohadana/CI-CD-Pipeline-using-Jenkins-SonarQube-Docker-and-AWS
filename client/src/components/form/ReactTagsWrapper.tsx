import React from 'react';
import { ReactTags as ReactTagsBase } from 'react-tag-autocomplete';
import type { ReactTagsProps, ReactTagsAPI } from 'react-tag-autocomplete';

const ReactTagsComponent = ReactTagsBase as unknown as React.ComponentType<
  ReactTagsProps & React.RefAttributes<ReactTagsAPI>
>;

export { ReactTagsComponent as ReactTags };
export type { Tag } from 'react-tag-autocomplete';
