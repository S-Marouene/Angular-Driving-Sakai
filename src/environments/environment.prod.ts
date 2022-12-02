export const environment = {
  production: true
};

export const API = {
    'usersRegister' : 'https://smdev.tn/api/auth/register',
    'login' : 'https://smdev.tn/api/auth/login',
    'changepaswd' : 'https://smdev.tn/api/auth/change-password',

    'userProfile' :'https://smdev.tn/api/auth/user-profile',
    'ListUsers' : 'https://smdev.tn/api/auth/user-get',
    'DeleteUser' : 'https://smdev.tn/api/auth/delete-user/',
    'UpdateUser' : 'https://smdev.tn/api/auth/update_user',
    'me' : 'https://smdev.tn/api/auth/me',
    'GetRolePermission' : 'https://smdev.tn/api/auth/user-roles',

    'updateImgProfile' : 'https://smdev.tn/api/auth/ImgProfil_update',

    'add_school' : 'https://smdev.tn/api/sudo/CreateSchools',
    'ListSchool' : 'https://smdev.tn/api/sudo/allSchools',
    'DeleteSchool' : 'https://smdev.tn/api/sudo/delete-school/',

    'add_condidat' : 'https://smdev.tn/api/auth/CreateCondidat',
    'ListCondidat' : 'https://smdev.tn/api/auth/allCondidats',
    'ListCondidatArchive' : 'https://smdev.tn/api/auth/allCondidats_arch',
    'DeleteCondidat' : 'https://smdev.tn/api/auth/delete-condidat/',
    'getCondidatByID':'https://smdev.tn/api/auth/GetCondByID/',
    'updateCondidat':'https://smdev.tn/api/auth/update_condidat',

    'add_vehicule' : 'https://smdev.tn/api/auth/vehicules',
    'Listvehicule' : 'https://smdev.tn/api/auth/vehicules',
    'Deletevehicule' : 'https://smdev.tn/api/auth/vehicules/',
    'getvehiculeByID':'https://smdev.tn/api/auth/vehicules/',
    'updatevehicule':'https://smdev.tn/api/auth/vehicules/',

    'add_bureau' : 'https://smdev.tn/api/auth/bureaux',
    'Listbureau' : 'https://smdev.tn/api/auth/bureaux',
    'Deletebureau' : 'https://smdev.tn/api/auth/bureaux/',
    'getbureauByID':'https://smdev.tn/api/auth/bureaux/',
    'updatebureau':'https://smdev.tn/api/auth/bureaux/',

    'add_moniteur' : 'https://smdev.tn/api/auth/moniteur',
    'Listmoniteur' : 'https://smdev.tn/api/auth/moniteur',
    'Deletemoniteur' : 'https://smdev.tn/api/auth/moniteur/',
    'getmoniteurByID':'https://smdev.tn/api/auth/moniteur/',
    'updatemoniteur':'https://smdev.tn/api/auth/moniteur/',

     'add_caisse' : 'https://smdev.tn/api/auth/caisse',
     'Listcaisse' : 'https://smdev.tn/api/auth/caisse',
     'Deletecaisse' : 'https://smdev.tn/api/auth/caisse/',
     'getcaisseByID':'https://smdev.tn/api/auth/caisse/',
     'updatecaisse':'https://smdev.tn/api/auth/caisse/',

    'add_examinateur' : 'https://smdev.tn/api/auth/examinateur',
    'Listexaminateur' : 'https://smdev.tn/api/auth/examinateur',
    'Deleteexaminateur' : 'https://smdev.tn/api/auth/examinateur/',
    'getexaminateurByID':'https://smdev.tn/api/auth/examinateur/',
    'updateexaminateur':'https://smdev.tn/api/auth/examinateur/',

    'add_centre_exam' : 'https://smdev.tn/api/auth/centre_exam',
    'Listcentre_exam' : 'https://smdev.tn/api/auth/centre_exam',
    'Deletecentre_exam' : 'https://smdev.tn/api/auth/centre_exam/',
    'getcentre_examByID':'https://smdev.tn/api/auth/centre_exam/',
    'updatecentre_exam':'https://smdev.tn/api/auth/centre_exam/',

    'add_Examen' : 'https://smdev.tn/api/auth/examen',
    'ListExamen' : 'https://smdev.tn/api/auth/examen',
    'ListExamenCalendar' : 'https://smdev.tn/api/auth/examen/examencalndr/getForCalndr',
    'DeleteExamen' : 'https://smdev.tn/api/auth/examen/',
    'getExamenByID':'https://smdev.tn/api/auth/examen/',
    'updateExamen':'https://smdev.tn/api/auth/examen/',
    'updateResultExamen':'https://smdev.tn/api/auth/examen/update_resulat/',
    'getExamenByCondidat':'https://smdev.tn/api/auth/examen/getExamenByCondidat/',

    'add_conduite' : 'https://smdev.tn/api/auth/conduite',
    'Listconduite' : 'https://smdev.tn/api/auth/conduite',
    'Deleteconduite' : 'https://smdev.tn/api/auth/conduite/',
    'getconduiteByID':'https://smdev.tn/api/auth/conduite/',
    'updateconduite':'https://smdev.tn/api/auth/conduite/',
    'ListconduiteCondidat':'https://smdev.tn/api/auth/conduite/getconduiteCondidat/',
    'getConduitesFrCalendar':'https://smdev.tn/api/auth/conduite/conduitecalndr/getForCalndr',
    'GetConduiteAcc':'https://smdev.tn/api/auth/conduite/conduitecalndr/GetConduiteAcc',

    'add_code' : 'https://smdev.tn/api/auth/code',
    'Listcode' : 'https://smdev.tn/api/auth/code',
    'Deletecode' : 'https://smdev.tn/api/auth/code/',
    'getcodeByID':'https://smdev.tn/api/auth/code/',
    'getCodeByCondidat':'https://smdev.tn/api/auth/code/getCodeByCondidat/',
    'updatecode':'https://smdev.tn/api/auth/code/',

    'add_paiement' : 'https://smdev.tn/api/auth/paiement',
    'Listpaiement' : 'https://smdev.tn/api/auth/paiement',
    'Deletepaiement' : 'https://smdev.tn/api/auth/paiement/',
    'getpaiementByID':'https://smdev.tn/api/auth/paiement/',
    'updatepaiement':'https://smdev.tn/api/auth/paiement/',

    'getpaiementByCondidat':'https://smdev.tn/api/auth/paiement/getpaiementByCondidat/',

}

export const CONSTANTES = {
    'defaultImage': 'unknown_profile.png',
    'URLprofilePic': 'https://smdev.tn/storage/profile_pic/',
    'URLcondidatPic': 'https://smdev.tn/storage/condidat_pic/',
    'defaultSchoolImage': 'defaultSchhol.png',
    'URLSchholPic': 'https://smdev.tn/storage/school_pic/'
}
