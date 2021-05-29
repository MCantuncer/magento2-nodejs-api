import { validateEmail } from '../utils/dataUtils';

export type ErrorResponse = {
  success: boolean;
  errors: any;
};

export const checkErrorForCustomerCSV = (values: string[]) => {
  if (values.length != 4) return false;
  if (!validateEmail(values[0])) return false;

  return true;
};

export const checkErrorForCustomerInput = (req: any) => {
  const body = req.body;

  let errors = { success: false, errors: [] } as ErrorResponse;

  if (!body.email) errors.errors.push({ email: req.t('Email is required') });
  else {
    if (!validateEmail(body.email)) errors.errors.push({ email: req.t('Email is not valid') });
  }

  if (!body.firstname) errors.errors.push({ firstname: req.t('Firstname is required') });
  if (!body.lastname) errors.errors.push({ lastname: req.t('Lastname is required') });

  if (!body.password) errors.errors.push({ password: req.t('Password is required') });

  return errors;
};
