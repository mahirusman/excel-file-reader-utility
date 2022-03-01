export const validationfunction = {
  company: (cellStr) => {
    return /^(company|comp\.?)[ ]*$/i.test(cellStr);
  },
  accnumber: (cellStr) => {
    return /^(acc\.?|account)[ ]{1,}(number|num\.?|#)[ ]*$/i.test(cellStr);
  },
  email: (cellStr) => {
    return /^email[ ]{1,}(address|add\.?|addr\.?)[ ]*$/i.test(cellStr);
  },
  website: (cellStr) => {
    return /^(website|web\.?)[ ]{1,}(address|add\.?|addr\.?)[ ]*$/i.test(cellStr);
  },
  phone: (cellStr) => {
    return /^(phone|telephone|mobile)[ ]{1,}(number|num\.?)[ ]*$/i.test(cellStr);
  },
  address: (cellStr) => {
    return /^(address|add\.?|addr\.?)[ ]*$/i.test(cellStr);
  },
  terms: (cellStr) => {
    return /^terms[ ]*(and|of)?[ ]*(conditions|service)?[ ]*$/i.test(cellStr);
  },
  notes: (cellStr) => {
    return /^notes[ ]*$/i.test(cellStr);
  },

  part_Number: (cellStr) => {
    return /^part[ ]{1,}(number|num\.?)[ ]*$/i.test(cellStr);
  },
  qty_Per_Unit: (cellStr) => {
    return (/^(quantity|qty\.?)[ ]*(per|\/)?[ ]*(unit)?[ ]*$/i.test(cellStr));
  },

  // THIS IS THE SAME AS "qty_Per_Unit"
  Qty_Per_Unit: (cellStr) => {
    return (/^(quantity|qty\.?)[ ]*(per|\/)?[ ]*(unit)?[ ]*$/i.test(cellStr));
  },
  unitPrice: (cellStr) => {
    return /^unit[ ]{1,}(price|cost)[ ]*$/i.test(cellStr);
  },
  manufacturerPartNumber: (cellStr) => {
    return /^(manufacturer?|mfr\.?|mfg\.?)[ ]{1,}part[ ]{1,}(number|num\.?)[ ]*$/i.test(cellStr);
  },

  // WHY DO WE HAVE A "notes" FUNCTION IF WE ALREADY A "note" ONE?
  note: (cellStr) => {
    return /^note[ ]*$/i.test(cellStr);
  },
  vendor: (cellStr) => {
    return /^(vendor|supplier|supp\.?)[ ]*$/i.test(cellStr);
  },
  description: (cellStr) => {
    return /^(description|desc\.?)[ ]*$/i.test(cellStr);
  },
  photo: (cellStr) => {
    return /^(photo|image|img\.?)[ ]*(url|website)?[ ]*$/i.test(cellStr);
  },

  // THIS IS THE SAME AS "part_Number"
  partNumber: (cellStr) => {
    return /^part[ ]{1,}(number|num\.?)[ ]*$/i.test(cellStr);
  },
  File: (cellStr) => {
    return /^file[ ]*$/i.test(cellStr);
  },
  link: (cellStr) => {
    return /^link[ ]*$/i.test(cellStr);
  },
  totalPrice: (cellStr) => {
    return /^total[ ]{1,}(price|cost)[ ]*$/i.test(cellStr);
  },

  material: (cellStr) => {
    return /^(material|mat\.?[ ]*)$/i.test(cellStr);
  },
  color: (cellStr) => {
    return /^colou?r[ ]*$/i.test(cellStr);
  },
  texture: (cellStr) => {
    return /^(texture|tex\.?)[ ]*$/i.test(cellStr);
  },
  oneTimeToolingCost: (cellStr) => {
    return /^(tooling|tool\.?)[ ]{1,}(price|cost)[ ]*$/i.test(cellStr);
  },
  plasticXunits: (cellStr) => {
    return /^(plastic)(.*)(units?)[ ]*$/i.test(cellStr);
  },

  minimumQuantity: (cellStr) => {
    return /^(minimum|min\.?)[ ]{1,}(quantity|qty\.?)[ ]*$/i.test(cellStr);
  },
  buyQuantity: (cellStr) => {
    return /^buy[ ]{1,}(quantity|qty\.?)[ ]*$/i.test(cellStr);
  },

  quantityavailable: (cellStr) => {
    return /^(quantity|qty\.?)[ ]{1,}(available|avail\.?)[ ]*$/i.test(cellStr);
  },
  manufacturerLeadTime: (cellStr) => {
    return /^(manufacturer?|mfr\.?|mfg\.?)?[ ]*lead[ ]{1,}time[ ]*$/i.test(cellStr);
  },
  referenceDesignators: (cellStr) => {
    return /^(reference|ref\.?)[ ]{1,}(designators?|design\.?)[ ]*$/i.test(cellStr);
  },
  mountingType: (cellStr) => {
    return /^(mounting|mount\.?)[ ]{1,}type[ ]*$/i.test(cellStr);
  },
  leadStatus: (cellStr) => {
    return /^lead[ ]{1,}status[ ]*$/i.test(cellStr);
  },
  partInfo: (cellStr) => {
    return /^part[ ]{1,}(information|info\.?)[ ]*$/i.test(cellStr);
  },
  packaging: (cellStr) => {
    return /^(packaging|pack\.?)[ ]*$/i.test(cellStr);
  },
  partStatus: (cellStr) => {
    return /^part[ ]{1,}status[ ]*$/i.test(cellStr);
  },
  supplierPartNumber: (cellStr) => {
    return /^(supplier|supp\.?|vendor)[ ]{1,}(part)?[ ]{1,}(number|num\.?)$/i.test(cellStr);
  },
};
