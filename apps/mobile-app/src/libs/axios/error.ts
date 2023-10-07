export type AxiosGraphQlStandardErrorResponseData = {
  errors: {
    message: string;
    extensions: {
      code: string;
      response: {
        statusCode: number;
        message: string;
      };
    };
  }[];

  data: null;
};

export type AxiosGraphQlNonStandardErrorResponseData = {
  error: {
    errors: {
      message: string;
      locations: {
        line: number;
        column: number;
      }[];

      extensions: {
        code: string;
        exception: {
          stacktrace: string[];
        };
      };
    }[];
  };
};

export type AxiosGraphQlErrorResponseData =
  | AxiosGraphQlStandardErrorResponseData
  | AxiosGraphQlNonStandardErrorResponseData;

export const isGraphQlError = (err: unknown): err is AxiosGraphQlErrorResponseData =>
  isGraphQlStandardError(err) || isGraphQlNonStandardError(err);

export const isGraphQlStandardError = (
  err: unknown
): err is AxiosGraphQlStandardErrorResponseData =>
  typeof err === 'object' && err !== null && 'errors' in err;

export const isGraphQlNonStandardError = (
  err: unknown
): err is AxiosGraphQlNonStandardErrorResponseData =>
  typeof err === 'object' && err !== null && 'error' in err;
