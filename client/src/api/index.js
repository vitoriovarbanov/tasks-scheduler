//import { getUserToken } from '../helpers/authUtils';
import ApiError from './api-error';
//import QS from 'qs';
//import { getLangCode } from '../helpers/langUtils';

const fileTypes = [
  'application/octet-stream',
  'application/zip',
  'application/pdf',
  'application/vnd.ms-excel',
  'text/csv; charset=utf-8',
  'text/csv',
  'text/plain',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/vnd.oasis.opendocument.text',
  'image/png',
  'image/jpeg',
  'audio/mpeg',
  'video/mpeg',
  'video/mp4',
  'video/webm'
];

export const apiUrl = process.env.API_URL;

export const request = async (
  endpoint, method, body = undefined, authorisation = true, additionalHeaders = {}, isSelfCall = false
) => {
  //const langCode = getLangCode();
  let headers = {
    Accept: 'application/json',
    ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
   /*  ...(authorisation ? {
      Authorization: `Bearer ${getUserToken()}`,
    } : {}), */
    ...additionalHeaders,
    //'accept-language': langCode
  };

  const response = await fetch(isSelfCall ? endpoint : apiUrl + endpoint, {
    headers,
    method,
    body: body instanceof FormData ? body : JSON.stringify(body)
  });

  if (!response.ok) {
    return response.json().then((res) => {
      let { errors, message, status } = res;

      if (Array.isArray(res)) {
        errors = res.join('; ');
      } else if (errors) {
        const errorMessages = Object.values(errors);
        errors = errorMessages.join('; ');
      } else {
        // handle case with Internal Server Error 500
        errors = 'Oops, something went wrong. Please try again later';
      }

      if (response.status === 401) {
        throw new ApiError(response.status, errors);
      }
      if (response.status === 403) {
        window.location = '/forbidden-403'    
        throw new ApiError(response.status, errors);
      }
      if (response.status === 419) {
        throw new ApiError(response.status, errors);
      }

      throw new ApiError(res.status, errors, res.validation);
    });
  }

  if (fileTypes.includes(response.headers.get('Content-Type'))) {
    if (response.headers.get('Content-Type').includes('text/csv')) {
      const csvString = await response.text();
      return {
        csvString: csvString
      }
    }
    return {
      blob: await response.blob()
    }
  }

  if (response.status === 204) {
    return {};
  }

  if (!response.headers.get('Content-Type')) {
    return response
      .json()
      .catch((err) => {
        // Fix for empty response body
        console.error(`'${err}' happened, but no big deal!`);
        return {};
      });
  }

  if (response.headers.get('x-pagination')) {
    const pagedResponse = {
      result: await response.json(),
      pageParameters: JSON.parse(response.headers.get('x-pagination'))
    };

    return pagedResponse;
  }

  return response.json();
};

export const requestUsers = async () => request('api/users', 'GET');