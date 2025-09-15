# Sysmetric - Monitor de Instâncias

## Como Executar

### 1. Instalar Python

- **Windows**: Baixe e instale o Python em [python.org](https://www.python.org/downloads/)
- **macOS**: 
  ```
  brew install python
  ```
- **Linux**: 
  ```
  sudo apt install python3
  ```

### 2. Criar ambiente virtual

No diretório do projeto:

```
python -m venv venv
```

### 3. Ativar ambiente virtual

- **Windows**:
  ```
  venv\Scripts\activate
  ```
- **macOS/Linux**:
  ```
  source venv/bin/activate
  ```

### 4. Instalar dependências

```
pip install psutil requests
```

Para suporte a GPU (opcional):
```
pip install gputil
```

### 5. Executar o programa

```
python main.py

ou

python3 main.py
```

#### Opções disponíveis:

- `-e, --endpoint`: URL do endpoint (padrão: https://tall-oil-53.webhook.cool)
- `-i, --interval`: Intervalo em segundos (padrão: 5s)
- `-t, --timeout`: Timeout em segundos (padrão: 5s)
- `--once`: Executa o monitoramento apenas uma vez

Exemplo:
```
python main.py --once
```

Para parar a execução, utilizar: `Ctrl+C`.