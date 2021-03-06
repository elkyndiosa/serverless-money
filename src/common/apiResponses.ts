interface JSON {
  [key: string]: any;
}
interface ResponseOptions {
  json: JSON;
  statusCode: number;
  allowCORS?: boolean;
}
export interface Response {
  statusCode: number;
  body: string;
  headers?: {
    [key: string]: string;
  };
  allowCORS?: boolean;
}
function apiResponse({ json, statusCode, allowCORS = true }: ResponseOptions): Response {
  const response: Response = {
    statusCode,
    body: JSON.stringify(json),
    allowCORS,
  };
  if (allowCORS) {
    response.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Content-Type': 'application/json',
    };
  }
  delete response.allowCORS;
  return response;
}
export function errorResponse(json: JSON): Response {
  return apiResponse({
    json,
    statusCode: json.statusCode || 500,
  });
}
export function corsErrorResponse(json: JSON): Response {
  return apiResponse({
    json,
    statusCode: 500,
    allowCORS: true,
  });
}
export function successResponse(json: JSON): Response {
  return apiResponse({
    json,
    statusCode: 200,
  });
}
export function corsSuccessResponse(json: JSON): Response {
  return apiResponse({
    json,
    statusCode: 200,
    allowCORS: true,
  });
}
export function erroValidationDataResponse(json: JSON, statusCode: number = 400): Response {
  return apiResponse({
    json,
    statusCode,
    allowCORS: true,
  });
}
