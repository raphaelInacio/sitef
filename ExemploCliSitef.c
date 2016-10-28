#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef _LINUX
  #include <dlfcn.h>
  #include <unistd.h>
#else
  #include <windows.h>  
#endif


#define false                           0
#define true                            (!false)


/*
 *  Tipos de dados
 */

#ifdef _LINUX
  typedef char * HINSTANCE;
  typedef unsigned int HANDLE;

  #define __stdcall
  #define SleepEx(x,y)                    sleep (((x) < 1000)? 1 : ((x) / 1000))
#endif

#define CALLBACK __stdcall

extern int (__stdcall ConfiguraIntSiTefInterativo) (char *pEnderecoIP, char *pCodigoLoja,
                                                    char *pNumeroTerminal,
                                                    short ConfiguraResultado);

extern int (__stdcall IniciaFuncaoSiTefInterativo) (int Modalidade, char *pValor,
                                                    char *pNumeroCuponFiscal,
                                                    char *pDataFiscal, char *pHorario,
                                                    char *pOperador, char *pRestricoes);

extern int (__stdcall IniciaFuncaoAASiTefInterativo) (int Modalidade, char *pValor,
                                                      char *pNumeroCuponFiscal,
                                                      char *pDataFiscal, char *pHorario,
                                                      char *pOperador, char *pRestricoes,
                                                      char *pProdutos);

extern int (__stdcall DesfazTransacaoSiTefInterativo) (char *pDadosDesfazimento);

extern int (__stdcall FuncoesGerenciaisSiTefInterativo) (char *pNumeroCuponFiscal,
                                                  char *pDataFiscal, char *pHorario,
                                                  char *pOperador);

extern int (__stdcall IniciaCancelamentoIdentificadoSiTefInterativo) (char *pNumeroCuponFiscal,
                                                                      char *pDataFiscal, char *pHorario,
                                                                      char *pOperador, char *pChaveTrnCancelamento);

extern int (__stdcall CorrespondenteBancarioSiTefInterativo) (char *pNumeroCuponFiscal,
                                                  char *pDataFiscal, char *pHorario,
                                                  char *pOperador, char *pRestricoes);

extern int (__stdcall ValidaCampoCodigoEmBarras) (char *pCodigoEmBarras, short *pTipo);

extern void (__stdcall FinalizaTransacaoSiTefInterativo) (short Confirma, 
                                                          char *pNumeroCuponFiscal,
                                                          char *pDataFiscal, char *pHorario);

extern void (__stdcall FinalizaTransacaoSiTefInterativoBonus) (short Confirma, char *pNumeroCuponFiscal,
                                                               char *pDataFiscal, char *pHorario,
                                                               char *pValorTotalCupon, char *pValorTotalBonus);

extern int (__stdcall ContinuaFuncaoSiTefInterativo) (int *pProximoComando, unsigned long *pTipoCampo,
                                               unsigned short *pTamanhoMinimo, unsigned short *pTamanhoMaximo,
                                               char *pBuffer, int TamMaxBuffer, int ContinuaNavegacao);

extern int (__stdcall EnviaRecebeSiTefDireto) (short RedeDestino, short FuncaoSiTef, short OffsetCartao,
                                               char *pDadosTx, short TamDadosTx, 
                                               char *pDadosRx, short TamMaxDadosRx, short *pCodigoResposta, 
                                               short TempoEsperaRx, char *pNumeroCupon, char *pDataFiscal, 
                                               char *pHorario, char *pOperador, short TipoTransacao);

extern int (__stdcall ForneceParametroEnviaRecebeSiTefDireto) (short IndiceParametro, char *pParametro, 
                                                               short ParametroCartao, short Delimitador);
extern void (__stdcall ForneceParametroEnviaRecebeSiTefDiretoA) (char *pResultado, char *pIndiceParametro, 
                                                                 char *pParametro, char *pParametroCartao, 
                                                                 char *pDelimitador);

extern int (__stdcall LeCartaoInterativo) (char *pMsgDisplay);

extern int (__stdcall LeCartaoDireto) (char *pMsgDisplay, char *pTrilha1, char *pTrilha2);

extern int (__stdcall LeCartaoDiretoEx) (char *pMsgDisplay, char *pTrilha1, char *pTrilha2,
                                         unsigned short Timeout,
                                         short (CALLBACK *pTestaCancelamento) (void));

extern int (__stdcall LeSenhaDireto) (char *pChaveSeguranca, char *pSenha);

extern int (__stdcall VerificaPresencaPinPad) (void);

extern int (__stdcall SEObtemChaveSeguranca) (char *pChaveSeguranca,
                                              char *pCartao, char *pChaveAbertura,
                                              char *pResultado);

extern int (__stdcall SEObtemSenhaCliente) (char *pSenhaAberta, char *pSenhaCapturada, 
                                            char *pChaveSeguranca, char *pChaveAbertura,
                                            char *pResultado);

