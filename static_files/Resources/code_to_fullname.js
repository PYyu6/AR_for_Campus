
let file=fopen(getScriptPath("/utcoding_converted"),0);
if (file != -1){
    const length = flength(file);
    const str = fread(file, length);
    const list = str.split("\n");
    fclose(file);

}