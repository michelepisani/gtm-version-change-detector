ss_id = "SPREADSHEET_ID";

function checkGTMLastVersion() {
  var sh = SpreadsheetApp.openById(ss_id).getSheets()[0];
  var sh_range = sh.getRange(2, 1, sh.getLastRow()-1,2);
  var sh_range_val = sh_range.getValues();
  var sh_range_val_len = sh_range_val.length;
  var GTMlastVersion, curr_ver_cell, curr_ver_val = '';
  for (var i=0; i <sh_range_val_len; i++) {
    curr_ver_cell = sh.getRange(2+i,2);
    curr_ver_cell.setBackground("white");
    curr_ver_val = sh_range_val[i][1];
    GTMlastVersion = getGTMLastVersion_(sh_range_val[i][0]);
    if (curr_ver_val != "" && GTMlastVersion != curr_ver_val) {
      curr_ver_cell.setBackground("red");
    }
    curr_ver_cell.setValue(GTMlastVersion);
  }
}

function getGTMLastVersion_(gtm_id) {
  var rnd = Math.floor(Math.random() * 100);
  var url = "https://www.googletagmanager.com/gtm.js?id=" + gtm_id + '&rnd=' + rnd;
  var string_find_start = '"version":"';
  var string_find_end = '",';
  var content = UrlFetchApp.fetch(url);
  var content = content.getBlob().getDataAsString('ISO-8859-1');
  var string_find_start_length = string_find_start.length;
  var string_find_start_position = content.indexOf(string_find_start);
  var string_find_start_position_content = string_find_start_position + string_find_start_length;
  var string_find_end_position = content.indexOf(string_find_end, string_find_start_position);
  var result = content.substring(string_find_start_position_content, string_find_end_position);
  return result;
}