extern int (__stdcall AbrePinPad) (void);
extern int (__stdcall FechaPinPad) (void);
extern int (__stdcall EscreveMensagemPinPad) (char *pMsgDisplay);
extern int (__stdcall EscreveMensagemPermanentePinPad) (char *pMsgDisplay);
extern int (__stdcall LeCampoPinPad) (char *pMsgDisplay, int TamMaximo, int eSenha, char *pCampo);
extern int (__stdcall LeTeclaPinPad) (void);
extern int (__stdcall LeSimNaoPinPad) (char *pMsgDisplay);

extern int (__stdcall IniciaFuncaoSiTefInterativoConsultaVidalink) (char *pCodigoAutorizacao,
                                                                    char *pCodigoProduto,
                                                                    char *pNumeroCuponFiscal,
                                                                    char *pDataFiscal, char *pHorario,
                                                                    char *pOperador);
extern int (__stdcall InformaProdutoVendaVidalink) (short IndiceProduto,
                                                    char *pCodigoProduto,
                                                    short Quantidade,
                                                    char *pValorVenda);
extern int (__stdcall IniciaFuncaoSiTefInterativoVendaVidalink) (char *pCodigoAutorizacao,
                                                                 short NumeroProdutos,
                                                                 char *pNumeroCuponFiscal,
                                                                 char *pDataFiscal, char *pHorario,
                                                                 char *pOperador);
extern int (__stdcall IniciaFuncaoSiTefInterativoCancelamentoVidalink) (short ParcialTotal,
                                                                        short NumeroProdutos,
                                                                        char *pNumeroCuponOriginal,
                                                                        char *pDataOriginal,
                                                                        char *pNumeroDocumentoOriginal,
                                                                        char *pIdentificacaoPdvOriginal,
                                                                        char *pCuponFiscal,
                                                                        char *pDataFiscal, char *pHorario,
                                                                        char *pOperador);

extern int (__stdcall IniciaFuncaoSiTefInterativoConsultaPBM) (char *pCodigoAutorizacao,
                                                               char *pCodigoProduto,
                                                               char *pNumeroCuponFiscal,
                                                               char *pDataFiscal, char *pHorario,
                                                               char *pOperador, char *pParametrosAdicionais);

extern int (__stdcall ConsultaParametrosSiTef) (int TipoConsulta, char *Reservado, char *Saida);
extern int (__stdcall RegistraBonusOffLineSiTef) (char *ValorBonus, char *ValorCupom,
                                                  char *NumeroCuponFiscal, char *DataFiscal, 
                                                  char *Horario, char *Operador, char *Supervisor);

extern void (__stdcall FinalizaFuncaoSiTefInterativo) (short Confirma, char *pNumeroCuponFiscal,
                                                       char *pDataFiscal, char *pHorario, 
                                                       char *pParametrosAdicionais);

extern int (__stdcall ObtemParametrosSiTef) (int TipoConsulta, char *pParamAdic);


int main (void);

int TestaEnviaRecebeSiTefDireto (void);

int ChamaDll (int Tipo);

int RotinaColeta (int Comando, unsigned long TipoCampo,
                  unsigned short *TamanhoMinimo, unsigned short TamanhoMaximo,
                  unsigned char *pDadosComando, unsigned char *pCampo);

int RotinaResultado (unsigned long TipoCampo, unsigned char *pResultado);

int TrataMenu (char *pOpcoes, char *pEscolha);
int LeCampo (short TamMinimo, short TamMaximo, char *pMensagem, char *pCampo);

static short CALLBACK TestaCancelamento (void);


char Buffer [20 * 1024 + 1];

const char *Mostrador = "|/-\\";
unsigned int IndiceMostrador = 0;

int nVezes;

char *pDataFiscal;
char *pCupom;

char *pEmpresa;
char *pTerminal;

HANDLE HandleCom = (HANDLE)NULL;

int main (void)
{
  int Sts;
  char *pIpSiTef;

  pIpSiTef = "127.0.0.0";
  pEmpresa = "00000000";
  pTerminal = "00000001";
  
  Sts = ConfiguraIntSiTefInterativo (pIpSiTef, pEmpresa, pTerminal, 0);
  if (Sts != 0)
  {
    fprintf (stderr, "Erro %d na inicializacao da DLL\n", Sts);
    fflush (stderr);
    return (1);
  }

  pDataFiscal = "20050304";
  pCupom = "1234";

 
  Sts = ChamaDll (0);
  if (Sts > 0)
  {
    fprintf (stderr, "Operacao negada com código de retorno = %d\n", Sts);
    fflush (stderr);
  }

  if (Sts < 0)
  {
    fprintf (stderr, "Operacao negada pela dll ou operador com código de retorno = %d\n", Sts);
    fflush (stderr);
  }
  if (Sts == 0)
    FinalizaTransacaoSiTefInterativo (1, pCupom, pDataFiscal, "170000");
 

  return (0);
}



