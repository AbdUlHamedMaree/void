import { RootStackParamList } from '$navigation/model';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

export const useNavigate = () => {
  const { navigate } = useNavigation();

  return useCallback(
    (
      path: Path<RootStackParamList>,
      pathsOptions: Record<string, NavigatorScreenParams<unknown>>
    ) => {
      const pathsWithParams = path.split('.').reduceRight(
        (acc, path) => ({
          ...pathsOptions[path],
          screen: path,
          params: acc,
        }),
        {} as { screen: any; params: any }
      );

      navigate(pathsWithParams.screen, pathsWithParams.params);
    },
    [navigate]
  );
};

type FieldValues = {
  [k: string]: NavigatorScreenParams<FieldValues> | Record<string, unknown> | undefined;
};

type PathWriter<
  Key extends string,
  Value extends FieldValues[string],
> = Value extends undefined
  ? `${Key}`
  : Value extends NavigatorScreenParams<infer A>
  ? A extends FieldValues
    ? `${Key}.${Path<A>}`
    : `${Key}`
  : `${Key}`;

type Path<T extends FieldValues> = {
  [K in keyof T]-?: PathWriter<K & string, T[K]>;
}[keyof T];
