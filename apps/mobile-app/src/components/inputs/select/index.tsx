/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, ScrollViewProps } from 'react-native';
import {
  TextInput,
  Button,
  Dialog,
  Portal,
  Searchbar,
  SearchbarProps,
  TextInputProps,
  DialogProps,
  DialogTitleProps,
  DialogScrollAreaProps,
  DialogActionsProps,
  ButtonProps,
  Checkbox,
  CheckboxItemProps,
  List,
} from 'react-native-paper';
import type { ListItem } from './types';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import { mergeFunctions } from '$tools/merge-functions';
import { mergeRefs } from 'react-merge-refs';

const emptyArray: any[] = [];

export type SelectInputProps = {
  // Core
  items?: ListItem[];
  selected?: ListItem[];
  initialSelected?: ListItem[];
  multiEnable?: boolean;
  showSearchBox?: boolean;
  disableSelectAll?: boolean;
  onSelect?: (selected: ListItem[]) => void;

  // Localization props
  dialogTitle?: React.ReactNode;
  dialogCloseButtonText?: string;
  dialogDoneButtonText?: string;

  // Component props
  dialogProps?: Partial<DialogProps>;
  dialogTitleProps?: DialogTitleProps;
  dialogScrollAreaProps?: DialogScrollAreaProps;
  searchbarProps?: Partial<SearchbarProps>;
  selectAllCheckboxProps?: Partial<CheckboxItemProps>;
  itemsScrollViewProps?: ScrollViewProps;
  itemsCheckboxProps?: Partial<CheckboxItemProps>;
  dialogActionsProps?: DialogActionsProps;
  dialogCancelButtonProps?: ButtonProps;
  dialogDoneButtonProps?: ButtonProps;
} & TextInputProps;

