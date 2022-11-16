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

/*
export const API = {
    'usersRegister' : 'http://smdev.tn/api/auth/register',
    'login' : 'http://smdev.tn/api/auth/login',
    'changepaswd' : 'http://smdev.tn/api/auth/change-password',

    'userProfile' :'http://smdev.tn/api/auth/user-profile',
    'ListUsers' : 'http://smdev.tn/api/auth/user-get',
    'DeleteUser' : 'http://smdev.tn/api/auth/delete-user/',
    'UpdateUser' : 'http://smdev.tn/api/auth/update_user',
    'me' : 'http://smdev.tn/api/auth/me',
    'GetRolePermission' : 'http://smdev.tn/api/auth/user-roles',

    'updateImgProfile' : 'http://smdev.tn/api/auth/ImgProfil_update',

    'add_school' : 'http://smdev.tn/api/sudo/CreateSchools',
    'ListSchool' : 'http://smdev.tn/api/sudo/allSchools',
    'DeleteSchool' : 'http://smdev.tn/api/sudo/delete-school/',

    'add_condidat' : 'http://smdev.tn/api/auth/CreateCondidat',
    'ListCondidat' : 'http://smdev.tn/api/auth/allCondidats',
    'DeleteCondidat' : 'http://smdev.tn/api/auth/delete-condidat/',
    'getCondidatByID':'http://smdev.tn/api/auth/GetCondByID/',
    'updateCondidat':'http://smdev.tn/api/auth/update_condidat',

    'add_vehicule' : 'http://smdev.tn/api/auth/vehicules',
    'Listvehicule' : 'http://smdev.tn/api/auth/vehicules',
    'Deletevehicule' : 'http://smdev.tn/api/auth/vehicules/',
    'getvehiculeByID':'http://smdev.tn/api/auth/vehicules/',
    'updatevehicule':'http://smdev.tn/api/auth/vehicules/',

    'add_bureau' : 'http://smdev.tn/api/auth/bureaux',
    'Listbureau' : 'http://smdev.tn/api/auth/bureaux',
    'Deletebureau' : 'http://smdev.tn/api/auth/bureaux/',
    'getbureauByID':'http://smdev.tn/api/auth/bureaux/',
    'updatebureau':'http://smdev.tn/api/auth/bureaux/',

    'add_moniteur' : 'http://smdev.tn/api/auth/moniteur',
    'Listmoniteur' : 'http://smdev.tn/api/auth/moniteur',
    'Deletemoniteur' : 'http://smdev.tn/api/auth/moniteur/',
    'getmoniteurByID':'http://smdev.tn/api/auth/moniteur/',
    'updatemoniteur':'http://smdev.tn/api/auth/moniteur/',

     'add_caisse' : 'http://smdev.tn/api/auth/caisse',
     'Listcaisse' : 'http://smdev.tn/api/auth/caisse',
     'Deletecaisse' : 'http://smdev.tn/api/auth/caisse/',
     'getcaisseByID':'http://smdev.tn/api/auth/caisse/',
     'updatecaisse':'http://smdev.tn/api/auth/caisse/',

    'add_examinateur' : 'http://smdev.tn/api/auth/examinateur',
    'Listexaminateur' : 'http://smdev.tn/api/auth/examinateur',
    'Deleteexaminateur' : 'http://smdev.tn/api/auth/examinateur/',
    'getexaminateurByID':'http://smdev.tn/api/auth/examinateur/',
    'updateexaminateur':'http://smdev.tn/api/auth/examinateur/',

    'add_centre_exam' : 'http://smdev.tn/api/auth/centre_exam',
    'Listcentre_exam' : 'http://smdev.tn/api/auth/centre_exam',
    'Deletecentre_exam' : 'http://smdev.tn/api/auth/centre_exam/',
    'getcentre_examByID':'http://smdev.tn/api/auth/centre_exam/',
    'updatecentre_exam':'http://smdev.tn/api/auth/centre_exam/',

    'add_Examen' : 'http://smdev.tn/api/auth/examen',
    'ListExamen' : 'http://smdev.tn/api/auth/examen',
    'DeleteExamen' : 'http://smdev.tn/api/auth/examen/',
    'getExamenByID':'http://smdev.tn/api/auth/examen/',
    'updateExamen':'http://smdev.tn/api/auth/examen/',
    'updateResultExamen':'http://smdev.tn/api/auth/examen/update_resulat/',
    'getExamenByCondidat':'http://smdev.tn/api/auth/examen/getExamenByCondidat/',

    'add_conduite' : 'http://smdev.tn/api/auth/conduite',
    'Listconduite' : 'http://smdev.tn/api/auth/conduite',
    'Deleteconduite' : 'http://smdev.tn/api/auth/conduite/',
    'getconduiteByID':'http://smdev.tn/api/auth/conduite/',
    'updateconduite':'http://smdev.tn/api/auth/conduite/',
    'ListconduiteCondidat':'http://smdev.tn/api/auth/conduite/getconduiteCondidat/',

    'add_code' : 'http://smdev.tn/api/auth/code',
    'Listcode' : 'http://smdev.tn/api/auth/code',
    'Deletecode' : 'http://smdev.tn/api/auth/code/',
    'getcodeByID':'http://smdev.tn/api/auth/code/',
    'updatecode':'http://smdev.tn/api/auth/code/',

    'add_paiement' : 'http://smdev.tn/api/auth/paiement',
    'Listpaiement' : 'http://smdev.tn/api/auth/paiement',
    'Deletepaiement' : 'http://smdev.tn/api/auth/paiement/',
    'getpaiementByID':'http://smdev.tn/api/auth/paiement/',
    'updatepaiement':'http://smdev.tn/api/auth/paiement/',

    'getpaiementByCondidat':'http://smdev.tn/api/auth/paiement/getpaiementByCondidat/',

}
 */
