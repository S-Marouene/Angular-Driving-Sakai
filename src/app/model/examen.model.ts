export interface Examen {
    id?: string;
    school_id?: string;
    school_name?: string;
    condidat_id?: string;
    num_liste?: string;
    num_convocation?: string;
    date_examen?: string;
    centre_examen?: string;
    type_examen?: string;
    prestation?: string;
    bureau?: string;
    resultat?: string;
    examinateur?: string;
    //condidat?:string;

    condidat?:Array<string>;
    detail_examen?:Array<string>;
    nbr_heur_affecter?:string;
    nbr_heur_total?:string;
    nbr_exam?:string;
}
