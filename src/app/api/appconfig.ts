export interface AppConfig {
    inputStyle?: string;
    dark?: boolean;
    theme?: string;
    ripple?: boolean;
}


export const API = {
    'usersRegister' : 'http://172.21.11.196/Driving/backend/api/auth/register',
    'login' : 'http://172.21.11.196/Driving/backend/api/auth/login',
    'changepaswd' : 'http://172.21.11.196/Driving/backend/api/auth/change-password',

    'userProfile' :'http://172.21.11.196/Driving/backend/api/auth/user-profile',
    'ListUsers' : 'http://172.21.11.196/Driving/backend/api/auth/user-get',
    'DeleteUser' : 'http://172.21.11.196/Driving/backend/api/auth/delete-user/',
    'UpdateUser' : 'http://172.21.11.196/Driving/backend/api/auth/update_user',
    'me' : 'http://172.21.11.196/Driving/backend/api/auth/me',
    'GetRolePermission' : 'http://172.21.11.196/Driving/backend/api/auth/user-roles',

    'updateImgProfile' : 'http://172.21.11.196/Driving/backend/api/auth/ImgProfil_update',

    'add_school' : 'http://172.21.11.196/Driving/backend/api/sudo/CreateSchools',
    'ListSchool' : 'http://172.21.11.196/Driving/backend/api/sudo/allSchools',
    'DeleteSchool' : 'http://172.21.11.196/Driving/backend/api/sudo/delete-school/',

    /**Condidat API*/
    'add_condidat' : 'http://172.21.11.196/Driving/backend/api/auth/CreateCondidat',
    'ListCondidat' : 'http://172.21.11.196/Driving/backend/api/auth/allCondidats',
    'DeleteCondidat' : 'http://172.21.11.196/Driving/backend/api/auth/delete-condidat/',
    'getCondidatByID':'http://172.21.11.196/Driving/backend/api/auth/GetCondByID/',
    'updateCondidat':'http://172.21.11.196/Driving/backend/api/auth/update_condidat',


}
