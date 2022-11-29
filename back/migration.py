import sqlite3
from time import strftime
from os import path
from pydantic import BaseModel


class Filterr(BaseModel):
    content: str
    typee: str
    date: str
    target: str


class DatabaseMigration:
    def __init__(self) -> None:
        self.con = sqlite3.connect(r'C:\Users\Mateusz\PycharmProjects\filter_creator_v2\back\database.db')
        self.cur = self.con.cursor()
        
        
    def insert_filter(self, table: str, data: Filterr):
        self.cur.execute(f'''INSERT INTO {table} VALUES (?, ?, ?, ?)''', [data.content, data.typee, data.date, data.target])
        self.con.commit()
        
           
    def tables(self):
        self.cur.execute('''CREATE TABLE filtry (Content TEXT, Type TEXT, Date TEXT, Target TEXT)''')
        
        
    def txt_import(self, folder: str, typp: str, table: str):
        dt = strftime("%d.%m.%Y %H:%M:%S")
        
        for item in ['foldery', 'plik_zawiera', 'pliki', 'rozszerzenia']:
            file = open(path.join(folder, f'{item}.txt'), 'r', encoding='utf-8')
            file2 = file.read().splitlines()
            for line in file2:
                data = Filterr(content=line, typee=typp, date=dt, target=item)
                self.insert_filter(table=table, data=data)
                
        self.con.close()
        
    def table_apply(self):
        self.cur.execute('''CREATE TABLE additions (Start TEXT, End TEXT, Opening TEXT, Type TEXT, Date TEXT, Target TEXT)''')

        
if __name__ == '__main__':
    pass