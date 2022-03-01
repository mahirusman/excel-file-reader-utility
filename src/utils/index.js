import { validationfunction } from "./HeaderValidator";
const path = require("path");
const xlsx = require("xlsx");
// const { isNullOrUndefined } = require("util");

export const _removeBlankColumnsArray = (array) => {
  let columns = array.reduce((r, a) => {
    a.forEach((v, i) => (r[i] = r[i] || v));
    return r;
  }, []);

  return array.map((a) => a.filter((_, i) => columns[i]));
};

export const getOriginalBomData = (bomFile) => {
  if (bomFile) {
    return Promise.resolve(null);
  }

  const filename = bomFile.name;
  const ext = path.extname(filename).toLowerCase();

  switch (ext) {
    case ".xlsx":
      return _getOriginalBomDataFromExcel(bomFile);
    case ".xls":
      return _getOriginalBomDataFromExcel(bomFile);
    case ".csv":
      return _getOriginalBomDataFromCSV(bomFile);
    default:
      console.warn(
        `Extension '${ext}' not supported in 'getOriginalBomData()'.`
      );
      return Promise.resolve(null);
  }
};

export const _getOriginalBomDataFromExcel = (bomFile) => {
  return new Promise((resolve, reject) => {
    _getFileData(bomFile, true).then((data) => {
      const workbook = xlsx.read(data, { type: "array" });
      const sheet = workbook.SheetNames;
      var originalBomData = xlsx.utils.sheet_to_json(
        workbook.Sheets[sheet[0]],
        { blankrows: false, defval: "", header: 1 }
      );
      originalBomData = _removeBlankColumnsArray(originalBomData);
      resolve(originalBomData);
    });
  });
};

export const _getFileData = (file, toBufferArray = false) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (toBufferArray) {
        resolve(new Uint8Array(e.target.result));
      } else {
        resolve(e.target.result);
      }
    };

    if (toBufferArray) {
      reader.readAsArrayBuffer(file);
    } else {
      reader.readAsText(file);
    }
  });
};

const _getOriginalBomDataFromCSV = (bomFile) => {
  return new Promise((resolve, reject) => {
    _getFileData(bomFile, false).then((data) => {
      var originalBomData = data.split(/\n/).map((lineStr) => {
        return splitCSVButIgnoreCommasInDoubleQuotes(lineStr);
      });

      // Make 2D have the same number of columns
      const maxColNum = Math.max(...originalBomData.map((row) => row.length));
      for (var row of originalBomData) {
        const lengthDiff = maxColNum - row.length;
        for (let i = 0; i < lengthDiff; i++) {
          row.push("");
        }
      }
      originalBomData = _removeBlankColumnsArray(originalBomData);

      originalBomData = originalBomData.filter(
        (element) => element.join("") !== ""
      );
      resolve(originalBomData);
    });
  });
};

const splitCSVButIgnoreCommasInDoubleQuotes = (lineStr) => {
  var delimiter = ",";
  var quotes = '"';
  var elements = lineStr.replace(/(\r\n|\n|\r)/gm, "").split(delimiter);
  var newElements = [];
  for (var i = 0; i < elements.length; ++i) {
    if (elements[i].indexOf(quotes) >= 0) {
      //the left double quotes is found
      var indexOfRightQuotes = -1;
      var tmp = elements[i];
      //find the right double quotes
      for (var j = i + 1; j < elements.length; ++j) {
        if (elements[j].indexOf(quotes) >= 0) {
          indexOfRightQuotes = j;
          break;
        }
      }
      //found the right double quotes
      //merge all the elements between double quotes
      if (-1 !== indexOfRightQuotes) {
        for (let j = i + 1; j <= indexOfRightQuotes; ++j) {
          tmp = tmp + delimiter + elements[j];
        }
        newElements.push(tmp.replace(/"/g, "").trim());
        i = indexOfRightQuotes;
      } else {
        //right double quotes is not found
        newElements.push(elements[i].replace(/"/g, "").trim());
      }
    } else {
      //no left double quotes is found
      newElements.push(elements[i].replace(/"/g, "").trim());
    }
  }

  return newElements;
};

export const getParsedBomData = (
  originalBomData,
  allIndexes,
  essentialIndexes = []
) => {
  const minCorrectIndexes = 2;
  let indexesAssigned = 0;
  let indexesSet = false;

  const parsedBomData = [];
  const skippedBomData = [];
  for (let i = 0; i < originalBomData.length; i++) {
    let entryData = {};

    // Iterate through the columns
    for (let j = 0; j < originalBomData[i].length; j++) {
      const cell = originalBomData[i][j];
      const cellStr = !cell ? "" : String(cell).trim();

      // If indexes are set, then we begin collecting the data
      if (indexesSet) {
        for (const key in allIndexes) {
          if (allIndexes[key] === j) {
            entryData[key] = cellStr;
          }
        }
      } else {
        // If indexes are not set, then we begin assigning indexes to the columns
        for (const key in allIndexes) {
          if (typeof validationfunction[key] !== "function")
            new Error(
              `Missing function for "${key}" in HeaderValidator export.`
            );

          if (allIndexes[key] === null && validationfunction[key](cellStr)) {
            allIndexes[key] = j;
            indexesAssigned++;
            break;
          }
        }
      }
    }

    // If indexes are not assigned, then we reset whatever indexes we have just set right now, if any
    if (indexesAssigned >= minCorrectIndexes) {
      indexesSet = true;

      // Check whether or not all then essentialIndexes are defined in 'entryData'
      if (
        essentialIndexes.reduce(
          (curValue, nextValue) =>
            curValue && entryData.hasOwnProperty(nextValue),
          true
        )
      ) {
        parsedBomData.push(entryData);
      } else if (Object.keys(entryData).length > 0) {
        skippedBomData.push(entryData);
      }
    } else {
      for (const key in allIndexes) {
        allIndexes[key] = null;
      }
    }
  }

  return parsedBomData.length === 0 ? null : parsedBomData;
};
