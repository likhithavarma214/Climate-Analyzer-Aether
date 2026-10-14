import pytest
from tinydb import TinyDB

@pytest.fixture(autouse=True)
def isolated_db(tmp_path, monkeypatch):
    from app import main
    db=TinyDB(tmp_path/'test.json')
    monkeypatch.setattr(main,'_db',db)
    monkeypatch.setattr(main,'_mongo',None)
    main.limits.clear()
    yield
    db.close()
    main.limits.clear()
