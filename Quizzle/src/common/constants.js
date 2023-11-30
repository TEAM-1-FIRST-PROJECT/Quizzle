
export const MIN_NAME_LENGTH = 1;
export const MAX_NAME_LENGTH = 30;
export const MIN_USER_NAME_LENGTH = 3;
export const PHONE_NUMBER_CHECK = /^\d{10}$/;
export const NAME_CHECK = /^[A-Z][a-z]*$/

export const ROLE_CHECK = {
    admin: 'admin',
    student: 'student',
    educator: 'educator',
};    

export const dateNow = Date.now();