export const SelectInput = memo(
  forwardRef<React.ComponentRef<typeof TextInput>, SelectInputProps>(function SelectInput(
    {
      items = emptyArray as ListItem[],
      selected,
      initialSelected,
      multiEnable,
      showSearchBox,
      disableSelectAll,
      onSelect,

      // Localization props
      dialogTitle,
      dialogCloseButtonText = 'Close',
      dialogDoneButtonText = 'Done',

      // components props
      dialogProps,
      dialogTitleProps,
      dialogScrollAreaProps,
      searchbarProps,
      selectAllCheckboxProps,
      itemsScrollViewProps,
      itemsCheckboxProps,
      dialogActionsProps,
      dialogCancelButtonProps,
      dialogDoneButtonProps,

      ...props
    },
    forwardedRef
  ) {
    const theme = useAppTheme();

    const innerRef = useRef<React.ComponentRef<typeof TextInput>>(null);

    const { height } = useMemo(() => Dimensions.get('window'), []);

    const [searchKey, setSearchKey] = useState<string>('');
    const [innerSelected, setInnerSelected] = useState<ListItem[]>(
      selected ?? initialSelected ?? emptyArray
    );
    const [visible, setVisible] = useState(false);

    const filteredItems = useMemo(
      () =>
        items.filter(
          el =>
            el.value.includes(searchKey) ||
            el.label?.toString().includes(searchKey) ||
            el.searchKey?.includes(searchKey)
        ),
      [items, searchKey]
    );

    const showDialog = useCallback(() => setVisible(true), []);
    const hideDialog = useCallback(() => setVisible(false), []);

    const handleDialogDoneClick = useCallback(() => {
      setSearchKey('');
      onSelect?.(innerSelected);
      hideDialog();

      if (innerRef.current) {
        innerRef.current.blur();
      }
    }, [onSelect, innerSelected, hideDialog]);

    const handleDialogCancelClick = useCallback(() => {
      setInnerSelected(selected ?? emptyArray);
      hideDialog();
      setSearchKey('');
      if (innerRef.current) {
        innerRef.current.blur();
      }
    }, [hideDialog, selected]);

    const handleTextInputFocus = useCallback(() => {
      setInnerSelected(selected ?? emptyArray);
      showDialog();
    }, [selected, showDialog]);

    const handleMultiCheck = useCallback(
      (item: ListItem) =>
        setInnerSelected(selected => {
          if (selected.find(el => el.value === item.value))
            return selected.filter(el => el !== item);
          return [...selected, item];
        }),
      []
    );

    const handleSingleCheck = useCallback(
      (item: ListItem) => {
        setInnerSelected([item]);
        handleDialogDoneClick();
      },
      [handleDialogDoneClick]
    );

    const isItemChecked = useCallback(
      (item: ListItem) =>
        innerSelected.findIndex(selected => selected.value === item.value) !== -1,
      [innerSelected]
    );

    const isCheckedAll = useMemo(
      () => innerSelected.length !== 0 && innerSelected.length === filteredItems.length,
      [filteredItems, innerSelected]
    );

    const handleSelectAll = useCallback(
      () =>
        setInnerSelected(selected => {
          if (selected.length === filteredItems.length) return [];
          return filteredItems;
        }),
      [filteredItems]
    );

    const textInputValue = useMemo(
      () => innerSelected.map(el => el.label ?? el.value).join(', '),
      [innerSelected]
    );

    const filteredItemsJsx = useMemo(() => {
      if (multiEnable)
        return filteredItems.map((item, key) => {
          const checked = isItemChecked(item);
          return (
            <Checkbox.Item
              position='leading'
              label={(item.label ?? item.value) as any}
              status={checked ? 'checked' : 'unchecked'}
              {...itemsCheckboxProps}
              key={key}
              onPress={mergeFunctions(
                () => handleMultiCheck(item),
                itemsCheckboxProps?.onPress
              )}
              labelStyle={[
                {
                  textAlign: 'left',
                },
                itemsCheckboxProps?.labelStyle,
              ]}
            />
          );
        });

      return filteredItems.map(item => (
        <List.Item
          title={item.label ?? item.value}
          onPress={() => handleSingleCheck(item)}
        />
      ));
    }, [
      filteredItems,
      handleMultiCheck,
      handleSingleCheck,
      isItemChecked,
      itemsCheckboxProps,
      multiEnable,
    ]);

    return (
      <>
        <TextInput
          value={textInputValue}
          right={<TextInput.Icon icon='chevron-down' />}
          cursorColor='transparent'
          {...props}
          ref={mergeRefs([forwardedRef, innerRef])}
          showSoftInputOnFocus={false}
          onFocus={mergeFunctions(handleTextInputFocus, props.onFocus)}
        />

        <Portal>
          <Dialog
            visible={visible}
            {...dialogProps}
            onDismiss={mergeFunctions(handleDialogCancelClick, dialogProps?.onDismiss)}
          >
            <Dialog.Title {...dialogTitleProps}>
              {dialogTitle ?? props.label}
            </Dialog.Title>
            <Dialog.ScrollArea {...dialogScrollAreaProps}>
              {showSearchBox && (
                <Searchbar
                  value={searchKey}
                  {...searchbarProps}
                  onChangeText={mergeFunctions(
                    setSearchKey,
                    searchbarProps?.onChangeText
                  )}
                  style={[
                    {
                      backgroundColor: theme.colors.elevation.level5,
                      borderColor: theme.colors.border,
                      borderWidth: 1,
                    },
                    styles.searchbar,
                    searchbarProps?.style,
                  ]}
                />
              )}
              {multiEnable && !disableSelectAll && (
                <Checkbox.Item
                  label='Select All'
                  position='leading'
                  {...selectAllCheckboxProps}
                  onPress={mergeFunctions(
                    handleSelectAll,
                    selectAllCheckboxProps?.onPress
                  )}
                  status={isCheckedAll ? 'checked' : 'unchecked'}
                  labelStyle={[
                    {
                      textAlign: 'left',
                    },
                    selectAllCheckboxProps?.labelStyle,
                  ]}
                />
              )}
              <ScrollView
                keyboardShouldPersistTaps='handled'
                {...itemsScrollViewProps}
                style={[
                  styles.dialogScrollView,
                  { maxHeight: height - (height * 40) / 100, marginBottom: 8 },
                  itemsScrollViewProps?.style,
                ]}
              >
                {filteredItemsJsx}
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions {...dialogActionsProps}>
              <Button
                {...dialogCancelButtonProps}
                onPress={mergeFunctions(
                  handleDialogCancelClick,
                  dialogCancelButtonProps?.onPress
                )}
              >
                {dialogCloseButtonText}
              </Button>
              <Button
                {...dialogDoneButtonProps}
                onPress={mergeFunctions(
                  handleDialogDoneClick,
                  dialogDoneButtonProps?.onPress
                )}
              >
                {dialogDoneButtonText}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </>
    );
  })
);

const styles = StyleSheet.create({
  dialogScrollView: {
    width: '100%',
  },
  touchableItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchbar: {
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
});
