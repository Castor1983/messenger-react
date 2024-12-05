export const passwordPattern = {
  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/,
  message:
        'Password must be at least 8 characters long, ' +
        'contain at least one number, one special character, ' +
        'one uppercase letter, and one lowercase letter',
};

export const  phonePattern = {
  value: /^0\d{9}$/,
  message: 'The phone number must start with 0 and have 10 digits',
};
