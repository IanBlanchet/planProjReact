import { useState, useEffect, useContext} from "react";
import { ContextSelectProject } from '../components/container/suiviProjet';

export function useCharge(data) {
    const [ charge, setCharge] = useState();
    const context = useContext(ContextSelectProject);

    let projet = context.projet.find(item => item.id === data.projet_id)
    let contrat = context.contrat.find(item => item.id === data.contrat_id)
    contrat && (projet = context.projet.find(item => item.id === contrat.projet_id))
    
    const charges = [data.charge_jalon, (contrat? contrat.charge_contrat:projet.charge), (projet?projet.charge:'')];
    let selected_charge = charges[0]?charges[0]:charges[1]?charges[1]:charges[2]
    setCharge(selected_charge)

    useEffect(() =>{}, [])
    

    return charge

}