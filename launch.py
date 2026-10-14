"""Reserve a free port and open only this AETHER process in the browser."""
import json
import os
import socket
import threading
import time
import urllib.request
import uuid
import webbrowser
from pathlib import Path


def reserve_port(preferred=8010):
    """Keep the port reserved until Uvicorn takes ownership; never stop other apps."""
    for port in range(preferred, min(preferred + 100, 65536)):
        listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        if hasattr(socket, 'SO_EXCLUSIVEADDRUSE'):
            listener.setsockopt(socket.SOL_SOCKET, socket.SO_EXCLUSIVEADDRUSE, 1)
        try:
            listener.bind(('127.0.0.1', port))
            listener.listen(128)
            return listener
        except OSError:
            listener.close()
    raise RuntimeError('No free local port found. Set PORT to another port and retry.')


def is_this_instance(payload, instance):
    return payload.get('app') == 'aether-climate' and payload.get('instance') == instance


if __name__ == '__main__':
    import uvicorn
    os.chdir(Path(__file__).resolve().parent)
    preferred = int(os.getenv('PORT', '8010'))
    if not 1024 <= preferred <= 65535:
        raise SystemExit('PORT must be between 1024 and 65535.')
    listener = reserve_port(preferred)
    port = listener.getsockname()[1]
    instance = uuid.uuid4().hex
    os.environ['AETHER_LAUNCH_ID'] = instance
    url = f'http://127.0.0.1:{port}'
    print(f'\nAETHER — updated 3D observatory\nOpen: {url}\nProject: {Path.cwd()}\n', flush=True)

    def open_when_ready():
        # Local requests must not be redirected through a system HTTP proxy.
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}))
        for _ in range(90):
            try:
                with opener.open(url + '/api/health', timeout=1) as response:
                    if is_this_instance(json.load(response), instance):
                        webbrowser.open(url + '/?build=aether-2')
                        return
            except Exception:
                pass
            time.sleep(.5)
        print(f'Browser did not open automatically. Check the server logs, then visit {url}.', flush=True)

    threading.Thread(target=open_when_ready, daemon=True).start()
    server = uvicorn.Server(uvicorn.Config('app.main:app', host='127.0.0.1', port=port))
    try:
        server.run(sockets=[listener])
    finally:
        listener.close()
