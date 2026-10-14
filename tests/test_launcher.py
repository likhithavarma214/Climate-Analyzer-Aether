import socket
from launch import reserve_port, is_this_instance

def test_existing_server_is_not_reused():
    occupied=socket.socket()
    occupied.bind(('127.0.0.1',0));occupied.listen(1)
    port=occupied.getsockname()[1]
    listener=reserve_port(port)
    try:
        assert listener.getsockname()[1] != port
        assert listener.getsockname()[1] > port
    finally:
        listener.close();occupied.close()

def test_other_apps_and_old_instances_rejected():
    assert not is_this_instance({'status':'ok'},'new')
    assert not is_this_instance({'app':'aether-climate','instance':'old'},'new')
    assert is_this_instance({'app':'aether-climate','instance':'new'},'new')
