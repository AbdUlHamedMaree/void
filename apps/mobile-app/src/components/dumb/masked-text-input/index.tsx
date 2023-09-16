import { mergeFunctions } from '$tools/merge-functions';
import React, { forwardRef, memo, useCallback } from 'react';
import { MaskedTextInput as LMaskedTextInput } from 'react-native-mask-text';
import { TextInput, TextInputProps } from 'react-native-paper';
import { FormatType, MaskOptions, TextDecorationOptions } from './types';
import { mergeRefs } from 'react-merge-refs';

export type MaskedTextInputProps = {
  mask?: string;
  type?: FormatType;
  options?: MaskOptions;
  inputAccessoryView?: JSX.Element;
  textBold?: boolean;
  textItalic?: boolean;
  textDecoration?: TextDecorationOptions;
  onChangeText?: (text: string, rawText: string) => void;
} & Omit<TextInputProps, 'onChangeText' | 'render'>;

export const MaskedTextInput = memo(
  forwardRef<React.ComponentRef<typeof TextInput>, MaskedTextInputProps>(
    function MaskedTextInput(
      {
        mask,
        type,
        options,
        inputAccessoryView,
        textBold,
        textItalic,
        textDecoration,
        onChangeText,
        ...props
      },
      ref
    ) {
      const handleTextChange = useCallback(
        (value: string, raw: string) => onChangeText?.(value, raw),
        [onChangeText]
      );

      return (
        <TextInput
          {...props}
          ref={mergeRefs([ref])}
          render={props => (
            <LMaskedTextInput
              {...props}
              mask={mask}
              type={type}
              options={options}
              inputAccessoryView={inputAccessoryView}
              textBold={textBold}
              textItalic={textItalic}
              textDecoration={textDecoration}
              onChangeText={mergeFunctions(handleTextChange, props.onChangeText)}
            />
          )}
        />
      );
    }
  )
);
