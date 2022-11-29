import sqlite3
from models import FilterData


class DbSqlUtilities:
    def fetch_translate_one(self, inputt):
        return [item[0] for item in inputt]


class DatabaseS:
    def __init__(self) -> None:
        con = sqlite3.connect(r'C:\Users\Mateusz\PycharmProjects\filter_creator_v2\back\database.db')
        self.cur = con.cursor()
        
        
    def get_filters_main(self, typee: str):
        a = typee.replace('_', ' ')
        typee = a
        self.cur.execute(f'''SELECT * FROM filtry WHERE Type=?''', (typee,))
        a = self.cur.fetchall()
        return a
    
    def filter_data(self, data: FilterData):
        self.cur.execute('''SELECT * FROM filtry WHERE Content=? AND Type=?''', (data.content, data.typee,))
        main_table = self.cur.fetchone()
        desired_target = main_table[3]
        self.cur.execute('''SELECT * FROM additions WHERE Target=? AND Type=?''', (desired_target, data.typee,))
        additions = self.cur.fetchone()
        
        return {'main_table': main_table, 'additions': additions}
    
    
    if __name__ == '__main__':
        pass