int ChamaDll (int Tipo)
{
  int Sts;
  int ProximoComando = 0;
  unsigned long TipoCampo = 0;
  unsigned short TamanhoMinimo = 0;
  unsigned short TamanhoMaximo = 0;
  int Resultado = 0;
  char Valor [20 + 1];
  char Restricoes [2048 + 1];
      
  strcpy (Valor, "100");
  *Restricoes = '\0';		
  Sts = IniciaFuncaoSiTefInterativo (0, Valor, pCupom, pDataFiscal, "170000", "Henrique", Restricoes);
  
  if (Sts != 10000)
    return (Sts);

 
  while (true)
  {
    Sts = ContinuaFuncaoSiTefInterativo (&ProximoComando, &TipoCampo, &TamanhoMinimo, &TamanhoMaximo,
                                         Buffer, sizeof (Buffer), Resultado);

    if (Sts != 10000)
      break;

   
    if (ProximoComando == 0)
      Resultado = RotinaResultado (TipoCampo, Buffer);
    else
    {
      Resultado = RotinaColeta (ProximoComando, TipoCampo, &TamanhoMinimo, TamanhoMaximo,
                                  Buffer, Buffer);
    }
  }

  return (Sts);
}

int RotinaColeta (int Comando, unsigned long TipoCampo,
                  unsigned short *TamanhoMinimo, unsigned short TamanhoMaximo,
                  unsigned char *pDadosComando, unsigned char *pCampo)
{
  char c;

  if (Comando != 23)
    nVezes = 0;

  switch (Comando)
  {
    case 1:
    case 2:
    case 3:
    case 4:
      fprintf (stderr, "\nMensagem Visor:[%s]\n", pDadosComando);
      return (0);

    case 11:
    case 12:
    case 13:
    case 14:
      fprintf (stderr, "\nApaga Visor: [%d]\n", Comando);
      return (0);

    case 37:
      fprintf (stderr, "\nColeta confirmacao no PinPad:");
    case 20:
      fprintf (stderr, "\n%s\nEntre com a opção (1 = Sim, 2 = Nao): ", pDadosComando);
      do
        c = getchar ( );
      while (c != '1' && c != '2');

      while (getchar ( ) != '\n')
        ;

      *pCampo = c - 1;
      return (0);

    case 21:
      return (TrataMenu (pDadosComando, pCampo));

    case 22:
      fprintf (stderr, "\n%s\nPressione enter: ", pDadosComando);
      do
        c = getchar ( );
      while (c != '\n');
      return (0);

    case 23:
      SleepEx (1000, false);
      fprintf (stderr, "\r%c [%d]", Mostrador[IndiceMostrador], ++nVezes);
      if (++IndiceMostrador == strlen (Mostrador))
        IndiceMostrador = 0;
      if (nVezes > 30)
        return (-1);

      return (0);

    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
    case 35:
    case 38:
      fprintf (stderr, "\nComando: %d, TipoCampo: %d", Comando, TipoCampo);
      return (LeCampo (*TamanhoMinimo, TamanhoMaximo, pDadosComando, pCampo));

  }

  return (-1);
}

int RotinaResultado (unsigned long TipoCampo, unsigned char *pResultado)
{
  char Retorno [5 + 1];

  switch (TipoCampo)
  {
    case 1:
      fprintf (stderr, "Finalizacao: [%s]\n", pResultado);
      break;

     
    case 121:
      fprintf (stderr, "Comprovante Cliente:\n%s", pResultado);
      break;

    case 122:
      fprintf (stderr, "Comprovante Estabelecimento:\n%s", pResultado);
      break;

    case 131:
      fprintf (stderr, "Rede destino:%s", pResultado);
      LeCampo (0, sizeof (Retorno) - 1, "Retorno RecebeResultado (enter = 0)?:", Retorno);
      return (atoi (Retorno));

    case 132:
      fprintf (stderr, "Tipo Cartao:%s", pResultado);
      LeCampo (0, sizeof (Retorno) - 1, "Retorno RecebeResultado (enter = 0)?:", Retorno);
      return (atoi (Retorno));

    default:
      fprintf (stderr, "\nTipoCampo= %ld, Conteudo= \n%s\n", TipoCampo, pResultado);
      break;
  }

  fflush (stderr);
  return (0);
}

int TrataMenu (char *pOpcoes, char *pEscolha)
{

  return (0);
}

int LeCampo (short TamMinimo, short TamMaximo, char *pMensagem, char *pCampo)
{
	return (0);
}

static short CALLBACK TestaCancelamento (void)
{
  fprintf (stderr, "\r%c [%d]", Mostrador[IndiceMostrador], ++nVezes);
  if (++IndiceMostrador == strlen (Mostrador))
    IndiceMostrador = 0;
  if (nVezes > 50)
    return (1);

  return (0);
}
