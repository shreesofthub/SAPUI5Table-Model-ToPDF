// global jspdf:true 
sap.ui.define(
    ["sap/ui/core/mvc/Controller"
        //  "treetable/JS/jspdf"
    ],
    function (oController) {
        return oController.extend("treetable.controller.table1", {
            onInit: function () {
                that = this;
                this.oTable = new sap.ui.table.Table("idTable", {
                    alternateRowColors: true,
                    selectionMode: "None",
                    columns: [
                        new sap.ui.table.Column({
                            autoResizable: true,
                            label: new sap.m.Label({
                                text: "First Name"
                            }),
                            template: new sap.m.Text({
                                text: "{name}"
                            })
                        }),
                        new sap.ui.table.Column({
                            autoResizable: true,
                            label: new sap.m.Label({
                                text: "Last Name"
                            }),
                            template: new sap.m.Text({
                                text: "{lastName}"
                            })
                        })
                    ]
                });
                this.oTable.bindRows("/");
                var oButton = new sap.m.Button({
                    text: "Download to PDF",
                    press: function () {
                        that.downloadPDF();
                    }
                });
                var oBtn2 = new sap.m.Button({
                    text: "PDF Display and Print",
                    press: function () {
                        that.onPrint();
                    }
                })
                var oGrid = new sap.ui.layout.Grid("idGrid", {
                    content: [oButton, oBtn2]
                });
                this.byId("idpdfP").addContent(this.oTable);
                this.byId("idpdfP").addContent(oGrid);
            },
            downloadPDF: function () {
                // var fnSuccess = function (oData, oResponse) {
                var oData = this.getView().getModel().getData();
                // var oTable = this.byId("idTable").getItems();
                // var odata = oTable.getItems();
                var columns = ["First Name", "Last Name"];
                var data = [];
                for (var i = 0; i < oData.length; i++) {
                    data[i] = [oData[i].name, oData[i].lastName];
                }
                // var docDefinition = {
                //     pageSize: 'A4',
                //     pageOrientation: 'portrait',
                //     content: [{
                //         table: {
                //             headerRows: 1,
                //             widths: ['*', '*', '*'],
                //             body: []
                //         }
                //     }],
                //     styles: {
                //         tableExample: {
                //             margin: [0, 10, 0, 15]
                //         },
                //     }
                // };
                // for (var i = 0; i < odata.length; i++) {
                //     // docDefinition.content[0].table.body
                //     //     .push(odata[i]);
                //     docDefinition.content[0].table.body
                //         .push([odata[i].mAggregations.cells[0].mProperties.text]);
                //     docDefinition.content[0].table.body
                //         .push([odata[i].mAggregations.cells[1].mProperties.text]);
                //     docDefinition.content[0].table.body
                //         .push([odata[i].mAggregations.cells[2].mProperties.text]);
                //     docDefinition.content[0].table.body
                //         .push([odata[i].mAggregations.cells[3].mProperties.text]);

                // }
                // pdfMake.createPdf(docDefinition).download()
                var doc = new jsPDF('p', 'pt');
                const { jsPDF } = window.jspdf;
                doc.autoTable(columns, data);
                doc.save("DemoData.pdf");
            },
            onPrint: function () {
                var modelData = this.getView().getModel().getData();
                var fullHtml = "";
                //Making table Header....
                var headertable1 = "<table  border='1' style='margin-top:150px;width: 1000px;' align='center'>" +
                    "<caption style='color:green;font-weight: bold;font-size: large;'>Student Details</caption>" +
                    "<tr><th style='color:green'>Last Name</th>" +
                    "<th style='color:green'>First Name</th>";
                //Adding row dynamically to student table....
                for (var i = 0; i < modelData.length; i++) {
                    headertable1 += "<tr>" +
                        "<td> " + modelData[i].lastName + "</td>" +
                        "<td>  " + modelData[i].name + "  </td>" +
                        "</tr>";
                }
                headertable1 += "</table>";
                fullHtml += headertable1;
                var wind = window.open("", "printExample");
                wind.document.write(fullHtml);
                setTimeout(function () {
                    wind.print();
                    wind.close();
                }, 5000);
            }
        });
    }
)