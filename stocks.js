//*
//* LIVRARIAS
//*
var fs = require("fs");
var mssql = require("mssql");

var config;
var Artigos = [];


//*
//* ler configuracao
//*
var lerConfig = function(callback){
    console.log("A ler configuracao...");
    fs.readFile("config.json", 'utf8', function(err,data){
        if(err) throw err;
        config = JSON.parse(data);
        if(callback) callback();
    });
};




//*
//* ler ficheiro artigos
//*
var lerArtigos = function(callback){
    console.log("A ler artigos...");
    fs.readFile(config.ficheiro, 'utf8', function(err,data){
        var artigos = [];
        var artigo = [];
        artigos = data.split('\n');
        
        Artigos = [];
        for(var x in artigos){
            artigo = artigos[x].split(';');
            
            if(artigo[0] && artigo[1] && artigo[2]){
                 Artigos.push(artigo);
            }
        }
        
        if(callback) callback();
    });
}





//*
//* ligar ao mssql
//*
var ligarMssql = function(){
    var mssqlOptions = {
        user: config.mssql.username,
        password: config.mssql.password,
        server: config.mssql.host,
        database: config.mssql.database,
        options:{
            instanceName: config.mssql.namepipe
        }
    };
    
    mssql.connect(mssqlOptions,function(err){
        console.log("A ligar ao MSSQL...");
        if(err) throw err;
        for(var i in Artigos){
            
            
            // contador numero linha
            var c = 2+i;
            
            //query para inserir linha na base de dados
            new mssql.Request().query(`INSERT INTO "StockTransactionDetails" ("TransSerial", "TransDocument", "TransDocNumber", "CreateDate", "ActualDeliveryDate", "OriginTransSerial", "OriginTransDocument", "OriginTransDocNumber", "OriginLineItemID", "OriginLineItemSubID", "OriginQuantity", "OriginUnits", "DestinationTransSerial", "DestinationTransDocument", "DestinationTransDocNumber", "DestinationLineItemID", "DestinationLineItemSubID", "DestinationQuantity", "DestinationUnits", "TransactionConverted", "LineItemID", "LineItemSubID", "ItemID", "LotID", "ItemType", "ColorID", "SizeID", "Description", "TaxableGroupID", "UnitOfSaleID", "Quantity", "PackQuantity", "Units", "StockUnits", "UnitConversion", "Quantity1", "Quantity2", "Quantity3", "Quantity4", "ComponentQty", "UnitCasesCount", "QntyAdjustmentBalanceCount", "DateAdjustmentBalanceCount", "TimeAdjustmentBalanceCount", "QntyAdjustmentBalanceDiff", "UnitPrice", "TaxIncludedPrice", "DiscountPercent", "DiscountValue", "UnitDiscountValue", "WarehouseID", "WarehouseOutgoing", "WarehouseReceipt", "TotalGrossAmount", "TotalLineItemDiscountAmount", "TotalPaymentDiscountAmount", "TotalNetAmount", "TotalNetBaseTaxAmount", "TotalNetPrintAmout", "TotalOtherTaxAmount", "TotalTaxAmount", "TotalAmount", "TotalTaxIncludedAmount", "CurrencyID", "CurrencyExchange", "CurrencyFactor", "PhysicalQtyRule", "WorkstationID", "SessionID", "UserAlt", "DtAlt", "HrAlt", "POSItemID", "LastCostPrice", "AverageCostStockValue", "LastCostStockValue", "PhysicalQtyDate", "ProductCode") VALUES ('${config.documento.serie}', '${config.documento.tipo}', ${config.documento.numero}, '${config.documento.data} 00:00:00.000', '${config.documento.data} 00:00:00.000', '', '', 0, 0, 0, 0, 0, '', '', 0, 0, 0, 0, 0, '0', ${c}, 0, '${Artigos[i][0]}', '', 0, 0, 0, '${Artigos[i][0]}', 101, 'UNI', ${Artigos[i][2]}, 1, ${Artigos[i][0]}, ${Artigos[i][0]}, 1, 0, 1, 1, 1, 0, 0, 0, '2016-01-16 00:00:00.000', 0.628541666666667, ${Artigos[i][0]}, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'EUR', 1, 1, 3, 1, 0, 1, '2016-01-16 00:00:00.000', 0.633391203703704, '', 0, 0, 0, '${config.documento.data} 00:00:00.000', '${Artigos[i][0]}');
           `).then(function(){
               
                    //ultimo artigo inserido
                    if(i == Artigos.length - 1){
                        
                        //terminar a ligacao
                        mssql.close();
                    }else{
                        console.log(i);
                    }
            }).catch(function(err){
                console.log(err);
                mssql.close();
            });
            
        }
    });
}






//*
//* RUNTIME
//*
lerConfig(function(){
    lerArtigos(function(){
                ligarMssql();
    });
});