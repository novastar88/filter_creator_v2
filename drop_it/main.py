PLK_ZAW = "plik_zawiera.txt"
PLK = "pliki.txt"
FLD = "foldery.txt"
ROZ = "rozszerzenia.txt"


def fil_open(pathh: str):
    file = open(pathh, "r", encoding="utf8")
    return file.read().splitlines()


def writing(pre: str, fil, ending: str, fil2, opening: str):
    fil2.write(opening)
    if len(fil) != 0:
        for item in fil:
            fil2.write(f"{pre}{item}{ending}")
            
            
def main():
    a = fil_open(ROZ)
    
    b = open("filtry_final.txt", "w", encoding="utf8")
    
    writing("*.", a, ";", b, "// rozszerzenia\n")
    
    c = fil_open(FLD)  
    
    writing("", c, "**;", b, "\n// foldery\n")
            
    d = fil_open(PLK)
    
    writing("", d, ";", b, "\n//pliki\n")
            
    e = fil_open(PLK_ZAW)

    writing("*", e, "*;", b, "\n//plik zawiera\n")
      
    b.close()
            
    
if __name__ == "__main__":
    pass