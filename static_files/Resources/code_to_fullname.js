
// let file=fopen(getScriptPath("/utcoding_converted"),0);
// if (file != -1){
//     const length = flength(file);
//     const str = fread(file, length);
//     const list = str.split("\n");
//     fclose(file);

// }
// console.log("in this file");
const acronymMapping = {};

$.ajax('utcoding_coverted.csv', {
    dataType: 'text',
  }).done(CsvtoArray)
  .catch((err) => {
    console.log('CATCHED');
  });

  function CsvtoArray(data){
        console.log("here");
        var allRows = data.split(/\r?\n|\r/);
        // var code2Fullname = [];
        // var code2Fullname = {}
        for (var oneRow = 0; oneRow < allRows.length; oneRow++) {
            var rowElement = allRows[oneRow].split(',');
            let nm = rowElement[0]
            let acrnym = rowElement[1];
            // code2Fullname.push(rowElement);
            // code2Fullname[acrnym] = nm;
            acronymMapping[acrnym] = nm;

        }
        // return code2Fullname;
        // acronymMapping = code2Fullname;
        console.log(acronymMapping);
  }