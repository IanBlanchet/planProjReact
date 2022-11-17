
import { IconButton } from '@chakra-ui/react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { GrDocumentCsv } from "react-icons/gr";


export const ExportCSV = ({ptiData, financeData, LesReglements, fileName}) => {
    
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const genereData = () => {
        const combinePtiData = []
        ptiData.forEach(element => {
        
            const assReglement = financeData.assReglement.find(item => item.projet_id == element.projet_id);
            const assSubvention = financeData.assSubvention.find(item => item.projet_id == element.projet_id);
            const assFonds = financeData.assFonds.find(item => item.projet_id == element.projet_id);
            
            const ratioSecteur = assReglement?LesReglements.find(reglement => reglement.id == assReglement.reglement_id).ratioSecteur:0
            
            /*const picked = (({ cycleCour, cycle2, cycle3, cycle4, cycle5, prev_courante, anterieur}) => ({ cycleCour, cycle2, cycle3, cycle4, cycle5, prev_courante, anterieur }))(element);
            element['total_projet'] =  Object.values(picked).reduce((accumulator, value) => {
                return accumulator + value;
            }, 0);*/
            element['montant_reglement'] = assReglement?assReglement.montant:0;
            element['portion_ensemble'] = element['montant_reglement']*(1-ratioSecteur)
            element['montant_subvention'] = assSubvention?assSubvention.montant:0;
            element['montant_fonds'] = assFonds?assFonds.montant:0;
            

            const newKey = [
                [element.annee+1,'cycleCour'] , [element.annee +2,'cycle2'] , [element.annee +3, 'cycle3'],
                [element.annee +4, 'cycle4'] , [element.annee +5, 'cycle5' ]
                ]
            newKey.map(item => element[item[0]] = element[item[1]]);

            const deleteColumn = ['id', 'nature', 'responsable_id', 'responsable', 'projet_id', 'cycleCour', 'cycle2', 'cycle3', 'cycle4', 'cycle5', 'annee']
            deleteColumn.map(item =>delete element[item])
        
            combinePtiData.push(element)
        });
    
        return combinePtiData
    }


    const exportToCSV = (fileName) => {
        const combinePtiData = genereData()
        const ws = XLSX.utils.json_to_sheet(combinePtiData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <IconButton colorScheme='green' size='sm' onClick={(e) => exportToCSV(fileName)} icon={<GrDocumentCsv/>} />
    )
}
