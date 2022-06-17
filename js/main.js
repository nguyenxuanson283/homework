var app = angular.module("myApp",[]);
app.controller("myController", myController);
function myController($scope){
 const excel_file = document.getElementById('excel_file');
 excel_file.addEventListener('change', (event) => {
     var reader  = new FileReader();
     reader.readAsArrayBuffer(event.target.files[0]);
     reader.onload = function(event){
         var data = new Uint8Array(reader.result);
         var work_book = XLSX.read(data, {type:'array'});
         var sheet_name = work_book.SheetNames;
         var sheet_data = XLSX.utils.sheet_to_json(work_book.Sheets[sheet_name[0]],{header:1});
            if(sheet_data.length > 0){
                var table_output = '<table class="table table-striped table-bordered">';
                for(var row = 5; row < sheet_data.length; row++){
                    table_output +='<tr>';
                        for(var cell = 0; cell < sheet_data[row].length;cell++)
                        {   
                            if(sheet_data[row][cell] === undefined){
                                sheet_data[row][cell] = " ";
                            }
                            table_output += '<td>'+sheet_data[row][cell]+'</td>';
                        }
                    table_output +='</tr>';
                }
                table_output += '</table>';
                document.getElementById("excel_data").innerHTML= table_output; 

            }  
     }
 });
}
//search JQR
$(document).ready(function() {
    $('#myInput').on('keyup', function(event) {
       event.preventDefault();
       /* Act on the event */
       var tukhoa = $(this).val().toLowerCase();
       $('#excel_data tr').filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(tukhoa)>-1);
       });
    });
 });