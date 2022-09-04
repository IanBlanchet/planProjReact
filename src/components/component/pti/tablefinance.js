import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Text, IconButton, Box, Container } from '@chakra-ui/react';
import { FcExpand, FcCollapse } from "react-icons/fc";

const calculRatioPti = (pti, montantFinancement) => {
    return ( montantFinancement * ((pti.cycleCour+pti.cycle2+pti.cycle3)/
    (pti.anterieur+pti.prev_courante+pti.cycleCour+pti.cycle2+pti.cycle3+pti.cycle4+pti.cycle5+.00001))
    )
}

const calculReductionSubvention = (pti, subvention) => {
    return ( subvention * ((pti.cycleCour+pti.cycle2+pti.cycle3)/
    (pti.anterieur+pti.prev_courante+pti.cycleCour+pti.cycle2+pti.cycle3+pti.cycle4+pti.cycle5+.00001))
    )
}

const calculTotalReglements = (ptis, assReglements, reglement, assSubvention, secteur=false) => {
        const result = assReglements.reduce((accumulator, object) => {
        if (ptis.some(item => item.projet_id === object.projet_id)) {
            const pti = ptis.find(item => item.projet_id === object.projet_id)
            let ratio =0
            const leReglement = reglement.find(item => item.id === object.reglement_id)
            leReglement&&(ratio = leReglement.ratioSecteur)
            let reductionSubvention = 0
            const laSubvention = assSubvention.find(item => item.projet_id === object.projet_id)
            !secteur&&laSubvention&&(reductionSubvention=calculReductionSubvention(pti, laSubvention.montant))
            return accumulator + 
                (!secteur?(1-ratio):ratio) * calculRatioPti(pti, object.montant) - reductionSubvention
        } else {
            return accumulator
        }
        }, 0)

        return result
}

const calculTotalAutreSource = (ptis, assAutre) => {
    const result = assAutre.reduce((accumulator, object) => {
        if (ptis.some(item => item.projet_id === object.projet_id)) {
            const pti = ptis.find(item => item.projet_id === object.projet_id)
            return accumulator + 
                calculRatioPti(pti, object.montant)
        } else {
            return accumulator
        }
    }, 0) 

    return result
}


const calculTotalParFonds = (ptis, fonds, assFonds) => {
    let fondsDict = [];
    fonds.forEach(element => {
        const leFonds = []
        leFonds[0] = element.nom
        leFonds[1] = assFonds.reduce((accumulator, object) => {
            if ((ptis.some(item => item.projet_id === object.projet_id)) && (object.fonds_id === element.id)) {
                const pti = ptis.find(item => item.projet_id === object.projet_id)
                return accumulator + 
                    calculRatioPti(pti, object.montant)
            } else {
                return accumulator
            }
        }, 0)
        fondsDict.push(leFonds)
    });

    return fondsDict
}



export function TableFinance({ptis, assReglements, assFonds, assSubvention, reglement, fonds}) {

    const [isExpand, setIsExpand] = useState(false)

    const ReglementEnsemble = calculTotalReglements(ptis, assReglements, reglement, assSubvention, false)

    const ReglementSecteur = calculTotalReglements(ptis, assReglements,  reglement, assSubvention, true)

    const Subvention = calculTotalAutreSource(ptis, assSubvention)

    const Fonds = calculTotalParFonds(ptis, fonds, assFonds)
    
    const TotalFonds = calculTotalAutreSource(ptis, assFonds)

    
    const ArrayTotaux = [['Reglement Ensemble',(ReglementEnsemble)],
                        ['Reglement Secteur',ReglementSecteur], 
                        ['Subvention',Subvention],
                        ['Fonds', TotalFonds ]
                        ]

    const handleExpand = () => {
        isExpand?setIsExpand(false):setIsExpand(true)
    }

    return (
        <Table colorScheme='blue' overflowY='scroll' size='sm'>
            
            
            {ArrayTotaux.map(item => 
                <>
                <Thead>
                <Tr bg='blue.200'>
                        <Th>{item[0]}</Th>                   
                </Tr>
                </Thead>
                <Tbody>
                <Tr alignItems='center'>
                    <Td>{item[1].toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits:0 })}</Td>
                </Tr>
            </Tbody>
            
            </>
            )}

            
                <Tr >
                <IconButton onClick={handleExpand} icon={!isExpand?<FcExpand/>:<FcCollapse></FcCollapse> } size='xs' bgColor='blue.200'/>                 
                </Tr>
            
            {isExpand&&Fonds.map(item => 
                  <Tbody>
                  <Tr alignItems='center'>
                        <Td>{item[0]}</Td>
                      <Td>{item[1].toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits:0 })}</Td>
                  </Tr>
                  </Tbody>
            )}

            
            

            <Tfoot position='sticky' bottom='0'  zIndex='1' background='#fff'>
                <Tr>
                    <Th>Total</Th>
                    
                </Tr>
                <Tr>
                    <Th fontWeight='bold' fontSize='medium'>{(ReglementEnsemble+ReglementSecteur+Subvention+TotalFonds).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits:0 })}</Th>
                </Tr>
            </Tfoot>
        </Table>
    )
}