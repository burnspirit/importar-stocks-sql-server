### 
### Importar stocks para o Sage Retail / Gestão Comercial a partir de um ficheiro CSV
###

#### Estrutura CSV
ID_ARTIGO;DESCRICAO;QUANTIDADE_DOCUMENTO

#### config.json
{
    "ficheiro": "stocks.csv",
	"documento":{
		"tipo": "SS",
		"serie": "X11",
		"numero": "1",
		"data": "2015-12-31"
	},
    "mssql":{
        "host": "WIN-36S3ET5TDTG",
        "namepipe": "SAGE",
        "username": "sa",
        "password": "sage2008+",
        "database": "GesPOSData_AGROPB"
    }
} 