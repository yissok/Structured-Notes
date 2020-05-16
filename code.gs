function respondToFormSubmit(e)
{
  var addonTitle = 'My Add-on Title';
  var props = PropertiesService.getDocumentProperties();
  var authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
  var realSheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet");
  var responesSheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form responses 1");
  if (authInfo.getAuthorizationStatus() == ScriptApp.AuthorizationStatus.REQUIRED)
  {
    responesSheet.getRange('B2').setValue('ERROR');
  }
  else //IN HERE: CODE TRIGGERED BY FORM RESPONSE
  {
    var col2Edit=2;
    var inizioDatiCol=1;
    var inizioDatiRow=2;
    var lrResp=responesSheet.getLastRow();
    var lrReal=realSheet.getLastRow();
    var time = responesSheet.getRange(lrResp,1).getValue();
    var name = responesSheet.getRange(lrResp,2).getValue().toLowerCase();
    var update = responesSheet.getRange(lrResp,3).getValue();
    var found=false;
    for(var i = inizioDatiRow; i < (lrReal+1); i++)//only if already present
    {
      var currentName=realSheet.getRange(i,inizioDatiCol).getValue();
      if(currentName==name)
      {
        moveColumnsRightByOne(col2Edit,i);
        var updateVal=update+ "#" +" ("+time+")";
        realSheet.getRange(i,col2Edit).setValue(updateVal);
        Logger.log(update);
        found=true;
        break;
      }
    }
    if(!found)//new record
    {
      var updateVal=update+"#" +" ("+time+")";
      
      realSheet.getRange((lrReal+1),inizioDatiCol).setValue(name);
      realSheet.getRange((lrReal+1),col2Edit).setValue(updateVal);
      
    }
  }
}




function moveColumnsRightByOne(col2Edit,row2Edit)//AGGIUNGI row2Edit IN PARENTESIAGGIUNGI row2Edit IN PARENTESIAGGIUNGI row2Edit IN PARENTESIAGGIUNGI row2Edit IN PARENTESI
{
  Logger.log("ciao");
  Logger.log(row2Edit);
  var realSheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet");
  
  var i=0;
  var commenti="null";
  do
  {
    Logger.log(commenti);
    Logger.log(i);
    commenti=realSheet.getRange(row2Edit,col2Edit+i).getValue();
    i++;
  }
  while(commenti)
  var numberoOfColsToMoveRight=i-1;
  moveCertainNumberOfCells(numberoOfColsToMoveRight,col2Edit,row2Edit);
  
}

function moveCertainNumberOfCells(numberoOfColsToMoveRight,col2Edit,row2Edit)//AGGIUNGI row2Edit IN PARENTESIAGGIUNGI row2Edit IN PARENTESIAGGIUNGI row2Edit IN PARENTESIAGGIUNGI row2Edit IN PARENTESI
{
  var realSheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet");
  for(var i = (col2Edit+(numberoOfColsToMoveRight-1)); i >= (col2Edit); i--)
  {
    Logger.log(i);
    var supp=realSheet.getRange(row2Edit,i).getValue();
    realSheet.getRange(row2Edit,i+1).setValue(supp);
  }
}



function onOpen() {
}
