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
    'DeleteUser' : 'http://127.0.0.1/Driving/backend/api/auth/delete-user/',
    'UpdateUser' : 'http://127.0.0.1/Driving/backend/api/auth/update_user',
    'me' : 'http://127.0.0.1/Driving/backend/api/auth/me',
    'GetRolePermission' : 'http://127.0.0.1/Driving/backend/api/auth/user-roles',

    'updateImgProfile' : 'http://127.0.0.1/Driving/backend/api/auth/ImgProfil_update',

    'add_school' : 'http://127.0.0.1/Driving/backend/api/sudo/CreateSchools',
    'ListSchool' : 'http://127.0.0.1/Driving/backend/api/sudo/allSchools',
    'DeleteSchool' : 'http://127.0.0.1/Driving/backend/api/sudo/delete-school/',

    /**Condidat API*/
    'add_condidat' : 'http://127.0.0.1/Driving/backend/api/auth/CreateCondidat',
    'ListCondidat' : 'http://127.0.0.1/Driving/backend/api/auth/allCondidats',
    'DeleteCondidat' : 'http://127.0.0.1/Driving/backend/api/auth/delete-condidat/',
    'getCondidatByID':'http://127.0.0.1/Driving/backend/api/auth/GetCondByID/',
    'updateCondidat':'http://127.0.0.1/Driving/backend/api/auth/update_condidat',


}
