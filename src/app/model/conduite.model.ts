export interface Conduite {
    id?: string;
    school_id?: string;
    school_name?: string;
    condidat_id?: string;
    date_deb?: string;
    date_fin?: string;
    nbr_heure?: string;
    moniteur?: string;
    vehicule?: string;
    condidat_nom?: string;
    condidat_prenom?: string;
    couleur?:string;
    condidat?:Array<string>;
    detail_examen?:Array<string>;
    nbr_heur_affecter?:string;
    nbr_heur_total?:string;
    nbr_exam?:string;
}

