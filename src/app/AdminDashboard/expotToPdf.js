import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';

const toPDF = function () {
  const doc = new jsPDF();

  const columns = [['First Column', 'Second Column', 'Third Column']];
  const data = [
  ['Data 1', 'Data 2', 'Data 3'],
  ['Data 1', 'Data 2', 'Data 3']
  ];

   autoTable(doc, {
        head: columns,
        body: data,
        didDrawPage: (dataArg) => {
         doc.text('PAGE', dataArg.settings.margin.left, 10);
        }
   });

}

export default toPDF;
