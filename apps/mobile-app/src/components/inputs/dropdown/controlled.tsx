/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  ScrollViewProps,
  ScrollView,
  View,
  ViewProps,
  useWindowDimensions,
} from 'react-native';
import {
  TextInput,
  SearchbarProps,
  TextInputProps,
  Checkbox,
  CheckboxItemProps,
  Menu,
  Searchbar,
  MenuProps,
  List,
} from 'react-native-paper';
import type { ListItem } from './types';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';
import { mergeFunctions } from '$tools/merge-functions';
import { mergeRefs } from 'react-merge-refs';

const emptyArray: any[] = [];

export type AddedSelectArg = {
  selected: ListItem[];
  item: ListItem;
  operation: 'added' | 'removed';
};

export type ControlledDropdownInputProps = {
  // Core
  items: ListItem[];
  selected: ListItem[];
  multiEnable?: boolean;
  showSearchbar?: boolean;
  onSelect?: (arg: AddedSelectArg) => void;
  onSelectFinish?: (selected: ListItem[]) => void;

  // Component props
  viewWrapperProps?: ViewProps;
  menuProps?: Partial<MenuProps>;
  searchbarProps?: Partial<SearchbarProps>;
  itemsScrollViewProps?: ScrollViewProps;
  itemsCheckboxProps?: Partial<CheckboxItemProps>;
} & TextInputProps;

export const ControlledDropdownInput = memo(
  forwardRef<React.ComponentRef<typeof TextInput>, ControlledDropdownInputProps>(
    function ControlledDropdownInput(
      {
        items = emptyArray as ListItem[],
        selected,
        multiEnable,
        showSearchbar,
        onSelect,
        onSelectFinish,

        // components props
        viewWrapperProps,
        menuProps,
        searchbarProps,
        itemsScrollViewProps,
        itemsCheckboxProps,

        ...props
      },
      forwardedRef
    ) {
      const theme = useAppTheme();

      const innerRef = useRef<React.ComponentRef<typeof TextInput>>(null);
      const wrapperRef = useRef<React.ComponentRef<typeof View>>(null);

      const { height: windowHeight } = useWindowDimensions();

      const [searchKey, setSearchKey] = useState<string>('');
      const [innerSelected, setInnerSelected] = useState<ListItem[]>(selected);
      const [visible, setVisible] = useState(false);
      const [width, setWidth] = useState(0);

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

      const measureWidth = useCallback(() => {
        wrapperRef.current?.measureInWindow((_pageX, _pageY, width, _height) =>
          setWidth(width)
        );
      }, []);

      const showMenu = useCallback(() => setVisible(true), []);
      const closeMenu = useCallback(() => setVisible(false), []);

      const handleMenuDismiss = useCallback(
        (selected?: ListItem[]) => {
          closeMenu();
          setSearchKey('');

          onSelectFinish?.(selected ?? innerSelected);

          if (innerRef.current) {
            innerRef.current.blur();
          }
        },
        [closeMenu, onSelectFinish, innerSelected]
      );

      const handleTextInputFocus = useCallback(() => {
        setInnerSelected(selected ?? innerSelected ?? emptyArray);
        showMenu();
      }, [selected, innerSelected, showMenu]);

      const handleMultiCheck = useCallback(
        (item: ListItem) =>
          setInnerSelected(selected => {
            if (selected.find(el => el.value === item.value)) {
              const newSelected = selected.filter(el => el !== item);
              onSelect?.({ selected: newSelected, item, operation: 'removed' });

              return newSelected;
            }

            const newSelected = [...selected, item];
            onSelect?.({ selected: newSelected, item, operation: 'added' });
            return newSelected;
          }),
        [onSelect]
      );

      const handleSingleCheck = useCallback(
        (item: ListItem) => {
          const newSelected = [item];
          onSelect?.({ selected: newSelected, item, operation: 'added' });
          setInnerSelected(newSelected);

          handleMenuDismiss(newSelected);
        },
        [handleMenuDismiss, onSelect]
      );

      const isItemChecked = useCallback(
        (item: ListItem) =>
          innerSelected.findIndex(selected => selected.value === item.value) !== -1,
        [innerSelected]
      );

      const textInputValue = useMemo(
        () => innerSelected.map(el => el.label).join(', '),
        [innerSelected]
      );

      const filteredItemsJsx = useMemo(() => {
        if (multiEnable)
          return filteredItems.map(item => (
            <Checkbox.Item
              position='leading'
              label={(item.label ?? item.value) as any}
              status={isItemChecked(item) ? 'checked' : 'unchecked'}
              {...itemsCheckboxProps}
              key={item.value}
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
          ));

        return filteredItems.map(item => (
          <List.Item
            key={item.value}
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
        <View
          {...viewWrapperProps}
          ref={wrapperRef}
          onLayout={mergeFunctions(measureWidth, viewWrapperProps?.onLayout)}
        >
          <Menu
            anchor={
              <TextInput
                right={<TextInput.Icon icon='chevron-down' />}
                showSoftInputOnFocus={false}
                value={textInputValue}
                cursorColor='transparent'
                {...props}
                ref={mergeRefs([forwardedRef, innerRef])}
                onFocus={mergeFunctions(handleTextInputFocus, props.onFocus)}
              />
            }
            anchorPosition='bottom'
            visible={visible}
            {...menuProps}
            onDismiss={mergeFunctions(() => handleMenuDismiss(), menuProps?.onDismiss)}
            style={[{ width: width }, menuProps?.style]}
          >
            {showSearchbar && (
              <Searchbar
                value={searchKey}
                {...searchbarProps}
                onChangeText={mergeFunctions(setSearchKey, searchbarProps?.onChangeText)}
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
            <ScrollView
              keyboardShouldPersistTaps='handled'
              {...itemsScrollViewProps}
              style={[{ maxHeight: windowHeight * 0.3 }, itemsScrollViewProps?.style]}
            >
              {filteredItemsJsx}
            </ScrollView>
          </Menu>
        </View>
      );
    }
  )
);

const styles = StyleSheet.create({
  searchbar: {
    marginVertical: spacing.md,
    marginHorizontal: spacing.lg,
  },
});
