import { useState } from "react";
import { getOriginalBomData, getParsedBomData } from "./utils/index";
function App() {
  const [bom_parsed_data, set_parsed_data] = useState([]);

  // const parseExcel = async (event) => {
  //   const file = event.target.files[0];
  //   const originalBomData = await getOriginalBomData(file);
  //   const allIndexes = {
  //     partNumber: null,
  //     Qty_Per_Unit: null,
  //     unitPrice: null,
  //     manufacturerPartNumber: null,
  //     description: null,
  //     totalPrice: null,
  //     minimumQuantity: null,
  //     buyQuantity: null,
  //     supplierPartNumber: null,
  //     quantityavailable: null,
  //     manufacturerLeadTime: null,
  //     referenceDesignators: null,
  //     mountingType: null,
  //     leadStatus: null,
  //     partInfo: null,
  //     packaging: null,
  //     partStatus: null,
  //   };
  //   const essentialIndexes = [];
  //   const parsedBomData = await getParsedBomData(
  //     originalBomData,
  //     allIndexes,
  //     essentialIndexes
  //   );

  //   if (parsedBomData) {
  //     set_parsed_data(parsedBomData);
  //   }
  // };

  console.log("parsedBomData ", bom_parsed_data);
  return (
    <div>
      {/* File upload function
      <div>{JSON.stringify(bom_parsed_data)}</div>
      <label>Uploaf file</label>
      <input
        type="file"
        id="file-upload"
        accept=".xlsx,.csv"
        placeholder="upload file"
        onChange={parseExcel}
      /> */}
      here i want to Go
    </div>
  );
}

export default App;
