/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, memo, useCallback, useEffect, useState } from 'react';
import { TextInput, TextInputProps } from 'react-native-paper';
import type { ListItem } from './types';
import { ControlledDropdownInput, ControlledDropdownInputProps } from './controlled';

const emptyArray: any[] = [];

export type DropdownInputProps = Partial<ControlledDropdownInputProps> & {
  initialSelected?: ListItem[];
} & TextInputProps;

export const DropdownInput = memo(
  forwardRef<React.ComponentRef<typeof TextInput>, DropdownInputProps>(
    function DropdownInput({ initialSelected, ...props }, forwardedRef) {
      const [selected, setSelected] = useState<ListItem[]>(
        props.selected ?? initialSelected ?? emptyArray
      );

      useEffect(() => {
        if (props.selected) setSelected(props.selected);
      }, [props.selected]);

      const handleSelectFinish = useCallback(
        (selected: ListItem[]) => {
          setSelected(selected);
          props.onSelectFinish?.(selected);
        },
        [props]
      );

      return (
        <ControlledDropdownInput
          {...props}
          onSelectFinish={handleSelectFinish}
          items={props.items ?? emptyArray}
          selected={selected}
          ref={forwardedRef}
        />
      );
    }
  )
);
