#!/usr/bin/env python3
import os
import uuid
import time
import platform
import psutil
import requests
from datetime import datetime, timezone

ENDPOINT = "https://tall-oil-53.webhook.cool"
INTERVAL = 5
TIMEOUT = 5
ID_FILE = "machine_id.txt"

def get_machine_id():
    if os.path.exists(ID_FILE):
        with open(ID_FILE) as f:
            return f.read().strip()
    machine_id = str(uuid.uuid4())
    try:
        with open(ID_FILE, "w") as f:
            f.write(machine_id)
    except:
        pass
    return machine_id

def collect_data():
    data = {
        "id": get_machine_id(),
        "hostname": platform.node(),
        "system": platform.system(),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "cpu": {
            "cores": psutil.cpu_count(),
            "percent": psutil.cpu_percent(interval=1)
        },
        "memory": psutil.virtual_memory()._asdict(),
        "disk": psutil.disk_usage('/')._asdict()
    }
    
    processes = []
    for proc in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        try:
            info = proc.info
            if info['cpu_percent'] is None:
                info['cpu_percent'] = 0.0
            processes.append(info)
        except:
            continue
    data["processes"] = sorted(processes, key=lambda p: p['cpu_percent'], reverse=True)[:5]
    
    try:
        import GPUtil
        gpus = GPUtil.getGPUs()
        if gpus:
            data["gpu"] = [{
                "name": gpu.name,
                "load": gpu.load,
                "memory_used": gpu.memoryUsed
            } for gpu in gpus]
    except ImportError:
        pass
    
    return data

def main():
    import argparse
    
    parser = argparse.ArgumentParser(description="Monitor de sistema")
    parser.add_argument("-e", "--endpoint", default=ENDPOINT, help="URL do endpoint")
    parser.add_argument("-i", "--interval", type=int, default=INTERVAL, help="Intervalo em segundos")
    parser.add_argument("-t", "--timeout", type=int, default=TIMEOUT, help="Timeout em segundos")
    parser.add_argument("--once", action="store_true", help="Executa uma vez")
    args = parser.parse_args()
    
    def send():
        data = collect_data()
        timestamp = data['timestamp']
        try:
            response = requests.post(args.endpoint, json=data, timeout=args.timeout)
            status = "OK" if response.ok else "FAIL"
            print(f"[{timestamp}] {status}: {response.status_code}")
        except Exception as e:
            print(f"[{timestamp}] ERRO: {e}")
    
    if args.once:
        send()
        return
    
    print(f"Monitorando (intervalo: {args.interval}s) - Ctrl+C para parar")
    try:
        while True:
            send()
            time.sleep(args.interval)
    except KeyboardInterrupt:
        print("\nParado")

if __name__ == "__main__":
    main()