#!/usr/bin/env python3
import os
import uuid
import time
import platform
import psutil
import requests
import json
import socket
from datetime import datetime, timezone

ENDPOINT = "http://localhost:3000/api/monitor"
INTERVAL = 5
TIMEOUT = 5

def get_config_file():
    hostname = platform.node()
    return f"config_{hostname}.json"

def load_config():
    config_file = get_config_file()
    default_config = {
        "machine_id": str(uuid.uuid4()),
        "machine_name": platform.node(),
        "endpoint": ENDPOINT,
        "interval": INTERVAL,
        "timeout": TIMEOUT
    }
    
    if os.path.exists(config_file):
        try:
            with open(config_file, 'r', encoding='utf-8') as f:
                config = json.load(f)
                for key, value in default_config.items():
                    if key not in config:
                        config[key] = value
                return config
        except:
            pass
    
    save_config(default_config)
    return default_config

def save_config(config):
    config_file = get_config_file()
    try:
        with open(config_file, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
    except:
        pass


def get_network_info():
    try:
        net_io = psutil.net_io_counters()
        interfaces = []
        
        for interface, addrs in psutil.net_if_addrs().items():
            for addr in addrs:
                if addr.family == socket.AF_INET:
                    interfaces.append({
                        "name": interface,
                        "ip": addr.address,
                        "netmask": addr.netmask
                    })
                    break
        
        return {
            "bytes_sent": net_io.bytes_sent,
            "bytes_recv": net_io.bytes_recv,
            "packets_sent": net_io.packets_sent,
            "packets_recv": net_io.packets_recv,
            "interfaces": interfaces
        }
    except:
        return {}

def get_battery_info():
    try:
        battery = psutil.sensors_battery()
        if not battery:
            return {}
        
        return {
            "percent": battery.percent,
            "power_plugged": battery.power_plugged,
            "time_left": battery.secsleft if battery.secsleft != psutil.POWER_TIME_UNLIMITED else None
        }
    except:
        return {}

def get_boot_time():
    try:
        boot_time = psutil.boot_time()
        return datetime.fromtimestamp(boot_time, tz=timezone.utc).isoformat()
    except:
        return None

def collect_data():
    config = load_config()
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    data = {
        "id": config["machine_id"],
        "hostname": platform.node(),
        "machine_name": config["machine_name"],
        "system": platform.system(),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "boot_time": get_boot_time(),
        "cpu": {
            "cores": psutil.cpu_count(),
            "percent": psutil.cpu_percent(interval=1),
            "freq": psutil.cpu_freq()._asdict() if psutil.cpu_freq() else {}
        },
        "memory": {
            "total": memory.total,
            "available": memory.available,
            "used": memory.used,
            "free": memory.free,
            "percent": memory.percent,
            "active": getattr(memory, 'active', 0),
            "inactive": getattr(memory, 'inactive', 0),
            "wired": getattr(memory, 'wired', 0)
        },
        "disk": {
            "total": disk.total,
            "used": disk.used,
            "free": disk.free,
            "percent": (disk.used / disk.total) * 100
        },
        "network": get_network_info(),
        "battery": get_battery_info(),
        "processes": get_top_processes(),
        "gpu": get_gpu_info(),
        "system_info": {
            "platform": platform.platform(),
            "processor": platform.processor(),
            "architecture": platform.architecture()[0],
            "python_version": platform.python_version()
        }
    }
    
    return data

def get_top_processes():
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent', 'memory_percent', 'status']):
        try:
            info = proc.info
            if info['cpu_percent'] is None:
                info['cpu_percent'] = 0.0
            if info['memory_percent'] is None:
                info['memory_percent'] = 0.0
            processes.append(info)
        except:
            continue
    
    return sorted(processes, key=lambda p: p['cpu_percent'], reverse=True)[:10]

def get_gpu_info():
    try:
        import GPUtil
        gpus = GPUtil.getGPUs()
        if not gpus:
            return []
        
        return [{
            "name": gpu.name,
            "load": gpu.load * 100,
            "memory_used": gpu.memoryUsed,
            "memory_total": gpu.memoryTotal,
            "temperature": gpu.temperature
        } for gpu in gpus]
    except ImportError:
        return []

def send_data(config):
    data = collect_data()
    timestamp = data['timestamp']
    try:
        response = requests.post(config["endpoint"], json=data, timeout=config["timeout"])
        status = "OK" if response.ok else "FAIL"
        print(f"[{timestamp}] {status}: {response.status_code} - {data['machine_name']}")
    except Exception as e:
        print(f"[{timestamp}] ERRO: {e}")

def list_config_files():
    import glob
    config_files = glob.glob("config_*.json")
    if config_files:
        print("Arquivos de configuração encontrados:")
        for config_file in config_files:
            try:
                with open(config_file, 'r', encoding='utf-8') as f:
                    config = json.load(f)
                    print(f"  {config_file}: {config.get('machine_name', 'N/A')} ({config.get('machine_id', 'N/A')[:8]}...)")
            except:
                print(f"  {config_file}: (erro ao ler)")
    else:
        print("Nenhum arquivo de configuração encontrado")

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Monitor de sistema Sysmetric")
    parser.add_argument("-e", "--endpoint", help="URL do endpoint")
    parser.add_argument("-i", "--interval", type=int, help="Intervalo em segundos")
    parser.add_argument("-t", "--timeout", type=int, help="Timeout em segundos")
    parser.add_argument("-n", "--name", help="Nome personalizado da máquina")
    parser.add_argument("--once", action="store_true", help="Executa uma vez")
    parser.add_argument("--config", action="store_true", help="Mostra configuração atual")
    parser.add_argument("--list-configs", action="store_true", help="Lista todos os arquivos de configuração")
    parser.add_argument("--set-name", help="Define nome personalizado da máquina")
    args = parser.parse_args()
    
    if args.list_configs:
        list_config_files()
        return
    
    config = load_config()
    
    if args.endpoint:
        config["endpoint"] = args.endpoint
    if args.interval:
        config["interval"] = args.interval
    if args.timeout:
        config["timeout"] = args.timeout
    if args.name:
        config["machine_name"] = args.name
    
    if args.config:
        print(f"Configuração atual ({get_config_file()}):")
        print(json.dumps(config, indent=2, ensure_ascii=False))
        return
    
    if args.set_name:
        config["machine_name"] = args.set_name
        save_config(config)
        print(f"Nome da máquina definido como: {args.set_name}")
        print(f"Arquivo de configuração: {get_config_file()}")
        return
    
    save_config(config)
    
    if args.once:
        send_data(config)
        return
    
    print(f"Monitorando '{config['machine_name']}' (intervalo: {config['interval']}s) - Ctrl+C para parar")
    print(f"Endpoint: {config['endpoint']}")
    print(f"Arquivo de configuração: {get_config_file()}")
    
    try:
        while True:
            send_data(config)
            time.sleep(config["interval"])
    except KeyboardInterrupt:
        print("\nParado")

if __name__ == "__main__":
    main()