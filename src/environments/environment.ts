// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false
};

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

    'add_condidat' : 'http://172.21.11.196/Driving/backend/api/auth/CreateCondidat',
    'ListCondidat' : 'http://172.21.11.196/Driving/backend/api/auth/allCondidats',
    'DeleteCondidat' : 'http://172.21.11.196/Driving/backend/api/auth/delete-condidat/',
    'getCondidatByID':'http://172.21.11.196/Driving/backend/api/auth/GetCondByID/',
    'updateCondidat':'http://172.21.11.196/Driving/backend/api/auth/update_condidat',

    'add_vehicule' : 'http://172.21.11.196/Driving/backend/api/auth/vehicules',
    'Listvehicule' : 'http://172.21.11.196/Driving/backend/api/auth/vehicules',
    'Deletevehicule' : 'http://172.21.11.196/Driving/backend/api/auth/vehicules/',
    'getvehiculeByID':'http://172.21.11.196/Driving/backend/api/auth/vehicules/',
    'updatevehicule':'http://172.21.11.196/Driving/backend/api/auth/vehicules/',

    'add_bureau' : 'http://172.21.11.196/Driving/backend/api/auth/bureaux',
    'Listbureau' : 'http://172.21.11.196/Driving/backend/api/auth/bureaux',
    'Deletebureau' : 'http://172.21.11.196/Driving/backend/api/auth/bureaux/',
    'getbureauByID':'http://172.21.11.196/Driving/backend/api/auth/bureaux/',
    'updatebureau':'http://172.21.11.196/Driving/backend/api/auth/bureaux/',

    'add_moniteur' : 'http://172.21.11.196/Driving/backend/api/auth/moniteur',
    'Listmoniteur' : 'http://172.21.11.196/Driving/backend/api/auth/moniteur',
    'Deletemoniteur' : 'http://172.21.11.196/Driving/backend/api/auth/moniteur/',
    'getmoniteurByID':'http://172.21.11.196/Driving/backend/api/auth/moniteur/',
    'updatemoniteur':'http://172.21.11.196/Driving/backend/api/auth/moniteur/',

     'add_caisse' : 'http://172.21.11.196/Driving/backend/api/auth/caisse',
     'Listcaisse' : 'http://172.21.11.196/Driving/backend/api/auth/caisse',
     'Deletecaisse' : 'http://172.21.11.196/Driving/backend/api/auth/caisse/',
     'getcaisseByID':'http://172.21.11.196/Driving/backend/api/auth/caisse/',
     'updatecaisse':'http://172.21.11.196/Driving/backend/api/auth/caisse/',

    'add_examinateur' : 'http://172.21.11.196/Driving/backend/api/auth/examinateur',
    'Listexaminateur' : 'http://172.21.11.196/Driving/backend/api/auth/examinateur',
    'Deleteexaminateur' : 'http://172.21.11.196/Driving/backend/api/auth/examinateur/',
    'getexaminateurByID':'http://172.21.11.196/Driving/backend/api/auth/examinateur/',
    'updateexaminateur':'http://172.21.11.196/Driving/backend/api/auth/examinateur/',

    'add_centre_exam' : 'http://172.21.11.196/Driving/backend/api/auth/centre_exam',
    'Listcentre_exam' : 'http://172.21.11.196/Driving/backend/api/auth/centre_exam',
    'Deletecentre_exam' : 'http://172.21.11.196/Driving/backend/api/auth/centre_exam/',
    'getcentre_examByID':'http://172.21.11.196/Driving/backend/api/auth/centre_exam/',
    'updatecentre_exam':'http://172.21.11.196/Driving/backend/api/auth/centre_exam/',

    'add_Examen' : 'http://172.21.11.196/Driving/backend/api/auth/examen',
    'ListExamen' : 'http://172.21.11.196/Driving/backend/api/auth/examen',
    'ListExamenCalendar' : 'http://172.21.11.196/Driving/backend/api/auth/examen/examencalndr/getForCalndr',
    'DeleteExamen' : 'http://172.21.11.196/Driving/backend/api/auth/examen/',
    'getExamenByID':'http://172.21.11.196/Driving/backend/api/auth/examen/',
    'updateExamen':'http://172.21.11.196/Driving/backend/api/auth/examen/',
    'updateResultExamen':'http://172.21.11.196/Driving/backend/api/auth/examen/update_resulat/',
    'getExamenByCondidat':'http://172.21.11.196/Driving/backend/api/auth/examen/getExamenByCondidat/',

    'add_conduite' : 'http://172.21.11.196/Driving/backend/api/auth/conduite',
    'Listconduite' : 'http://172.21.11.196/Driving/backend/api/auth/conduite',
    'Deleteconduite' : 'http://172.21.11.196/Driving/backend/api/auth/conduite/',
    'getconduiteByID':'http://172.21.11.196/Driving/backend/api/auth/conduite/',
    'updateconduite':'http://172.21.11.196/Driving/backend/api/auth/conduite/',
    'ListconduiteCondidat':'http://172.21.11.196/Driving/backend/api/auth/conduite/getconduiteCondidat/',

    'add_code' : 'http://172.21.11.196/Driving/backend/api/auth/code',
    'Listcode' : 'http://172.21.11.196/Driving/backend/api/auth/code',
    'Deletecode' : 'http://172.21.11.196/Driving/backend/api/auth/code/',
    'getcodeByID':'http://172.21.11.196/Driving/backend/api/auth/code/',
    'updatecode':'http://172.21.11.196/Driving/backend/api/auth/code/',

    'add_paiement' : 'http://172.21.11.196/Driving/backend/api/auth/paiement',
    'Listpaiement' : 'http://172.21.11.196/Driving/backend/api/auth/paiement',
    'Deletepaiement' : 'http://172.21.11.196/Driving/backend/api/auth/paiement/',
    'getpaiementByID':'http://172.21.11.196/Driving/backend/api/auth/paiement/',
    'updatepaiement':'http://172.21.11.196/Driving/backend/api/auth/paiement/',

    'getpaiementByCondidat':'http://172.21.11.196/Driving/backend/api/auth/paiement/getpaiementByCondidat/',

}

export const CONSTANTES = {
    'defaultImage': 'unknown_profile.png',
    'URLprofilePic': 'http://172.21.11.196/driving/backend/public/storage/profile_pic/',
    'URLcondidatPic': 'http://172.21.11.196/driving/backend/public/storage/condidat_pic/',
    'defaultSchoolImage': 'defaultSchhol.png',
    'URLSchholPic': 'http://172.21.11.196/driving/backend/public/storage/school_pic/'

/*
    'defaultImage': 'unknown_profile.png',
    'URLprofilePic': 'https://smdev.tn/storage/profile_pic/',
    'URLcondidatPic': 'https://smdev.tn/storage/condidat_pic/',
    'defaultSchoolImage': 'defaultSchhol.png',
    'URLSchholPic': 'https://smdev.tn/storage/school_pic/'
*/
}
