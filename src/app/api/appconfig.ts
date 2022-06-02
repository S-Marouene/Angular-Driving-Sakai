export interface AppConfig {
    inputStyle?: string;
    dark?: boolean;
    theme?: string;
    ripple?: boolean;
}


export const API = {
    'usersRegister' : 'http://127.0.0.1/Driving/backend/api/auth/register',
    'login' : 'http://127.0.0.1/Driving/backend/api/auth/login',
    'userProfile' :'http://127.0.0.1/Driving/backend/api/auth/user-profile',
    'ListUsers' : 'http://127.0.0.1/Driving/backend/api/auth/user-get',


  }
