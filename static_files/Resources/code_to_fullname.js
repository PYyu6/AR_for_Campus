
// let file=fopen(getScriptPath("/utcoding_converted"),0);
// if (file != -1){
//     const length = flength(file);
//     const str = fread(file, length);
//     const list = str.split("\n");
//     fclose(file);

// }
const acronymMapping;

$.ajax({
    url: 'utcoding_coverted.csv',
    dataType: 'text',
  }).done(CsvtoArray);

  function CsvtoArray(data){
        var allRows = data.split(/\r?\n|\r/);
        // var code2Fullname = [];
        var code2Fullname = {}
        for (var oneRow = 0; oneRow < allRows.length; oneRow++) {
            var rowElement = allRows[oneRow].split(',');
            let nm = rowElement[0]
            let acrnym = rowElement[1];
            code2Fullname.push(rowElement);
            code2Fullname[acrnym] = nm;
        }
        // return code2Fullname;
        acronymMapping = code2Fullname;
        console.log(acronymMapping);
  }