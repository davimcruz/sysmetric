# 🖥️ Sysmetric - Sistema de Monitoramento de Instâncias

Um sistema completo de monitoramento de recursos de sistema em tempo real, composto por um cliente Python que coleta dados e um dashboard web moderno para visualização.

## 📋 Visão Geral

O Sysmetric é uma solução de monitoramento que permite:

- **Coleta de dados** de CPU, memória, disco, rede, processos e GPU
- **Dashboard web** responsivo e moderno
- **Múltiplas máquinas** monitoradas simultaneamente
- **Configuração por máquina** com arquivos específicos
- **Dados em tempo real** com atualizações automáticas

## 🏗️ Arquitetura

```
┌─────────────────┐    HTTP POST    ┌─────────────────┐
│   Cliente       │ ──────────────► │   Dashboard     │
│   (Python)      │                 │   (Next.js)     │
│                 │                 │                 │
│ • Coleta dados  │                 │ • Visualização  │
│ • Envia dados   │                 │ • API REST      │
│ • Configuração  │                 │ • Interface     │
└─────────────────┘                 └─────────────────┘
```

## 🚀 Como Executar

### Pré-requisitos

- **Python 3.8+**
- **Node.js 18+** (para o dashboard)
- **npm/pnpm** (gerenciador de pacotes)

### 1. Configuração do Dashboard Web

```bash
# Navegar para o diretório web
cd web

# Instalar dependências
npm install
# ou
pnpm install

# Executar o servidor de desenvolvimento
npm run dev
# ou
pnpm dev
```

O dashboard estará disponível em: `http://localhost:3000`

### 2. Configuração do Cliente Python

```bash
# Navegar para o diretório localMonitor
cd localMonitor

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependências
pip install psutil requests

# Para suporte a GPU (opcional):
pip install gputil
```

### 3. Executar o Monitor

```bash
# Execução básica (monitoramento contínuo)
python main.py

# Execução única (para teste)
python main.py --once

# Com configurações personalizadas
python main.py -e http://localhost:3000/api/monitor -i 10 -n "Minha-Maquina"
```

## ⚙️ Configuração

### Arquivos de Configuração

O sistema cria automaticamente arquivos de configuração específicos por máquina:

- **Formato**: `config_{hostname}.json`
- **Localização**: Diretório `localMonitor/`
- **Exemplo**: `config_MacBook-Pro.local.json`

### Comandos de Configuração

```bash
# Ver configuração atual
python main.py --config

# Listar todas as configurações
python main.py --list-configs

# Definir nome personalizado da máquina
python main.py --set-name "Servidor-Producao"

# Configurar endpoint personalizado
python main.py -e http://meu-servidor.com/api/monitor
```

## 📊 Dados Coletados

### Recursos do Sistema
- **CPU**: Uso percentual, frequência, número de cores
- **Memória**: Total, usado, disponível, percentual
- **Disco**: Espaço total, usado, livre, percentual
- **Rede**: Bytes enviados/recebidos, pacotes, interfaces
- **Processos**: Top 10 processos por uso de CPU
- **GPU**: Carga, memória usada/total, temperatura (opcional)
- **Sistema**: Plataforma, processador, arquitetura, versão Python

### Informações Adicionais
- **Bateria**: Percentual, status de carregamento, tempo restante
- **Tempo de atividade**: Desde o último boot
- **Interfaces de rede**: IP, máscara, tipo de interface

## 🎛️ Opções de Linha de Comando

| Opção | Descrição | Padrão |
|-------|-----------|--------|
| `-e, --endpoint` | URL do endpoint do dashboard | `http://localhost:3000/api/monitor` |
| `-i, --interval` | Intervalo de coleta em segundos | `5` |
| `-t, --timeout` | Timeout das requisições em segundos | `5` |
| `-n, --name` | Nome personalizado da máquina | Hostname do sistema |
| `--once` | Executa apenas uma coleta | `false` |
| `--config` | Mostra configuração atual | - |
| `--list-configs` | Lista todas as configurações | - |
| `--set-name` | Define nome da máquina | - |

## 🔧 Exemplos de Uso

### Monitoramento Básico
```bash
python main.py
```

### Monitoramento com Intervalo Personalizado
```bash
python main.py -i 30  # A cada 30 segundos
```

### Teste de Conectividade
```bash
python main.py --once
```

### Configuração de Múltiplas Máquinas
```bash
# Máquina 1
python main.py -n "Servidor-Web" -i 5

# Máquina 2  
python main.py -n "Servidor-BD" -i 10
```

## 🖥️ Dashboard Web

### Funcionalidades
- **Visualização em tempo real** dos dados coletados
- **Múltiplas máquinas** em uma única interface
- **Cards de métricas** com gráficos de progresso
- **Tabela de processos** com ordenação
- **Informações de sistema** detalhadas
- **Interface responsiva** para desktop e mobile

### Componentes
- **Metrics Cards**: CPU, Memória, Disco, Processos
- **System Info**: Tempo de atividade, frequência CPU, rede, bateria, GPU
- **Network Interfaces**: Lista de interfaces de rede
- **Processes Table**: Top processos por uso de recursos

## 🛠️ Desenvolvimento

### Estrutura do Projeto
```
sysmetric/
├── localMonitor/          # Cliente Python
│   ├── main.py           # Script principal
│   ├── config_*.json     # Configurações por máquina
│   └── venv/             # Ambiente virtual
└── web/                  # Dashboard Next.js
    ├── app/              # Páginas e APIs
    ├── components/       # Componentes React
    └── lib/              # Utilitários
```

### Tecnologias Utilizadas

**Backend (Cliente)**
- Python 3.8+
- psutil (coleta de dados do sistema)
- requests (comunicação HTTP)
- GPUtil (monitoramento de GPU)

**Frontend (Dashboard)**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (ícones)

## 🐛 Solução de Problemas

### Problemas Comuns

**1. Erro de conexão com o dashboard**
```bash
# Verificar se o dashboard está rodando
curl http://localhost:3000/api/monitors

# Verificar configuração
python main.py --config
```

**2. Dados de GPU não aparecem**
```bash
# Instalar GPUtil
pip install gputil

# Verificar se há GPUs disponíveis
python -c "import GPUtil; print(GPUtil.getGPUs())"
```

**3. Permissões insuficientes**
```bash
# Linux/macOS - executar com sudo se necessário
sudo python main.py

# Verificar permissões do psutil
python -c "import psutil; print(psutil.cpu_percent())"
```

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

---
