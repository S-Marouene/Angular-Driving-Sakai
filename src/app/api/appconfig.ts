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

    /**vehicule API*/
    'add_vehicule' : 'http://172.21.11.196/Driving/backend/api/auth/vehicules',
    'Listvehicule' : 'http://172.21.11.196/Driving/backend/api/auth/vehicules',
    'Deletevehicule' : 'http://172.21.11.196/Driving/backend/api/auth/vehicules/',
    'getvehiculeByID':'http://172.21.11.196/Driving/backend/api/auth/vehicules/',
    'updatevehicule':'http://172.21.11.196/Driving/backend/api/auth/vehicules/',

    /**bureau API*/
    'add_bureau' : 'http://172.21.11.196/Driving/backend/api/auth/bureaux',
    'Listbureau' : 'http://172.21.11.196/Driving/backend/api/auth/bureaux',
    'Deletebureau' : 'http://172.21.11.196/Driving/backend/api/auth/bureaux/',
    'getbureauByID':'http://172.21.11.196/Driving/backend/api/auth/bureaux/',
    'updatebureau':'http://172.21.11.196/Driving/backend/api/auth/bureaux/',

    /**moniteur API*/
    'add_moniteur' : 'http://172.21.11.196/Driving/backend/api/auth/moniteur',
    'Listmoniteur' : 'http://172.21.11.196/Driving/backend/api/auth/moniteur',
    'Deletemoniteur' : 'http://172.21.11.196/Driving/backend/api/auth/moniteur/',
    'getmoniteurByID':'http://172.21.11.196/Driving/backend/api/auth/moniteur/',
    'updatemoniteur':'http://172.21.11.196/Driving/backend/api/auth/moniteur/',

     /**Caisse API*/
     'add_caisse' : 'http://172.21.11.196/Driving/backend/api/auth/caisse',
     'Listcaisse' : 'http://172.21.11.196/Driving/backend/api/auth/caisse',
     'Deletecaisse' : 'http://172.21.11.196/Driving/backend/api/auth/caisse/',
     'getcaisseByID':'http://172.21.11.196/Driving/backend/api/auth/caisse/',
     'updatecaisse':'http://172.21.11.196/Driving/backend/api/auth/caisse/',

     /**Caisse API*/
    'add_examinateur' : 'http://172.21.11.196/Driving/backend/api/auth/examinateur',
    'Listexaminateur' : 'http://172.21.11.196/Driving/backend/api/auth/examinateur',
    'Deleteexaminateur' : 'http://172.21.11.196/Driving/backend/api/auth/examinateur/',
    'getexaminateurByID':'http://172.21.11.196/Driving/backend/api/auth/examinateur/',
    'updateexaminateur':'http://172.21.11.196/Driving/backend/api/auth/examinateur/',

    /**centre exam API*/
    'add_centre_exam' : 'http://172.21.11.196/Driving/backend/api/auth/centre_exam',
    'Listcentre_exam' : 'http://172.21.11.196/Driving/backend/api/auth/centre_exam',
    'Deletecentre_exam' : 'http://172.21.11.196/Driving/backend/api/auth/centre_exam/',
    'getcentre_examByID':'http://172.21.11.196/Driving/backend/api/auth/centre_exam/',
    'updatecentre_exam':'http://172.21.11.196/Driving/backend/api/auth/centre_exam/',
}
