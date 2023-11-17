export interface IErrorResponse {
  message: string;
  status: boolean;
  statusCode: number;
  error: Error;
}
